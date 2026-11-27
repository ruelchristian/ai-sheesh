# Cortex

Vanilla HTML/CSS/JS UI with a small Express CRUD API. Entries live in Postgres. The app runs as one Render Web Service.

Each entry has only a name and a link. Links are detected as GitHub repos or custom sites, and the card shows the matching icon.

## Files

- `index.html` — page, search, add/edit/delete UI, login UI, JSON export.
- `server.js` — Express API, signed-cookie auth, static file serving, first-run database seed.
- `data/tools.js` — seed dataset. Used only when the database is empty.
- `render.yaml` — Render Blueprint: web service plus Postgres.
- `data/*.json`, `MATT_MURPHY_*.md`, `TOOL_RANKINGS.md` — research archives and notes.
- `scripts/` — offline Python helpers. Not used by the app.

## Deploy to Render

1. Push the repo to GitHub.
2. In Render, create a Blueprint from `render.yaml`.
3. Set `ADMIN_PASSWORD` on the web service. Keep it out of the repo.

`render.yaml` creates the Web Service and Postgres database, then sets `DATABASE_URL` automatically. First deploy seeds the database from `data/tools.js`. Edits made in the UI persist in Postgres.

Render's free Postgres plan expires 30 days after creation. Upgrade the database before then, or export JSON from the page and restore it later.

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
