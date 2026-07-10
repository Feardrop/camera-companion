import { FIELDS } from "../data/belegung-fields.js";
import { localize } from "../../build/lib/i18n.js";
import { renderSteps } from "../../build/lib/content-helpers.js";

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/my-setup.js"];

const T = {
  heading: { de: "Meine Kamera-Belegung", en: "My camera setup" },
  howToFind: { de: "So findest du sie heraus:", en: "How to find it:" },
  stepButtons: { de: `Tasten: <span class="osd">DISP/BACK lange drücken</span> → Übersicht aller Fn-Belegungen.`,
                 en: `Buttons: <span class="osd">long-press DISP/BACK</span> → an overview of all Fn assignments.` },
  stepPresets: { de: `Presets: Rad durch C1–C7 drehen und <span class="osd">Q</span> drücken (Foto UND Video-Modus!).`,
                 en: `Presets: turn the dial through C1–C7 and press <span class="osd">Q</span> (both photo AND video mode!).` },
  stepDetails: { de: `Details: <span class="osd">MENU → IQ → BENUTZEREINST. BEARB./SPEICH.</span>`,
                 en: `Details: <span class="osd">MENU → IQ → EDIT/SAVE CUSTOM SETTING</span>` },
  hint: { de: "Nur anschauen ändert nichts. Trage hier den SOLL-Zustand ein — wegen Auto-Update ist das deine Referenz, falls sich ein Preset verändert hat.",
          en: "Just looking doesn't change anything. Note the intended state here — because of Auto Update, this is your reference if a preset ever drifts." },
  saveButton: { de: "Belegung speichern", en: "Save setup" },
  saveHint: { de: "Hinweis: Das Speichern funktioniert, wenn die Datei im Browser (Safari/Chrome) geöffnet ist. Tipp fürs iPhone: Datei in Safari öffnen → Teilen → „Zum Home-Bildschirm“.",
              en: "Note: saving works when the page is open in a browser (Safari/Chrome). iPhone tip: open it in Safari → Share → “Add to Home Screen”." },
};

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

export function render(locale) {
  const t = localize(T, locale);
  const fields = localize(FIELDS, locale);
  const fieldsHtml = fields.map(renderField).join("\n    ");
  return `<section id="tab-my-setup">
  <h2>${t.heading}</h2>
  <div class="card">
    <p style="margin-top:0"><b>${t.howToFind}</b></p>
    ${renderSteps([t.stepButtons, t.stepPresets, t.stepDetails])}
    <p class="hint">${t.hint}</p>
  </div>
  <div id="fields">
    ${fieldsHtml}
  </div>
  <button class="btn" onclick="saveFields()">${t.saveButton}</button>
  <span class="saved" id="savedMsg"></span>
  <p class="hint" style="margin-top:10px">${t.saveHint}</p>
</section>`;
}
