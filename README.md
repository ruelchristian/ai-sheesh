# Cortex

Cortex is a Skills & Tools Library. It keeps the existing vanilla HTML/CSS/JS UI and Express + `pg` API. Entries live in one Render Postgres database. The app runs as one Render Web Service.

The library now supports AI-style discovery. Search accepts plain-language requests and ranks results from stored metadata. Each entry has optional discovery fields. Cards show why a result matched, relevant capabilities, when to use it, and compatibility notes. Detail view shows every filled metadata section and hides empty ones.

## Files

- `index.html` — page, natural-language search, cards, detail view, review screen, CRUD UI, login UI, JSON export.
- `server.js` — Express API, signed-cookie auth, static hosting, additive migrations, REST discovery endpoints.
- `services/discovery.js` — pure ranking logic. No UI or HTTP dependencies.
- `services/discovery-service.js` — DB-backed `searchResources(query)`, `getResourceDetails(id)`, `findResourcesForTask(taskDescription)` wrappers for REST or MCP use.
- `services/analyzer.js` — evidence-only GitHub analyzer. Reads public README/docs, `SKILL.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, plugin and MCP configs.
- `data/tools.js` — seed dataset. Used only when the database is empty.
- `data/meta.js` — AI-written seed metadata. Copied into Postgres by an additive migration. Later edits live in Postgres.
- `render.yaml` — Render Blueprint for the web service. Database env vars are set outside the Blueprint.
- `scripts/refresh-free-db.js` — backup-first free database rotation. Backs up and restores all discovery metadata.
- `test/discovery.test.js` — seven requested queries plus service normalization tests.
- `data/*.json`, `MATT_MURPHY_*.md`, `TOOL_RANKINGS.md` — research archives and notes.

## Discovery metadata

Stored per row, all optional:

- `description`
- `resource_type`
- `capabilities`
- `use_when`
- `do_not_use_when`
- `activation_keywords`
- `supported_platforms`
- `installation_instructions`
- `documentation_url`
- `related_resources`
- `secondary_categories`
- `verification_status`
- `last_verified_at`
- `analysis_evidence`

Existing rows work with empty metadata. Migrations only add columns; they do not delete rows or columns. The old hardcoded descriptions remain in `data/meta.js` as seed values. A hidden `meta_key` keeps them attached after an entry is renamed or relinked. Category is editable CRUD data. Categories come from rows plus seed metadata; the editor also accepts a new category.

### Analyze Repository

Authenticated admins can run **Analyze Repository** on GitHub entries. The analyzer fetches public repository files and proposes metadata with source evidence. The review screen lets an admin edit every suggestion before applying it.

Filled fields are protected. A suggested value overwrites an existing value only when its **Overwrite saved value** checkbox is selected. The analyzer does not invent install commands, compatibility, capabilities, or license data. Empty suggestions stay empty.

## Search and discovery services

`services/discovery.js` is the pure ranking layer. It matches name, description, category, secondary categories, resource type, capabilities, use cases, activation keywords, and platforms. Exact capability and use-case matches get priority. Results include `reasons`, `matching_capabilities`, `when_to_use`, and `compatibility_notes`.

`services/discovery-service.js` exposes the MCP-ready signatures `searchResources(query)`, `getResourceDetails(id)`, and `findResourcesForTask(taskDescription)`. It loads resources from Postgres and delegates ranking to the pure layer. A future MCP server can call it directly; REST endpoints call the same functions. Results always come from stored metadata; there are no hardcoded query-to-resource recommendations.

## Deploy to Render

1. Push the repo to GitHub.
2. In Render, create a Blueprint from `render.yaml`.
3. Create one free Postgres database in the same workspace.
4. Set `DATABASE_URL` and `ADMIN_PASSWORD` on the web service. Keep both out of the repo.

The Blueprint creates the Web Service. First startup seeds an empty database from `data/tools.js` and `data/meta.js`. Edits made in the UI persist in Postgres.

Render's free Postgres plan expires 30 days after creation. Upgrade before expiry, or rotate with the script below.

## Rotate the free database

Render allows only one active free Postgres per workspace. Free databases do not support Render-managed backups. This script makes an app-level backup first.

Run it before expiry. It reads rows and all metadata columns, saves `backups/cortex-tools-*.json`, deletes the old database, creates a new one, restores rows, updates `DATABASE_URL`, and verifies the live app.

```
export RENDER_API_KEY=rnd_...
npm run refresh-db
npm run refresh-db -- --apply
```

The first command is a dry run. `--apply` performs the rotation. Keep the backup file outside Render.

Defaults target the current Cortex resources. Override with `RENDER_OWNER_ID`, `RENDER_SERVICE_ID`, `RENDER_POSTGRES_ID`, `APP_URL`, or `BACKUP_DIR`.

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
npm test
```

Open `http://localhost:3000/`.

## Auth

`GET` requests are public. Create, update, analyze, and delete require a signed cookie.

Log in from the page with `ADMIN_PASSWORD`. The cookie lasts 7 days. Five failed attempts from one IP trigger a 10-minute lockout.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/auth/status` | Auth state for current browser |
| `POST` | `/api/login` | Start an authenticated session |
| `POST` | `/api/logout` | Clear the session cookie |
| `GET` | `/api/tools` | List all entries with discovery metadata |
| `GET` | `/api/search?q=...&limit=...` | Natural-language search |
| `POST` | `/api/discover/task` | Task phrasing wrapper; body `{task, limit}` |
| `GET` | `/api/resources/:id` | One normalized resource |
| `POST` | `/api/resources/:id/analyze` | Analyze a GitHub repository |
| `POST` | `/api/resources/:id/analyze/apply` | Apply reviewed suggestions |
| `POST` | `/api/tools` | Create entry |
| `PUT` | `/api/tools/:id` | Update entry and metadata |
| `DELETE` | `/api/tools/:id` | Delete entry |

Entry shape:

```
{name, link, category, discovery}
```

`name` and `link` are required. `category` is optional. A link may be `owner/repo`, a bare domain, or a full `http(s)` URL. The server normalizes it before saving. The UI adds the GitHub or website icon from the final URL host. `discovery` is optional and accepts the metadata fields listed above.

## Migration risks

Additive migrations preserve IDs, names, links, categories, and rows. They do not delete records. The rotation script is the only destructive path; it always backs up first and aborts on zero rows. Run `npm run refresh-db` before `--apply`. Keep the backup until the replacement database is verified.
