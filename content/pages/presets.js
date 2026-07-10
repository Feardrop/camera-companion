import { PRESETS } from "../data/presets.js";

export const scripts = ["assets/js/ui.js", "assets/js/presets.js"];

function renderDialButton(p) {
  return `<button class="stop${p.v ? " video" : ""}" id="stop-${p.id}" data-preset="${p.id}" aria-label="${p.title}">${p.id === "VID" ? "▶" : p.id}<small>${p.v ? "MOVIE" : "FOTO"}</small></button>`;
}

function renderCard(p) {
  return `<div class="card" data-preset="${p.id}">
      <h3><span class="badge${p.v ? " v" : ""}">${p.id === "VID" ? "▶ VIDEO" : p.id}</span>${p.title}</h3>
      <p class="look">${p.look}</p>
      <p><b>Wofür:</b> ${p.use}</p>
      <p class="hint">${p.note}</p>
    </div>`;
}

export function render() {
  return `<section id="tab-presets">
  <div class="card" style="border-left:4px solid var(--amber)">
    <p style="margin:0"><b>⚠️ Reihenfolge prüfen:</b> Die Speicherplätze können in Wirklichkeit anders verteilt sein als hier gezeigt (z.&nbsp;B. C4/C5 getauscht oder zusätzliche Plätze belegt). Einmal das Rad durchdrehen, mit <span class="osd">Q</span> vergleichen und die echte Belegung auf der Seite „Mehr“ notieren.</p>
  </div>

  <h2>Was willst du aufnehmen?</h2>
  <div class="chips">
    <button class="chip" onclick="pick('C3')">🧑 Menschen</button>
    <button class="chip" onclick="pick('C4')">🦅 Tiere &amp; Action</button>
    <button class="chip" onclick="pick('C2')">🌇 Urlaubsstimmung</button>
    <button class="chip" onclick="pick('C1')">⬛ Schwarzweiß</button>
    <button class="chip" onclick="pick('VID')">🎬 Video normal</button>
    <button class="chip" onclick="pick('C6')">🐌 Zeitlupe</button>
  </div>

  <h2>Das Modusrad</h2>
  <div class="dialwrap">
    <div class="dial" id="dial">${PRESETS.map(renderDialButton).join("")}</div>
  </div>
  <div id="presetCards">
    ${PRESETS.map(renderCard).join("\n    ")}
    <button class="btn ghost" id="presetBack" style="display:none" onclick="showAllPresets()">Alle Presets zeigen</button>
  </div>

  <div class="card">
    <h3>⚠️ Wichtig: Presets merken sich Änderungen!</h3>
    <p>Diese Kamera ist auf <b>AUTO-UPDATE</b> eingestellt: Was du in einem C-Preset veränderst (Filmsimulation, Korrektur, …), wird <b>automatisch dauerhaft ins Preset gespeichert</b>. Rad wegdrehen und zurück setzt also NICHTS zurück.</p>
    <p>Du hast zwei Möglichkeiten:</p>
    <p><b>A — bewusst nutzen:</b> Du weißt, dass Änderungen bleiben, und stellst gewünschte Werte selbst zurück (Q-Menü zeigt alles auf einen Blick).</p>
    <p><b>B — Schutzmodus:</b> Auto-Update abschalten, dann springt jedes Preset beim Radwechsel auf den gespeicherten Stand zurück:<br>
    <span class="osd">MENU → IQ → AUTOM. AKT. BEN.-EINST. → DEAKT.</span><br>
    <span class="mut">(englisch: AUTO UPDATE CUSTOM SETTING → DISABLE)</span></p>
    <p class="hint">Sicherheitsnetz für beide Fälle: einmal ein Einstellungs-Backup mit der XApp machen — siehe Seite „Mehr“.</p>
  </div>
</section>`;
}
