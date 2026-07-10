// Single source of truth for site navigation. Consumed by build/build.js
// to generate <head><title>, the header/nav partials, and sw.js's SHELL list.
export const PAGES = [
  { file: "index.html",    slug: "start",    icon: "⚑",  label: "Start",    title: "Start",             tab: true },
  { file: "presets.html",  slug: "presets",  icon: "◎",  label: "Presets",  title: "Presets",           tab: true },
  { file: "sos.html",      slug: "sos",      icon: "✚",  label: "SOS",      title: "SOS — Erste Hilfe", tab: true },
  { file: "handbuch.html", slug: "handbuch", icon: "📖", label: "Handbuch", title: "Handbuch",          tab: true },
  { file: "uebungen.html", slug: "uebungen", icon: "✓",  label: "Übungen",  title: "Übungen",           tab: true },
  { file: "mehr.html",     slug: "mehr",     icon: "☰",  label: "Mehr",     title: "Mehr",              tab: true },
];
