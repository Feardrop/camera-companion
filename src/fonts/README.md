# Vendored fonts

Static `woff2` files, self-hosted (not fetched from Google Fonts or any other
CDN) so the app stays fully offline-capable and dependency-free, same
rationale as `src/js/vendor/pdfjs/`. Both families are licensed under the
[SIL Open Font License 1.1](https://scripts.sil.org/OFL), which permits
redistribution.

- **Fraunces** (600, 700) — display face, used for headings and preset
  titles. https://github.com/undercasetype/Fraunces
- **IBM Plex Sans** (400, 600, 700) — body face.
  https://github.com/IBM/plex
- **IBM Plex Mono** (400, 500) — data/OSD face, for anything that mirrors
  text physically printed on the camera (button names, menu paths, page
  numbers).

Sourced from Google Fonts' hosted `woff2` build of each family (latin
subset only — this app's content is German/English) on 2026-07-11. To
update, re-fetch the same weights from
`https://fonts.googleapis.com/css2?family=...` and replace these files;
`src/css/style.css`'s `@font-face` rules reference them by this exact
filename scheme (`<family>-<weight>.woff2`).
