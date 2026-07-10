import { VERSION } from "../data/app-meta.js";

export const scripts = ["assets/js/ui.js", "assets/js/search.js"];

export function render() {
  return `<section id="tab-ueber">
  <h2>Über diese App</h2>
  <div class="card">
    <p style="margin-top:0">Der <b>X-H2S Reisebegleiter</b> ist ein inoffizieller Begleiter für die Fujifilm
      X-H2S: Tutorial, Preset-Guide, Erste Hilfe, durchsuchbares Handbuch und Übungsplan — komplett
      offline nutzbar.</p>
    <p><b>Erstellt von:</b> Norman Philipps</p>
  </div>
  <div class="fact"><b>Version</b> ${VERSION}</div>
</section>`;
}
