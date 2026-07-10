const BRAND = { de: "REISEBEGLEITER", en: "COMPANION" };
const SUBTITLE = {
  de: "Tutorial · Presets · SOS · Handbuch · Übungen",
  en: "Tutorial · Presets · SOS · Manual · Exercises",
};
const SEARCH_LABEL = { de: "Suche", en: "Search" };

export function renderHeader(locale) {
  return `<header><button class="search-btn" type="button" aria-label="${SEARCH_LABEL[locale]}" onclick="openSearch()">🔍</button><h1>X-H2S <b>${BRAND[locale]}</b></h1><p>${SUBTITLE[locale]}</p></header>`;
}
