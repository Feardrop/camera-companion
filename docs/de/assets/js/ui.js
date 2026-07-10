// ================= Shared runtime helpers =================
// Header/nav are no longer injected here via JS — build/build.js renders
// them statically from content/pages.js (real <a href> links, no go() call
// needed).

// Open a manual page from another page (overridden on manual.html itself).
if (typeof openPage !== "function") {
  window.openPage = printed => { location.href = "manual.html?page=" + printed; };
}

// Fault-tolerant storage (localStorage), used by Exercises & My Setup.
// ---- Data store (fault-tolerant) ----
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem("xh2s_" + k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem("xh2s_" + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
};

// Language: English is the default (docs/ root); docs/de/ is a full parallel
// German tree with identical file names (see content/pages.js). On an
// English page, if the visitor has never chosen a language and their
// browser prefers German, redirect once into the German tree and remember
// the choice — the About page's manual switcher calls setLocalePreference()
// the same way so a deliberate choice always wins from then on.
window.setLocalePreference = lang => store.set("lang", lang);
if (window.__LOCALE__ === "en" && store.get("lang") === null &&
    typeof navigator !== "undefined" && /^de/i.test(navigator.language || "")) {
  store.set("lang", "de");
  location.replace(window.__OTHER_LOCALE_URL__ + location.search + location.hash);
}

// PWA: register the service worker (offline use & installability)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("sw.js").catch(() => {}));
}

// Fragment deep-link to a <details> (e.g. from a search result or a
// cross-link): open it automatically instead of just scrolling to a closed
// summary.
if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target && target.tagName === "DETAILS") target.open = true;
}
