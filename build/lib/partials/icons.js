// A small hand-drawn line-icon set (24x24, 1.75px stroke, round caps/joins)
// replacing every emoji in the app. Rendered once per page as a hidden
// <svg><symbol> sprite (see renderIconSprite(), used by shell.js) so pages
// reference icons via `<svg class="icon"><use href="#i-name"/></svg>` —
// zero extra requests, works under file://, themeable via currentColor.
// Icon coverage is deliberately not 1:1 with every old emoji: a few
// low-stakes decorative uses (quick-filter chips on presets.html) were
// simplified to text-only pills instead of adding more bespoke icons — see
// CLAUDE.md's "Icons" section.
const ICONS = {
  search: `<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.6" y2="16.6"/>`,
  home: `<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h5v-5h2v5h5v-9"/>`,
  aperture: `<circle cx="12" cy="12" r="9.2"/><path d="M12 4v4.6M18.9 8.2l-4 2.3M18.9 15.8l-4-2.3M12 20v-4.6M5.1 15.8l4-2.3M5.1 8.2l4 2.3"/>`,
  book: `<path d="M4 5.2C5.4 4.4 7 4 12 4c5 0 6.6.4 8 1.2v14C18.6 18.4 17 18 12 18c-5 0-6.6.4-8 1.2z"/><path d="M12 4v14"/>`,
  "check-circle": `<circle cx="12" cy="12" r="9.2"/><path d="M8 12.3l2.6 2.6L16.3 9"/>`,
  grid: `<rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/>`,
  cross: `<circle cx="12" cy="12" r="9.2"/><path d="M12 8v8M8 12h8"/>`,
  notebook: `<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M5 8h3M9 3.5v17"/><path d="M12.5 12h4M12.5 15h4"/>`,
  wifi: `<path d="M4 9.5a13 13 0 0 1 16 0"/><path d="M7 13a8.5 8.5 0 0 1 10 0"/><path d="M10 16.5a4 4 0 0 1 4 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none"/>`,
  bookmark: `<path d="M6 3.5h12v17l-6-4-6 4z"/>`,
  info: `<circle cx="12" cy="12" r="9.2"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/>`,
  "alert-triangle": `<path d="M12 3.7 21.5 20.5H2.5z" stroke-linejoin="round"/><path d="M12 9.5v5"/><circle cx="12" cy="17.3" r="1" fill="currentColor" stroke="none"/>`,
  close: `<path d="M6 6l12 12M18 6L6 18"/>`,
  film: `<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 8.5h4M3 15.5h4M17 8.5h4M17 15.5h4"/><line x1="9.5" y1="4" x2="9.5" y2="20"/>`,
  image: `<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="M3 16.5l5.5-5 4 3.5 3-2.5L21 16"/>`,
  globe: `<circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 4 5.8 4 9.2s-1.4 6.6-4 9.2c-2.6-2.6-4-5.8-4-9.2s1.4-6.6 4-9.2z"/>`,
  video: `<rect x="3" y="6" width="13" height="12" rx="1.5"/><path d="M16 10.2 21 7.5v9l-5-2.7z" stroke-linejoin="round"/>`,
  download: `<path d="M12 3.5v11.5"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 17.5v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2"/>`,
  "chevron-right": `<path d="M9 6l6 6-6 6"/>`,
  "chevron-left": `<path d="M15 6l-6 6 6 6"/>`,
  refresh: `<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5"/><path d="M4 20v-4.5h4.5"/>`,
};

export function renderIconSprite() {
  const symbols = Object.entries(ICONS)
    .map(([name, inner]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${inner}</symbol>`)
    .join("");
  return `<svg style="display:none" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${symbols}</svg>`;
}

// Convenience for build-time HTML: `<svg class="icon"><use href="#i-${name}"/></svg>`
export function icon(name, extraClass = "") {
  return `<svg class="icon${extraClass ? " " + extraClass : ""}"><use href="#i-${name}"/></svg>`;
}
