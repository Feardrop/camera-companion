// Mehr-Seite: Belegungs-Formular (localStorage)
// ---- Belegung ----
const FIELDS=[
 ["c1","C1 (Foto)","Acros Schwarzweiß?"],["c2","C2 (Foto)","Classic Neg. warm +1?"],
 ["c3","C3 (Foto)","Pro Neg. Hi Porträt?"],["c4","C4 (Foto)","Astia Serie Tier/Vogel?"],
 ["c5","C5 (Foto)","unbekannt — nachschauen!"],["c6","C6 (Video)","4K 100p Eterna Zeitlupe?"],
 ["c7","C7 (Video)","4K 50p Eterna?"],["vid","Video-Standard","4K 25p Eterna?"],
 ["autoupd","Auto-Update-Status","AN (Werksvorgabe dieser Kamera) oder DEAKT.?"],
 ["backup","XApp-Backup gemacht am","Datum eintragen"],
 ["fn","Fn-Tasten (DISP/BACK lang drücken)","weitere Tasten ergänzen …","Fn1 = Motiverkennung Tiere AN/AUS · Fn2 = Augen-/Gesichtserkennung Menschen AN/AUS · Motiv-Art (Tier/Vogel/…): im Q-Menü wählen"],
 ["dial2","Einstellräder / Touch-Gesten",""],["notes","Sonstige Notizen",""]
];
const fwrap=document.getElementById("fields");
const saved = store.get("fields")||{};
FIELDS.forEach(f=>{
  const d=document.createElement("div"); d.className="fld";
  const multi = ["fn","dial2","notes"].includes(f[0]);
  d.innerHTML=`<label for="f-${f[0]}">${f[1]}</label>`+
    (multi?`<textarea id="f-${f[0]}" rows="2" placeholder="${f[2]}"></textarea>`
          :`<input id="f-${f[0]}" placeholder="${f[2]}">`);
  fwrap.appendChild(d);
  const el=d.querySelector("input,textarea");
  if(saved[f[0]]) el.value=saved[f[0]]; else if(f[3]) el.value=f[3];
});
function saveFields(){
  const data={};
  FIELDS.forEach(f=>{ data[f[0]]=document.getElementById("f-"+f[0]).value; });
  const ok=store.set("fields",data);
  const m=document.getElementById("savedMsg");
  m.textContent = ok ? "Gespeichert ✓" : "Speichern hier nicht möglich — bitte im Browser öffnen";
  setTimeout(()=>m.textContent="",4000);
}


