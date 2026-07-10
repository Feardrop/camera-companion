// Shared rendering helpers for the two "static <details> accordion" content
// types (SOS entries, tutorial chapters) so both go through one code path.

export function renderBody(entry) {
  if (entry.type === "ol") return `<ol>${entry.items.map(i => `<li>${i}</li>`).join("")}</ol>`;
  if (entry.type === "ul") return `<ul>${entry.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  if (entry.type === "p") return `<p>${entry.body}</p>`;
  if (entry.type === "mixed") return entry.body;
  throw new Error(`Unknown content type: ${entry.type}`);
}

export function renderDetails({ id, summaryHtml, bodyHtml, open = false }) {
  const idAttr = id ? ` id="${id}"` : "";
  const openAttr = open ? " open" : "";
  return `<details${idAttr}${openAttr}><summary>${summaryHtml}</summary><div class="body">${bodyHtml}</div></details>`;
}
