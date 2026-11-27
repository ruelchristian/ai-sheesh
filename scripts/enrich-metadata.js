'use strict';

require('dotenv').config();

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { Pool } = require('pg');

const analyzer = require('../services/analyzer');

const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((arg) => arg.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1]) : 0;
const BACKUP_DIR = path.resolve(process.env.BACKUP_DIR || path.join(__dirname, '..', 'backups'));
const SERVICE_JSON = path.join(os.homedir(), '.config', 'opencode', 'service.json');
const POSTGRES_ID = process.env.RENDER_POSTGRES_ID || 'dpg-dc4h8t49v7es73evlqgg-a';

const FIELD_COLUMN = {
  description: 'description',
  resource_type: 'resource_type',
  capabilities: 'capabilities',
  use_when: 'use_when_json',
  do_not_use_when: 'do_not_use_when',
  activation_keywords: 'activation_keywords',
  supported_platforms: 'supported_platforms',
  installation_instructions: 'installation_instructions',
  documentation_url: 'documentation_url',
  related_resources: 'related_resources',
  secondary_categories: 'secondary_categories',
  verification_status: 'verification_status',
  last_verified_at: 'last_verified_at',
  analysis_evidence: 'analysis_evidence'
};

const JSON_COLUMNS = new Set([
  'capabilities',
  'use_when_json',
  'do_not_use_when',
  'activation_keywords',
  'supported_platforms',
  'related_resources',
  'secondary_categories',
  'analysis_evidence'
]);

const LIST_LIMITS = {
  capabilities: 12,
  use_when: 8,
  do_not_use_when: 5,
  activation_keywords: 20,
  supported_platforms: 10,
  related_resources: 5,
  secondary_categories: 3
};

const SELECT_COLUMNS = [
  'id', 'name', 'link', 'category', 'meta_key', 'created_at', 'updated_at',
  ...Object.values(FIELD_COLUMN)
].join(', ');

function renderApiKey() {
  if (process.env.RENDER_API_KEY) return process.env.RENDER_API_KEY;

  try {
    const config = JSON.parse(fs.readFileSync(SERVICE_JSON, 'utf8'));
    return (config.env && config.env.RENDER_API_KEY) || '';
  } catch (error) {
    return '';
  }
}

async function connectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const key = renderApiKey();
  if (!key) throw new Error('RENDER_API_KEY or DATABASE_URL is required.');

  const response = await fetch(`https://api.render.com/v1/postgres/${POSTGRES_ID}/connection-info`, {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' }
  });
  const data = await response.json();

  if (!response.ok || !data.externalConnectionString) {
    throw new Error('Could not read database connection info.');
  }

  return data.externalConnectionString;
}

function enableGithubToken() {
  if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) return true;

  try {
    const token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (token) {
      process.env.GITHUB_TOKEN = token;
      return true;
    }
  } catch (error) {
    // GitHub still works unauthenticated, with a lower rate limit.
  }

  return false;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueLimit(existing, suggested, limit) {
  const seen = new Set();
  const output = [];

  for (const item of [...asArray(existing), ...asArray(suggested)]) {
    const value = String(item || '').trim();
    const key = value.toLowerCase();
    if (!value || seen.has(key)) continue;
    seen.add(key);
    output.push(value);
    if (output.length >= limit) break;
  }

  return output;
}

function resourceFromRow(row) {
  const discovery = {};

  for (const [field, column] of Object.entries(FIELD_COLUMN)) {
    let value = row[column];

    if (JSON_COLUMNS.has(column)) {
      value = typeof value === 'string' ? JSON.parse(value) : (value || (column === 'analysis_evidence' ? {} : []));
    } else if (column === 'last_verified_at') {
      value = value ? new Date(value).toISOString() : '';
    } else if (column === 'verification_status') {
      value = value || 'Unverified';
    }

    discovery[field] = value;
  }

  return Object.assign({}, row, { discovery });
}

