import { MANUAL_PDF_URL } from "../data/facts.js";
import { localize } from "../../build/lib/i18n.js";

export const scripts = ["assets/data/strings.js", "assets/data/manual.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/manual.js"];

const T = {
  heading: { de: "Offizielles Handbuch (deutsch)", en: "Official manual" },
  intro: {
    de: "Der komplette <b>Text</b> aller 404 Seiten ist in dieser App eingebaut und <b>offline durchsuchbar</b> — die Suche funktioniert immer, auch ohne Netz. Beim Öffnen einer Seite zeigt die App zusätzlich die <b>echte PDF-Seite mit Abbildungen</b> an (braucht dafür einmal Netzverbindung); ohne Netz springt sie automatisch auf die eingebaute Text-Ansicht zurück.",
    en: "The complete German <b>text</b> of all 404 pages is built into this app and <b>searchable offline</b> — search always works, even with no network. Opening a page also shows the <b>real PDF page with illustrations</b> (needs a network connection for that); with no network it automatically falls back to the built-in text view. The English offline text isn't extracted yet — see the note below.",
  },
  dlPdf: { de: "📥 Handbuch-PDF herunterladen (deutsch, 7 MB)", en: "📥 Download the manual PDF" },
  dlWeb: { de: "🌐 Online-Handbuch (Web)", en: "🌐 Online manual (web)" },
  searchPlaceholder: { de: "Im Handbuch suchen … z. B. Selbstauslöser", en: "Search the manual … e.g. self-timer" },
  chaptersHeading: { de: "Direkt zu den Kapiteln", en: "Jump straight to a chapter" },
  englishNote: {
    de: "",
    en: "Chapter shortcuts below use page numbers from the German PDF and aren't available here yet — the English PDF's real page numbers haven't been confirmed. Full-text search above covers the German manual for now; use the PDF/online links to browse the English manual directly.",
  },
  prevPage: { de: "Vorherige Seite", en: "Previous page" },
  nextPage: { de: "Nächste Seite", en: "Next page" },
  close: { de: "Schließen", en: "Close" },
  pdfLoading: { de: "PDF-Seite wird geladen …", en: "Loading PDF page …" },
  fallbackNote: { de: "Nur-Text-Ansicht (ohne Abbildungen, PDF nicht verfügbar) ·", en: "Text-only view (no illustrations, PDF unavailable) ·" },
  fallbackLink: { de: "PDF stattdessen extern öffnen", en: "Open the PDF externally instead" },
};

const CHAPTERS_DE = [
  [358, "🚑 Fehlerbehebung · 358"],
  [365, "⚠️ Warnmeldungen · 365"],
  [220, "🎞️ RAW-Konvertierung · 220"],
  [129, "🖼️ JPEG/HEIF · 129"],
  [1, "Kap. 1 Grundlagen · 1"],
  [37, "Kap. 2 Erste Schritte · 37"],
  [55, "Kap. 3 Foto-Basics · 55"],
  [63, "Kap. 4 Video-Basics · 63"],
  [71, "Kap. 5 Fotografieren · 71"],
  [125, "Kap. 6 Aufnahmemenüs · 125"],
  [142, "Custom Settings · 142"],
  [157, "Motiverkennung · 157"],
  [213, "Kap. 7 Wiedergabe · 213"],
  [243, "Kap. 9 Setup · 243"],
  [268, "Tasten/Räder · 268"],
  [285, "Kap. 10 Shortcuts · 285"],
];

export function render(locale) {
  const t = localize(T, locale);
  const manualPdfUrl = MANUAL_PDF_URL[locale];

  // Chapter shortcuts carry printed-PDF page numbers from the German
  // manual; the English PDF's real pagination hasn't been confirmed yet
  // (see CLAUDE.md), so they're German-only for now — the English page
  // shows an explanation instead (t.englishNote).
  const chaptersBlock = locale === "de"
    ? `<div class="chips">
    ${CHAPTERS_DE.map(([pdf, label]) => `<button class="chip" onclick="openPage(${pdf})">${label}</button>`).join("\n    ")}
  </div>`
    : `<p class="mut">${t.englishNote}</p>`;

  return `<section id="tab-manual">
  <h2>${t.heading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.intro}</p>
    <div class="dlbtns">
      <a class="btn" href="${manualPdfUrl}" target="_blank" rel="noopener">${t.dlPdf}</a>
      <a class="btn ghost" href="https://fujifilm-dsc.com/en/manual/x-h2s/" target="_blank" rel="noopener">${t.dlWeb}</a>
    </div>
  </div>

  <div class="search">
    <input id="q" type="search" placeholder="${t.searchPlaceholder}" oninput="doSearch()">
  </div>
  <div id="mres"></div>

  <h2>${t.chaptersHeading}</h2>
  ${chaptersBlock}

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
    <p class="mut" style="margin:10px 0 0" id="pdffallbacknote">${t.fallbackNote} <a id="pdfdeep" href="${manualPdfUrl}" target="_blank" rel="noopener">${t.fallbackLink}</a></p>
  </div>
</section>`;
}
