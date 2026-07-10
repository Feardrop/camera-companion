#!/usr/bin/env node
// Build entrypoint: reads content/pages.js + content/pages/*.js, renders each
// page through build/lib/shell.js, writes the generated HTML into the repo
// root (the exact files GitHub Pages already serves), then regenerates
// sw.js's precache list + cache-version from the resulting file set.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PAGES } from "../content/pages.js";
import { renderShell } from "./lib/shell.js";
import { generateServiceWorker } from "./lib/sw-gen.js";

import * as startPage from "../content/pages/start.js";
import * as presetsPage from "../content/pages/presets.js";
import * as sosPage from "../content/pages/sos.js";
import * as handbuchPage from "../content/pages/handbuch.js";
import * as uebungenPage from "../content/pages/uebungen.js";
import * as mehrPage from "../content/pages/mehr.js";
import * as belegungPage from "../content/pages/belegung.js";
import * as verbindungPage from "../content/pages/verbindung.js";
import * as referenzPage from "../content/pages/referenz.js";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

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
  "./assets/data/manual-de.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./X-H2S_Einfuehrung_und_Lernpfad.pdf",
];

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
    const outPath = join(REPO_ROOT, page.file);
    writeFileSync(outPath, html, "utf8");
    written.push(page.file);
  }
  return written;
}

function buildServiceWorker(pageFiles) {
  const shellPaths = ["./", ...pageFiles.map(f => `./${f}`), ...STATIC_SHELL_ASSETS];
  const swSource = generateServiceWorker({ repoRoot: REPO_ROOT, shellPaths });
  writeFileSync(join(REPO_ROOT, "sw.js"), swSource, "utf8");
}

const pageFiles = buildPages();
buildServiceWorker(pageFiles);

console.log(`Built ${pageFiles.length} pages + sw.js:`);
for (const f of pageFiles) console.log(`  ${f}`);
console.log(`  sw.js`);
