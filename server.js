'use strict';

require('dotenv').config();

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
const cols = 'id, name, category, description, use_when, repo, tags, created_at, updated_at';

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

  const rawTags = Array.isArray(input.tags) ? input.tags : String(input.tags || '').split(',');
  const tags = rawTags.map((tag) => text(tag, 60)).filter(Boolean).slice(0, 30);

  return {
    name,
    category: text(input.category, 100),
    description: text(input.description, 1000),
    use_when: text(input.use_when, 500),
    repo: text(input.repo, 300) || null,
    tags
  };
}

function toolId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw fail(400, 'Invalid id.');
  return id;
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
      category TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      use_when TEXT NOT NULL DEFAULT '',
      repo TEXT,
      tags TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(78123)');

    const { rowCount } = await client.query('SELECT 1 FROM tools LIMIT 1');

    if (!rowCount) {
      const seed = seedData();

      for (const row of seed) {
        await client.query(
          'INSERT INTO tools (name, category, description, use_when, repo, tags) VALUES ($1, $2, $3, $4, $5, $6)',
          [row.name, row.category || '', row.description || '', row.use_when || '', row.repo || null, row.tags || []]
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

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/tools', route(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${cols} FROM tools ORDER BY lower(name), id`);
  res.json(rows);
}));

app.post('/api/tools', route(async (req, res) => {
  const entry = normalize(req.body);
  const { rows } = await pool.query(
    `INSERT INTO tools (name, category, description, use_when, repo, tags)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${cols}`,
    [entry.name, entry.category, entry.description, entry.use_when, entry.repo, entry.tags]
  );
  res.status(201).json(rows[0]);
}));

app.put('/api/tools/:id', route(async (req, res) => {
  const id = toolId(req);
  const entry = normalize(req.body);
  const { rows } = await pool.query(
    `UPDATE tools
     SET name = $1, category = $2, description = $3, use_when = $4, repo = $5, tags = $6, updated_at = now()
     WHERE id = $7 RETURNING ${cols}`,
    [entry.name, entry.category, entry.description, entry.use_when, entry.repo, entry.tags, id]
  );

  if (!rows.length) throw fail(404, 'Entry not found.');

  res.json(rows[0]);
}));

app.delete('/api/tools/:id', route(async (req, res) => {
  const id = toolId(req);
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
