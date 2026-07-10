/* X-H2S Reisebegleiter — Service Worker
   Precached App-Shell + Stale-While-Revalidate. Version bei jedem Deploy erhöhen! */
const CACHE = "xh2s-v2";
const SHELL = [
  "./",
  "./index.html",
  "./presets.html",
  "./sos.html",
  "./handbuch.html",
  "./uebungen.html",
  "./mehr.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/ui.js",
  "./assets/js/presets.js",
  "./assets/js/handbuch.js",
  "./assets/js/uebungen.js",
  "./assets/js/mehr.js",
  "./assets/data/manual-de.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
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
