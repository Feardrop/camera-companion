// English text has not yet been extracted from the official Fujifilm PDF
// (see CLAUDE.md's "Updating the manual text" section for the pdftotext
// workflow — the German version was produced the same way). This is a
// placeholder so the English tree still builds and the offline text-view
// fallback shows a clear explanation instead of breaking. The in-app PDF
// viewer still renders the real English PDF pages (network required, same
// as the German version) regardless of this file's content — see
// src/js/manual.js's PDF_URL.
const MANUAL = [
  "English manual text\n\nThe full offline-searchable English manual text has not been extracted from the official Fujifilm PDF yet.\n\nOpen a manual page with a network connection to view the real English PDF pages — that already works today.\n\nUntil then, full offline text search only covers the German manual.",
];
const OFFSET = 0;
