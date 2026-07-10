// Generates the bottom tab bar as real <a href> elements — no client-side
// go(slug) lookup, no possibility of a dead link, since this is the only
// place a page's file/slug pairing is ever written out.
export function renderNav(pages, activeSlug) {
  const links = pages
    .filter(p => p.tab)
    .map(p => {
      const on = p.slug === activeSlug;
      return `<a href="${p.file}" class="${on ? "on" : ""}"${on ? ' aria-current="page"' : ""} data-t="${p.slug}"><span class="ic">${p.icon}</span>${p.label}</a>`;
    })
    .join("");
  return `<nav>${links}</nav>`;
}
