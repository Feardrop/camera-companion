// ================= Gemeinsame UI: Header, Navigation, Helfer =================
const PAGES = [
  ["index.html",    "start",    "\u2691", "Start"],
  ["presets.html",  "presets",  "\u25CE", "Presets"],
  ["sos.html",      "sos",      "\u271A", "SOS"],
  ["handbuch.html", "handbuch", "\uD83D\uDCD6", "Handbuch"],
  ["uebungen.html", "uebungen", "\u2713", "\u00DCbungen"],
  ["mehr.html",     "mehr",     "\u2630", "Mehr"]
];
(function(){
  const cur = document.body.dataset.page || "start";
  const hdr = document.createElement("header");
  hdr.innerHTML = '<h1>X-H2S <b>REISEBEGLEITER</b></h1><p>Tutorial \u00B7 Presets \u00B7 SOS \u00B7 Handbuch \u00B7 \u00DCbungen</p>';
  document.body.prepend(hdr);
  const nav = document.createElement("nav");
  nav.innerHTML = PAGES.map(p =>
    `<a href="${p[0]}" class="${p[1]===cur?"on":""}" data-t="${p[1]}"><span class="ic">${p[2]}</span>${p[3]}</a>`).join("");
  document.body.appendChild(nav);
})();
function go(name){
  const p = PAGES.find(x => x[1] === name);
  if(p) location.href = p[0];
}
// Von anderen Seiten aus eine Handbuchseite öffnen (auf handbuch.html überschrieben)
if(typeof openPage !== "function"){
  window.openPage = printed => { location.href = "handbuch.html?page=" + printed; };
}
// Fehlertoleranter Speicher (localStorage), von Übungen & Belegung genutzt
// ---- Datenspeicher (fehlertolerant) ----
const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem("xh2s_"+k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem("xh2s_"+k, JSON.stringify(v)); return true; }catch(e){ return false; } }
};



// PWA: Service Worker registrieren (Offline-Betrieb & Installierbarkeit)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
