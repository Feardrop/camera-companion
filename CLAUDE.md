# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A German-language, installable PWA (progressive web app) that acts as a companion/tutorial site for the
Fujifilm X-H2S camera: tutorial, custom-preset (C1–C7) guide, troubleshooting ("SOS"), full-text-searchable
manual, checkable exercise plan, and a notes form. There is **no backend, no build step, no package manager,
and no test suite** — it is hand-written static HTML/CSS/JS served as-is (works even via `file://`).

## Running / developing

There is nothing to install or build. To work on it:

- Open any `.html` file directly in a browser (all asset paths are relative), or serve the folder with any
  static file server (e.g. `python3 -m http.server`) from the repo root.
- To see PWA/offline behavior (service worker), you must serve over `http(s)://` — `file://` breaks
  `navigator.serviceWorker.register`. GitHub Pages is the deployment target; the published site root must be
  the repo root (`index.html` at the top).
- There is no linter, formatter, or CI. Verify changes by loading the affected page(s) in a browser.

## Architecture

Multi-page site, one HTML file per section, all sharing a common shell and stylesheet:

| File | Purpose |
|---|---|
| `index.html` | Start page: overview, quick nav, guided "journey", step-by-step tutorial |
| `presets.html` | Mode dial C1–C7, situation picker, preset cards |
| `sos.html` | Troubleshooting by symptom (15 common problems) |
| `handbuch.html` | Full-text search over the German manual + chapter jump links + PDF download |
| `uebungen.html` | 6 checkable exercises, progress kept in `localStorage` |
| `mehr.html` | User's own camera-config notes, XApp, backup, SD cards, cheat sheet, menu paths, links |

Each page has a matching `assets/js/<page>.js` for its page-specific logic, plus:

- `assets/js/ui.js` — shared across every page. On load it injects the `<header>` and `<nav>` (built from the
  `PAGES` array, using `document.body.dataset.page` to mark the active tab), defines the global `go(name)`
  nav helper, the fallback `openPage(printed)` handbook-deep-link helper (overridden by `handbuch.js` on that
  page), the `store` localStorage wrapper, and registers the service worker.
- `assets/css/style.css` — single shared stylesheet; design tokens (colors, fonts) live in `:root`. No CSS
  build/preprocessor — edit the file directly.
- `assets/data/manual-de.js` — the full German manual text as a JS array `MANUAL` (404 pages, ~450 KB) plus
  `const OFFSET = 24`. `handbuch.js` searches/renders this in-browser (no server-side search).

### Conventions to preserve

- **New page checklist**: add `<script src="assets/js/ui.js"></script>` (+ page script), set
  `<body data-page="...">` to a slug matching an entry in `ui.js`'s `PAGES` array, and add the file to the
  `SHELL` precache list in `sw.js` — otherwise it won't be added to the nav or work offline.
- **Handbook deep links**: `handbuch.html?page=220` opens *printed* manual page 220. From any other page,
  call `openPage(220)` (defined in `ui.js`, resolved on `handbuch.html`). Printed page = PDF page − `OFFSET`
  (currently 24), defined in `manual-de.js`.
- **Storage**: use the `store` helper from `ui.js` (`store.get(key)` / `store.set(key, val)`), which
  transparently namespaces everything under `xh2s_` in `localStorage` and swallows storage errors (private
  mode, `file://`, etc.) rather than throwing. Existing keys: `xh2s_ex` (exercise progress, keyed by index),
  `xh2s_fields` (the "Mehr" notes form).
- **Service worker cache versioning**: `sw.js` precaches the full app shell and uses stale-while-revalidate
  for same-origin GET requests. **Bump the `CACHE` constant (e.g. `xh2s-v1` → `xh2s-v2`) on every deploy that
  changes any precached file**, or installed/offline copies of the app will keep serving stale content
  indefinitely. Keep the `SHELL` array in sync with actual files whenever pages/assets are added or removed.
- **Content is German**, aimed at a non-technical reader; keep new copy, IDs like `xh2s_`, and comments in
  that voice/language unless told otherwise.

### Things that look like app files but aren't

- `X-H2S Reisebegleiter.html` at the repo root is a large (~500 KB) **standalone single-file bundle** with
  its own inline `<style>` and a different tab structure (`tab-wissen`, `tab-manual`, etc.) than the current
  multi-page app (`tab-handbuch`, ...). It is not referenced by `sw.js`, `manifest.webmanifest`, or any of
  the current pages — treat it as a legacy/exported snapshot, not the live app. Don't assume edits to
  `index.html`/`assets/js/*` are reflected there, and don't edit it expecting it to affect the deployed site
  unless specifically asked to.
- `X-H2S_Einfuehrung_und_Lernpfad.pdf` is supplementary long-form reading material linked from the tutorial
  section of `index.html` and precached by the service worker — it's an asset, not app logic.
- The `Dummy` files inside `assets/*/` are empty placeholders (used to keep otherwise-empty folders visible
  when files were added via the GitHub web upload UI); they carry no content and don't need updating.

## Updating the manual text

The manual (`assets/data/manual-de.js`) is generated from the official PDF, not hand-authored:

```
pdftotext -layout x-h2s_manual_de_s_f.pdf -
```

then split per page on the form-feed character (`\f`) and written as `const MANUAL = [...]; const OFFSET = 24;`.
