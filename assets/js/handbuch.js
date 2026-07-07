// Handbuch-Seite: Volltextsuche, Textansicht, PDF-Deep-Links
// ---- Handbuch: Volltextsuche & Textansicht ----
const PDF_URL = "https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf";
let curPdf = null, curQuery = "";
const esc = s => s.replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
const printedLabel = pdf => { const pr = pdf - OFFSET; return pr >= 1 ? "S. " + pr : "Vorspann " + pdf; };

function doSearch(){
  const q = document.getElementById("q").value.trim();
  const out = document.getElementById("mres");
  curQuery = q;
  if(q.length < 3){ out.innerHTML = q.length? '<p class="mut">Mindestens 3 Zeichen …</p>':""; return; }
  const needle = q.toLowerCase();
  const hits = [];
  for(let i=0;i<MANUAL.length;i++){
    const t = MANUAL[i]; const tl = t.toLowerCase();
    let idx = tl.indexOf(needle);
    if(idx === -1) continue;
    let count = 0, j = idx;
    while(j !== -1 && count < 50){ count++; j = tl.indexOf(needle, j+needle.length); }
    hits.push({pdf:i+1, idx, count, t});
  }
  hits.sort((a,b)=>b.count-a.count);
  if(!hits.length){ out.innerHTML = '<p class="mut">Keine Treffer für „'+esc(q)+'“.</p>'; return; }
  out.innerHTML = '<p class="mut">'+hits.length+' Seiten mit Treffern:</p>' + hits.slice(0,25).map(h=>{
    const start = Math.max(0, h.idx-55);
    let snip = esc(h.t.substring(start, h.idx+needle.length+70)).replace(/\n/g," ");
    snip = snip.replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"), m=>"<mark>"+m+"</mark>");
    return `<div class="res" onclick="openPdfPage(${h.pdf})">
      <span class="pg">${printedLabel(h.pdf)} · ${h.count}×</span>
      <div class="snip">…${snip}…</div></div>`;
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
  if(curQuery.length >= 3){
    t = t.replace(new RegExp(esc(curQuery).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"), m=>"<mark>"+m+"</mark>");
  }
  document.getElementById("pgtext").innerHTML = t;
  const dl = document.getElementById("pdfdeep");
  dl.href = PDF_URL + "#page=" + pdf;
  setTimeout(()=>{ if(pv.scrollIntoView) pv.scrollIntoView({behavior:"smooth", block:"start"}); }, 60);
}
function stepPage(d){ if(curPdf) openPdfPage(curPdf + d); }
function closePage(){ document.getElementById("pageview").style.display="none"; curPdf=null; }


