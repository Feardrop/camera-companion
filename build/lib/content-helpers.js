// Shared rendering helpers for the two "static <details> accordion" content
// types (SOS entries, tutorial chapters) so both go through one code path.

// "ol" entries are genuine step sequences ("do this, then this") and render
// with the app's one numbered-step visual (.steplist, matching the .jstep
// "signature" circles) instead of a plain browser-numbered list. "ul" stays
// a plain bullet list since it's used for non-sequential facts/tips.
export function renderBody(entry) {
  if (entry.type === "ol") return renderSteps(entry.items);
  if (entry.type === "ul") return `<ul>${entry.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  if (entry.type === "p") return `<p>${entry.body}</p>`;
  if (entry.type === "mixed") return entry.body;
  throw new Error(`Unknown content type: ${entry.type}`);
}

// Renders a genuine "do this, then this" sequence as a real <ol> with the
// app's numbered-step visual — used directly by page content that has a
// hand-typed step sequence outside the SOS/tutorial accordion shape above.
export function renderSteps(items) {
  return `<ol class="steplist">${items.map(i => `<li>${i}</li>`).join("")}</ol>`;
}

export function renderDetails({ id, summaryHtml, bodyHtml, open = false }) {
  const idAttr = id ? ` id="${id}"` : "";
  const openAttr = open ? " open" : "";
  return `<details${idAttr}${openAttr}><summary>${summaryHtml}</summary><div class="body">${bodyHtml}</div></details>`;
}
