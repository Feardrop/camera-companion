import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Computes the SHELL precache list and a CACHE name (app VERSION + a
// content hash) from the actual files on disk (post-build), so a
// renamed/added/removed page can never desync sw.js's precache list, and
// "forgot to bump the version" is no longer possible — the hash changes
// whenever any shell file's bytes do, on top of the version bump itself
// forcing a reset (see content/data/app-meta.js).
export function generateServiceWorker({ repoRoot, shellPaths, version }) {
  const hash = createHash("sha256");
  for (const p of shellPaths) {
    if (p.endsWith("/")) continue; // e.g. "./" — a directory entry, not a hashable file
    hash.update(readFileSync(join(repoRoot, p.replace(/^\.\//, ""))));
  }
  const cache = `xh2s-v${version}-${hash.digest("hex").slice(0, 8)}`;
  const shellJson = JSON.stringify(shellPaths, null, 2).replace(/^/gm, "  ").trim();

  return `// GENERATED FILE — computed by build/lib/sw-gen.js from build/build.js's shell file
// list. Do not hand-edit; SHELL and CACHE regenerate automatically on every build.
const CACHE = "${cache}";
const SHELL = ${shellJson};

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
`;
}
