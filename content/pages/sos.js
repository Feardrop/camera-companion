import { SOS } from "../data/sos.js";
import { localize } from "../../build/lib/i18n.js";
import { renderBody, renderDetails } from "../../build/lib/content-helpers.js";

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  heading: { de: "Erste Hilfe — nach Symptom", en: "Troubleshooting — by symptom" },
  nothingHelpsHeading: { de: "Nichts davon hilft?", en: "None of this helping?" },
  nothingHelpsBody: {
    de: "Offizielles Troubleshooting: auf der Seite <b>„Handbuch“</b> auf „Troubleshooting“ tippen (S. 358) — oder dort nach dem Stichwort suchen.",
    en: "Official troubleshooting: on the <b>“Manual”</b> page tap “Troubleshooting” (p. 358) — or search there for the keyword.",
  },
};

export function render(locale) {
  const t = localize(T, locale);
  const sos = localize(SOS, locale);
  const entries = sos.map(s => renderDetails({
    id: s.id,
    summaryHtml: `${s.summary}${s.severity ? `<span class="sev">${s.severity}</span>` : ""}`,
    bodyHtml: renderBody(s),
  })).join("\n\n  ");

  return `<section id="tab-sos">
  <h2>${t.heading}</h2>

  ${entries}

  <div class="card" style="margin-top:16px">
    <h3>${t.nothingHelpsHeading}</h3>
    <p>${t.nothingHelpsBody}</p>
  </div>
</section>`;
}
