// GENERATED FILE — computed by build/lib/strings-gen.js from content/i18n/strings.js.
// Do not hand-edit; run `node build/build.js` after changing any string.
const STRINGS = {
 "searchAriaLabel": "Suche",
 "searchPlaceholder": "Suche in der ganzen App … z. B. RAW, Q, Blende",
 "close": "Schließen",
 "noResultsFor": "Keine Treffer für „{q}“.",
 "noResultsForSuggest": "Keine Treffer für „{q}“. Meintest du {suggestion}?",
 "indexLoading": "Suchindex wird geladen …",
 "indexLoadFailed": "Suchindex konnte nicht geladen werden.",
 "typeSos": "SOS",
 "typePreset": "Presets",
 "typeTutorial": "Tutorial",
 "typeExercise": "Übungen",
 "typeRawSetting": "RAW-Einstellungen",
 "typeMenupath": "Menüwege",
 "typeManual": "Handbuch",
 "manualPagePrefix": "S.",
 "manualFrontMatter": "Vorspann {n}",
 "manualHitsCount": "{n} Seiten mit Treffern:",
 "blankPage": "(leere Seite)",
 "prevPage": "Vorherige Seite",
 "nextPage": "Nächste Seite",
 "pdfLoading": "PDF-Seite wird geladen …",
 "saved": "Gespeichert ✓",
 "saveUnavailable": "Speichern hier nicht möglich — bitte im Browser öffnen",
 "exercisesCompleted": "Übungen abgeschlossen",
 "langSwitchTo": "English",
 "manualPdfUrl": "https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf"
};
function t(key, vars) {
  let s = STRINGS[key] || key;
  if (vars) for (const k in vars) s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
  return s;
}
