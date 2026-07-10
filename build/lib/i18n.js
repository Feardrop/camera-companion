// Walks any content/data/*.js or content/pages/*.js value and replaces every
// `{ de: "...", en: "..." }` leaf with the string for `locale`, leaving
// everything else (plain strings, numbers, ids, arrays, other object shapes)
// untouched. This is the one place bilingual content gets resolved, so page
// modules and render() functions never need to know content is bilingual —
// build.js calls localize() once per locale before handing data off.
const LOCALES = ["de", "en"];

function isBilingual(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === LOCALES.length && LOCALES.every(l => keys.includes(l));
}

// Both locale trees use identical file names (see content/pages.js), so the
// sibling page in the other tree is always a plain relative path — one level
// down into de/ from the English root, or one level up from within de/.
// Shared by build/lib/shell.js (for every page's window.__OTHER_LOCALE_URL__)
// and content/pages/about.js (for its manual language-switch link).
export function otherLocaleUrl(file, locale) {
  return locale === "en" ? `de/${file}` : `../${file}`;
}

export function localize(value, locale) {
  if (Array.isArray(value)) return value.map(v => localize(v, locale));
  if (isBilingual(value)) return value[locale];
  if (value && typeof value === "object") {
    const out = {};
    for (const k in value) out[k] = localize(value[k], locale);
    return out;
  }
  return value;
}
