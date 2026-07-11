import { PRESETS } from "../data/presets.js";
import { localize } from "../../build/lib/i18n.js";
import { icon } from "../../build/lib/partials/icons.js";

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/presets.js"];

const T = {
  checkOrder: {
    de: "<b>Reihenfolge prüfen:</b> Die Speicherplätze können in Wirklichkeit anders verteilt sein als hier gezeigt (z.&nbsp;B. C4/C5 getauscht oder zusätzliche Plätze belegt). Einmal das Rad durchdrehen, mit <span class=\"osd\">Q</span> vergleichen und die echte Belegung auf der Seite „Belegung“ notieren.",
    en: "<b>Check the real order:</b> your dial's slots may actually be arranged differently than shown here (e.g. C4/C5 swapped, or extra slots reassigned). Turn the dial through once, compare with <span class=\"osd\">Q</span>, and note the real setup on the “My Setup” page.",
  },
  whatToShoot: { de: "Was willst du aufnehmen?", en: "What do you want to shoot?" },
  chipPeople: { de: "Menschen", en: "People" },
  chipAnimals: { de: "Tiere &amp; Action", en: "Animals &amp; action" },
  chipVacation: { de: "Urlaubsstimmung", en: "Vacation mood" },
  chipBw: { de: "Schwarzweiß", en: "Black & white" },
  chipVideo: { de: "Video normal", en: "Video, normal" },
  chipSlowmo: { de: "Zeitlupe", en: "Slow motion" },
  dialHeading: { de: "Das Modusrad", en: "The mode dial" },
  photoBadge: { de: "FOTO", en: "PHOTO" },
  usedFor: { de: "Wofür:", en: "For:" },
  showAll: { de: "Alle Presets zeigen", en: "Show all presets" },
  updateHeading: { de: "Wichtig: Presets merken sich Änderungen!", en: "Important: presets remember changes!" },
  updateP1: {
    de: "Diese Kamera ist auf <b>AUTO-UPDATE</b> eingestellt: Was du in einem C-Preset veränderst (Filmsimulation, Korrektur, …), wird <b>automatisch dauerhaft ins Preset gespeichert</b>. Rad wegdrehen und zurück setzt also NICHTS zurück.",
    en: "This camera has <b>AUTO UPDATE</b> turned on: whatever you change in a C preset (film simulation, exposure correction, …) gets <b>saved into the preset automatically and permanently</b>. Turning the dial away and back resets NOTHING.",
  },
  updateP2: { de: "Du hast zwei Möglichkeiten:", en: "You have two options:" },
  updateA: {
    de: "<b>A — bewusst nutzen:</b> Du weißt, dass Änderungen bleiben, und stellst gewünschte Werte selbst zurück (Q-Menü zeigt alles auf einen Blick).",
    en: "<b>A — use it deliberately:</b> know that changes stick, and reset the values you want yourself (the Q menu shows everything at a glance).",
  },
  updateB: {
    de: "<b>B — Schutzmodus:</b> Auto-Update abschalten, dann springt jedes Preset beim Radwechsel auf den gespeicherten Stand zurück:<br><span class=\"osd\">MENU → IQ → AUTOM. AKT. BEN.-EINST. → DEAKT.</span><br><span class=\"mut\">(englisch: AUTO UPDATE CUSTOM SETTING → DISABLE)</span>",
    en: "<b>B — protected mode:</b> turn Auto Update off, and every preset snaps back to its saved state when you switch the dial away and back:<br><span class=\"osd\">MENU → IQ → AUTO UPDATE CUSTOM SETTING → DISABLE</span>",
  },
  updateHint: {
    de: "Sicherheitsnetz für beide Fälle: einmal ein Einstellungs-Backup mit der XApp machen — siehe Seite „Verbindung“.",
    en: "A safety net either way: make a settings backup with the XApp once — see the “Connection” page.",
  },
};

function renderFilmCard(p, t) {
  return `<div class="filmcard" data-preset="${p.id}">
      <div class="strip" style="background:${p.swatch}"></div>
      <div class="body">
        <div class="row1"><span class="id">${p.id}</span>${p.v ? `<span class="badge v">${icon("video")}VIDEO</span>` : ""}</div>
        <h3>${p.title}</h3>
        <p class="look">${p.look}</p>
        <p class="use"><b>${t.usedFor}</b> ${p.use}</p>
        <p class="hint">${p.note}</p>
      </div>
    </div>`;
}

export function render(locale) {
  const t = localize(T, locale);
  const presets = localize(PRESETS, locale);
  const dial = presets.map(p => `<button class="stop${p.v ? " video" : ""}" id="stop-${p.id}" data-preset="${p.id}" aria-label="${p.title}">${p.id === "VID" ? icon("video") : p.id}<small>${p.v ? "MOVIE" : t.photoBadge}</small></button>`).join("");

  return `<section id="tab-presets">
  <div class="card" style="border-left:3px solid var(--amber);display:flex;gap:12px;align-items:flex-start">
    ${icon("alert-triangle", "warn")}<p style="margin:0">${t.checkOrder}</p>
  </div>

  <h2>${t.whatToShoot}</h2>
  <div class="chips">
    <button class="chip" onclick="pick('C3')">${t.chipPeople}</button>
    <button class="chip" onclick="pick('C4')">${t.chipAnimals}</button>
    <button class="chip" onclick="pick('C2')">${t.chipVacation}</button>
    <button class="chip" onclick="pick('C1')">${t.chipBw}</button>
    <button class="chip" onclick="pick('VID')">${t.chipVideo}</button>
    <button class="chip" onclick="pick('C6')">${t.chipSlowmo}</button>
  </div>

  <h2>${t.dialHeading}</h2>
  <div class="dialwrap">
    <div class="dial" id="dial">${dial}</div>
  </div>
  <div id="presetCards">
    ${presets.map(p => renderFilmCard(p, t)).join("\n    ")}
    <button class="btn ghost" id="presetBack" style="display:none" onclick="showAllPresets()">${t.showAll}</button>
  </div>

  <div class="card">
    <h3>${icon("alert-triangle")}${t.updateHeading}</h3>
    <p>${t.updateP1}</p>
    <p>${t.updateP2}</p>
    <p>${t.updateA}</p>
    <p>${t.updateB}</p>
    <p class="hint">${t.updateHint}</p>
  </div>
</section>`;
}
