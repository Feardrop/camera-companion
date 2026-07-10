import { localize } from "./i18n.js";

// Localizes content/i18n/strings.js's STRINGS for one locale and emits it as
// a plain script-tag-loadable file (same pattern as search-index.js /
// manual-de.js — works under file://, no fetch()+JSON). t() does simple
// {placeholder} interpolation for the handful of strings that need it.
export function generateStringsFile(STRINGS, locale, extra = {}) {
  const flat = { ...localize(STRINGS, locale), ...extra };
  const json = JSON.stringify(flat, null, 1);
  return `// GENERATED FILE — computed by build/lib/strings-gen.js from content/i18n/strings.js.
// Do not hand-edit; run \`node build/build.js\` after changing any string.
const STRINGS = ${json};
function t(key, vars) {
  let s = STRINGS[key] || key;
  if (vars) for (const k in vars) s = s.replace(new RegExp("\\\\{" + k + "\\\\}", "g"), vars[k]);
  return s;
}
`;
}
