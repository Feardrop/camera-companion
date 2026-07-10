// PWA manifest content. build/lib/manifest-gen.js localizes this once per
// locale and writes it to docs/{,de/}manifest.webmanifest — no longer a
// static file hand-copied from src/, since name/description/shortcuts need
// to differ per locale tree.
export const MANIFEST = {
  name: { de: "X-H2S Reisebegleiter", en: "X-H2S Companion" },
  short_name: "X-H2S",
  description: {
    de: "Fujifilm X-H2S: Tutorial, Presets, Erste Hilfe, durchsuchbares Handbuch und Übungsplan — offline nutzbar.",
    en: "Fujifilm X-H2S: tutorial, presets, troubleshooting, a searchable manual, and an exercise plan — works offline.",
  },
  start_url: "./index.html",
  scope: "./",
  display: "standalone",
  orientation: "portrait",
  background_color: "#14171a",
  theme_color: "#14171a",
  icons: [
    { src: "assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "assets/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "assets/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  shortcuts: [
    {
      name: { de: "SOS — Erste Hilfe", en: "SOS — Troubleshooting" },
      short_name: "SOS",
      description: {
        de: "Troubleshooting nach Symptom, direkt ohne Umweg durch die App",
        en: "Troubleshooting by symptom, straight in without digging through the app",
      },
      url: "./sos.html",
    },
  ],
};
