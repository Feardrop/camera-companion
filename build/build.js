#!/usr/bin/env node
// Build entrypoint: reads content/pages.js + content/pages/*.js, renders each
// page through build/lib/shell.js, and writes the generated HTML into docs/
// — the folder GitHub Pages actually publishes from (Settings → Pages →
// Deploy from a branch → folder "/docs"; GitHub Pages only supports "/" or
// "/docs" without a separate deploy workflow, which this project doesn't
// have). Hand-written static assets live in src/ and get copied into
// docs/assets/ on every build; only src/ and content/ are meant to be
// hand-edited — docs/ is entirely build output.
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PAGES } from "../content/pages.js";
import { VERSION } from "../content/data/app-meta.js";
import { renderShell } from "./lib/shell.js";
import { generateServiceWorker } from "./lib/sw-gen.js";
import { buildSearchIndex } from "./lib/search-index.js";

import { SOS } from "../content/data/sos.js";
import { PRESETS } from "../content/data/presets.js";
import { EX } from "../content/data/exercises.js";
import { TUTORIAL } from "../content/data/tutorial.js";
import { MENU_PATHS } from "../content/data/menu-paths.js";
import { RAW_SETTINGS } from "../content/data/raw-settings.js";

import * as startPage from "../content/pages/start.js";
import * as presetsPage from "../content/pages/presets.js";
import * as sosPage from "../content/pages/sos.js";
import * as handbuchPage from "../content/pages/handbuch.js";
import * as uebungenPage from "../content/pages/uebungen.js";
import * as mehrPage from "../content/pages/mehr.js";
import * as belegungPage from "../content/pages/belegung.js";
import * as verbindungPage from "../content/pages/verbindung.js";
import * as referenzPage from "../content/pages/referenz.js";
import * as ueberPage from "../content/pages/ueber.js";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(REPO_ROOT, "src");
const DOCS_DIR = join(REPO_ROOT, "docs");

const PAGE_MODULES = {
  start: startPage,
  presets: presetsPage,
  sos: sosPage,
  handbuch: handbuchPage,
  uebungen: uebungenPage,
  mehr: mehrPage,
  belegung: belegungPage,
  verbindung: verbindungPage,
  referenz: referenzPage,
  ueber: ueberPage,
};

// Static assets that aren't build output but still belong in the offline
// shell — hand-maintained here since they don't come from content/pages.js.
const STATIC_SHELL_ASSETS = [
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/ui.js",
  "./assets/js/presets.js",
  "./assets/js/handbuch.js",
  "./assets/js/uebungen.js",
  "./assets/js/belegung.js",
  "./assets/js/search.js",
  "./assets/data/manual-de.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./X-H2S_Einfuehrung_und_Lernpfad.pdf",
];

// Copies hand-written source assets from src/ into docs/, mirroring the
// relative paths every generated page's <link>/<script src> already expects
// (docs/assets/css/..., docs/assets/js/..., docs/manifest.webmanifest, ...).
function copyStaticAssets() {
  mkdirSync(DOCS_DIR, { recursive: true });
  mkdirSync(join(DOCS_DIR, "assets"), { recursive: true });
  mkdirSync(join(DOCS_DIR, "assets/data"), { recursive: true });
  cpSync(join(SRC_DIR, "css"), join(DOCS_DIR, "assets/css"), { recursive: true });
  cpSync(join(SRC_DIR, "js"), join(DOCS_DIR, "assets/js"), { recursive: true });
  cpSync(join(SRC_DIR, "icons"), join(DOCS_DIR, "assets/icons"), { recursive: true });
  cpSync(join(SRC_DIR, "data/manual-de.js"), join(DOCS_DIR, "assets/data/manual-de.js"));
  cpSync(join(SRC_DIR, "manifest.webmanifest"), join(DOCS_DIR, "manifest.webmanifest"));
  cpSync(join(SRC_DIR, "X-H2S_Einfuehrung_und_Lernpfad.pdf"), join(DOCS_DIR, "X-H2S_Einfuehrung_und_Lernpfad.pdf"));
}

function buildPages() {
  const written = [];
  for (const page of PAGES) {
    const mod = PAGE_MODULES[page.slug];
    if (!mod) throw new Error(`No content/pages/${page.slug}.js module registered in build.js`);
    const html = renderShell({
      page,
      pages: PAGES,
      bodyHtml: mod.render(),
      scripts: mod.scripts || [],
    });
    const outPath = join(DOCS_DIR, page.file);
    writeFileSync(outPath, html, "utf8");
    written.push(page.file);
  }
  return written;
}

function buildSearchIndexFile() {
  const source = buildSearchIndex({ SOS, PRESETS, EX, TUTORIAL, MENU_PATHS, RAW_SETTINGS });
  writeFileSync(join(DOCS_DIR, "assets/data/search-index.js"), source, "utf8");
}

function buildServiceWorker(pageFiles) {
  const shellPaths = [
    "./", ...pageFiles.map(f => `./${f}`),
    "./assets/data/search-index.js",
    ...STATIC_SHELL_ASSETS,
  ];
  const swSource = generateServiceWorker({ repoRoot: DOCS_DIR, shellPaths, version: VERSION });
  writeFileSync(join(DOCS_DIR, "sw.js"), swSource, "utf8");
}

copyStaticAssets();
const pageFiles = buildPages();
buildSearchIndexFile();
buildServiceWorker(pageFiles);

console.log(`Built ${pageFiles.length} pages + sw.js + search-index.js into docs/ (v${VERSION}):`);
for (const f of pageFiles) console.log(`  docs/${f}`);
console.log(`  docs/assets/data/search-index.js`);
console.log(`  docs/sw.js`);
