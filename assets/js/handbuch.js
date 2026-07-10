// Handbuch-Seite: Volltextsuche, echte PDF-Ansicht, Text-Fallback.
// Die Treffer-Suche/-Bewertung kommt aus assets/js/search.js (searchAll) —
// dieses Skript rendert die handbuchspezifische Seiten-Ansicht: standardmäßig
// die echte PDF-Seite (assets/js/pdf-viewer.js, per Lazy-Import nachgeladen),
// mit Fallback auf den eingebauten Text, falls das PDF nicht geladen werden
// kann (offline, kein Netz beim ersten Besuch, o. ä.).
const PDF_URL = "https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf";
let curPdf = null, curQuery = "";
let renderToken = 0; // verwirft veraltete Renders, wenn schnell weitergeblättert wird
const printedLabel = pdf => { const pr = pdf - OFFSET; return pr >= 1 ? "S. " + pr : "Vorspann " + pdf; };

function doSearch(){
  const q = document.getElementById("q").value.trim();
  const out = document.getElementById("mres");
  curQuery = q;
  if(!q){ out.innerHTML = ""; return; }
  const hits = searchAll(q, { types: ["manual"], manual: { list: MANUAL, offset: OFFSET }, limit: 25 });
  if(!hits.length){ out.innerHTML = '<p class="mut">Keine Treffer für „'+esc(q)+'“.</p>'; return; }
  out.innerHTML = '<p class="mut">'+hits.length+' Seiten mit Treffern:</p>' + hits.map(h=>{
    const pdf = parseInt(h.doc.id.split("-")[1], 10);
    return `<div class="res" onclick="openPdfPage(${pdf})">
      <span class="pg">${esc(h.doc.title)}</span>
      <div class="snip">…${highlightHtml(h.snippet, q)}…</div></div>`;
  }).join("");
}
function openPage(printed){ openPdfPage(printed + OFFSET); }
// Deep-Link: handbuch.html?page=220&q=Suchwort öffnet direkt die gedruckte
// Seite und markiert/scrollt zum Suchwort (auch aus der globalen Suche).
window.addEventListener("DOMContentLoaded", ()=>{
  const params = new URLSearchParams(location.search);
  const p = parseInt(params.get("page"), 10);
  const q = params.get("q");
  if(q) curQuery = q;
  if(!isNaN(p)) openPage(p);
});
function showTextFallback(pdf){
  document.getElementById("pdfstatus").style.display = "none";
  document.getElementById("pdfpage").style.display = "none";
  document.getElementById("pdffallbacknote").style.display = "block";
  const pg = document.getElementById("pgtext");
  pg.style.display = "block";
  let t = esc(MANUAL[pdf-1] || "(leere Seite)");
  if(curQuery.length >= 1){
    t = highlightHtml(MANUAL[pdf-1] || "(leere Seite)", curQuery);
  }
  pg.innerHTML = t;
}
function openPdfPage(pdf){
  if(pdf < 1) pdf = 1; if(pdf > MANUAL.length) pdf = MANUAL.length;
  curPdf = pdf;
  const myToken = ++renderToken;
  const pv = document.getElementById("pageview");
  pv.style.display = "block";
  document.getElementById("pglabel").textContent = "Handbuch " + printedLabel(pdf);
  const dl = document.getElementById("pdfdeep");
  dl.href = PDF_URL + "#page=" + pdf;

  document.getElementById("pgtext").style.display = "none";
  document.getElementById("pdffallbacknote").style.display = "none";
  document.getElementById("pdfpage").style.display = "none";
  document.getElementById("pdfstatus").style.display = "block";
  document.getElementById("pdfstatus").textContent = "PDF-Seite wird geladen …";

  import("./pdf-viewer.js").then(({ renderPdfPage }) => {
    const container = document.getElementById("pageview");
    renderPdfPage({
      pdfUrl: PDF_URL,
      pdfPageNum: pdf,
      canvasEl: document.getElementById("pdfCanvas"),
      textLayerEl: document.getElementById("pdfTextLayer"),
      containerWidth: container.clientWidth,
      query: curQuery,
      onFallback: () => { if (myToken === renderToken) showTextFallback(pdf); },
    }).then(ok => {
      if (!ok || myToken !== renderToken) return; // Fallback bereits gezeigt, oder Nutzer hat inzwischen weitergeblättert
      document.getElementById("pdfstatus").style.display = "none";
      document.getElementById("pdfpage").style.display = "block";
    });
  }).catch(() => showTextFallback(pdf));

  setTimeout(()=>{ if(pv.scrollIntoView) pv.scrollIntoView({behavior:"smooth", block:"start"}); }, 60);
}
function stepPage(d){ if(curPdf) openPdfPage(curPdf + d); }
function closePage(){ document.getElementById("pageview").style.display="none"; curPdf=null; }
