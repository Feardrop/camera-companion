// In-app PDF-Ansicht für handbuch.html: rendert die echte Handbuch-Seite
// (Canvas + Text-Layer für Markierung/Auswahl) statt nur des extrahierten
// Texts. PDF.js wird erst beim ersten Aufruf von renderPdfPage() nachgeladen
// (dynamic import), damit der normale Seitenaufbau nicht auf ~1.8&nbsp;MB
// Bibliothekscode wartet. Das Handbuch-PDF selbst bleibt bei Fujifilm
// gehostet (kein lokales Vendoring eines urheberrechtlich fremden Dokuments)
// — wenn es sich nicht laden lässt (offline, kein Netz beim ersten Besuch,
// o. ä.), ruft renderPdfPage() `onFallback` auf, damit die aufrufende Stelle
// auf die vorhandene Text-Ansicht zurückfallen kann.
// Der Bibliotheks-Import braucht einen echten Modul-Spezifizierer (mit
// führendem "./"), der Worker-Pfad dagegen wird von PDF.js selbst als
// gewöhnliche, seitenrelative URL aufgelöst (wie alle anderen Asset-Pfade
// in dieser App) — deshalb zwei unterschiedliche Schreibweisen hier.
const PDFJS_LIB_URL = "./vendor/pdfjs/pdf.min.mjs";
const PDFJS_WORKER_URL = "assets/js/vendor/pdfjs/pdf.worker.min.mjs";

let pdfjsLibPromise = null;
function loadPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import(PDFJS_LIB_URL).then(lib => {
      lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      return lib;
    });
  }
  return pdfjsLibPromise;
}

let pdfDocPromise = null;
function loadPdfDocument(pdfUrl) {
  if (!pdfDocPromise) {
    pdfDocPromise = loadPdfjs().then(lib => lib.getDocument(pdfUrl).promise);
  }
  return pdfDocPromise;
}

function highlightAndScroll(container, query) {
  if (!query || !query.trim()) return;
  const needle = query.trim().toLowerCase();
  const spans = container.querySelectorAll("span");
  let first = null;
  spans.forEach(span => {
    const text = span.textContent;
    const idx = text.toLowerCase().indexOf(needle);
    if (idx === -1) return;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + needle.length);
    const after = text.slice(idx + needle.length);
    span.textContent = "";
    span.append(document.createTextNode(before));
    const mark = document.createElement("mark");
    mark.textContent = match;
    span.append(mark);
    span.append(document.createTextNode(after));
    if (!first) first = mark;
  });
  if (first) {
    first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Rendert PDF-Seite `pdfPageNum` (1-indiziert) in `canvasEl`, mit
// Text-Layer-Overlay in `textLayerEl`. Markiert `query` im Text-Layer und
// scrollt zum ersten Treffer, falls angegeben. Ruft `onFallback()` auf,
// wenn das PDF nicht geladen/gerendert werden kann.
export async function renderPdfPage({ pdfUrl, pdfPageNum, canvasEl, textLayerEl, containerWidth, query, onFallback }) {
  let lib, doc, page;
  try {
    lib = await loadPdfjs();
    doc = await loadPdfDocument(pdfUrl);
    page = await doc.getPage(pdfPageNum);
  } catch (err) {
    onFallback(err);
    return false;
  }

  const unscaled = page.getViewport({ scale: 1 });
  const scale = Math.max(0.5, containerWidth / unscaled.width);
  const viewport = page.getViewport({ scale });
  const outputScale = window.devicePixelRatio || 1;

  canvasEl.width = Math.floor(viewport.width * outputScale);
  canvasEl.height = Math.floor(viewport.height * outputScale);
  canvasEl.style.width = Math.floor(viewport.width) + "px";
  canvasEl.style.height = Math.floor(viewport.height) + "px";
  textLayerEl.style.width = Math.floor(viewport.width) + "px";
  textLayerEl.style.height = Math.floor(viewport.height) + "px";
  // Required by PDF.js's text-layer spans, which size themselves via
  // calc(var(--scale-factor)*Npx) — without this every span falls back to
  // the browser's default font-size, so highlight rectangles land at the
  // wrong size/position relative to the actual canvas-rendered glyphs.
  textLayerEl.style.setProperty("--scale-factor", viewport.scale);
  textLayerEl.innerHTML = "";

  const ctx = canvasEl.getContext("2d");
  const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

  try {
    await page.render({ canvasContext: ctx, viewport, transform }).promise;
    const textContent = await page.getTextContent();
    const textLayer = new lib.TextLayer({ textContentSource: textContent, container: textLayerEl, viewport });
    await textLayer.render();
    highlightAndScroll(textLayerEl, query);
    return true;
  } catch (err) {
    onFallback(err);
    return false;
  }
}
