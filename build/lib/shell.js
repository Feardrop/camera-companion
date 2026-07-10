import { renderHead } from "./partials/head.js";
import { renderHeader } from "./partials/header.js";
import { renderNav } from "./partials/nav.js";

function renderBreadcrumb(page, pages) {
  if (!page.parent) return "";
  const parent = pages.find(p => p.slug === page.parent);
  return `<a class="back" href="${parent.file}">‹ ${parent.label}</a>`;
}

// Wraps a page's inner <main> HTML with the shared <head>/header/nav shell.
// Every generated file gets a header comment pointing back at its real
// source so nobody accidentally hand-edits the generated output.
export function renderShell({ page, pages, bodyHtml, scripts = [] }) {
  const scriptTags = scripts.map(s => `  <script src="${s}"></script>`).join("\n");
  // A page with `parent` set (e.g. belegung/verbindung/referenz under "mehr")
  // isn't a tab itself — the parent tab stays highlighted while on it.
  const activeTabSlug = page.parent || page.slug;
  return `<!-- GENERATED FILE — edit content/pages/${page.slug}.js (and/or content/data/*.js), then run \`node build/build.js\`. Do not hand-edit. -->
<!DOCTYPE html>
<html lang="de">
<head>
${renderHead(page)}
</head>
<body data-page="${page.slug}">
${renderHeader()}
<main>
${renderBreadcrumb(page, pages)}
${bodyHtml}
</main>
${renderNav(pages, activeTabSlug)}
${scriptTags}
</body>
</html>
`;
}
