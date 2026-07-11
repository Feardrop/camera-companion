import { MANUAL_PDF_URL } from "../data/facts.js";
import { localize } from "../../build/lib/i18n.js";

export const scripts = ["assets/data/strings.js", "assets/data/manual.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/manual.js"];

const T = {
  heading: { de: "Offizielles Handbuch", en: "Official manual" },
  intro: {
    de: "Der komplette <b>Text</b> aller 404 Seiten ist in dieser App eingebaut und <b>offline durchsuchbar</b> — die Suche funktioniert immer, auch ohne Netz. Beim Öffnen einer Seite zeigt die App zusätzlich die <b>echte PDF-Seite mit Abbildungen</b> an (die PDF ist in der App enthalten, kein Netz nötig); ist die PDF ausnahmsweise noch nicht zwischengespeichert, springt die App automatisch auf die eingebaute Text-Ansicht zurück.",
    en: "The complete <b>text</b> of all 404 pages is built into this app and <b>searchable offline</b> — search always works, even with no network. Opening a page also shows the <b>real PDF page with illustrations</b> (the PDF ships with the app, no network needed); if it hasn't been cached locally yet for some reason, the app automatically falls back to the built-in text view.",
  },
  dlPdf: { de: "📥 Handbuch-PDF herunterladen (7 MB)", en: "📥 Download the manual PDF (7 MB)" },
  dlWeb: { de: "🌐 Online-Handbuch (Web, Fujifilm)", en: "🌐 Online manual (web, Fujifilm)" },
  searchPlaceholder: { de: "Im Handbuch suchen … z. B. Selbstauslöser", en: "Search the manual … e.g. self-timer" },
  chaptersHeading: { de: "Direkt zu den Kapiteln", en: "Jump straight to a chapter" },
  prevPage: { de: "Vorherige Seite", en: "Previous page" },
  nextPage: { de: "Nächste Seite", en: "Next page" },
  close: { de: "Schließen", en: "Close" },
  pdfLoading: { de: "PDF-Seite wird geladen …", en: "Loading PDF page …" },
  fallbackNote: { de: "Nur-Text-Ansicht (ohne Abbildungen, PDF nicht verfügbar) ·", en: "Text-only view (no illustrations, PDF unavailable) ·" },
  fallbackLink: { de: "PDF stattdessen extern öffnen", en: "Open the PDF externally instead" },
};

// Both language editions of the manual share identical pagination (404
// pages, verified page-by-page against the official PDFs — see CLAUDE.md),
// so one page-number list covers both locales; only the chip labels differ.
const CHAPTERS = [
  [358, { de: "🚑 Fehlerbehebung · 358", en: "🚑 Troubleshooting · 358" }],
  [365, { de: "⚠️ Warnmeldungen · 365", en: "⚠️ Warning messages · 365" }],
  [220, { de: "🎞️ RAW-Konvertierung · 220", en: "🎞️ RAW conversion · 220" }],
  [129, { de: "🖼️ JPEG/HEIF · 129", en: "🖼️ JPEG/HEIF · 129" }],
  [1, { de: "Kap. 1 Grundlagen · 1", en: "Ch. 1 Before You Begin · 1" }],
  [37, { de: "Kap. 2 Erste Schritte · 37", en: "Ch. 2 First Steps · 37" }],
  [55, { de: "Kap. 3 Foto-Basics · 55", en: "Ch. 3 Photography Basics · 55" }],
  [63, { de: "Kap. 4 Video-Basics · 63", en: "Ch. 4 Movie Basics · 63" }],
  [71, { de: "Kap. 5 Fotografieren · 71", en: "Ch. 5 Taking Photographs · 71" }],
  [125, { de: "Kap. 6 Aufnahmemenüs · 125", en: "Ch. 6 The Shooting Menus · 125" }],
  [142, { de: "Custom Settings · 142", en: "Custom Settings · 142" }],
  [157, { de: "Motiverkennung · 157", en: "Subject Detection · 157" }],
  [213, { de: "Kap. 7 Wiedergabe · 213", en: "Ch. 7 Playback · 213" }],
  [243, { de: "Kap. 9 Setup · 243", en: "Ch. 9 Setup · 243" }],
  [268, { de: "Tasten/Räder · 268", en: "Buttons/Dials · 268" }],
  [285, { de: "Kap. 10 Shortcuts · 285", en: "Ch. 10 Shortcuts · 285" }],
];

export function render(locale) {
  const t = localize(T, locale);
  const chapters = localize(CHAPTERS, locale);

  return `<section id="tab-manual">
  <h2>${t.heading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.intro}</p>
    <div class="dlbtns">
      <a class="btn" href="${MANUAL_PDF_URL}" target="_blank" rel="noopener">${t.dlPdf}</a>
      <a class="btn ghost" href="https://fujifilm-dsc.com/en/manual/x-h2s/" target="_blank" rel="noopener">${t.dlWeb}</a>
    </div>
  </div>

  <div class="search">
    <input id="q" type="search" placeholder="${t.searchPlaceholder}" oninput="doSearch()">
  </div>
  <div id="mres"></div>

  <h2>${t.chaptersHeading}</h2>
  <div class="chips">
    ${chapters.map(([pdf, label]) => `<button class="chip" onclick="openPage(${pdf})">${label}</button>`).join("\n    ")}
  </div>

  <div id="pageview" style="display:none" class="pageview">
    <div class="pagenav">
      <button onclick="stepPage(-1)" aria-label="${t.prevPage}">‹</button>
      <div class="pg" id="pglabel"></div>
      <button onclick="stepPage(1)" aria-label="${t.nextPage}">›</button>
      <button onclick="closePage()" aria-label="${t.close}">✕</button>
    </div>
    <p class="mut" id="pdfstatus" style="display:none">${t.pdfLoading}</p>
    <div class="pdfpage" id="pdfpage" style="display:none">
      <canvas id="pdfCanvas"></canvas>
      <div id="pdfTextLayer" class="pdf-text-layer"></div>
    </div>
    <div class="pagetext" id="pgtext" style="display:none"></div>
    <p class="mut" style="margin:10px 0 0" id="pdffallbacknote">${t.fallbackNote} <a id="pdfdeep" href="${MANUAL_PDF_URL}" target="_blank" rel="noopener">${t.fallbackLink}</a></p>
  </div>
</section>`;
}
