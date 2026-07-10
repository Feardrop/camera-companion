# PDF.js (vendored)

`pdf.min.mjs` + `pdf.worker.min.mjs` are Mozilla's PDF.js, version 4.10.38, "legacy" build
(targets a broader range of browsers than the main build). Apache-2.0 licensed, see LICENSE.

Not managed via npm — this project has no npm dependencies by design (see CLAUDE.md). These
two files are copied in as-is static assets, the same way the project vendors other
third-party-derived data (e.g. assets/data/manual-de.js). To update: download a newer
`pdfjs-dist` release and replace both files with its `legacy/build/pdf.min.mjs` and
`legacy/build/pdf.worker.min.mjs`.

Source: https://www.npmjs.com/package/pdfjs-dist
