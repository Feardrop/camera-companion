// Übungen-Seite: abhakbarer Trainingsplan (localStorage)
// ---- Übungen ----
const EX=[
 {t:"1 · Preset-Rundgang", ph:"VOR DER REISE · 15 MIN", steps:[
   "Schalter auf STILL. Rad langsam durch C1–C7 drehen und bei jedem Halt aufs Display schauen: Was ändert sich?",
   "Bei jedem Preset einmal Q drücken und die Kacheln überfliegen.",
   "Dasselbe mit Schalter auf MOVIE.",
   "Gefundene Belegung im Tab „Mehr“ (Meine Belegung) eintragen — danach per XApp ein Einstellungs-Backup machen."],
  goal:"Ziel: Du weißt ohne Nachdenken, welches Rad-Segment was tut — und hast ein Sicherheitsnetz."},
 {t:"2 · Filmsimulations-Vergleich", ph:"VOR DER REISE · 10 MIN", steps:[
   "Eine Szene mit Farben suchen (Balkon, Straße, Obstschale).",
   "Dieselbe Szene mit C1, C2 und C3 fotografieren — Kamera dabei möglichst gleich halten.",
   "In der Wiedergabe durchblättern und vergleichen: Welcher Look gefällt dir wofür?"],
  goal:"Ziel: Du entwickelst ein Gefühl für die Looks — die Basis jeder Preset-Wahl."},
 {t:"3 · Fokus-Training", ph:"VOR DER REISE · 15 MIN", steps:[
   "C3: Eine Person/Figur seitlich im Bild platzieren, Fokusfeld mit dem Joystick daraufschieben, auslösen.",
   "Joystick drücken → Feld springt zur Mitte zurück.",
   "C4: Auf einen Vogel im Garten/Park oder ein Haustier halten — den Erkennungsrahmen beobachten.",
   "Halb gedrückt verfolgen, im spannenden Moment durchdrücken (Pre-Shot!)."],
  goal:"Ziel: Fokusfeld verschieben wird zur Selbstverständlichkeit."},
 {t:"4 · Belichtungskorrektur-Reihe", ph:"REISE · 10 MIN", steps:[
   "Eine helle Szene wählen (Himmel, Strand, helle Fassade).",
   "Fünf Fotos machen: Korrektur −2, −1, 0, +1, +2 (hinteres Einstellrad).",
   "Vergleichen: Wo gehen Details in den hellen Stellen verloren, wo in den Schatten?",
   "Danach Korrektur auf den Sollwert des Presets zurückstellen (Auto-Update!)."],
  goal:"Ziel: ± wird dein Reflex, wenn ein Bild nicht passt."},
 {t:"5 · Zeitlupen-Clip", ph:"REISE · 10 MIN", steps:[
   "Schalter auf MOVIE, Rad auf C6.",
   "Etwas Bewegtes suchen: Brunnen, Wellen, Vögel, wehende Fahne.",
   "3 kurze Clips à 10 Sekunden drehen — ruhig halten oder aufstützen."],
  goal:"Ziel: Du weißt, wie mühelos die Kamera „Kino“ kann."},
 {t:"6 · Goldene Stunde + Histogramm", ph:"REISE · 20 MIN", steps:[
   "Eine Stunde vor Sonnenuntergang mit C2 losziehen.",
   "DISP/BACK drücken, bis das Histogramm eingeblendet ist.",
   "Beim Fotografieren darauf achten: Der „Berg“ darf rechts anlehnen, aber nicht anstoßen.",
   "Bonus: dieselbe Szene einmal in Modus A mit Blende f/2.8 und einmal f/8 — Hintergrund vergleichen."],
  goal:"Ziel: Erste bewusste Belichtungs- und Blendenentscheidungen — Enthusiasten-Level in Sicht."},
 {t:"7 · RAW-Konvertierung üben", ph:"DANACH · 10 MIN", steps:[
   "Ein RAW-Bild (RAW+HEIF muss beim Fotografieren aktiv gewesen sein) in der Wiedergabe auswählen.",
   "MENU/OK → RAW-KONVERTIERUNG öffnen.",
   "Zuerst DATEITYP auf HEIF stellen — immer als erster Schritt!",
   "Eine weitere Einstellung ausprobieren, z. B. FILMSIMULATION wechseln oder PUSH/PULL-VERARB. für die Belichtung.",
   "Mit Q die Vorschau ansehen, mit MENU/OK speichern.",
   "Original und neue Kopie in der Wiedergabe vergleichen — das RAW bleibt unverändert erhalten."],
  goal:"Ziel: Du traust dich, ein RAW-Bild direkt in der Kamera zu „entwickeln“ — inklusive dem wichtigen ersten Schritt DATEITYP → HEIF. Alle Einstellungen erklärt: <a href=\"mehr.html#raw-konvertierung\">Seite „Mehr“</a>."}
];
const exList=document.getElementById("exList");
let done = store.get("ex") || {};
function drawEx(){
  exList.innerHTML="";
  EX.forEach((e,i)=>{
    const d=document.createElement("div"); d.className="ex"+(done[i]?" done":"");
    d.innerHTML=`<label class="head"><input type="checkbox" ${done[i]?"checked":""} onchange="toggleEx(${i},this.checked)">
      <span><span class="phase">${e.ph}</span><br><span class="t">${e.t}</span></span></label>
      <ol class="steps">${e.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
      <div class="goal">${e.goal}</div>`;
    exList.appendChild(d);
  });
  const n=Object.values(done).filter(Boolean).length;
  document.getElementById("prog").innerHTML=`<b>${n} / ${EX.length}</b> Übungen abgeschlossen`;
}
function toggleEx(i,v){ done[i]=v; store.set("ex",done); drawEx(); }
drawEx();


