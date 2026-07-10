#!/usr/bin/env node
// Build entrypoint: reads content/pages.js + content/pages/*.js, renders each
// page through build/lib/shell.js, and writes the generated HTML into docs/
// (English, default) and docs/de/ (German) — the folder GitHub Pages actually
// publishes from is docs/ (Settings → Pages → Deploy from a branch → folder
// "/docs"; GitHub Pages only supports "/" or "/docs" without a separate
// deploy workflow, which this project doesn't have). Both locale trees use
// identical English file names (see content/pages.js) and are built from the
// same bilingual content via build/lib/i18n.js's localize(). Hand-written
// static assets live in src/ and get copied into each tree's assets/ on
// every build; only src/ and content/ are meant to be hand-edited — docs/ is
// entirely build output.
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PAGES } from "../content/pages.js";
import { VERSION } from "../content/data/app-meta.js";
import { STRINGS } from "../content/i18n/strings.js";
import { MANIFEST } from "../content/data/manifest.js";
import { localize } from "./lib/i18n.js";
import { renderShell } from "./lib/shell.js";
import { generateServiceWorker } from "./lib/sw-gen.js";
import { buildSearchIndex } from "./lib/search-index.js";
import { generateStringsFile } from "./lib/strings-gen.js";
import { generateManifest } from "./lib/manifest-gen.js";

import { MANUAL_PDF_URL } from "../content/data/facts.js";
import { SOS } from "../content/data/sos.js";
import { PRESETS } from "../content/data/presets.js";
import { EX } from "../content/data/exercises.js";
import { TUTORIAL } from "../content/data/tutorial.js";
import { MENU_PATHS } from "../content/data/menu-paths.js";
import { RAW_SETTINGS } from "../content/data/raw-settings.js";

import * as startPage from "../content/pages/start.js";
import * as presetsPage from "../content/pages/presets.js";
import * as sosPage from "../content/pages/sos.js";
import * as manualPage from "../content/pages/manual.js";
import * as exercisesPage from "../content/pages/exercises.js";
import * as morePage from "../content/pages/more.js";
import * as mySetupPage from "../content/pages/my-setup.js";
import * as connectionPage from "../content/pages/connection.js";
import * as referencePage from "../content/pages/reference.js";
import * as aboutPage from "../content/pages/about.js";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(REPO_ROOT, "src");
const DOCS_DIR = join(REPO_ROOT, "docs");

const LOCALES = ["en", "de"];
const outDirFor = locale => (locale === "en" ? DOCS_DIR : join(DOCS_DIR, locale));

const PAGE_MODULES = {
  start: startPage,
  presets: presetsPage,
  sos: sosPage,
  manual: manualPage,
  exercises: exercisesPage,
  more: morePage,
  "my-setup": mySetupPage,
  connection: connectionPage,
  reference: referencePage,
  about: aboutPage,
};

// Static assets that aren't build output but still belong in the offline
// shell — hand-maintained here since they don't come from content/pages.js.
// assets/data/manual.js and strings.js are locale-invariant *paths* (each
// tree copies/generates its own localized content to the same relative
// name) so this list doesn't need to vary per locale. manual.pdf (~7MB) is
// deliberately NOT in this mandatory install-time list, same as the vendored
// PDF.js library files — it's same-origin now (see src/manual-de.pdf /
// src/manual-en.pdf) so sw.js's normal stale-while-revalidate fetch handler
// still caches it opportunistically the first time someone actually opens
// the manual page, without forcing every visitor to download it on install.
const STATIC_SHELL_ASSETS = [
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/ui.js",
  "./assets/js/presets.js",
  "./assets/js/manual.js",
  "./assets/js/exercises.js",
  "./assets/js/my-setup.js",
  "./assets/js/search.js",
  "./assets/data/manual.js",
  "./assets/data/strings.js",
  "./assets/data/search-index.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./X-H2S_Einfuehrung_und_Lernpfad.pdf",
];

