'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const API_BASE = 'https://api.render.com/v1';
const API_KEY = process.env.RENDER_API_KEY;
const OWNER_ID = process.env.RENDER_OWNER_ID || 'tea-dbapl66q1p3s73cjq6dg';
const SERVICE_ID = process.env.RENDER_SERVICE_ID || 'srv-dc4h96k9v7es73evn6f0';
const OLD_DB_ID = process.env.RENDER_POSTGRES_ID || 'dpg-dc4h8t49v7es73evlqgg-a';
const APP_URL = process.env.APP_URL || 'https://cortex-7rsr.onrender.com';
const BACKUP_DIR = path.resolve(process.env.BACKUP_DIR || path.join(__dirname, '..', 'backups'));
const APPLY = process.argv.includes('--apply');

const DISCOVERY_COLUMNS = [
  'description',
  'resource_type',
  'capabilities',
  'use_when_json',
  'do_not_use_when',
  'activation_keywords',
  'supported_platforms',
  'installation_instructions',
  'documentation_url',
  'related_resources',
  'secondary_categories',
  'verification_status',
  'last_verified_at',
  'analysis_evidence',
  'metadata_version'
];
const RESTORE_COLUMNS = [
  'id', 'name', 'link', 'category', 'meta_key', ...DISCOVERY_COLUMNS, 'created_at', 'updated_at'
];
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

function log(message) {
  console.log(message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function api(resource, options = {}) {
  const url = `${API_BASE}${resource}`;
  const method = options.method || 'GET';

  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    },
    body: options.body
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(`${method} ${resource} failed (${response.status}): ${data.message || 'unknown error'}`);
  }

  return data;
}

function dbPool(connectionString) {
  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 2,
    connectionTimeoutMillis: 20000
  });
}

async function getPostgres(id) {
  return api(`/postgres/${id}`);
}

async function getConnectionInfo(id) {
  return api(`/postgres/${id}/connection-info`);
}

async function readRows(connectionString) {
  const pool = dbPool(connectionString);

  try {
    const info = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'tools'
    `);
    const available = new Set(info.rows.map((row) => row.column_name));
    const columns = RESTORE_COLUMNS.filter((column) => available.has(column));
    const result = await pool.query(`SELECT ${columns.join(', ')} FROM tools ORDER BY id`);
    return result.rows;
  } finally {
    await pool.end();
  }
}

function saveBackup(rows) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(BACKUP_DIR, `cortex-tools-${stamp}.json`);
  const payload = {
    exportedAt: new Date().toISOString(),
    sourcePostgresId: OLD_DB_ID,
    count: rows.length,
    rows
  };

  fs.writeFileSync(file, JSON.stringify(payload, null, 2));
  return file;
}

async function waitForAvailable(id) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const db = await getPostgres(id);

    if (db.status === 'available') return db;

    await sleep(5000);
  }

  throw new Error(`Database ${id} did not become available.`);
}

async function createPostgres() {
  const stamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 12);
  const body = {
    name: `cortex-db-${stamp}`,
    plan: 'free',
    ownerId: OWNER_ID,
    region: 'oregon',
    version: '18',
    databaseName: 'cortex',
    databaseUser: 'cortex'
  };

  return api('/postgres', { method: 'POST', body: JSON.stringify(body) });
}

async function restoreRows(connectionString, rows) {
  const pool = dbPool(connectionString);

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT '',
        meta_key TEXT,
        description TEXT NOT NULL DEFAULT '',
        resource_type TEXT NOT NULL DEFAULT '',
        capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
        use_when_json JSONB NOT NULL DEFAULT '[]'::jsonb,
        do_not_use_when JSONB NOT NULL DEFAULT '[]'::jsonb,
        activation_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
        supported_platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
        installation_instructions TEXT NOT NULL DEFAULT '',
        documentation_url TEXT NOT NULL DEFAULT '',
        related_resources JSONB NOT NULL DEFAULT '[]'::jsonb,
        secondary_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
        verification_status TEXT NOT NULL DEFAULT '',
        last_verified_at TIMESTAMPTZ,
        analysis_evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
        metadata_version INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM tools');

      const presentColumns = RESTORE_COLUMNS.filter((column) =>
        rows.some((row) => Object.prototype.hasOwnProperty.call(row, column))
      );
      const placeholders = presentColumns.map((column, index) => `$${index + 1}`).join(', ');
      const insert = `INSERT INTO tools (${presentColumns.join(', ')}) VALUES (${placeholders})`;

      for (const row of rows) {
        const values = presentColumns.map((column) => {
          const value = row[column];

          if (column === 'meta_key') return value || row.name;
          if (column === 'category' && !value) return '';
          if (JSON_COLUMNS.has(column)) {
            if (value == null) return column === 'analysis_evidence' ? '{}' : '[]';
            return typeof value === 'string' ? value : JSON.stringify(value);
          }
          return value;
        });

        await client.query(insert, values);
      }

      await client.query(`
        SELECT setval(
          pg_get_serial_sequence('tools', 'id'),
          COALESCE((SELECT MAX(id) FROM tools), 1),
          (SELECT MAX(id) FROM tools) IS NOT NULL
        )
      `);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

async function updateDatabaseUrl(connectionString) {
  return api(`/services/${SERVICE_ID}/env-vars/DATABASE_URL`, {
    method: 'PUT',
    body: JSON.stringify({ value: connectionString })
  });
}

async function verifyApp(expectedCount) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${APP_URL}/api/tools`, { cache: 'no-store' });
      const data = await response.json();

      if (response.ok && Array.isArray(data) && data.length === expectedCount) {
        return;
      }
    } catch (error) {
      // Free web services sleep. Keep polling while they wake.
    }

    await sleep(5000);
  }

  throw new Error(`App did not report ${expectedCount} restored links.`);
}

async function main() {
  if (!API_KEY) {
    throw new Error('RENDER_API_KEY is required. Do not store it in this repo.');
  }

  const oldDb = await getPostgres(OLD_DB_ID);
  log(`Current database: ${oldDb.name} (${oldDb.id})`);
  log(`Status: ${oldDb.status}. Expires: ${oldDb.expiresAt || 'unknown'}`);

  const oldInfo = await getConnectionInfo(OLD_DB_ID);
  const rows = await readRows(oldInfo.externalConnectionString);

  if (!rows.length) {
    throw new Error('Backup found zero rows. Aborting before deletion.');
  }

  const backupFile = saveBackup(rows);
  log(`Backup saved: ${backupFile}`);
  log(`Rows backed up: ${rows.length}`);

  if (!APPLY) {
    log('Dry run only. No resources changed. Re-run with --apply to rotate.');
    return;
  }

  log('Deleting old free database.');
  await api(`/postgres/${OLD_DB_ID}`, { method: 'DELETE' });

  log('Creating replacement database.');
  const newDb = await createPostgres();
  log(`Created: ${newDb.name} (${newDb.id})`);

  await waitForAvailable(newDb.id);

  const newInfo = await getConnectionInfo(newDb.id);
  await restoreRows(newInfo.externalConnectionString, rows);
  log(`Restored ${rows.length} rows.`);

  await updateDatabaseUrl(newInfo.externalConnectionString);
  log('DATABASE_URL updated. Waiting for the service.');

  await verifyApp(rows.length);
  log(`Done. New database ID: ${newDb.id}`);
  log(`Keep this backup: ${backupFile}`);
}

main().catch((error) => {
  console.error(`Failed: ${error.message}`);
  process.exitCode = 1;
});
