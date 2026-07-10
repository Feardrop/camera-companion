// Facts/menu-paths repeated verbatim across multiple pages, consolidated to a
// single source so wording can no longer drift page-to-page (was previously
// hand-copied with slightly different wording in up to 6 files).
export const FACTS = {
  shutter: "<b>Auslöser:</b> halb drücken = scharfstellen · ganz durchdrücken = Foto.",
  lostInMenu: "<b>Verirrt im Menü?</b> <span class=\"osd\">DISP/BACK</span> mehrmals drücken.",
  autoUpdateDisablePath: "MENU → IQ → AUTOM. AKT. BEN.-EINST. → DEAKT.",
  autoUpdateEnablePath: "MENU → IQ → AUTOM. AKT. BEN.-EINST. → AN",
  autoUpdateEnglish: "AUTO UPDATE CUSTOM SETTING → DISABLE/ENABLE",
  geotaggingPath: "MENU → Netzwerk/USB → GEOTAGGING → AN",
  jpegHeifPath: "MENU → IQ → JPEG/HEIF AUSWAHL",
};

// The RAW-Konvertierung deep-dive currently lives on mehr.html; every page that
// links to it does so through this one constant so the Phase-2 page split only
// requires updating this file, not every call site.
export const RAW_KONV_LINK = "mehr.html#raw-konvertierung";
