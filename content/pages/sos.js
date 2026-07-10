import { SOS } from "../data/sos.js";
import { renderBody, renderDetails } from "../../build/lib/content-helpers.js";

export const scripts = ["assets/js/ui.js", "assets/js/search.js"];

export function render() {
  const entries = SOS.map(s => renderDetails({
    id: s.id,
    summaryHtml: `${s.summary}${s.severity ? `<span class="sev">${s.severity}</span>` : ""}`,
    bodyHtml: renderBody(s),
  })).join("\n\n  ");

  return `<section id="tab-sos">
  <h2>Erste Hilfe — nach Symptom</h2>

  ${entries}

  <div class="card" style="margin-top:16px">
    <h3>Nichts davon hilft?</h3>
    <p>Offizielles Troubleshooting: auf der Seite <b>„Handbuch“</b> auf „Troubleshooting“ tippen (S. 358) — oder dort nach dem Stichwort suchen.</p>
  </div>
</section>`;
}
