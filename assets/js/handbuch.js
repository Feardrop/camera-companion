// Handbuch-Seite: Volltextsuche, Textansicht, PDF-Deep-Links.
// Die Treffer-Suche/-Bewertung kommt aus assets/js/search.js (searchAll) —
// dieses Skript rendert nur noch die handbuchspezifische Text-Ansicht.
const PDF_URL = "https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf";
let curPdf = null, curQuery = "";
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
// Deep-Link: handbuch.html?page=220 öffnet direkt die gedruckte Seite
window.addEventListener("DOMContentLoaded", ()=>{
  const p = parseInt(new URLSearchParams(location.search).get("page"), 10);
  if(!isNaN(p)) openPage(p);
});
function openPdfPage(pdf){
  if(pdf < 1) pdf = 1; if(pdf > MANUAL.length) pdf = MANUAL.length;
  curPdf = pdf;
  const pv = document.getElementById("pageview");
  pv.style.display = "block";
  document.getElementById("pglabel").textContent = "Handbuch " + printedLabel(pdf);
  let t = esc(MANUAL[pdf-1] || "(leere Seite)");
  if(curQuery.length >= 1){
    t = highlightHtml(MANUAL[pdf-1] || "(leere Seite)", curQuery);
  }
  document.getElementById("pgtext").innerHTML = t;
  const dl = document.getElementById("pdfdeep");
  dl.href = PDF_URL + "#page=" + pdf;
  setTimeout(()=>{ if(pv.scrollIntoView) pv.scrollIntoView({behavior:"smooth", block:"start"}); }, 60);
}
function stepPage(d){ if(curPdf) openPdfPage(curPdf + d); }
function closePage(){ document.getElementById("pageview").style.display="none"; curPdf=null; }
