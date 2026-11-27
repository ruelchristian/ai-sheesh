# Skills & Tools Library

Static site. No database, no auth, no backend, no API calls.

## Files

- `index.html` — page, search, category and tag filters.
- `data/tools.js` — 91 entries in `window.TOOLS`.
- `data/*.json`, `MATT_MURPHY_*.md`, `TOOL_RANKINGS.md` — research archives and notes.
- `scripts/` — offline Python helpers for those archives. Not used by the site.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deploy

Push repo to GitHub, then Settings -> Pages -> Deploy from branch -> `main` / root.
Site URL: `https://<username>.github.io/<repo>/`.

## Edit entries

Edit `data/tools.js`. Each entry has this shape:

```
{name, category, description, use_when, repo, tags}
```

`repo` is `owner/repo` or `null`. `tags` is an array of strings.
Save and reload; no build step and no server required.
# ai-sheesh
