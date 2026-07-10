// Single source of truth for site navigation. Consumed by build/build.js
// to generate <head><title>, the header/nav partials, and sw.js's SHELL list.
//
// `tab: true` pages appear in the bottom tab bar. A page with `parent` set
// is not itself a tab, but belongs to one — the parent tab stays visually
// active while on it, and the page gets a "‹ back to parent" breadcrumb
// (see build/lib/shell.js). SOS was demoted from the tab bar (still reachable
// via the Start-page quicknav button and a manifest.webmanifest shortcut) to
// give the remaining 5 tabs more room; "Mehr" became a short hub linking out
// to three focused sub-pages instead of one long catch-all.
export const PAGES = [
  { file: "index.html",       slug: "start",      icon: "⚑",  label: "Start",      title: "Start",               tab: true },
  { file: "presets.html",     slug: "presets",    icon: "◎",  label: "Presets",    title: "Presets",             tab: true },
  { file: "handbuch.html",    slug: "handbuch",   icon: "📖", label: "Handbuch",   title: "Handbuch",            tab: true },
  { file: "uebungen.html",    slug: "uebungen",   icon: "✓",  label: "Übungen",    title: "Übungen",             tab: true },
  { file: "mehr.html",        slug: "mehr",       icon: "☰",  label: "Mehr",       title: "Mehr",                tab: true },
  { file: "sos.html",         slug: "sos",        icon: "✚",  label: "SOS",        title: "SOS — Erste Hilfe",   tab: false },
  { file: "belegung.html",    slug: "belegung",   icon: "📝", label: "Belegung",   title: "Meine Belegung",      tab: false, parent: "mehr" },
  { file: "verbindung.html",  slug: "verbindung", icon: "📶", label: "Verbindung", title: "Verbindung & Backup", tab: false, parent: "mehr" },
  { file: "referenz.html",    slug: "referenz",   icon: "📚", label: "Referenz",   title: "Referenz",            tab: false, parent: "mehr" },
];
