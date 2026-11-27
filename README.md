# Skills & Tools Library

Vanilla HTML/CSS/JS UI with a small Express CRUD API. Entries live in Postgres. The app runs as one Render Web Service.

## Files

- `index.html` — page, search, filters, add/edit/delete UI, JSON export.
- `server.js` — Express API, static file serving, first-run database seed.
- `data/tools.js` — seed dataset. Used only when the database is empty.
- `render.yaml` — Render Blueprint: web service plus Postgres.
- `data/*.json`, `MATT_MURPHY_*.md`, `TOOL_RANKINGS.md` — research archives and notes.
- `scripts/` — offline Python helpers. Not used by the app.

## Deploy to Render

1. Push the repo to GitHub.
2. In Render, click **New** -> **Blueprint Instance**.
3. Connect the repo and click **Apply**.

`render.yaml` creates the Web Service and Postgres database, then sets `DATABASE_URL` automatically. First deploy seeds the database from `data/tools.js`. Edits made in the UI persist in Postgres.

Render's free Postgres plan expires 30 days after creation. Upgrade the database before then, or export JSON from the page and restore it later.

## Run locally

Needs Node 20+ and Postgres.

```
npm install
createdb ai_sheesh
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to your local Postgres connection string. Then run:

```
npm start
```

Open `http://localhost:3000/`.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/tools` | List all entries |
| `POST` | `/api/tools` | Create entry |
| `PUT` | `/api/tools/:id` | Update entry |
| `DELETE` | `/api/tools/:id` | Delete entry |

Entry shape:

```
{name, category, description, use_when, repo, tags}
```

`repo` is `owner/repo` or `null`. `tags` is an array of strings. `name` is required.
