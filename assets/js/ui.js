// ================= Gemeinsame Laufzeit-Helfer =================
// Header/Nav werden seit dem Build-Umbau nicht mehr hier per JS injiziert,
// sondern von build/build.js aus content/pages.js statisch erzeugt (echte
// <a href>-Links, kein go()-Aufruf mehr nötig).

// Von anderen Seiten aus eine Handbuchseite öffnen (auf handbuch.html überschrieben)
if (typeof openPage !== "function") {
  window.openPage = printed => { location.href = "handbuch.html?page=" + printed; };
}

// Fehlertoleranter Speicher (localStorage), von Übungen & Belegung genutzt
// ---- Datenspeicher (fehlertolerant) ----
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem("xh2s_" + k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem("xh2s_" + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
};

// PWA: Service Worker registrieren (Offline-Betrieb & Installierbarkeit)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("sw.js").catch(() => {}));
}
