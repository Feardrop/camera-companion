import { renderHead } from "./partials/head.js";
import { renderHeader } from "./partials/header.js";
import { renderNav } from "./partials/nav.js";
import { otherLocaleUrl as siblingUrl } from "./i18n.js";

function renderBreadcrumb(page, pages) {
  if (!page.parent) return "";
  const parent = pages.find(p => p.slug === page.parent);
  return `<a class="back" href="${parent.file}">‹ ${parent.label}</a>`;
}

// Wraps a page's inner <main> HTML with the shared <head>/header/nav shell.
// Every generated file gets a header comment pointing back at its real
// source so nobody accidentally hand-edits the generated output.
//
// Both locale trees use identical file names (see content/pages.js), so the
// sibling page in the other tree is always a plain relative path: one level
// down into de/ from the English root, or one level up from within de/.
// Embedding it as window.__OTHER_LOCALE_URL__ lets the runtime language
// switcher/redirect (src/js/ui.js) work with zero path-guessing.
export function renderShell({ page, pages, bodyHtml, scripts = [], locale }) {
  const scriptTags = scripts.map(s => `  <script src="${s}"></script>`).join("\n");
  // A page with `parent` set (e.g. my-setup/connection/reference under "more")
  // isn't a tab itself — the parent tab stays highlighted while on it.
  const activeTabSlug = page.parent || page.slug;
  const otherLocaleUrl = siblingUrl(page.file, locale);
  return `<!-- GENERATED FILE — edit content/pages/${page.slug}.js (and/or content/data/*.js), then run \`node build/build.js\`. Do not hand-edit. -->
<!DOCTYPE html>
<html lang="${locale}">
<head>
${renderHead(page, locale)}
</head>
<body data-page="${page.slug}">
<script>window.__LOCALE__=${JSON.stringify(locale)};window.__OTHER_LOCALE_URL__=${JSON.stringify(otherLocaleUrl)};</script>
${renderHeader(locale)}
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
