import { VERSION } from "../data/app-meta.js";
import { PAGES } from "../pages.js";
import { localize, otherLocaleUrl } from "../../build/lib/i18n.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  heading: { de: "Über diese App", en: "About this app" },
  intro: {
    de: "Der <b>X-H2S Reisebegleiter</b> ist ein inoffizieller Begleiter für die Fujifilm X-H2S: Tutorial, Preset-Guide, Erste Hilfe, durchsuchbares Handbuch und Übungsplan — komplett offline nutzbar.",
    en: "The <b>X-H2S Companion</b> is an unofficial companion app for the Fujifilm X-H2S: tutorial, preset guide, troubleshooting, a searchable manual, and an exercise plan — works completely offline.",
  },
  createdBy: { de: "Erstellt von:", en: "Created by:" },
  version: { de: "Version", en: "Version" },
  languageHeading: { de: "Sprache", en: "Language" },
  languageDesc: {
    de: "Diese App erkennt einmalig automatisch, ob dein Browser Deutsch bevorzugt, und merkt sich danach deine Wahl.",
    en: "This app automatically detects once whether your browser prefers German, then remembers your choice from then on.",
  },
};

export function render(locale) {
  const t = localize(T, locale);
  const aboutFile = hrefFor("about");
  const switchHref = otherLocaleUrl(aboutFile, locale);
  const switchLabel = locale === "de" ? "English" : "Deutsch";

  return `<section id="tab-about">
  <h2>${t.heading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.intro}</p>
    <p><b>${t.createdBy}</b> Norman Philipps</p>
  </div>
  <div class="fact"><b>${t.version}</b> ${VERSION}</div>

  <h2>${t.languageHeading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.languageDesc}</p>
    <a class="btn ghost" href="${switchHref}" onclick="window.setLocalePreference &amp;&amp; window.setLocalePreference('${locale === "de" ? "en" : "de"}')">🌐 ${switchLabel}</a>
  </div>
</section>`;
}
