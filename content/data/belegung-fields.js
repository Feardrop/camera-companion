// "Meine Kamera-Belegung" notes-form fields. [key, label, placeholder, hint?]
// Rendered as static <input>/<textarea> markup at build time;
// assets/js/mehr.js only reads/writes localStorage (key "fields") against
// the already-rendered elements — it no longer builds this list.
export const FIELDS = [
  ["c1", "C1 (Foto)", "Acros Schwarzweiß?"],
  ["c2", "C2 (Foto)", "Classic Neg. warm +1?"],
  ["c3", "C3 (Foto)", "Pro Neg. Hi Porträt?"],
  ["c4", "C4 (Foto)", "Astia Serie Tier/Vogel?"],
  ["c5", "C5 (Foto)", "unbekannt — nachschauen!"],
  ["c6", "C6 (Video)", "4K 100p Eterna Zeitlupe?"],
  ["c7", "C7 (Video)", "4K 50p Eterna?"],
  ["vid", "Video-Standard", "4K 25p Eterna?"],
  ["autoupd", "Auto-Update-Status", "AN (Werksvorgabe dieser Kamera) oder DEAKT.?"],
  ["backup", "XApp-Backup gemacht am", "Datum eintragen"],
  ["fn", "Fn-Tasten (DISP/BACK lang drücken)", "weitere Tasten ergänzen …",
    "Fn1 = Motiverkennung Tiere AN/AUS · Fn2 = Augen-/Gesichtserkennung Menschen AN/AUS · Motiv-Art (Tier/Vogel/…): im Q-Menü wählen"],
  ["dial2", "Einstellräder / Touch-Gesten", ""],
  ["notes", "Sonstige Notizen", ""],
];