function mergedDiscovery(current, suggestions) {
  const output = Object.assign({}, current);

  for (const [field, suggested] of Object.entries(suggestions || {})) {
    if (field === 'verification_status' || field === 'last_verified_at') continue;

    if (field === 'analysis_evidence') {
      const source = current.analysis_evidence && current.analysis_evidence.source;
      const seeded = source === 'legacy database columns' || source === 'AI-written seed dataset';
      if (!source || seeded) output.analysis_evidence = suggested || {};
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(LIST_LIMITS, field)) {
      const merged = uniqueLimit(current[field], suggested, LIST_LIMITS[field]);
      if (merged.length) output[field] = merged;
      continue;
    }

    if (!String(output[field] || '').trim() && String(suggested || '').trim()) output[field] = suggested;
  }

  return output;
}

function changedFields(current, merged) {
  return Object.keys(FIELD_COLUMN).filter((field) =>
    JSON.stringify(current[field]) !== JSON.stringify(merged[field])
  );
}

function saveBackup(rows, changes) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(BACKUP_DIR, `cortex-enrichment-${stamp}.json`);
  const payload = {
    exportedAt: new Date().toISOString(),
    count: rows.length,
    changes,
    rows
  };

  fs.writeFileSync(file, JSON.stringify(payload, null, 2));
  return file;
}

function updateSql(fields) {
  const assignments = fields.map((field, index) => `${FIELD_COLUMN[field]} = $${index + 1}`).join(', ');
  return `UPDATE tools SET ${assignments}, updated_at = now() WHERE id = $${fields.length + 1}`;
}

function updateValues(fields, discovery, id) {
  const values = fields.map((field) => {
    const value = discovery[field];
    return JSON_COLUMNS.has(FIELD_COLUMN[field]) ? JSON.stringify(value || {}) : (value || null);
  });
  values.push(id);
  return values;
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });

  await Promise.all(runners);
}

async function applyChanges(pool, changes) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const change of changes) {
      await client.query(
        updateSql(change.fields),
        updateValues(change.fields, change.merged, change.id)
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function main() {
  const tokenEnabled = enableGithubToken();
  const url = await connectionString();
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, max: 6 });
  const resources = await pool.query(`SELECT ${SELECT_COLUMNS} FROM tools ORDER BY id`);
  const rows = resources.rows.filter((row) => analyzer.repoFromLink(row.link));

  const targets = LIMIT > 0 ? rows.slice(0, LIMIT) : rows;
  const changes = [];
  const counts = {};

  await mapLimit(targets, 4, async (row) => {
    const resource = resourceFromRow(row);
    const allResources = resources.rows.map(resourceFromRow);

    try {
      const analysis = await analyzer.analyzeRepository(resource, { resources: allResources });
      const merged = mergedDiscovery(resource.discovery, analysis.analysis ? analysis.analysis.suggestions : analysis.suggestions);
      const fields = changedFields(resource.discovery, merged);

      if (!fields.length) return;

      for (const field of fields) counts[field] = (counts[field] || 0) + 1;
      changes.push({ id: row.id, name: row.name, fields, merged });
    } catch (error) {
      console.log(`Skipped ${row.name}: ${error.message}`);
    }
  });

  await pool.end();

  console.log(`GitHub resources analyzed: ${targets.length}`);
  console.log(`GitHub token: ${tokenEnabled ? 'yes' : 'no'}`);
  console.log(`Rows with changes: ${changes.length}`);
  console.log(`Fields changed: ${JSON.stringify(counts)}`);

  if (!changes.length) return;

  if (!APPLY) {
    console.log('Dry run only. Re-run with --apply to write changes.');
    return;
  }

  const backup = saveBackup(resources.rows, changes);
  const writePool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, max: 2 });

  try {
    await applyChanges(writePool, changes);
  } finally {
    await writePool.end();
  }

  console.log(`Backup saved: ${backup}`);
  console.log(`Updated ${changes.length} rows.`);
}

main().catch((error) => {
  console.error(`Failed: ${error.message}`);
  process.exitCode = 1;
});
