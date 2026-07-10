# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A German-language, installable PWA (progressive web app) that acts as a companion/tutorial site for the
Fujifilm X-H2S camera: tutorial, custom-preset (C1–C7) guide, troubleshooting ("SOS"), full-text-searchable
manual, checkable exercise plan, and a notes form. There is **no backend, no package manager beyond a
dependency-free Node build script, and no test suite**. The site is still deployed as plain static
HTML/CSS/JS to GitHub Pages — but everything actually served lives in `docs/`, which is **entirely generated
output**, never hand-edited directly (see Architecture below). Hand-written source lives in two places:
`content/` (page/data definitions, Node-only) and `src/` (static browser assets — CSS, client JS, icons, the
manual data, the companion PDFs). Running the build assembles both into `docs/`.

## Running / developing

- **After editing anything under `content/` or `src/`, run `node build/build.js`** (or `npm run build`) from
  the repo root before committing. This copies `src/`'s static assets into `docs/assets/` (and
  `docs/manifest.webmanifest`, `docs/X-H2S_Einfuehrung_und_Lernpfad.pdf`) and regenerates every page
  (`docs/index.html`, `docs/presets.html`, `docs/handbuch.html`, `docs/uebungen.html`, `docs/sos.html`,
  `docs/mehr.html`, `docs/belegung.html`, `docs/verbindung.html`, `docs/referenz.html`, `docs/ueber.html`)
  plus `docs/sw.js` and `docs/assets/data/search-index.js`. Node ≥18 with ES module support is required (no
  other dependencies — `package.json` has none besides the `version` field, see Versioning below).
- Every generated file starts with a `<!-- GENERATED FILE ... -->` / `// GENERATED FILE ...` comment pointing
  back at its real source. **Never hand-edit anything under `docs/`** — the next build silently overwrites it.
- To preview: serve `docs/` with any static file server (e.g. `python3 -m http.server --directory docs`) and
  open it in a browser. `file://` still works for everything except the service worker
  (`navigator.serviceWorker.register` requires `http(s)://`) — just open `docs/index.html` directly.
- **GitHub Pages**: Settings → Pages → Deploy from a branch → select the branch and folder **`/docs`** (not
  `/` root). GitHub Pages only supports `/` or `/docs` as a publish folder without a separate GitHub Actions
  deploy workflow, which this project deliberately doesn't have — that's why the generated output specifically
  targets a folder named `docs/` rather than e.g. `dist/` or `build/`.
