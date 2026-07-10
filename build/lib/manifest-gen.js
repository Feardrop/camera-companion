import { localize } from "./i18n.js";

// Localizes content/data/manifest.js's MANIFEST for one locale and stamps
// the matching `lang` field on — the one field that isn't itself content.
export function generateManifest(MANIFEST, locale) {
  const manifest = localize(MANIFEST, locale);
  manifest.lang = locale;
  return JSON.stringify(manifest, null, 2) + "\n";
}
