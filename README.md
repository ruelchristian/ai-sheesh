# Cortex

Vanilla HTML/CSS/JS UI with a small Express CRUD API. Entries live in Postgres. The app runs as one Render Web Service.

CRUD edits only name and link. Categories and descriptions are AI-written and hardcoded in `data/meta.js`. Links are detected as GitHub repos or custom sites; the icon is the clickable link. No raw URL appears on the card.

## Files

- `index.html` — page, search, add/edit/delete UI, login UI, JSON export.
- `server.js` — Express API, signed-cookie auth, static file serving, first-run database seed.
- `data/tools.js` — seed dataset. Used only when the database is empty.
- `data/meta.js` — hardcoded category and description by entry name. Not editable through CRUD.
- `render.yaml` — Render Blueprint for the web service. Database env vars are set outside the Blueprint.
- `scripts/refresh-free-db.js` — backup-first free database rotation.
- `data/*.json`, `MATT_MURPHY_*.md`, `TOOL_RANKINGS.md` — research archives and notes.

## Deploy to Render

1. Push the repo to GitHub.
2. In Render, create a Blueprint from `render.yaml`.
3. Create one free Postgres database in the same workspace.
4. Set `DATABASE_URL` and `ADMIN_PASSWORD` on the web service. Keep both out of the repo.

The Blueprint creates the Web Service. The first deploy seeds the database from `data/tools.js`. Edits made in the UI persist in Postgres.

Render's free Postgres plan expires 30 days after creation. Upgrade it before expiry, or rotate it with the script below.

## Rotate the free database

Render allows only one active free Postgres per workspace. Free databases do not support Render-managed backups. This script makes an app-level backup first.

Run it before expiry. It reads rows from the current database, saves `backups/cortex-tools-*.json`, deletes the old database, creates a new one, restores rows, updates `DATABASE_URL`, and verifies the live app.

```
export RENDER_API_KEY=rnd_...
npm run refresh-db
npm run refresh-db -- --apply
```

The first command is a dry run. `--apply` performs the rotation. Keep the backup file outside Render.

Defaults target the current Cortex resources. Override them with `RENDER_OWNER_ID`, `RENDER_SERVICE_ID`, `RENDER_POSTGRES_ID`, `APP_URL`, or `BACKUP_DIR`.

## Run locally

Needs Node 20+ and Postgres.

```
npm install
createdb cortex
cp .env.example .env
```

Set `DATABASE_URL` and `ADMIN_PASSWORD` in `.env`. Then run:

```
npm start
```

Open `http://localhost:3000/`.

## Auth

`GET /api/tools` is public. Create, update, and delete require a signed cookie.

Log in from the page with `ADMIN_PASSWORD`. The cookie lasts 7 days. Five failed attempts from one IP trigger a 10-minute lockout.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/auth/status` | Auth state for current browser |
| `POST` | `/api/login` | Start an authenticated session |
| `POST` | `/api/logout` | Clear the session cookie |
| `GET` | `/api/tools` | List all entries |
| `POST` | `/api/tools` | Create entry |
| `PUT` | `/api/tools/:id` | Update entry |
| `DELETE` | `/api/tools/:id` | Delete entry |

Entry shape:

```
{name, link}
```

`name` and `link` are required. A link may be `owner/repo`, a bare domain, or a full `http(s)` URL. The server normalizes it before saving. The UI adds the GitHub or website icon from the final URL host.

Category and description come from `data/meta.js`. They are not stored in Postgres, not editable in the UI, and not accepted by the API. New entries without a matching name show no metadata until AI adds it to `data/meta.js`.
