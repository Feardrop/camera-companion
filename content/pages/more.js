import { PAGES } from "../pages.js";
import { localize } from "../../build/lib/i18n.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  heading: { de: "Mehr", en: "More" },
  notesTag: { de: "NOTIZEN", en: "NOTES" },
  notesTitle: { de: "Meine Kamera-Belegung", en: "My camera setup" },
  notesDesc: { de: "C1–C7 und Tasten eintragen — deine Referenz, falls Auto-Update etwas verändert hat.",
               en: "Note down C1–C7 and button assignments — your reference if Auto Update ever changes something." },
  connTag: { de: "VERBINDUNG", en: "CONNECTION" },
  connTitle: { de: "XApp, Übertragung &amp; Backup", en: "XApp, transfer &amp; backup" },
  connDesc: { de: "Handy koppeln, Bilder übertragen, Speicherkarten-Backup verstehen.",
              en: "Pair your phone, transfer images, understand the memory-card backup." },
  refTag: { de: "REFERENZ", en: "REFERENCE" },
  refTitle: { de: "Spickzettel, Menüwege &amp; RAW-Entwicklung", en: "Cheat sheet, menu paths &amp; RAW development" },
  refDesc: { de: "Schnell nachschlagen unterwegs, plus die komplette RAW-Konvertierungs-Anleitung.",
             en: "A quick lookup on the road, plus the full RAW-conversion walkthrough." },
  infoTag: { de: "INFO", en: "INFO" },
  infoTitle: { de: "Über diese App", en: "About this app" },
  infoDesc: { de: "Wer's gemacht hat, und welche Version gerade läuft.", en: "Who made it, and which version is currently running." },
};

export function render(locale) {
  const t = localize(T, locale);
  return `<section id="tab-more">
  <h2>${t.heading}</h2>
  <a class="lnk" href="${hrefFor("my-setup")}"><em>${t.notesTag}</em><b>${t.notesTitle}</b><span>${t.notesDesc}</span></a>
  <a class="lnk" href="${hrefFor("connection")}"><em>${t.connTag}</em><b>${t.connTitle}</b><span>${t.connDesc}</span></a>
  <a class="lnk" href="${hrefFor("reference")}"><em>${t.refTag}</em><b>${t.refTitle}</b><span>${t.refDesc}</span></a>
  <a class="lnk" href="${hrefFor("about")}"><em>${t.infoTag}</em><b>${t.infoTitle}</b><span>${t.infoDesc}</span></a>

  <script>
    // Redirect old bookmarks to #raw-konvertierung (previously here on "Mehr",
    // then moved to referenz.html — both filename and anchor id have since
    // been renamed to English) straight to the current location.
    if (location.hash === "#raw-konvertierung") { location.replace("${hrefFor("reference")}#raw-conversion"); }
  </script>
</section>`;
}
