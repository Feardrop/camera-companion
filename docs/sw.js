// GENERATED FILE — computed by build/lib/sw-gen.js from build/build.js's shell file
// list. Do not hand-edit; SHELL and CACHE regenerate automatically on every build.
const CACHE = "xh2s-v1.0.0-41d0a8a6";
const SHELL = [
    "./",
    "./index.html",
    "./presets.html",
    "./manual.html",
    "./exercises.html",
    "./more.html",
    "./sos.html",
    "./my-setup.html",
    "./connection.html",
    "./reference.html",
    "./about.html",
    "./manifest.webmanifest",
    "./assets/css/style.css",
    "./assets/js/ui.js",
    "./assets/js/start.js",
    "./assets/js/presets.js",
    "./assets/js/manual.js",
    "./assets/js/exercises.js",
    "./assets/js/my-setup.js",
    "./assets/js/search.js",
    "./assets/data/manual.js",
    "./assets/data/strings.js",
    "./assets/data/search-index.js",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./assets/icons/icon-maskable-512.png",
    "./assets/icons/apple-touch-icon.png",
    "./assets/fonts/fraunces-600.woff2",
    "./assets/fonts/fraunces-700.woff2",
    "./assets/fonts/plex-sans-400.woff2",
    "./assets/fonts/plex-sans-600.woff2",
    "./assets/fonts/plex-sans-700.woff2",
    "./assets/fonts/plex-mono-400.woff2",
    "./assets/fonts/plex-mono-500.woff2",
    "./X-H2S_Einfuehrung_und_Lernpfad.pdf"
  ];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // Fujifilm-Links etc. normal laden
  e.respondWith(
    caches.match(e.request, { ignoreSearch: e.request.mode === "navigate" }).then(cached => {
      const fresh = fetch(e.request).then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined));
      return cached || fresh;
    })
  );
});