// Copies hand-written source assets from src/ into a locale tree, mirroring
// the relative paths every generated page's <link>/<script src> already
// expects. The manual is the one asset whose *source* file differs per
// locale (manual-de.js / manual-en.js) but lands at the same destination
// name in each tree, so client code never needs to know which locale it's
// in to load it. manifest.webmanifest is generated (not copied) since its
// text needs to differ per locale too.
function copyStaticAssets(locale) {
  const outDir = outDirFor(locale);
  mkdirSync(outDir, { recursive: true });
  mkdirSync(join(outDir, "assets"), { recursive: true });
  mkdirSync(join(outDir, "assets/data"), { recursive: true });
  cpSync(join(SRC_DIR, "css"), join(outDir, "assets/css"), { recursive: true });
  cpSync(join(SRC_DIR, "js"), join(outDir, "assets/js"), { recursive: true });
  cpSync(join(SRC_DIR, "icons"), join(outDir, "assets/icons"), { recursive: true });
  cpSync(join(SRC_DIR, `data/manual-${locale}.js`), join(outDir, "assets/data/manual.js"));
  cpSync(join(SRC_DIR, `manual-${locale}.pdf`), join(outDir, "manual.pdf"));
  writeFileSync(join(outDir, "manifest.webmanifest"), generateManifest(MANIFEST, locale), "utf8");
  cpSync(join(SRC_DIR, "X-H2S_Einfuehrung_und_Lernpfad.pdf"), join(outDir, "X-H2S_Einfuehrung_und_Lernpfad.pdf"));
}

function buildPages(locale) {
  const outDir = outDirFor(locale);
  const localizedPages = localize(PAGES, locale);
  const written = [];
  for (const page of localizedPages) {
    const mod = PAGE_MODULES[page.slug];
    if (!mod) throw new Error(`No content/pages/${page.slug}.js module registered in build.js`);
    const html = renderShell({
      page,
      pages: localizedPages,
      bodyHtml: mod.render(locale),
      scripts: mod.scripts || [],
      locale,
    });
    const outPath = join(outDir, page.file);
    writeFileSync(outPath, html, "utf8");
    written.push(page.file);
  }
  return written;
}

function buildSearchIndexFile(locale) {
  const outDir = outDirFor(locale);
  const source = buildSearchIndex({
    SOS: localize(SOS, locale),
    PRESETS: localize(PRESETS, locale),
    EX: localize(EX, locale),
    TUTORIAL: localize(TUTORIAL, locale),
    MENU_PATHS: localize(MENU_PATHS, locale),
    RAW_SETTINGS: localize(RAW_SETTINGS, locale),
    pages: localize(PAGES, locale),
  });
  writeFileSync(join(outDir, "assets/data/search-index.js"), source, "utf8");
}

function buildStringsFile(locale) {
  const outDir = outDirFor(locale);
  const extra = { manualPdfUrl: MANUAL_PDF_URL };
  writeFileSync(join(outDir, "assets/data/strings.js"), generateStringsFile(STRINGS, locale, extra), "utf8");
}

function buildServiceWorker(locale, pageFiles) {
  const outDir = outDirFor(locale);
  const shellPaths = ["./", ...pageFiles.map(f => `./${f}`), ...STATIC_SHELL_ASSETS];
  const swSource = generateServiceWorker({ repoRoot: outDir, shellPaths, version: VERSION });
  writeFileSync(join(outDir, "sw.js"), swSource, "utf8");
}

for (const locale of LOCALES) {
  copyStaticAssets(locale);
  const pageFiles = buildPages(locale);
  buildSearchIndexFile(locale);
  buildStringsFile(locale);
  buildServiceWorker(locale, pageFiles);
  const rel = outDirFor(locale) === DOCS_DIR ? "docs" : `docs/${locale}`;
  console.log(`Built ${pageFiles.length} pages + sw.js + search-index.js + strings.js into ${rel}/ (${locale}, v${VERSION})`);
}
