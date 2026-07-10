import { renderHead } from "./partials/head.js";
import { renderHeader } from "./partials/header.js";
import { renderNav } from "./partials/nav.js";

// Wraps a page's inner <main> HTML with the shared <head>/header/nav shell.
// Every generated file gets a header comment pointing back at its real
// source so nobody accidentally hand-edits the generated output.
export function renderShell({ page, pages, bodyHtml, scripts = [] }) {
  const scriptTags = scripts.map(s => `  <script src="${s}"></script>`).join("\n");
  return `<!-- GENERATED FILE — edit content/pages/${page.slug}.js (and/or content/data/*.js), then run \`node build/build.js\`. Do not hand-edit. -->
<!DOCTYPE html>
<html lang="de">
<head>
${renderHead(page)}
</head>
<body data-page="${page.slug}">
${renderHeader()}
<main>
${bodyHtml}
</main>
${renderNav(pages, page.slug)}
${scriptTags}
</body>
</html>
`;
}
