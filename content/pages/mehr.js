import { PAGES } from "../pages.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/js/ui.js", "assets/js/search.js"];

export function render() {
  return `<section id="tab-mehr">
  <h2>Mehr</h2>
  <a class="lnk" href="${hrefFor("belegung")}"><em>NOTIZEN</em><b>Meine Kamera-Belegung</b><span>C1–C7 und Tasten eintragen — deine Referenz, falls Auto-Update etwas verändert hat.</span></a>
  <a class="lnk" href="${hrefFor("verbindung")}"><em>VERBINDUNG</em><b>XApp, Übertragung &amp; Backup</b><span>Handy koppeln, Bilder übertragen, Speicherkarten-Backup verstehen.</span></a>
  <a class="lnk" href="${hrefFor("referenz")}"><em>REFERENZ</em><b>Spickzettel, Menüwege &amp; RAW-Entwicklung</b><span>Schnell nachschlagen unterwegs, plus die komplette RAW-Konvertierungs-Anleitung.</span></a>
  <a class="lnk" href="${hrefFor("ueber")}"><em>INFO</em><b>Über diese App</b><span>Wer's gemacht hat, und welche Version gerade läuft.</span></a>

  <script>
    // Alte Lesezeichen auf #raw-konvertierung (früher hier auf "Mehr") weiterleiten —
    // der Inhalt lebt jetzt auf referenz.html.
    if (location.hash === "#raw-konvertierung") { location.replace("${hrefFor("referenz")}#raw-konvertierung"); }
  </script>
</section>`;
}
