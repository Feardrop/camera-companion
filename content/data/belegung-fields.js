// "My Setup" notes-form fields. [key, label, placeholder, hint?]
// Rendered as static <input>/<textarea> markup at build time;
// assets/js/my-setup.js only reads/writes localStorage (key "fields") against
// the already-rendered elements — it no longer builds this list. `key` is
// the localStorage field key and must never be translated/renamed — existing
// users' saved data is keyed by these exact strings. label/placeholder/hint
// are {de,en}.
export const FIELDS = [
  ["c1", { de: "C1 (Foto)", en: "C1 (photo)" }, { de: "Acros Schwarzweiß?", en: "Acros black & white?" }],
  ["c2", { de: "C2 (Foto)", en: "C2 (photo)" }, { de: "Classic Neg. warm +1?", en: "Classic Neg. warm +1?" }],
  ["c3", { de: "C3 (Foto)", en: "C3 (photo)" }, { de: "Pro Neg. Hi Porträt?", en: "Pro Neg. Hi portrait?" }],
  ["c4", { de: "C4 (Foto)", en: "C4 (photo)" }, { de: "Astia Serie Tier/Vogel?", en: "Astia burst animal/bird?" }],
  ["c5", { de: "C5 (Foto)", en: "C5 (photo)" }, { de: "unbekannt — nachschauen!", en: "unknown — go check!" }],
  ["c6", { de: "C6 (Video)", en: "C6 (video)" }, { de: "4K 100p Eterna Zeitlupe?", en: "4K 100p Eterna slow motion?" }],
  ["c7", { de: "C7 (Video)", en: "C7 (video)" }, { de: "4K 50p Eterna?", en: "4K 50p Eterna?" }],
  ["vid", { de: "Video-Standard", en: "Video default" }, { de: "4K 25p Eterna?", en: "4K 25p Eterna?" }],
  ["autoupd", { de: "Auto-Update-Status", en: "Auto Update status" }, { de: "AN (Werksvorgabe dieser Kamera) oder DEAKT.?", en: "ON (this camera's factory default) or OFF?" }],
  ["backup", { de: "XApp-Backup gemacht am", en: "XApp backup made on" }, { de: "Datum eintragen", en: "Enter a date" }],
  ["fn", { de: "Fn-Tasten (DISP/BACK lang drücken)", en: "Fn buttons (long-press DISP/BACK)" }, { de: "weitere Tasten ergänzen …", en: "add more buttons here …" },
    { de: "Fn1 = Motiverkennung Tiere AN/AUS · Fn2 = Augen-/Gesichtserkennung Menschen AN/AUS · Motiv-Art (Tier/Vogel/…): im Q-Menü wählen",
      en: "Fn1 = animal detection on/off · Fn2 = eye/face detection (people) on/off · subject type (animal/bird/…): chosen in the Q menu" }],
  ["dial2", { de: "Einstellräder / Touch-Gesten", en: "Command dials / touch gestures" }, { de: "", en: "" }],
  ["notes", { de: "Sonstige Notizen", en: "Other notes" }, { de: "", en: "" }],
];
