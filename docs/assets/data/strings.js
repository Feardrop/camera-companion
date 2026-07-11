// GENERATED FILE — computed by build/lib/strings-gen.js from content/i18n/strings.js.
// Do not hand-edit; run `node build/build.js` after changing any string.
const STRINGS = {
 "searchAriaLabel": "Search",
 "searchPlaceholder": "Search the whole app … e.g. RAW, Q, aperture",
 "close": "Close",
 "noResultsFor": "No results for “{q}”.",
 "noResultsForSuggest": "No results for “{q}”. Did you mean {suggestion}?",
 "indexLoading": "Search index is loading …",
 "indexLoadFailed": "Search index could not be loaded.",
 "typeSos": "SOS",
 "typePreset": "Presets",
 "typeTutorial": "Tutorial",
 "typeExercise": "Exercises",
 "typeRawSetting": "RAW settings",
 "typeMenupath": "Menu paths",
 "typeManual": "Manual",
 "manualPagePrefix": "p.",
 "manualFrontMatter": "Front matter {n}",
 "manualHitsCount": "{n} pages with results:",
 "blankPage": "(blank page)",
 "prevPage": "Previous page",
 "nextPage": "Next page",
 "pdfLoading": "Loading PDF page …",
 "saved": "Saved ✓",
 "saveUnavailable": "Saving isn't possible here — please open this in a browser",
 "exercisesCompleted": "exercises completed",
 "langSwitchTo": "Deutsch",
 "manualPdfUrl": "manual.pdf"
};
function t(key, vars) {
  let s = STRINGS[key] || key;
  if (vars) for (const k in vars) s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
  return s;
}
