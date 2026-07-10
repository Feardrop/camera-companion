# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A German-language, installable PWA (progressive web app) that acts as a companion/tutorial site for the
Fujifilm X-H2S camera: tutorial, custom-preset (C1–C7) guide, troubleshooting ("SOS"), full-text-searchable
manual, checkable exercise plan, and a notes form. There is **no backend, no package manager beyond a
dependency-free Node build script, and no test suite**. The site is still deployed as plain static
HTML/CSS/JS to GitHub Pages — but the top-level `.html` files and `sw.js` are now **generated output**,
not hand-edited directly (see Architecture below). Content editing happens in `content/`; running the build
regenerates the HTML.

## Running / developing

- **After editing anything under `content/`, `assets/css/style.css`, or `assets/js/*.js`, run `node
  build/build.js`** (or `npm run build`) from the repo root before committing. This regenerates
  `index.html`, `presets.html`, `handbuch.html`, `uebungen.html`, `sos.html`, `mehr.html`, `belegung.html`,
  `verbindung.html`, `referenz.html`, and `sw.js`. Node
  ≥18 with ES module support is required (no other dependencies — `package.json` has none).
- Every generated file starts with a `<!-- GENERATED FILE ... -->` / `// GENERATED FILE ...` comment pointing
  back at its real source. **Never hand-edit a generated file** — the next build silently overwrites it.
- To preview: serve the repo root with any static file server (e.g. `python3 -m http.server`) and open it in
  a browser. `file://` still works for everything except the service worker (`navigator.serviceWorker.register`
  requires `http(s)://`). GitHub Pages is the deployment target; the published site root must be the repo
  root (`index.html` at the top).
