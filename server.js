'use strict';

require('dotenv').config();

const crypto = require('crypto');
const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const discovery = require('./services/discovery');
const { createDiscoveryService } = require('./services/discovery-service');
const analyzer = require('./services/analyzer');

const connectionString = process.env.DATABASE_URL;

if (!connectionString && require.main === module) {
  console.error('DATABASE_URL is required. Set it to a Postgres connection string.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false
});

const app = express();
const port = Number(process.env.PORT || 3000);
const adminPassword = process.env.ADMIN_PASSWORD || '';
const sessionSecret = `cortex:${adminPassword}`;
const cookieName = 'cortex_auth';
const sessionMs = 7 * 24 * 60 * 60 * 1000;
const loginAttempts = new Map();

const DISCOVERY_FIELDS = {
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

const DISCOVERY_KEYS = Object.keys(DISCOVERY_FIELDS);
const ARRAY_FIELDS = new Set([
  'capabilities',
  'use_when',
  'do_not_use_when',
  'activation_keywords',
  'supported_platforms',
  'related_resources',
  'secondary_categories'
]);

const cols = [
  'id',
  'name',
  'link',
  'category',
  'meta_key',
  ...Object.values(DISCOVERY_FIELDS),
  'created_at',
  'updated_at'
].join(', ');

app.set('trust proxy', 1);
app.use(express.json({ limit: '256kb' }));

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function route(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function text(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function listValue(value, max) {
  const source = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/\r?\n|,/)
      : [];

  return [...new Set(source
    .map((item) => text(item, 240))
    .filter(Boolean))].slice(0, max || 20);
}

function has(object, key) {
  return Boolean(object) && Object.prototype.hasOwnProperty.call(object, key);
}

function normalize(body) {
  const input = body || {};
  const name = text(input.name, 200);

  if (!name) throw fail(400, 'name is required.');

  let link = text(input.link, 2000);

  if (!link) throw fail(400, 'link is required.');

  if (/^[^\s/]+\/[^\s/]+$/.test(link)) {
    link = `https://github.com/${link}`;
  } else if (!/^https?:\/\//i.test(link)) {
    link = `https://${link}`;
  }

  try {
    const url = new URL(link);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error();
    if (!url.hostname) throw new Error();
  } catch (error) {
    throw fail(400, 'link must be a valid URL.');
  }

  const entry = { name, link };
  if (has(input, 'category')) entry.category = text(input.category, 80);
  return entry;
}

function emptyDiscovery() {
  return {
    description: '',
    resource_type: '',
    capabilities: [],
    use_when: [],
    do_not_use_when: [],
    activation_keywords: [],
    supported_platforms: [],
    installation_instructions: '',
    documentation_url: '',
    related_resources: [],
    secondary_categories: [],
    verification_status: 'Unverified',
    last_verified_at: '',
    analysis_evidence: {}
  };
}

function discoveryInput(body) {
  const input = body || {};
  const source = input.discovery && typeof input.discovery === 'object' ? input.discovery : input;
  const output = {};

  for (const key of DISCOVERY_KEYS) {
    if (has(source, key)) output[key] = source[key];
  }

  return output;
}

function discoveryValues(source) {
  const input = source || {};

  return DISCOVERY_KEYS.map((key) => {
    const value = input[key];

    if (ARRAY_FIELDS.has(key)) return JSON.stringify(listValue(value, 20));

    if (key === 'analysis_evidence') {
      return JSON.stringify(value && typeof value === 'object' && !Array.isArray(value) ? value : {});
    }

    if (key === 'last_verified_at') {
      if (!value) return null;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date.toISOString();
    }

    return text(value, key === 'installation_instructions' ? 4000 : 2000);
  });
}

function discoveryFromRow(row) {
  const output = emptyDiscovery();

  for (const key of DISCOVERY_KEYS) {
    output[key] = row[DISCOVERY_FIELDS[key]];
  }

  output.verification_status = output.verification_status || 'Unverified';
  output.last_verified_at = output.last_verified_at ? new Date(output.last_verified_at).toISOString() : '';
  return output;
}

function isEmptyValue(value) {
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === 'object') return Object.keys(value).length === 0;
  return !String(value == null ? '' : value).trim();
}

function linkMeta(link) {
  try {
    const url = new URL(link);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const github = host === 'github.com' || host === 'gist.github.com';
    return { kind: github ? 'github' : 'site', host };
  } catch (error) {
    return { kind: 'link', host: '' };
  }
}

function present(row) {
  const meta = linkMeta(row.link);
  return {
    id: row.id,
    name: row.name,
    link: row.link,
    category: row.category,
    meta_key: row.meta_key,
    kind: meta.kind,
    host: meta.host,
    created_at: row.created_at,
    updated_at: row.updated_at,
    discovery: discoveryFromRow(row)
  };
}

function seedData() {
  const source = fs.readFileSync(path.join(__dirname, 'data', 'tools.js'), 'utf8');
  const start = source.indexOf('[');
  const end = source.lastIndexOf(']');

  if (start < 0 || end < start) throw new Error('Could not read seed data.');

  return JSON.parse(source.slice(start, end + 1));
}

function loadMeta() {
  const source = fs.readFileSync(path.join(__dirname, 'data', 'meta.js'), 'utf8');
  const start = source.indexOf('{');
  const end = source.lastIndexOf('}');

  if (start < 0 || end < start) return {};

  return JSON.parse(source.slice(start, end + 1));
}

async function loadRows() {
  const { rows } = await pool.query(`SELECT ${cols} FROM tools ORDER BY lower(name), id`);
  return rows;
}

async function loadResources() {
  return (await loadRows()).map(present);
}

const discoveryService = createDiscoveryService(loadResources);

async function getRow(id) {
  const { rows } = await pool.query(`SELECT ${cols} FROM tools WHERE id = $1`, [id]);
  return rows[0] || null;
}

function insertEntry(entry, values) {
  const columns = ['name', 'link', 'category', 'meta_key', ...Object.values(DISCOVERY_FIELDS), 'metadata_version'];
  const params = [entry.name, entry.link, entry.category || '', entry.meta_key || entry.name, ...discoveryValues(values), 1];
  const placeholders = columns.map((column, index) => `$${index + 1}`).join(', ');

  return pool.query(
    `INSERT INTO tools (${columns.join(', ')}) VALUES (${placeholders}) RETURNING ${cols}`,
    params
  );
}

function updateEntry(id, entry, values) {
  const columns = ['name', 'link', 'category', ...Object.values(DISCOVERY_FIELDS)];
  const params = [entry.name, entry.link, entry.category || '', ...discoveryValues(values)];
  const assignments = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');
  params.push(id);

  return pool.query(
    `UPDATE tools SET ${assignments}, updated_at = now() WHERE id = $${params.length} RETURNING ${cols}`,
    params
  );
}

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tools (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      link TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const legacy = await pool.query(`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'repo'
  `);

  if (legacy.rowCount) {
    await pool.query('ALTER TABLE tools ADD COLUMN IF NOT EXISTS link TEXT');
    await pool.query(`
      UPDATE tools
      SET link = CASE
        WHEN repo IS NOT NULL AND repo <> '' THEN 'https://github.com/' || repo
        ELSE 'https://github.com/search?type=repositories&q=' || regexp_replace(name, ' ', '%20', 'g')
      END
      WHERE link IS NULL OR link = ''
    `);
  }

  await pool.query(`DELETE FROM tools WHERE link IS NULL OR link = ''`);
  await pool.query(`ALTER TABLE tools ALTER COLUMN link SET NOT NULL`);
  await pool.query('ALTER TABLE tools ADD COLUMN IF NOT EXISTS meta_key TEXT');

  const categoryColumn = await pool.query(`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'category'
  `);

  if (!categoryColumn.rowCount) {
    await pool.query(`ALTER TABLE tools ADD COLUMN category TEXT NOT NULL DEFAULT ''`);
  }

  await pool.query(`
    ALTER TABLE tools
    ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS resource_type TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS use_when_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS do_not_use_when JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS activation_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS supported_platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS installation_instructions TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS documentation_url TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS related_resources JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS secondary_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS verification_status TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS analysis_evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS metadata_version INTEGER NOT NULL DEFAULT 0
  `);

  const meta = loadMeta();
  const byId = new Map();
  const byLink = new Map();

  Object.keys(meta).forEach((key) => {
    byId.set(meta[key].id, key);
    if (meta[key].link && !byLink.has(meta[key].link)) byLink.set(meta[key].link, key);
  });

  const { rows: needsKey } = await pool.query(
    `SELECT id, name, link FROM tools WHERE meta_key IS NULL OR meta_key = ''`
  );

  for (const row of needsKey) {
    const key = byId.get(row.id) || (meta[row.name] ? row.name : null) || byLink.get(row.link) || row.name;
    await pool.query('UPDATE tools SET meta_key = $1 WHERE id = $2', [key, row.id]);
  }

  if (!categoryColumn.rowCount) {
    const { rows: needsCategory } = await pool.query(`SELECT id, meta_key, name FROM tools`);

    for (const row of needsCategory) {
      const key = row.meta_key || row.name;
      const category = meta[key] ? meta[key].category : '';

      if (category) {
        await pool.query('UPDATE tools SET category = $1 WHERE id = $2', [category, row.id]);
      }
    }
  }

  const { rows: needsMetadata } = await pool.query(`
    SELECT id, meta_key, name FROM tools WHERE metadata_version = 0
  `);

  for (const row of needsMetadata) {
    const key = row.meta_key || row.name;
    const values = discoveryValues(meta[key] || {});
    const params = [...values, row.id];
    const assignments = Object.values(DISCOVERY_FIELDS)
      .map((column, index) => {
        if (column === 'description') return `description = CASE WHEN description = '' THEN $${index + 1} ELSE description END`;
        return `${column} = $${index + 1}`;
      })
      .join(', ');

    await pool.query(`UPDATE tools SET ${assignments}, metadata_version = 1 WHERE id = $${params.length}`, params);
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(78123)');

    const { rowCount } = await client.query('SELECT 1 FROM tools LIMIT 1');

    if (!rowCount) {
      const seed = seedData();

      for (const row of seed) {
        await insertEntry(
          { name: row.name, link: row.link, category: meta[row.name] ? meta[row.name].category : '', meta_key: row.name },
          meta[row.name] || {}
        );
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

function sign(expiry) {
  return crypto.createHmac('sha256', sessionSecret).update(String(expiry)).digest('base64url');
}

function makeSession() {
  const expiry = Date.now() + sessionMs;
  return `${expiry}.${sign(expiry)}`;
}

function cookieValue(req, name) {
  const header = req.headers.cookie || '';

  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index < 0) continue;
    if (part.slice(0, index).trim() === name) {
      return decodeURIComponent(part.slice(index + 1).trim());
    }
  }

  return '';
}

function validSession(req) {
  if (!adminPassword) return false;

  const token = cookieValue(req, cookieName);
  const [expiry, signature] = token.split('.');
  const expiresAt = Number(expiry);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = Buffer.from(sign(expiry));
  const actual = Buffer.from(signature || '');

  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function sessionCookie(req, value, maxAge) {
  const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
  return `${cookieName}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.ip || 'unknown').trim();
}

function loginAllowed(req) {
  const key = clientIp(req);
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (loginAttempts.size > 1000) loginAttempts.clear();

  if (!record || now > record.reset) {
    loginAttempts.set(key, { count: 1, reset: now + 10 * 60 * 1000 });
    return true;
  }

  if (record.count >= 5) return false;

  record.count += 1;
  return true;
}

function failedLogin(req) {
  const key = clientIp(req);
  const record = loginAttempts.get(key);
  if (record) record.count += 1;
}

function requireAuth(req, res, next) {
  if (!adminPassword) return res.status(503).json({ error: 'ADMIN_PASSWORD is not configured.' });
  if (!validSession(req)) return res.status(401).json({ error: 'Unauthorized.' });
  return next();
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/auth/status', (req, res) => {
  res.json({ enabled: Boolean(adminPassword), authenticated: validSession(req) });
});

app.post('/api/login', (req, res) => {
  if (!adminPassword) return res.status(503).json({ error: 'ADMIN_PASSWORD is not configured.' });
  if (!loginAllowed(req)) return res.status(429).json({ error: 'Too many attempts. Try again in 10 minutes.' });

  const supplied = Buffer.from(typeof req.body.password === 'string' ? req.body.password : '');
  const expected = Buffer.from(adminPassword);
  const matches = supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);

  if (!matches) {
    failedLogin(req);
    return res.status(401).json({ error: 'Wrong password.' });
  }

  res.setHeader('Set-Cookie', sessionCookie(req, makeSession(), Math.floor(sessionMs / 1000)));
  return res.json({ ok: true });
});

app.post('/api/logout', (req, res) => {
  res.setHeader('Set-Cookie', sessionCookie(req, '', 0));
  res.json({ ok: true });
});

app.get('/api/tools', route(async (req, res) => {
  res.json(await loadResources());
}));

app.get('/api/search', route(async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  res.json(await discoveryService.searchResources(req.query.q || '', { limit }));
}));

app.post('/api/discover/task', route(async (req, res) => {
  const limit = Number(req.body && req.body.limit) || 10;
  res.json(await discoveryService.findResourcesForTask(req.body && req.body.task, { limit }));
}));

app.get('/api/resources/:id', route(async (req, res) => {
  const resource = await discoveryService.getResourceDetails(req.params.id);
  if (!resource) throw fail(404, 'Entry not found.');
  res.json(resource);
}));

app.post('/api/resources/:id/analyze', requireAuth, route(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');

  const resources = await loadResources();
  const resource = discovery.getResourceDetails(resources, id);
  if (!resource) throw fail(404, 'Entry not found.');

  const analysis = await analyzer.analyzeRepository(resource, { resources });
  res.json({ resource, analysis });
}));

app.post('/api/resources/:id/analyze/apply', requireAuth, route(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');

  const row = await getRow(id);
  if (!row) throw fail(404, 'Entry not found.');

  const body = req.body || {};
  const updates = body.updates || body.fields || {};
  const overwrite = Array.isArray(body.overwrite) ? body.overwrite : [];
  const incoming = discoveryInput({ discovery: updates });
  const current = discoveryFromRow(row);
  const merged = Object.assign({}, current);
  const applied = [];

  for (const key of DISCOVERY_KEYS) {
    if (!has(incoming, key)) continue;
    if (!isEmptyValue(current[key]) && !overwrite.includes(key)) continue;
    merged[key] = incoming[key];
    applied.push(key);
  }

  const { rows } = await updateEntry(
    id,
    { name: row.name, link: row.link, category: row.category },
    merged
  );

  res.json({ applied, resource: present(rows[0]) });
}));

app.post('/api/tools', requireAuth, route(async (req, res) => {
  const entry = normalize(req.body);
  const values = Object.assign(emptyDiscovery(), discoveryInput(req.body));
  const { rows } = await insertEntry(entry, values);
  res.status(201).json(present(rows[0]));
}));

app.put('/api/tools/:id', requireAuth, route(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');

  const row = await getRow(id);
  if (!row) throw fail(404, 'Entry not found.');

  const entry = normalize(req.body);
  if (!has(req.body, 'category')) entry.category = row.category;
  const values = Object.assign(discoveryFromRow(row), discoveryInput(req.body));
  const { rows } = await updateEntry(id, entry, values);
  res.json(present(rows[0]));
}));

app.delete('/api/tools/:id', requireAuth, route(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');

  const { rowCount } = await pool.query('DELETE FROM tools WHERE id = $1', [id]);
  if (!rowCount) throw fail(404, 'Entry not found.');

  res.json({ ok: true });
}));

app.use(express.static(__dirname));

app.use((error, req, res, next) => {
  if (error.status) return res.status(error.status).json({ error: error.message });
  if (error.code === '22P02') return res.status(400).json({ error: 'Invalid id.' });

  console.error(error);
  res.status(500).json({ error: 'Server error.' });
});

if (require.main === module) {
  init()
    .then(() => {
      app.listen(port, () => console.log(`Cortex running on port ${port}`));
    })
    .catch((error) => {
      console.error('Startup failed:', error);
      process.exit(1);
    });
}
