# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A bilingual (English default, German), installable PWA (progressive web app) that acts as a companion/tutorial
site for the Fujifilm X-H2S camera: tutorial, custom-preset (C1–C7) guide, troubleshooting ("SOS"),
full-text-searchable manual, checkable exercise plan, and a notes form. There is **no backend and no test
suite**; the Node build script itself still has zero runtime dependencies (`package.json`'s `dependencies` is
empty — see Versioning below). `devDependencies` do exist, for contributor tooling only (ESLint, Prettier,
commitlint, Husky — see Tooling below); none of it ships to `docs/` or affects the built site. The site is
still deployed as plain static HTML/CSS/JS to GitHub Pages — but everything actually served lives in `docs/`,
which is **entirely generated output**, never hand-edited directly (see Architecture below). Hand-written
source lives in two places: `content/` (page/data definitions, Node-only) and `src/` (static browser assets —
CSS, client JS, icons, the manual data, the companion PDFs). Running the build assembles both into **two
parallel trees**: `docs/` (English, the GitHub Pages root) and `docs/de/` (German) — see Internationalization
below.

## Running / developing

- **After editing anything under `content/` or `src/`, run `node build/build.js`** (or `npm run build`) from
  the repo root before committing. This copies `src/`'s static assets into each locale tree's `assets/` (and
  each tree's `manifest.webmanifest`, `X-H2S_Einfuehrung_und_Lernpfad.pdf`) and regenerates every page in both
  `docs/` and `docs/de/` (`index.html`, `presets.html`, `manual.html`, `exercises.html`, `sos.html`,
  `more.html`, `my-setup.html`, `connection.html`, `reference.html`, `about.html`) plus each tree's `sw.js`,
  `assets/data/search-index.js`, and `assets/data/strings.js`. Node ≥18 with ES module support is required to
  run the build itself. **Run `npm ci` once** (not `npm install`) to get the exact contributor-tooling
  versions pinned in `package-lock.json` — this installs the `devDependencies` covered under Tooling below,
  not a runtime dependency for the site.
- Every generated file starts with a `<!-- GENERATED FILE ... -->` / `// GENERATED FILE ...` comment pointing
  back at its real source. **Never hand-edit anything under `docs/`** — the next build silently overwrites it.
- To preview: serve `docs/` with any static file server (e.g. `python3 -m http.server --directory docs`) and
  open it in a browser — `docs/de/` is reachable at `/de/` under the same server. `file://` still works for
  everything except the service worker (`navigator.serviceWorker.register` requires `http(s)://`) — just open
  `docs/index.html` or `docs/de/index.html` directly.
- **GitHub Pages**: Settings → Pages → Deploy from a branch → select the branch and folder **`/docs`** (not
  `/` root). GitHub Pages only supports `/` or `/docs` as a publish folder without a separate GitHub Actions
  _deploy_ workflow — this project deliberately doesn't have one, even though it does now have a CI workflow
  for lint/format/build _verification_ (see Tooling below) — that's why the generated output specifically
  targets a folder named `docs/` rather than e.g. `dist/` or `build/`. `docs/de/` rides along automatically
  since it's just a subfolder of the published `/docs` folder.
- There is still no automated test suite. Verify behavior changes by running the build, then loading the
  affected page(s) in both locale trees in a browser (a headless-browser smoke test — click through nav,
  exercise checkboxes, the RAW section, search, etc., in **both** `docs/` and `docs/de/` — is the standard way
  this repo's changes get verified; see recent commits for the pattern). `npm run verify` (lint, format check,
  and build together) catches syntax/style/build issues but is not a substitute for that manual pass.

## Tooling

Contributor-facing tooling — linting, formatting, commit conventions, git hooks, CI — added on top of the
zero-runtime-dependency build described above. All of it lives in `devDependencies`; none of it is shipped to
`docs/` or touches the build's own dependency-free guarantee.

- **ESLint** (`eslint.config.js`, flat config): `npm run lint` / `npm run lint:fix`. Two separate rule sets
  for the two runtime contexts under Architecture below — `build/**` and `content/**` are linted as Node ES
  modules; `src/js/**` and `src/data/*.js` are linted as plain browser `<script>` files with `no-undef` and
  top-level `no-unused-vars` both relaxed, because those files intentionally share globals across `<script>`
  tags (`store`, `t`, `MANUAL`, `searchAll`, …) in a way a single-file linter can't resolve without bundling —
  see the file-level comment in `eslint.config.js` for the full rationale. `docs/`, `src/js/vendor/` (vendored
  PDF.js), and the legacy standalone HTML bundle are excluded.
- **Prettier** (`.prettierrc.json` / `.prettierignore`): `npm run format` / `npm run format:check`. Scope is
  deliberately narrow — `build/**`, `src/js/**` (minus vendor), and root config/doc files. **Excluded:**
  `content/**` (the hand-aligned `{de,en}` pairs throughout `content/data/*.js` and `content/pages/*.js` are
  vertically aligned by hand for translator/reviewer readability — Prettier's formatter would collapse that
  alignment) and `src/css/style.css` (deliberately compact, multiple declarations per line — see "Design
  system" — Prettier's CSS formatter would explode it into standard one-declaration-per-line output). Don't
  add either back into Prettier's scope without re-checking the diff size first; both were measured to produce
  a near-total-file rewrite when tried.
- **Conventional Commits** (`commitlint.config.js`, extending `@commitlint/config-conventional`): commit
  messages must look like `feat: add crop workflow exercise` / `fix(search): ...` / `docs: ...`. Enforced
  locally by the `commit-msg` hook and in CI on every PR (see below). See
  `.github/PULL_REQUEST_TEMPLATE.md`'s "Type of change" checklist for the type list used in this repo.
- **Git hooks** (Husky v9, `.husky/`, wired up automatically by the `prepare` script — runs on `npm install`
  or `npm ci`):
  - `pre-commit` — first enforces this file's "after editing `content/` or `src/`, rebuild `docs/`" rule
    directly (rebuilds and fails the commit if `docs/` doesn't match what's staged), then runs `lint-staged`
    (ESLint `--fix` + Prettier `--write` on staged files only).
  - `commit-msg` — runs commitlint against the commit message.
  - `pre-push` — runs `npm run verify` (lint + format check + full rebuild), then re-checks `docs/` is in sync
    as a belt-and-suspenders backstop in case a commit slipped through with `--no-verify`.
- **CI** (`.github/workflows/ci.yml`): on every push to `main` and every pull request, runs the same
  lint/format-check/build/docs-in-sync verification as `pre-push`, plus (PR-only) `commitlint` against the
  PR's commit range. This is verification only — it does not deploy; GitHub Pages still serves directly from
  the committed `docs/` folder, per the GitHub Pages note above.

## Internationalization

English is the default (served from `docs/`, the GitHub Pages root); German is a full parallel tree at
`docs/de/`. Both locale trees use **identical English file names** (`manual.html`, `exercises.html`,
`my-setup.html`, ...) — only the content differs — so a link never needs to know which tree it's in, and a
future page rename is still a one-line change in `content/pages.js`, not a per-locale exercise.

- **Content model**: every translatable string in `content/data/*.js`, `content/pages.js`, and
  `content/pages/*.js` is a `{ de: "...", en: "..." }` pair instead of a plain string. `build/lib/i18n.js`'s
  `localize(value, locale)` recursively walks any array/object and resolves every `{de,en}` leaf to the
  string for that locale — page modules and `content/data/*` arrays don't need any other structural change;
  `build/build.js` calls `localize(...)` once per locale before handing data to `render()`.
- **Runtime UI strings** (search dialog text, "Saved ✓", the exercise-progress counter, PDF loading/close
  labels — anything generated by client JS in `src/js/*.js` rather than baked into HTML at build time) live in
  `content/i18n/strings.js` as the same `{de,en}` shape, and get compiled per locale into
  `assets/data/strings.js` (`const STRINGS = {...}; function t(key, vars)` — script-tag-loadable like
  `search-index.js`, with `{placeholder}` interpolation for the handful of strings that need it). It's loaded
  before `search.js` on every page; `src/js/search.js`, `manual.js`, `my-setup.js`, and `exercises.js` call
  `t("key")` instead of hardcoding literals. Keep build-time-only copy (headings, page prose) out of
  `content/i18n/strings.js` — that belongs directly in `content/pages/*.js` as `{de,en}` pairs instead.
- **`build/build.js` loops `for (const locale of ["en", "de"])`**, writing into `docs/` and `docs/de/`
  respectively — see `outDirFor(locale)`. Everything (pages, search index, service worker, manifest, strings)
  is generated twice, once per locale, from the same bilingual source.
- **Locale switch**: `window.__LOCALE__` and `window.__OTHER_LOCALE_URL__` are embedded as an inline
  `<script>` at the top of every generated page's `<body>` (`build/lib/shell.js`, using
  `build/lib/i18n.js`'s `otherLocaleUrl()` — a plain relative path since file names are locale-invariant:
  `de/<file>` from the English root, `../<file>` from within `de/`). `src/js/ui.js` uses these, plus a new
  `xh2s_lang` localStorage key (additive — doesn't touch the existing `xh2s_ex`/`xh2s_fields` keys, see
  Storage below), to redirect **once** from an English page to its German sibling if `navigator.language`
  starts with `de` and no preference has been stored yet, and never again once a preference (automatic or
  manual) exists. `content/pages/about.js` has a manual "English / Deutsch" switcher link
  (`window.setLocalePreference(lang)`, also in `ui.js`) so the auto-redirect is never a trap.
- **Not yet bilingual**: `src/X-H2S_Einfuehrung_und_Lernpfad.pdf` (the tutorial's companion PDF) stays
  German-only in both trees — translating it wasn't in scope for the file-rename/i18n pass. The manual itself
  (text and PDF) is now fully bilingual — see "The manual" below.

## Architecture

**Hand-written source lives in `content/` (page/data definitions) and `src/` (static browser assets);
`build/build.js` assembles both into `docs/` and `docs/de/`** — see Internationalization above and Running
above for the GitHub Pages publish-folder constraint:

| Source                                                           | Generates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content/pages.js`                                               | Single source of truth for the page list: file name, nav slug, icon, bilingual label/title, and whether it's a bottom-tab page (`tab: true`) or belongs under one (`parent: "more"`). Drives the generated `<nav>` (real `<a href>` tags — no client-side `go(slug)` lookup, so a typo'd page reference is a build-time issue, not a silently-dead link), the parent-tab highlighting + "‹ back" breadcrumb for sub-pages (`build/lib/shell.js`), and `sw.js`'s precache list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `content/data/*.js`                                              | Structured content, one file per content type, every translatable field `{de,en}`: `presets.js` (mode-dial C1–C7 cards, `PRESETS` — each also carries a locale-invariant `swatch` CSS-gradient string driving the film-canister card's color spine, see "Design system"), `sos.js` (troubleshooting entries, `SOS`, with locale-invariant English anchor `id`s), `exercises.js` (checkable training plan, `EX`), `tutorial.js` (the 8-chapter start-page tutorial, `TUTORIAL`), `belegung-fields.js` (the "My Setup" notes-form fields, `FIELDS` — the storage `key` in each row is locale-invariant, see Storage), `menu-paths.js` (the "Key menu paths" reference table — English rows show the camera's real English menu-item names, not literal translations), `raw-settings.js` (the RAW-conversion settings table, `RAW_SETTINGS`, same real-menu-name treatment), `facts.js` (short strings/menu paths repeated verbatim across multiple pages — e.g. the Auto Update menu path, the shutter-button explanation — consolidated here so wording can't drift page-to-page, plus `RAW_KONV_LINK` and `MANUAL_PDF_URL`), `manifest.js` (PWA manifest content, localized by `build/lib/manifest-gen.js`). |
| `content/i18n/strings.js`                                        | Runtime UI-string dictionary — see Internationalization above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `content/pages/*.js`                                             | One file per output page (`start.js` → `index.html`, plus `presets.js`, `manual.js`, `exercises.js`, `sos.js`, and the "More" hub + its four sub-pages: `more.js`, `my-setup.js`, `connection.js`, `reference.js`, `about.js`). Each exports `render(locale)` (returns the page's inner `<main>` HTML for that locale, usually assembled from the `content/data/*` arrays above via `localize()`) and `scripts` (the list of `<script src>` tags the page needs).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `content/data/app-meta.js`                                       | Reads `version` out of `package.json` (Node-only `fs.readFileSync`, same as any other `content/data/*.js` file) and exports `VERSION` — used by `about.js` to display it and by `build/lib/sw-gen.js` to fold it into `sw.js`'s `CACHE` name. Single source of truth; see Versioning below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `build/lib/i18n.js`                                              | `localize(value, locale)` (see Internationalization above) and `otherLocaleUrl(file, locale)`, shared by `shell.js` and `about.js`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `build/lib/shell.js` + `build/lib/partials/{head,header,nav}.js` | The shared `<head>`/`<header>`/`<nav>` wrapper, locale-aware (`<html lang>`, page `<title>` brand suffix, header subtitle, search-button `aria-label`) — this is what used to be ~100 duplicated lines per HTML file plus runtime-injected header/nav; now written once and reused for every page/locale. The header partial also renders the global-search button. `shell.js` also injects the icon sprite (`renderIconSprite()`, see `build/lib/partials/icons.js` below and "Design system") once per page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `build/lib/partials/icons.js`                                    | The hand-drawn SVG line-icon set backing every UI symbol in the app (nav, chips, buttons — no emoji). `renderIconSprite()` / `icon(name)` — see "Design system" below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `build/lib/content-helpers.js`                                   | Shared renderers for the "static `<details>` accordion" content shape used by both SOS entries and tutorial chapters (`renderBody`/`renderDetails`) — locale-agnostic, operates on already-localized plain strings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `build/lib/sw-gen.js`                                            | Computes each locale tree's `sw.js`'s `SHELL` precache array from that build's actual output file list (plus a hand-maintained static-asset list for CSS/JS/icons/manual/PDF in `build/build.js`) and a `CACHE` name combining the app version and a content hash — both regenerate automatically on every build, so a renamed page or a forgotten version bump can no longer desync the offline cache.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `build/lib/search-index.js`                                      | Assembles `assets/data/search-index.js` (a `const SEARCH_INDEX=[...]` script, like `manual-*.js`'s format — script-tag-loadable, not JSON, so it still works under `file://`) from every already-localized `content/data/*` array **except** the manual — see Search below for why. Builds every `target` URL from the (localized) `PAGES` list rather than hand-typed filename strings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `build/lib/strings-gen.js`                                       | Localizes `content/i18n/strings.js` into `assets/data/strings.js` (see Internationalization above), plus any extra locale-resolved constants `build.js` passes in (currently just `manualPdfUrl`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `build/lib/manifest-gen.js`                                      | Localizes `content/data/manifest.js` into each tree's `manifest.webmanifest`, stamping the matching `lang`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

`src/` holds every hand-written static browser asset — `build/build.js`'s `copyStaticAssets(locale)` copies it
into each locale tree's `assets/` on every build. Nothing under `src/` is itself generated — it's the second
half of this repo's hand-written source, alongside `content/`:

- `src/js/ui.js` — shared across every page: the fallback `openPage(printed)` manual-deep-link helper
  (overridden by `manual.js` on that page), the `store` localStorage wrapper, the locale auto-redirect/manual
  switch logic (see Internationalization above), service worker registration, and auto-opening a `<details>`
  when its `id` matches the URL fragment (so a search result or cross-link into a closed accordion lands
  expanded, not just scrolled-to-and-collapsed). Header/nav injection and the old `go(slug)` helper are gone —
  the build renders real links.
- `src/js/search.js` — shared on every page: the search engine (`searchAll(query, opts)`, weighted
  title/whole-word/substring scoring, edit-distance-1 typo suggestions via `suggestTypo`) plus the global
  search UI (header button → `openSearch()` → a native `<dialog>`, built and populated lazily on first open,
  all visible strings via `t()`). `manual.js`'s inline manual search also calls `searchAll` (pre-filtered to
  `types: ["manual"]`) instead of duplicating ranking logic — one engine, two entry points.
- `src/js/<page>.js` — one per interactive page (`presets.js`, `exercises.js`, `manual.js`, `my-setup.js`,
  `start.js`), each much thinner than a client-rendered app would need: since the build renders all
  content-derived markup statically (per locale), these only handle _interaction_ against already-rendered DOM
  (e.g. `presets.js` filters pre-rendered preset cards by `data-preset` on click; `exercises.js` toggles
  checkboxes and reads/writes `localStorage`; `start.js` just wires the Start page's inline search box to the
  shared search engine via `initInlineSearch()`), never building HTML from a data array at runtime. Visible
  strings they do generate at runtime go through `t()`.
- `src/css/style.css` — single shared stylesheet (identical for both locales); design tokens (colors,
  spacing/radius, fonts) live in `:root` — see "Design system" below. No CSS build/preprocessor — edit the file
  directly.
- `src/data/manual-de.js` / `src/data/manual-en.js` — the manual text as a JS array `MANUAL` plus
  `const OFFSET`, one file per locale; `build.js` copies the locale-matching one to each tree's
  `assets/data/manual.js` (a locale-invariant destination path). Both are the full text (404 pages each,
  ~410–450 KB), hand-edited via the pdftotext workflow (see "Updating the manual text" below) against the
  vendored PDFs (`src/manual-de.pdf` / `src/manual-en.pdf` — see "The manual" below).
- `src/icons/` — App icons (192/512/maskable/apple-touch), identical for both locales. (Not to be confused
  with the in-app UI icon set, which is code — `build/lib/partials/icons.js` — not a static asset; see "Design
  system" below.)
- `src/fonts/` — Vendored `.woff2` files for the app's three typefaces; see "Design system" below.

### The manual

Both the manual **text** (`src/data/manual-de.js` / `manual-en.js`, extracted via `pdftotext` — see "Updating
the manual text" below) and the manual **PDF** (`src/manual-de.pdf` / `src/manual-en.pdf`) are fully bilingual
and vendored directly in this repo — the app no longer depends on Fujifilm's site at all for the manual
feature (see "In-app PDF viewer" below for why that used to be different, and why it changed). Both PDF
editions have **404 pages with byte-for-byte identical pagination** (verified page-by-page against every
chapter start, every cross-referenced setting page, and the front-matter offset — `OFFSET = 24` in both
files): a printed-page citation that's correct in one locale is correct in the other, so
`content/pages/manual.js`'s chapter-shortcut chips and the specific page-number chips in
`content/pages/reference.js`/`connection.js` use one shared page-number list for both locales (only the
labels are `{de,en}`). If you add a new page citation, you don't need to re-verify it per locale — but if
Fujifilm ever ships a revised PDF with different pagination in only one language, this assumption would need
re-checking.

`content/data/facts.js`'s `MANUAL_PDF_URL` is a single locale-invariant relative path (`"manual.pdf"`) —
`build.js` copies whichever locale's source PDF into that same destination name per tree, so page modules
and `src/js/manual.js` never need to branch on locale to link to it.

### Search

(Note: paths below like `assets/js/search.js` are the browser-facing URLs under each locale tree — the served
path, copied at build time from the `src/` source location of the same relative name, e.g. `src/js/search.js`.)

Global search (header 🔍 button, every page) and the manual page's inline search share one engine
(`assets/js/search.js`) but two data sources, loaded lazily and independently, per locale tree:

- **Everything except the manual** — SOS entries, presets, exercises, tutorial chapters, menu paths, RAW
  settings — lives in `assets/data/search-index.js`, generated by `build/lib/search-index.js` from the
  (localized) `content/data/*` arrays. It's deliberately small (tens of KB).
- **The manual** is searched directly against the already-existing `MANUAL` array in `assets/data/manual.js`
  — it is **not** duplicated into the search index, since that would double the app's largest asset (~450 KB,
  German tree) for no benefit. `searchAll()` accepts an optional `manual: {list, offset}` argument for this.

Both files are fetched on demand (injected as `<script>` tags, not `fetch()`+JSON, so this keeps working under
`file://`) the first time a search actually needs them — `manual.html` already has `manual.js` (the data file)
loaded normally; every other page lazy-loads it only if the user opens search there. Search results are real
`target` URLs within the same locale tree (`sos.html#id`, `presets.html?preset=C1`, `exercises.html#ex-N`,
`manual.html?page=N`, `reference.html#raw-conversion`) — clicking one is a normal navigation, not JS-managed
state.

### In-app PDF viewer (`manual.html`)

Opening a manual page renders the **actual PDF page** (canvas + a positioned text-layer overlay for
selection/highlighting), not just the extracted `MANUAL[]` text — `assets/js/pdf-viewer.js` (dynamically
`import()`-ed by `assets/js/manual.js` on first use, so the ~1.8 MB PDF.js library never loads unless
someone actually opens a manual page). `src/js/vendor/pdfjs/` is a vendored, unmodified copy of Mozilla's
PDF.js (Apache-2.0; see its own `README.md` for the exact version and how to update it) — **not** an npm
dependency, consistent with this repo having none; update by replacing those two files directly in `src/`
(the build copies them into each tree's `assets/js/vendor/pdfjs/` like everything else in `src/`).

The manual PDF **is vendored** directly in this repo (`src/manual-de.pdf` / `src/manual-en.pdf`, copied by
`build.js` to each tree's `manual.pdf` — see "The manual" above) — an earlier version of this app fetched it
from Fujifilm's own site instead, specifically to avoid redistributing a third-party copyrighted document, but
the repo owner made the deliberate call to vendor it locally instead (own the copy, don't depend on
Fujifilm's hosting or CORS/availability). `PDF_URL` in `src/js/manual.js` is same-origin now, so
`renderPdfPage()`'s `onFallback()` path (falling back to the built-in `MANUAL[]` text view) is a much rarer
edge case than it used to be — it still exists and is still exercised (e.g. if the service worker hasn't
cached `manual.pdf` yet and the device is offline), so the text search and text view must still keep working
with zero network access, full stop, regardless of the PDF feature. `manual.pdf` is deliberately **not** in
the mandatory install-time precache list (same treatment as the vendored PDF.js library files) — at ~7 MB per
locale it would otherwise force every visitor to download it on install whether or not they ever open the
manual page; instead the service worker's normal same-origin stale-while-revalidate caching (`sw.js`) picks
it up opportunistically the first time someone actually opens a manual page, after which it's cached for
good.

`?page=N&q=term` on `manual.html` (used by both the inline search and global-search manual results, via
`search.js`'s manual target) drives which PDF page renders and which text gets highlighted + scrolled into
view in the text layer. The text layer requires `--scale-factor` to be set as a CSS custom property on its
container (`renderPdfPage()` does this) — PDF.js's own text-layer spans size themselves via
`calc(var(--scale-factor)*Npx)`, and without it every span silently falls back to the browser default font
size, which desyncs the highlight rectangles from the actual rendered glyphs.

### Design system

The visual identity is a **darkroom/film-label register** — a warm near-black ground, a single tungsten-amber
accent used sparingly (like a safelight or an indicator LED), a muted moss green for secondary/confirmation
state, and rust for warnings — deliberately _not_ a generic dark-mode SaaS look. It draws on the same visual
language as Fuji X Weekly's recipe cards (see the film-canister preset cards below) without using any real
product photography, which this project has no rights to license.

- **Color tokens** (`src/css/style.css`'s `:root`): `--ink`/`--panel`/`--panel-2`/`--line` (surfaces),
  `--paper`/`--muted`/`--faint` (text), `--amber`/`--amber-dim`/`--amber-ink` (the one accent — use it
  sparingly, for the thing on a screen that should draw the eye, not as a general highlight color),
  `--moss`/`--moss-dim` (secondary/success), `--rust`/`--rust-dim` (warnings). Always go through a token in
  component rules — never hardcode a hex value — because every token is redefined for the light theme (see
  below) and a hardcoded value silently breaks that.
- **Type**: `--font-display` (Fraunces, a serif with real character for headings/wordmark — evokes type
  printed on a film box or a manual's cover), `--font-body` (IBM Plex Sans, for everything else), `--font-mono`
  (IBM Plex Mono, reserved for anything that mirrors what's physically printed on the camera — button names,
  menu paths, `<span class="osd">`, page numbers). All three are **vendored** as static `.woff2` files in
  `src/fonts/` (SIL OFL 1.1, see `src/fonts/README.md` for source/update instructions) rather than linked from
  Google's CDN — consistent with this app's zero-dependency, fully-offline architecture (same treatment as
  PDF.js and the manual PDFs). `build/build.js`'s `copyStaticAssets()` copies them into each locale tree's
  `assets/fonts/`; they're in `STATIC_SHELL_ASSETS` so the service worker precaches them on install.
- **Spacing/radius scale**: `--sp-1..5` and `--r-xs/sm/md/lg/pill` — use these instead of one-off pixel values
  when adding new rules. The file is a single authoritative pass (no append-only "v2 patch" layer — if you need
  to override an existing selector, edit that rule in place rather than adding a new one later in the file; two
  definitions of the same selector is exactly the bug class that caused `nav a,nav button` and `table.mini` to
  have conflicting values in the past).
- **Light/dark theming**: dark values are the `:root` defaults; a `@media (prefers-color-scheme:light){:root:not([data-theme="dark"]){...}}`
  block overrides every token for light, and a parallel `:root[data-theme="light"]{...}` rule exists for a
  possible future manual toggle (no toggle UI exists yet — theme currently follows the OS/browser preference
  only). When adding a themed rule, override at the **token** level inside these two blocks, never with a
  component-scoped media query — that's what caused the header's dark gradient stripe bug in light mode
  (fixed by simplifying to a flat `background:var(--ink)`).

#### Icons

Every symbol in the app is a hand-drawn line icon from `build/lib/partials/icons.js`'s `ICONS` map (24×24,
1.75px stroke, round caps/joins) — **no emoji** are used as UI symbols anywhere (nav, chips, buttons, page
headings). `renderIconSprite()` renders the full set once per page as a hidden `<svg><symbol>` sprite
(injected by `build/lib/shell.js`, right after the locale script); `icon(name, extraClass?)` returns the
`<svg class="icon ..."><use href="#i-name"/></svg>` snippet a page module calls inline. Current inventory:
`search`, `home`, `aperture`, `book`, `check-circle`, `grid`, `cross`, `notebook`, `wifi`, `bookmark`, `info`,
`alert-triangle`, `close`, `film`, `image`, `globe`, `video`, `download`, `chevron-right`, `chevron-left`,
`refresh`. Coverage is deliberately not 1:1 with every emoji the app used to have — a few low-stakes
decorative uses (e.g. the quick-filter chips on `presets.html`) were simplified to text-only pills instead of
adding more bespoke icons.

**Critical implementation detail:** `fill`/`stroke`/`stroke-width` etc. must be set via CSS on the `.icon`
class (`src/css/style.css`), never as presentation attributes on the sprite's own hidden `<svg>` wrapper —
a `<use>` element clones the referenced `<symbol>` and inherits styling from **its own position** in the light
DOM, not from the sprite definition's position, so attributes on the hidden sprite element never reach the
rendered icon. `content/pages.js`'s `PAGES` entries reference icons by name in their `icon` field (never a
literal emoji glyph) for the bottom-tab nav.

#### Film-canister preset cards

`content/pages/presets.js`'s `renderFilmCard()` renders each C1–C7/VID preset as a `.filmcard`: a vertical
color-gradient "spine" (`.strip`, from the preset's `swatch` field in `content/data/presets.js` — a
locale-invariant CSS `linear-gradient` string, loosely modeled on that film simulation's actual color science,
e.g. Acros greyscale, Classic Neg warm amber, Astia soft nature tones) next to the card body. This stands in
for the sample photography a real recipe card would show, which this project has no rights to license, while
still directly evoking the requested Fuji X Weekly recipe-card aesthetic.

Any genuine "do this, then this" step sequence (as opposed to an unordered list of facts/tips) should render
as `<ol class="steplist">` — the numbered-circle visual matching `.jstep`. `build/lib/content-helpers.js`'s
`renderBody()` already applies this automatically to SOS/tutorial entries authored with `type: "ol"` (`type:
"ul"` stays a plain bullet list, for non-sequential content); for step sequences authored directly in a
`content/pages/*.js` file, call `renderSteps(items)` from the same module instead of hand-typing a `<p>` with
circled-digit characters and `<br>` — that pattern has no list semantics for screen readers and is exactly
what this component replaced.

### Versioning

`package.json`'s `version` field is the single source of truth, read at build time by
`content/data/app-meta.js`. Two things consume it: the About page (`content/pages/about.js`) displays it
directly, and `build/lib/sw-gen.js` folds it into each locale tree's `sw.js`'s `CACHE` name
(`xh2s-v<version>-<hash>`). **Bump the version whenever you want to signal a deliberate release/reset** — the
content-hash suffix already forces a cache reset on any actual file change regardless, but the version bump is
what makes that reset visible and traceable (an installed user's cache key visibly ties back to the version
shown in the app, and you get a clean marker of "this is what changed between reset N and reset N+1" instead
of an opaque hash-only history). One version number covers both locale trees.

### Conventions to preserve

- **New page checklist**: add an entry to `content/pages.js` (bilingual `label`/`title`), create
  `content/pages/<slug>.js` exporting `render(locale)`/`scripts`, register it in the `PAGE_MODULES` map in
  `build/build.js`, then run the build — the nav, `<head>`, and both locale trees' `sw.js` precache lists all
  update automatically. Don't hand-write a new `.html` file, and don't forget to bilingual-ize any new content
  (`{de,en}` pairs run through `localize()` — see Internationalization above).
- **Manual deep links**: `manual.html?page=220` opens _printed_ manual page 220 (in whichever locale tree
  you're already on). From any other page, call `openPage(220)` (defined in `ui.js`, resolved on
  `manual.html`). Printed page = PDF page − `OFFSET` (currently 24, identical in both locales — see "The
  manual" above), defined per-locale in `manual-de.js`/`manual-en.js`.
- **Cross-page links**: don't hand-type another page's filename as a string. Import `PAGES` from
  `content/pages.js` and look up the file by slug (see `hrefFor` in `content/pages/start.js` or `more.js`),
  or use the `RAW_KONV_LINK` pattern in `content/data/facts.js` for a specific in-page anchor referenced from
  multiple content files — this is what makes a future page rename a one-line change instead of a
  find-and-replace across files. (File names are locale-invariant, so this lookup doesn't need to know which
  locale tree it's building for.)
- **Storage**: use the `store` helper from `ui.js` (`store.get(key)` / `store.set(key, val)`), which
  transparently namespaces everything under `xh2s_` in `localStorage` and swallows storage errors (private
  mode, `file://`, etc.) rather than throwing. Existing keys: `xh2s_ex` (exercise progress, keyed by index),
  `xh2s_fields` (the "My Setup" notes form — the individual field keys inside it, like `c1`/`autoupd`/`fn`,
  are also locale-invariant and must not be renamed), `xh2s_lang` (stored locale preference, `"de"` or
  `"en"` — see Internationalization above). **Never rename these key strings** — they're read directly by
  `store.get(...)` in the client scripts, independent of which page renders the matching form or which locale
  tree is open (both trees share one localStorage per browser, since they're same-origin), so existing users'
  saved data survives page/content reshuffles as long as the key strings themselves don't change.
- **Service worker cache versioning is now automatic** — `build/lib/sw-gen.js` derives `CACHE` from the app
  version plus a hash of the shell files' actual contents, per locale tree. You never need to hand-bump a
  version _constant_; just run the build (though see Versioning above for when to bump `package.json`'s
  `version` itself).
- **Content is bilingual** (English default, German), aimed at a non-technical reader; every translatable
  string is a `{de,en}` pair — keep new copy in both languages, and keep IDs like `xh2s_` and code comments
  in English unless told otherwise. `src/X-H2S_Einfuehrung_und_Lernpfad.pdf` is the one deliberate exception
  (German-only in both trees, see "Things that look like app files but aren't" below) — the manual itself is
  fully bilingual (see "The manual" above).

### Things that look like app files but aren't

- `X-H2S Reisebegleiter.html` at the repo root is a large (~500 KB) **standalone single-file bundle** with
  its own inline `<style>` and a different tab structure (`tab-wissen`, `tab-manual`, etc.) than the current
  multi-page app (`tab-manual`, ...). It lives outside both `src/` and `docs/`, so it's never touched by the
  build and — now that GitHub Pages publishes from `docs/` rather than the repo root — is no longer reachable
  on the deployed site at all. Treat it as a legacy/exported snapshot kept for reference, not the live app.
- `src/X-H2S_Einfuehrung_und_Lernpfad.pdf` is supplementary long-form reading material linked from the
  tutorial section of `index.html` and precached by the service worker — it's an asset, not app logic. It's
  German-only in both locale trees (see Internationalization above).

## Updating the manual text

Both `src/data/manual-de.js` and `src/data/manual-en.js` are generated from the matching vendored PDF
(`src/manual-de.pdf` / `src/manual-en.pdf` — see "The manual" above), not hand-authored:

```
pdftotext -layout src/manual-de.pdf -   # or src/manual-en.pdf
```

Each page comes out separated by a form-feed character (`\f`). Normalize each page's text before storing it —
for every line, collapse internal whitespace runs to a single space and drop lines that end up empty (i.e.
`line.split()` + `" ".join(...)` per line in Python, or the equivalent), then join the surviving lines with
`\n`; this is what keeps `manual-de.js`/`manual-en.js`'s pdftotext-with-`-layout`-preserved table/column
padding from bloating the stored text or throwing off search snippets. Write the result as
`const MANUAL = [...]; const OFFSET = 24;` (`OFFSET` is confirmed identical — 24 — for both current PDF
editions; re-verify it if either PDF is ever replaced with a revised edition, by finding the page that reads
just "1" under the chapter-1 divider and computing `OFFSET = <that page's index> + 1 - 1`).

If Fujifilm ever ships a revised PDF (new firmware, corrections, etc.), replace the matching `src/manual-*.pdf`
and re-run this extraction — and re-verify pagination hasn't drifted between locales before trusting the
shared `CHAPTERS` page-number list in `content/pages/manual.js` or the page-number chips in
`content/pages/reference.js`/`connection.js`.