- There is no linter, formatter, or CI. Verify changes by running the build, then loading the affected
  page(s) in a browser (a headless-browser smoke test — click through nav, exercise checkboxes, the RAW
  section, etc. — is the standard way this repo's changes get verified; see recent commits for the pattern).

## Architecture

**Content lives in `content/`, is assembled by `build/build.js`, and is written out as static HTML at the
repo root** (the exact files GitHub Pages serves):

| Source | Generates |
|---|---|
| `content/pages.js` | Single source of truth for the page list: file name, nav slug, icon, label, `<title>`, and whether it's a bottom-tab page (`tab: true`) or belongs under one (`parent: "mehr"`). Drives the generated `<nav>` (real `<a href>` tags — no client-side `go(slug)` lookup, so a typo'd page reference is a build-time issue, not a silently-dead link), the parent-tab highlighting + "‹ back" breadcrumb for sub-pages (`build/lib/shell.js`), and `sw.js`'s precache list. |
| `content/data/*.js` | Structured content, one file per content type: `presets.js` (mode-dial C1–C7 cards, `PRESETS`), `sos.js` (troubleshooting entries, `SOS`), `exercises.js` (checkable training plan, `EX`), `tutorial.js` (the 8-chapter start-page tutorial, `TUTORIAL`), `belegung-fields.js` (the "Meine Belegung" notes-form fields, `FIELDS`), `menu-paths.js` (the "Wichtige Menüwege" reference table), `raw-settings.js` (the RAW-Konvertierung settings table, `RAW_SETTINGS`), `facts.js` (short strings/menu paths repeated verbatim across multiple pages — e.g. the Auto-Update menu path, the shutter-button explanation — consolidated here so wording can't drift page-to-page, plus `RAW_KONV_LINK`, the one place the RAW-Konvertierung deep-dive's location is written down). |
| `content/pages/*.js` | One file per output page (`start.js` → `index.html`, plus `presets.js`, `handbuch.js`, `uebungen.js`, `sos.js`, and the "Mehr" hub + its three sub-pages: `mehr.js`, `belegung.js`, `verbindung.js`, `referenz.js`). Each exports `render()` (returns the page's inner `<main>` HTML, usually assembled from the `content/data/*` arrays above) and `scripts` (the list of `<script src>` tags the page needs). |
| `build/lib/shell.js` + `build/lib/partials/{head,header,nav}.js` | The shared `<head>`/`<header>`/`<nav>` wrapper — this is what used to be ~100 duplicated lines per HTML file plus runtime-injected header/nav; now written once and reused for every page. The header partial also renders the global-search button. |
| `build/lib/content-helpers.js` | Shared renderers for the "static `<details>` accordion" content shape used by both SOS entries and tutorial chapters (`renderBody`/`renderDetails`). |
| `build/lib/sw-gen.js` | Computes `sw.js`'s `SHELL` precache array from the build's actual output file list (plus a hand-maintained static-asset list for CSS/JS/icons/manual/PDF in `build/build.js`) and a content-hash `CACHE` version — both regenerate automatically on every build, so a renamed page or a forgotten version bump can no longer desync the offline cache. |
| `build/lib/search-index.js` | Assembles `assets/data/search-index.js` (a `const SEARCH_INDEX=[...]` script, like `manual-de.js`'s format — script-tag-loadable, not JSON, so it still works under `file://`) from every `content/data/*` array **except** the manual — see Search below for why. |

Client-side JS (`assets/js/*.js`) is **not** generated — it's hand-edited, but now much thinner: since the
build renders all content-derived markup statically, each page script only handles *interaction* against
already-rendered DOM (e.g. `assets/js/presets.js` filters pre-rendered preset cards by `data-preset` on
click; `assets/js/uebungen.js` toggles checkboxes and reads/writes `localStorage`), rather than building HTML
from a data array at runtime.

- `assets/js/ui.js` — shared across every page: the fallback `openPage(printed)` handbook-deep-link helper
  (overridden by `handbuch.js` on that page), the `store` localStorage wrapper, service worker registration,
  and auto-opening a `<details>` when its `id` matches the URL fragment (so a search result or cross-link
  into a closed accordion lands expanded, not just scrolled-to-and-collapsed). Header/nav injection and the
  old `go(slug)` helper are gone — the build renders real links.
- `assets/js/search.js` — shared on every page: the search engine (`searchAll(query, opts)`, weighted
  title/whole-word/substring scoring, edit-distance-1 typo suggestions via `suggestTypo`) plus the global
  search UI (header button → `openSearch()` → a native `<dialog>`, built and populated lazily on first open).
  `handbuch.js`'s inline manual search also calls `searchAll` (pre-filtered to `types: ["manual"]`) instead of
  duplicating ranking logic — one engine, two entry points.
- `assets/css/style.css` — single shared stylesheet; design tokens (colors, fonts) live in `:root`. No CSS
  build/preprocessor — edit the file directly; it is not generated.
- `assets/data/manual-de.js` — the full German manual text as a JS array `MANUAL` (404 pages, ~450 KB) plus
  `const OFFSET = 24`. `handbuch.js` searches/renders this in-browser (no server-side search). Hand-edited,
  not generated (see "Updating the manual text" below).

### Search

Global search (header 🔍 button, every page) and the Handbuch page's inline search share one engine
(`assets/js/search.js`) but two data sources, loaded lazily and independently:

- **Everything except the manual** — SOS entries, presets, exercises, tutorial chapters, menu paths, RAW
  settings — lives in `assets/data/search-index.js`, generated by `build/lib/search-index.js` from the
  `content/data/*` arrays. It's deliberately small (tens of KB).
- **The manual** is searched directly against the already-existing `MANUAL` array in `manual-de.js` — it is
  **not** duplicated into the search index, since that would double the app's largest asset (~450 KB) for no
  benefit. `searchAll()` accepts an optional `manual: {list, offset}` argument for this.

Both files are fetched on demand (injected as `<script>` tags, not `fetch()`+JSON, so this keeps working under
`file://`) the first time a search actually needs them — `handbuch.html` already has `manual-de.js` loaded
normally; every other page lazy-loads it only if the user opens search there. Search results are real
`target` URLs (`sos.html#id`, `presets.html?preset=C1`, `uebungen.html#ex-N`, `handbuch.html?page=N`,
`referenz.html#raw-konvertierung`) — clicking one is a normal navigation, not JS-managed state.

### Design tokens & the `.steplist` component

`assets/css/style.css`'s `:root` has a spacing scale (`--space-1..5`) and a radius scale (`--radius-xs/sm/md/lg/pill`)
alongside the color tokens — use these instead of one-off pixel values when adding new rules. The file is a
single authoritative pass (no append-only "v2 patch" layer anymore — if you need to override an existing
selector, edit that rule in place rather than adding a new one later in the file; two definitions of the same
selector is exactly the bug class that caused `nav a,nav button` and `table.mini` to have conflicting values
in the past).

Any genuine "do this, then this" step sequence (as opposed to an unordered list of facts/tips) should render
as `<ol class="steplist">` — the numbered-circle visual matching `.jstep`. `build/lib/content-helpers.js`'s
`renderBody()` already applies this automatically to SOS/tutorial entries authored with `type: "ol"` (`type:
"ul"` stays a plain bullet list, for non-sequential content); for step sequences authored directly in a
`content/pages/*.js` file, call `renderSteps(items)` from the same module instead of hand-typing a `<p>` with
circled-digit characters and `<br>` — that pattern has no list semantics for screen readers and is exactly
what this component replaced.

### Conventions to preserve

- **New page checklist**: add an entry to `content/pages.js`, create `content/pages/<slug>.js` exporting
  `render()`/`scripts`, register it in the `PAGE_MODULES` map in `build/build.js`, then run the build — the
  nav, `<head>`, and `sw.js` precache list all update automatically. Don't hand-write a new `.html` file.
- **Handbook deep links**: `handbuch.html?page=220` opens *printed* manual page 220. From any other page,
  call `openPage(220)` (defined in `ui.js`, resolved on `handbuch.html`). Printed page = PDF page − `OFFSET`
  (currently 24), defined in `manual-de.js`.
- **Cross-page links**: don't hand-type another page's filename as a string. Import `PAGES` from
  `content/pages.js` and look up the file by slug (see `hrefFor` in `content/pages/start.js` or `mehr.js`),
  or use the `RAW_KONV_LINK` pattern in `content/data/facts.js` for a specific in-page anchor referenced from
  multiple content files — this is what makes a future page rename a one-line change instead of a
  find-and-replace across files.
- **Storage**: use the `store` helper from `ui.js` (`store.get(key)` / `store.set(key, val)`), which
  transparently namespaces everything under `xh2s_` in `localStorage` and swallows storage errors (private
  mode, `file://`, etc.) rather than throwing. Existing keys: `xh2s_ex` (exercise progress, keyed by index),
  `xh2s_fields` (the "Mehr" notes form). **Never rename these key strings** — they're read directly by
  `store.get("ex")`/`store.get("fields")` in the client scripts, independent of which page renders the
  matching form, so existing users' saved data survives page/content reshuffles as long as the key string
  itself doesn't change.
- **Service worker cache versioning is now automatic** — `build/lib/sw-gen.js` derives `CACHE` from a hash of
  the shell files' actual contents. You never need to hand-bump a version constant; just run the build.
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
