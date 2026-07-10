// Single source of truth for site navigation. Consumed by build/build.js
// to generate <head><title>, the header/nav partials, and sw.js's SHELL list.
//
// `label`/`title` are bilingual ({de,en}) — build.js resolves them per
// locale via build/lib/i18n.js's localize() before rendering. `file`/`slug`
// are locale-invariant: both the English (docs/) and German (docs/de/)
// trees use the same English file names, so a link never needs to know
// which tree it's in.
//
// `tab: true` pages appear in the bottom tab bar. A page with `parent` set
// is not itself a tab, but belongs to one — the parent tab stays visually
// active while on it, and the page gets a "‹ back to parent" breadcrumb
// (see build/lib/shell.js). SOS was demoted from the tab bar (still reachable
// via the Start-page quicknav button and a manifest.webmanifest shortcut) to
// give the remaining 5 tabs more room; "More" became a short hub linking out
// to four focused sub-pages instead of one long catch-all.
export const PAGES = [
  { file: "index.html",       slug: "start",      icon: "⚑",  label: { de: "Start",      en: "Start" },      title: { de: "Start",               en: "Start" },                 tab: true },
  { file: "presets.html",     slug: "presets",    icon: "◎",  label: { de: "Presets",    en: "Presets" },    title: { de: "Presets",             en: "Presets" },               tab: true },
  { file: "manual.html",      slug: "manual",     icon: "📖", label: { de: "Handbuch",   en: "Manual" },     title: { de: "Handbuch",            en: "Manual" },                tab: true },
  { file: "exercises.html",   slug: "exercises",  icon: "✓",  label: { de: "Übungen",    en: "Exercises" },  title: { de: "Übungen",             en: "Exercises" },             tab: true },
  { file: "more.html",        slug: "more",       icon: "☰",  label: { de: "Mehr",       en: "More" },       title: { de: "Mehr",                en: "More" },                  tab: true },
  { file: "sos.html",         slug: "sos",        icon: "✚",  label: { de: "SOS",        en: "SOS" },        title: { de: "SOS — Erste Hilfe",   en: "SOS — Troubleshooting" }, tab: false },
  { file: "my-setup.html",    slug: "my-setup",   icon: "📝", label: { de: "Belegung",   en: "My Setup" },   title: { de: "Meine Belegung",      en: "My Setup" },              tab: false, parent: "more" },
  { file: "connection.html",  slug: "connection", icon: "📶", label: { de: "Verbindung", en: "Connection" }, title: { de: "Verbindung & Backup", en: "Connection & Backup" },   tab: false, parent: "more" },
  { file: "reference.html",   slug: "reference",  icon: "📚", label: { de: "Referenz",   en: "Reference" },  title: { de: "Referenz",            en: "Reference" },             tab: false, parent: "more" },
  { file: "about.html",       slug: "about",      icon: "ℹ️", label: { de: "Über",       en: "About" },      title: { de: "Über",                en: "About" },                 tab: false, parent: "more" },
];
