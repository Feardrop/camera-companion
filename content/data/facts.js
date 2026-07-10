// Facts/menu-paths repeated verbatim across multiple pages, consolidated to a
// single source so wording can no longer drift page-to-page (was previously
// hand-copied with slightly different wording in up to 6 files). Every value
// is {de,en}; for menu paths the English variant shows the camera's actual
// English-language menu labels as primary (not a literal translation of the
// German menu wording) — `autoUpdateOtherLang` mirrors this: on the German
// tree it shows the English menu wording as a cross-reference aside, and on
// the English tree it shows the German wording, for travelers who might run
// into a camera set to the other language.
export const FACTS = {
  shutter: {
    de: "<b>Auslöser:</b> halb drücken = scharfstellen · ganz durchdrücken = Foto.",
    en: "<b>Shutter button:</b> half-press to focus · press all the way for the shot.",
  },
  lostInMenu: {
    de: "<b>Verirrt im Menü?</b> <span class=\"osd\">DISP/BACK</span> mehrmals drücken.",
    en: "<b>Lost in the menu?</b> Press <span class=\"osd\">DISP/BACK</span> a few times.",
  },
  autoUpdateDisablePath: {
    de: "MENU → IQ → AUTOM. AKT. BEN.-EINST. → DEAKT.",
    en: "MENU → IQ → AUTO UPDATE CUSTOM SETTING → OFF",
  },
  autoUpdateEnablePath: {
    de: "MENU → IQ → AUTOM. AKT. BEN.-EINST. → AN",
    en: "MENU → IQ → AUTO UPDATE CUSTOM SETTING → ON",
  },
  autoUpdateOtherLang: {
    de: "(englisch: AUTO UPDATE CUSTOM SETTING → DISABLE/ENABLE)",
    en: "(German: AUTOM. AKT. BEN.-EINST. → DEAKT./AN)",
  },
  geotaggingPath: {
    de: "MENU → Netzwerk/USB → GEOTAGGING → AN",
    en: "MENU → Network/USB → GEOTAGGING → ON",
  },
  jpegHeifPath: {
    de: "MENU → IQ → JPEG/HEIF AUSWAHL",
    en: "MENU → IQ → JPEG/HEIF SETTING",
  },
};

// Official manual PDF — vendored locally (src/manual-de.pdf / src/manual-en.pdf,
// see CLAUDE.md) rather than fetched from Fujifilm's site, so this is a
// locale-invariant relative path: build.js copies the locale-matching source
// PDF to this same destination name in each tree (like manual.js's data).
export const MANUAL_PDF_URL = "manual.pdf";

// The RAW-conversion deep-dive lives on reference.html; every page that
// links to it does so through this one constant, so a future page move is a
// one-line change here instead of a find-and-replace across files. The file
// name is locale-invariant (both trees use "reference.html"); only the
// anchor id needed a one-time rename from the old German "raw-konvertierung".
export const RAW_KONV_LINK = "reference.html#raw-conversion";
