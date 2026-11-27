'use strict';

require('dotenv').config();

const crypto = require('crypto');
const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

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
const cols = 'id, name, link, created_at, updated_at';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const sessionSecret = `cortex:${adminPassword}`;
const cookieName = 'cortex_auth';
const sessionMs = 7 * 24 * 60 * 60 * 1000;
const loginAttempts = new Map();

app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));

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

  return { name, link };
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
    kind: meta.kind,
    host: meta.host,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function seedData() {
  const source = fs.readFileSync(path.join(__dirname, 'data', 'tools.js'), 'utf8');
  const start = source.indexOf('[');
  const end = source.lastIndexOf(']');

  if (start < 0 || end < start) throw new Error('Could not read seed data.');

  return JSON.parse(source.slice(start, end + 1));
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

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(78123)');

    const { rowCount } = await client.query('SELECT 1 FROM tools LIMIT 1');

    if (!rowCount) {
      const seed = seedData();

      for (const row of seed) {
        await client.query(
          'INSERT INTO tools (name, link) VALUES ($1, $2)',
          [row.name, row.link]
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
  const { rows } = await pool.query(`SELECT ${cols} FROM tools ORDER BY lower(name), id`);
  res.json(rows.map(present));
}));

app.post('/api/tools', requireAuth, route(async (req, res) => {
  const entry = normalize(req.body);
  const { rows } = await pool.query(
    `INSERT INTO tools (name, link) VALUES ($1, $2) RETURNING ${cols}`,
    [entry.name, entry.link]
  );
  res.status(201).json(present(rows[0]));
}));

app.put('/api/tools/:id', requireAuth, route(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');

  const entry = normalize(req.body);
  const { rows } = await pool.query(
    `UPDATE tools SET name = $1, link = $2, updated_at = now() WHERE id = $3 RETURNING ${cols}`,
    [entry.name, entry.link, id]
  );

  if (!rows.length) throw fail(404, 'Entry not found.');

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

module.exports = { app, init, pool };
