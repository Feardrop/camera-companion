// Presets-Seite: Modusrad, Situationswahl, Preset-Karten
// ---- Presets ----
const PRESETS = [
 {id:"C1", v:false, look:"ACROS · Schwarzweiß", title:"Kräftiges Schwarzweiß",
  use:"Architektur, Straßenszenen, ausdrucksstarke Porträts, dramatisches Licht.",
  note:"Nicht wundern: Sucherbild ist absichtlich schwarzweiß. RAW behält die Farben."},
 {id:"C2", v:false, look:"CLASSIC NEG. · warm · +1 EV", title:"„Cuban“ — warmer Analog-Look",
  use:"Urlaubsstimmung, Straßen, Cafés, goldenes Abendlicht.",
  note:"Belichtet bewusst +1 heller. Wirkt das Bild ZU hell: Korrektur Richtung 0 drehen (und wegen Auto-Update später wieder auf +1 zurück)."},
 {id:"C3", v:false, look:"PRO NEG. HI · neutral", title:"Porträts &amp; Allrounder",
  use:"Menschen, Gruppen — und der sichere Startpunkt, wenn du unsicher bist.",
  note:"Natürliche Hauttöne. Fokusfeld mit dem Joystick aufs Gesicht schieben."},
 {id:"C4", v:false, look:"ASTIA · Serie ~30 B/s · Pre-Shot · Tier/Vogel-AF", title:"Tiere, Vögel &amp; Action",
  use:"Wildtiere, Vögel im Flug, spielende Kinder, Sport.",
  note:"Halb drücken &amp; Motiv verfolgen — die Kamera puffert schon Bilder VOR dem Durchdrücken. Erzeugt viele Fotos: Karte im Blick behalten! Fn1 schaltet die Tiererkennung an/aus; die Motiv-Art (Tier/Vogel) wählst du im Q-Menü. (C5 ggf. ähnlich belegt.)"},
 {id:"C6", v:true, look:"4K 100p · ETERNA", title:"Zeitlupe (4×)",
  use:"Wasser, Tiere in Bewegung, Sport — alles, was in Zeitlupe magisch wird.",
  note:"Nur im MOVIE-Modus. Braucht viel Licht, Speicher und Akku; bei Hitze Pausen machen."},
 {id:"C7", v:true, look:"4K 50p · ETERNA", title:"Video für Bewegung",
  use:"Bewegte Szenen; lässt sich im Schnitt auf halbe Geschwindigkeit bremsen.",
  note:"Nur im MOVIE-Modus."},
 {id:"VID", v:true, look:"4K 25p · ETERNA", title:"Standard-Video",
  use:"Ruhige Szenen, Schwenks, Erzählendes — der normale filmische Look.",
  note:"Ruhige, langsame Kamerabewegungen sehen am besten aus."}
];

const dial = document.getElementById("dial");
PRESETS.forEach(p=>{
  const b=document.createElement("button");
  b.className="stop"+(p.v?" video":"");
  b.innerHTML=(p.id==="VID"?"▶":p.id)+"<small>"+(p.v?"MOVIE":"FOTO")+"</small>";
  b.setAttribute("aria-label",p.title);
  b.onclick=()=>pick(p.id);
  b.id="stop-"+p.id;
  dial.appendChild(b);
});

function pick(id){
  document.querySelectorAll(".stop").forEach(s=>s.classList.remove("sel"));
  const st=document.getElementById("stop-"+id); if(st){st.classList.add("sel"); st.scrollIntoView && st.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});}
  render(id);
}
function render(sel){
  const wrap=document.getElementById("presetCards");
  wrap.innerHTML="";
  const list = sel? PRESETS.filter(p=>p.id===sel) : PRESETS;
  list.forEach(p=>{
    const d=document.createElement("div"); d.className="card";
    d.innerHTML=`<h3><span class="badge${p.v?" v":""}">${p.id==="VID"?"▶ VIDEO":p.id}</span>${p.title}</h3>
      <p class="look">${p.look}</p>
      <p><b>Wofür:</b> ${p.use}</p>
      <p class="hint">${p.note}</p>`;
    wrap.appendChild(d);
  });
  if(sel){
    const back=document.createElement("button"); back.className="btn ghost"; back.textContent="Alle Presets zeigen";
    back.onclick=()=>{document.querySelectorAll(".stop").forEach(s=>s.classList.remove("sel"));render(null);};
    wrap.appendChild(back);
  }
}
render(null);


