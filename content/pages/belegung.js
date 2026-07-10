import { FIELDS } from "../data/belegung-fields.js";

export const scripts = ["assets/js/ui.js", "assets/js/search.js", "assets/js/belegung.js"];

function renderField(f) {
  const [key, label, placeholder, hint] = f;
  const multi = ["fn", "dial2", "notes"].includes(key);
  const defaultValue = hint || "";
  return `<div class="fld">
      <label for="f-${key}">${label}</label>
      ${multi
        ? `<textarea id="f-${key}" data-field="${key}" rows="2" placeholder="${placeholder}">${defaultValue}</textarea>`
        : `<input id="f-${key}" data-field="${key}" placeholder="${placeholder}" value="${defaultValue}">`}
    </div>`;
}

export function render() {
  const fieldsHtml = FIELDS.map(renderField).join("\n    ");
  return `<section id="tab-belegung">
  <h2>Meine Kamera-Belegung</h2>
  <div class="card">
    <p style="margin-top:0"><b>So findest du sie heraus:</b></p>
    <p>① Tasten: <span class="osd">DISP/BACK lange drücken</span> → Übersicht aller Fn-Belegungen.<br>
       ② Presets: Rad durch C1–C7 drehen und <span class="osd">Q</span> drücken (Foto UND Video-Modus!).<br>
       ③ Details: <span class="osd">MENU → IQ → BENUTZEREINST. BEARB./SPEICH.</span></p>
    <p class="hint">Nur anschauen ändert nichts. Trage hier den SOLL-Zustand ein — wegen Auto-Update ist das deine Referenz, falls sich ein Preset verändert hat.</p>
  </div>
  <div id="fields">
    ${fieldsHtml}
  </div>
  <button class="btn" onclick="saveFields()">Belegung speichern</button>
  <span class="saved" id="savedMsg"></span>
  <p class="hint" style="margin-top:10px">Hinweis: Das Speichern funktioniert, wenn die Datei im Browser (Safari/Chrome) geöffnet ist. Tipp fürs iPhone: Datei in Safari öffnen → Teilen → „Zum Home-Bildschirm“.</p>
</section>`;
}
