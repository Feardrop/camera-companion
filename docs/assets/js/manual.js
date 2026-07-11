// Manual page: full-text search, real PDF view, text fallback.
// Hit search/ranking comes from assets/js/search.js (searchAll) — this
// script renders the manual-specific page view: by default the real PDF
// page (assets/js/pdf-viewer.js, lazy-imported), falling back to the
// built-in text if the PDF can't be loaded (offline, no network on first
// visit, etc.). PDF_URL comes from strings.js (assets/data/manual-*.js
// picks the matching offline text at build time; the PDF URL is resolved
// per locale the same way).
const PDF_URL = t("manualPdfUrl");
let curPdf = null,
  curQuery = "";
let renderToken = 0; // discards stale renders if the user flips pages quickly
const printedLabel = pdf => {
  const pr = pdf - OFFSET;
  return pr >= 1 ? t("manualPagePrefix") + " " + pr : t("manualFrontMatter", { n: pdf });
};

function doSearch() {
  const q = document.getElementById("q").value.trim();
  const out = document.getElementById("mres");
  curQuery = q;
  if (!q) {
    out.innerHTML = "";
    return;
  }
  const hits = searchAll(q, {
    types: ["manual"],
    manual: { list: MANUAL, offset: OFFSET },
    limit: 25,
  });
  if (!hits.length) {
    out.innerHTML = '<p class="mut">' + t("noResultsFor", { q: esc(q) }) + "</p>";
    return;
  }
  out.innerHTML =
    '<p class="mut">' +
    t("manualHitsCount", { n: hits.length }) +
    "</p>" +
    hits
      .map(h => {
        const pdf = parseInt(h.doc.id.split("-")[1], 10);
        return `<div class="res" onclick="openPdfPage(${pdf})">
      <span class="pg">${esc(h.doc.title)}</span>
      <div class="snip">…${highlightHtml(h.snippet, q)}…</div></div>`;
      })
      .join("");
}
function openPage(printed) {
  openPdfPage(printed + OFFSET);
}
// Deep-link: manual.html?page=220&q=searchterm opens the printed page
// directly and highlights/scrolls to the search term (also from global search).
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const p = parseInt(params.get("page"), 10);
  const q = params.get("q");
  if (q) curQuery = q;
  if (!isNaN(p)) openPage(p);
});
function showTextFallback(pdf) {
  document.getElementById("pdfstatus").style.display = "none";
  document.getElementById("pdfpage").style.display = "none";
  document.getElementById("pdffallbacknote").style.display = "block";
  const pg = document.getElementById("pgtext");
  pg.style.display = "block";
  let t2 = esc(MANUAL[pdf - 1] || t("blankPage"));
  if (curQuery.length >= 1) {
    t2 = highlightHtml(MANUAL[pdf - 1] || t("blankPage"), curQuery);
  }
  pg.innerHTML = t2;
}
function openPdfPage(pdf) {
  if (pdf < 1) pdf = 1;
  if (pdf > MANUAL.length) pdf = MANUAL.length;
  curPdf = pdf;
  const myToken = ++renderToken;
  const pv = document.getElementById("pageview");
  pv.style.display = "block";
  document.getElementById("pglabel").textContent = t("typeManual") + " " + printedLabel(pdf);
  const dl = document.getElementById("pdfdeep");
  dl.href = PDF_URL + "#page=" + pdf;

  document.getElementById("pgtext").style.display = "none";
  document.getElementById("pdffallbacknote").style.display = "none";
  document.getElementById("pdfpage").style.display = "none";
  document.getElementById("pdfstatus").style.display = "block";
  document.getElementById("pdfstatus").textContent = t("pdfLoading");

  import("./pdf-viewer.js")
    .then(({ renderPdfPage }) => {
      const container = document.getElementById("pageview");
      renderPdfPage({
        pdfUrl: PDF_URL,
        pdfPageNum: pdf,
        canvasEl: document.getElementById("pdfCanvas"),
        textLayerEl: document.getElementById("pdfTextLayer"),
        containerWidth: container.clientWidth,
        query: curQuery,
        onFallback: () => {
          if (myToken === renderToken) showTextFallback(pdf);
        },
      }).then(ok => {
        if (!ok || myToken !== renderToken) return; // fallback already shown, or the user has since flipped pages
        document.getElementById("pdfstatus").style.display = "none";
        document.getElementById("pdfpage").style.display = "block";
      });
    })
    .catch(() => showTextFallback(pdf));

  setTimeout(() => {
    if (pv.scrollIntoView) pv.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}
function stepPage(d) {
  if (curPdf) openPdfPage(curPdf + d);
}
function closePage() {
  document.getElementById("pageview").style.display = "none";
  curPdf = null;
}
