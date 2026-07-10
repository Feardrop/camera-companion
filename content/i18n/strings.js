// Runtime UI-string dictionary — chrome/interaction text that lives in
// client JS (src/js/*.js), not build-time HTML. build/lib/strings-gen.js
// localizes this once per locale and writes it out as a script-tag-loadable
// docs/{,de/}assets/data/strings.js (const STRINGS + a t(key, vars) helper),
// loaded before search.js on every page. Keep build-time-only strings (page
// titles, nav labels, prose) out of here — those live directly in
// content/pages.js / content/pages/*.js as {de,en} pairs instead.
export const STRINGS = {
  searchAriaLabel: { de: "Suche", en: "Search" },
  searchPlaceholder: { de: "Suche in der ganzen App … z. B. RAW, Q, Blende", en: "Search the whole app … e.g. RAW, Q, aperture" },
  close: { de: "Schließen", en: "Close" },
  noResultsFor: { de: "Keine Treffer für „{q}“.", en: "No results for “{q}”." },
  noResultsForSuggest: { de: "Keine Treffer für „{q}“. Meintest du {suggestion}?", en: "No results for “{q}”. Did you mean {suggestion}?" },
  indexLoading: { de: "Suchindex wird geladen …", en: "Search index is loading …" },
  indexLoadFailed: { de: "Suchindex konnte nicht geladen werden.", en: "Search index could not be loaded." },
  typeSos: { de: "SOS", en: "SOS" },
  typePreset: { de: "Presets", en: "Presets" },
  typeTutorial: { de: "Tutorial", en: "Tutorial" },
  typeExercise: { de: "Übungen", en: "Exercises" },
  typeRawSetting: { de: "RAW-Einstellungen", en: "RAW settings" },
  typeMenupath: { de: "Menüwege", en: "Menu paths" },
  typeManual: { de: "Handbuch", en: "Manual" },
  manualPagePrefix: { de: "S.", en: "p." },
  manualFrontMatter: { de: "Vorspann {n}", en: "Front matter {n}" },
  manualHitsCount: { de: "{n} Seiten mit Treffern:", en: "{n} pages with results:" },
  blankPage: { de: "(leere Seite)", en: "(blank page)" },
  prevPage: { de: "Vorherige Seite", en: "Previous page" },
  nextPage: { de: "Nächste Seite", en: "Next page" },
  pdfLoading: { de: "PDF-Seite wird geladen …", en: "Loading PDF page …" },
  saved: { de: "Gespeichert ✓", en: "Saved ✓" },
  saveUnavailable: { de: "Speichern hier nicht möglich — bitte im Browser öffnen", en: "Saving isn't possible here — please open this in a browser" },
  exercisesCompleted: { de: "Übungen abgeschlossen", en: "exercises completed" },
  langSwitchTo: { de: "English", en: "Deutsch" },
};