- There is no linter, formatter, or CI. Verify changes by running the build, then loading the affected
  page(s) in a browser (a headless-browser smoke test — click through nav, exercise checkboxes, the RAW
  section, etc. — is the standard way this repo's changes get verified; see recent commits for the pattern).

## Architecture

**Hand-written source lives in `content/` (page/data definitions) and `src/` (static browser assets);
`build/build.js` assembles both into `docs/`** — the folder GitHub Pages actually publishes (see above):

| Source | Generates |
|---|---|
| `content/pages.js` | Single source of truth for the page list: file name, nav slug, icon, label, `<title>`, and whether it's a bottom-tab page (`tab: true`) or belongs under one (`parent: "mehr"`). Drives the generated `<nav>` (real `<a href>` tags — no client-side `go(slug)` lookup, so a typo'd page reference is a build-time issue, not a silently-dead link), the parent-tab highlighting + "‹ back" breadcrumb for sub-pages (`build/lib/shell.js`), and `sw.js`'s precache list. |
| `content/data/*.js` | Structured content, one file per content type: `presets.js` (mode-dial C1–C7 cards, `PRESETS`), `sos.js` (troubleshooting entries, `SOS`), `exercises.js` (checkable training plan, `EX`), `tutorial.js` (the 8-chapter start-page tutorial, `TUTORIAL`), `belegung-fields.js` (the "Meine Belegung" notes-form fields, `FIELDS`), `menu-paths.js` (the "Wichtige Menüwege" reference table), `raw-settings.js` (the RAW-Konvertierung settings table, `RAW_SETTINGS`), `facts.js` (short strings/menu paths repeated verbatim across multiple pages — e.g. the Auto-Update menu path, the shutter-button explanation — consolidated here so wording can't drift page-to-page, plus `RAW_KONV_LINK`, the one place the RAW-Konvertierung deep-dive's location is written down). |
| `content/pages/*.js` | One file per output page (`start.js` → `index.html`, plus `presets.js`, `handbuch.js`, `uebungen.js`, `sos.js`, and the "Mehr" hub + its four sub-pages: `mehr.js`, `belegung.js`, `verbindung.js`, `referenz.js`, `ueber.js`). Each exports `render()` (returns the page's inner `<main>` HTML, usually assembled from the `content/data/*` arrays above) and `scripts` (the list of `<script src>` tags the page needs). |
| `content/data/app-meta.js` | Reads `version` out of `package.json` (Node-only `fs.readFileSync`, same as any other `content/data/*.js` file) and exports `VERSION` — used by `ueber.js` to display it and by `build/lib/sw-gen.js` to fold it into `sw.js`'s `CACHE` name. Single source of truth; see Versioning below. |
| `build/lib/shell.js` + `build/lib/partials/{head,header,nav}.js` | The shared `<head>`/`<header>`/`<nav>` wrapper — this is what used to be ~100 duplicated lines per HTML file plus runtime-injected header/nav; now written once and reused for every page. The header partial also renders the global-search button. |
| `build/lib/content-helpers.js` | Shared renderers for the "static `<details>` accordion" content shape used by both SOS entries and tutorial chapters (`renderBody`/`renderDetails`). |
| `build/lib/sw-gen.js` | Computes `docs/sw.js`'s `SHELL` precache array from the build's actual output file list (plus a hand-maintained static-asset list for CSS/JS/icons/manual/PDF in `build/build.js`) and a `CACHE` name combining the app version and a content hash — both regenerate automatically on every build, so a renamed page or a forgotten version bump can no longer desync the offline cache. |
| `build/lib/search-index.js` | Assembles `docs/assets/data/search-index.js` (a `const SEARCH_INDEX=[...]` script, like `manual-de.js`'s format — script-tag-loadable, not JSON, so it still works under `file://`) from every `content/data/*` array **except** the manual — see Search below for why. |

`src/` holds every hand-written static browser asset — `build/build.js`'s `copyStaticAssets()` copies it into
`docs/assets/` (and `docs/manifest.webmanifest`, `docs/X-H2S_Einfuehrung_und_Lernpfad.pdf`) on every build,
unchanged. Nothing under `src/` is itself generated — it's the second half of this repo's hand-written source,
alongside `content/`:

- `src/js/ui.js` — shared across every page: the fallback `openPage(printed)` handbook-deep-link helper
  (overridden by `handbuch.js` on that page), the `store` localStorage wrapper, service worker registration,
  and auto-opening a `<details>` when its `id` matches the URL fragment (so a search result or cross-link
  into a closed accordion lands expanded, not just scrolled-to-and-collapsed). Header/nav injection and the
  old `go(slug)` helper are gone — the build renders real links.
- `src/js/search.js` — shared on every page: the search engine (`searchAll(query, opts)`, weighted
  title/whole-word/substring scoring, edit-distance-1 typo suggestions via `suggestTypo`) plus the global
  search UI (header button → `openSearch()` → a native `<dialog>`, built and populated lazily on first open).
  `handbuch.js`'s inline manual search also calls `searchAll` (pre-filtered to `types: ["manual"]`) instead of
  duplicating ranking logic — one engine, two entry points.
- `src/js/<page>.js` — one per interactive page (`presets.js`, `uebungen.js`, `handbuch.js`, `belegung.js`),
  each much thinner than a client-rendered app would need: since the build renders all content-derived markup
  statically, these only handle *interaction* against already-rendered DOM (e.g. `presets.js` filters
  pre-rendered preset cards by `data-preset` on click; `uebungen.js` toggles checkboxes and reads/writes
  `localStorage`), never building HTML from a data array at runtime.
- `src/css/style.css` — single shared stylesheet; design tokens (colors, fonts) live in `:root`. No CSS
  build/preprocessor — edit the file directly.
- `src/data/manual-de.js` — the full German manual text as a JS array `MANUAL` (404 pages, ~450 KB) plus
  `const OFFSET = 24`. `handbuch.js` searches/renders this in-browser (no server-side search). Hand-edited,
  not generated (see "Updating the manual text" below).

### Search

(Note: paths below like `assets/js/search.js` are the browser-facing URLs under `docs/` — the served path,
copied at build time from the `src/` source location of the same relative name, e.g. `src/js/search.js`.)

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

### In-app PDF viewer (`handbuch.html`)

Opening a manual page renders the **actual PDF page** (canvas + a positioned text-layer overlay for
selection/highlighting), not just the extracted `MANUAL[]` text — `assets/js/pdf-viewer.js` (dynamically
`import()`-ed by `assets/js/handbuch.js` on first use, so the ~1.8 MB PDF.js library never loads unless
someone actually opens a manual page). `src/js/vendor/pdfjs/` is a vendored, unmodified copy of Mozilla's
PDF.js (Apache-2.0; see its own `README.md` for the exact version and how to update it) — **not** an npm
dependency, consistent with this repo having none; update by replacing those two files directly in `src/`
(the build copies them into `docs/assets/js/vendor/pdfjs/` like everything else in `src/`).

The manual PDF itself is **not** vendored — it stays fetched from Fujifilm's own site (same URL the "download"
button always used) since it's a third-party copyrighted document, not something to redistribute in this repo.
That means the in-app PDF view needs network access on first load per session; if it fails for any reason
(offline, first visit with no connection, the remote host unreachable), `renderPdfPage()` calls `onFallback()`
and `handbuch.js` falls back to the original all-offline `MANUAL[]` text view automatically — the text search
and text view must keep working with zero network access, full stop, regardless of what happens to the PDF
feature. Once a device has loaded the PDF/worker JS once, the service worker's normal same-origin
stale-while-revalidate caching (`sw.js`) picks them up like any other asset — they're deliberately **not** in
the mandatory install-time precache list, only cached opportunistically after first real use.

`?page=N&q=term` on `handbuch.html` (used by both the inline search and global-search manual results, via
`search.js`'s manual target) drives which PDF page renders and which text gets highlighted + scrolled into
view in the text layer. The text layer requires `--scale-factor` to be set as a CSS custom property on its
container (`renderPdfPage()` does this) — PDF.js's own text-layer spans size themselves via
`calc(var(--scale-factor)*Npx)`, and without it every span silently falls back to the browser default font
size, which desyncs the highlight rectangles from the actual rendered glyphs.

### Design tokens & the `.steplist` component

`src/css/style.css`'s `:root` has a spacing scale (`--space-1..5`) and a radius scale (`--radius-xs/sm/md/lg/pill`)
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

### Versioning

`package.json`'s `version` field is the single source of truth, read at build time by
`content/data/app-meta.js`. Two things consume it: the "Über" page (`content/pages/ueber.js`) displays it
directly, and `build/lib/sw-gen.js` folds it into `sw.js`'s `CACHE` name (`xh2s-v<version>-<hash>`). **Bump
the version whenever you want to signal a deliberate release/reset** — the content-hash suffix already forces
a cache reset on any actual file change regardless, but the version bump is what makes that reset visible and
traceable (an installed user's cache key visibly ties back to the version shown in the app, and you get a
clean marker of "this is what changed between reset N and reset N+1" instead of an opaque hash-only history).

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
- **Service worker cache versioning is now automatic** — `build/lib/sw-gen.js` derives `CACHE` from the app
  version plus a hash of the shell files' actual contents. You never need to hand-bump a version *constant*;
  just run the build (though see Versioning above for when to bump `package.json`'s `version` itself).
- **Content is German**, aimed at a non-technical reader; keep new copy, IDs like `xh2s_`, and comments in
  that voice/language unless told otherwise.

### Things that look like app files but aren't

- `X-H2S Reisebegleiter.html` at the repo root is a large (~500 KB) **standalone single-file bundle** with
  its own inline `<style>` and a different tab structure (`tab-wissen`, `tab-manual`, etc.) than the current
  multi-page app (`tab-handbuch`, ...). It lives outside both `src/` and `docs/`, so it's never touched by the
  build and — now that GitHub Pages publishes from `docs/` rather than the repo root — is no longer reachable
  on the deployed site at all. Treat it as a legacy/exported snapshot kept for reference, not the live app.
- `src/X-H2S_Einfuehrung_und_Lernpfad.pdf` is supplementary long-form reading material linked from the
  tutorial section of `index.html` and precached by the service worker — it's an asset, not app logic.

## Updating the manual text

The manual (`src/data/manual-de.js`) is generated from the official PDF, not hand-authored:

```
pdftotext -layout x-h2s_manual_de_s_f.pdf -
```

then split per page on the form-feed character (`\f`) and written as `const MANUAL = [...]; const OFFSET = 24;`.
