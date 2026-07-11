// Assembles a lightweight search index from the content/data/* arrays for
// everything EXCEPT the manual (the manual's ~450KB of text stays only in
// assets/data/manual.js — duplicating it into the index would double the
// app's largest asset for no benefit; assets/js/search.js searches MANUAL
// directly instead, on demand). Output is a plain `const SEARCH_INDEX=[...]`
// script (like manual.js), not JSON, so it can be loaded via a plain
// <script> tag and keeps working under file://.
//
// Called once per locale by build.js with already-localized data (plain
// strings, not {de,en} pairs) and the locale's PAGES array, so every target
// URL is built from the real file list instead of a hand-typed string.

function stripHtml(html) {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function sosText(entry) {
  if (entry.type === "ol" || entry.type === "ul") return entry.items.map(stripHtml).join(" ");
  return stripHtml(entry.body);
}

function tutorialText(ch) {
  if (ch.type === "ol" || ch.type === "ul") return ch.items.map(stripHtml).join(" ");
  return stripHtml(ch.body);
}

export function buildSearchIndex({ SOS, PRESETS, EX, TUTORIAL, MENU_PATHS, RAW_SETTINGS, pages }) {
  const fileFor = slug => pages.find(p => p.slug === slug).file;
  const docs = [];

  for (const s of SOS) {
    docs.push({
      id: `sos-${s.id}`,
      type: "sos",
      title: s.summary,
      target: `${fileFor("sos")}#${s.id}`,
      text: sosText(s),
    });
  }

  for (const p of PRESETS) {
    const label = p.id === "VID" ? p.videoLabel : p.id;
    docs.push({
      id: `preset-${p.id}`,
      type: "preset",
      title: `${label} · ${p.title}`,
      target: `${fileFor("presets")}?preset=${p.id}`,
      text: `${p.look} ${stripHtml(p.use)} ${stripHtml(p.note)}`,
    });
  }

  EX.forEach((e, i) => {
    docs.push({
      id: `ex-${i}`,
      type: "exercise",
      title: e.t,
      target: `${fileFor("exercises")}#ex-${i}`,
      text: `${e.steps.map(stripHtml).join(" ")} ${stripHtml(e.goal)}`,
    });
  });

  for (const ch of TUTORIAL) {
    docs.push({
      id: `tutorial-${ch.id}`,
      type: "tutorial",
      title: `Tutorial ${ch.num} · ${stripHtml(ch.title)}`,
      target: `${fileFor("start")}#${ch.id}`,
      text: tutorialText(ch),
    });
  }

  for (const [key, desc] of MENU_PATHS) {
    docs.push({
      id: `menupath-${key}`,
      type: "menupath",
      title: key,
      target: fileFor("reference"),
      text: `${key} ${stripHtml(desc)}`,
    });
  }

  for (const [key, desc] of RAW_SETTINGS) {
    docs.push({
      id: `raw-${key}`,
      type: "raw-setting",
      title: key,
      target: `${fileFor("reference")}#raw-conversion`,
      text: `${key} ${stripHtml(desc)}`,
    });
  }

  const json = JSON.stringify(docs, null, 1);
  return `// GENERATED FILE — computed by build/lib/search-index.js from content/data/*.js.
// Do not hand-edit; run \`node build/build.js\` after changing any content data file.
// The manual's full text is intentionally NOT included here — see assets/js/search.js.
const SEARCH_INDEX = ${json};
`;
}
