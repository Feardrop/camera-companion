import { PAGES } from "../pages.js";
import { FACTS } from "../data/facts.js";
import { TUTORIAL } from "../data/tutorial.js";
import { renderBody, renderDetails } from "../../build/lib/content-helpers.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/js/ui.js", "assets/js/search.js"];

export function render() {
  const chapters = TUTORIAL.map(ch => renderDetails({
    id: ch.id,
    summaryHtml: `${ch.num} · ${ch.title}<span class="sev">${ch.minutes}</span>`,
    bodyHtml: renderBody(ch),
  })).join("\n\n");

  return `<section id="tab-start">
  <h2>Auf einen Blick</h2>
  <div class="card">
    <p style="margin-top:0">${FACTS.shutter}</p>
    <p><b>Schalter oben links:</b> <span class="osd">STILL</span> = Foto · <span class="osd">MOVIE</span> = Video (jeweils eigene Presets!).</p>
    <p><b>Modusrad:</b> C1 Schwarzweiß · C2 warm/hell · C3 Porträt/Allround · C4/C5 Tiere &amp; Action · C6 Zeitlupe · C7 Video 50p.</p>
    <p>${FACTS.lostInMenu} <b>Etwas verstellt?</b> <span class="osd">Q</span> zeigt alles auf einen Blick.</p>
    <p class="hint">Unsicher, welches Preset? Nimm C3 — damit geht fast nichts schief.</p>
  </div>

  <h2>Schnellzugriff</h2>
  <div class="quicknav">
    <a href="${hrefFor("sos")}">✚ Problem? SOS</a>
    <a href="${hrefFor("presets")}">◎ Preset-Wahl</a>
    <a href="${hrefFor("handbuch")}">📖 Handbuch-Suche</a>
    <a href="${hrefFor("uebungen")}">✓ Übungen</a>
  </div>

  <h2>Dein Weg durch die App</h2>
  <div class="journey">
    <a class="jstep" href="#tut1" onclick="document.getElementById('tut1').open=true">
      <div class="no">1</div><div class="tx"><b>Grundlagen lernen</b><span>Das Tutorial unten auf dieser Seite — 8 kurze Kapitel, je 5–15 Minuten.</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("presets")}">
      <div class="no">2</div><div class="tx"><b>Presets kennenlernen</b><span>Welche Rad-Position wofür da ist — und die Auto-Update-Falle verstehen.</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("belegung")}">
      <div class="no">3</div><div class="tx"><b>Kamera prüfen &amp; eintragen</b><span>Tatsächliche Belegung von C1–C7 und Tasten verifizieren, auf der Seite „Belegung“ notieren, Auto-Update AN/AUS entscheiden.</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("verbindung")}">
      <div class="no">4</div><div class="tx"><b>XApp koppeln + Backup</b><span>Einstellungs-Backup als Sicherheitsnetz, Bildübertragung, Geo-Tagging.</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("uebungen")}">
      <div class="no">5</div><div class="tx"><b>Üben — vor und auf der Reise</b><span>7 abhakbare Übungen führen dich zum Enthusiasten-Level.</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("sos")}">
      <div class="no">✚</div><div class="tx"><b>Unterwegs bei Problemen</b><span>SOS löst die 15 häufigsten Situationen; für alles andere: Handbuch-Suche.</span></div><div class="go">›</div>
    </a>
  </div>

  <div class="card">
    <h3>🔁 Auto-Update der Presets: AN oder AUS?</h3>
    <p>Diese Kamera speichert Änderungen automatisch dauerhaft ins aktive C-Preset (<b>Auto-Update = AN</b>). Wer versehentliches Verstellen verhindern will, schaltet es aus — dann springt jedes Preset beim Radwechsel auf den gespeicherten Stand zurück:</p>
    <p><b>Ausschalten:</b> <span class="osd">${FACTS.autoUpdateDisablePath}</span><br>
       <b>Einschalten:</b> <span class="osd">${FACTS.autoUpdateEnablePath}</span></p>
    <p class="hint">Empfehlung für den Einstieg: DEAKT. — so kann nichts dauerhaft verstellt werden. (Englische Menüs: ${FACTS.autoUpdateEnglish}.)</p>
  </div>

  <h2>Tutorial — Schritt für Schritt</h2>
  <p class="mut" style="margin:0 0 10px">Die Kapitel bauen aufeinander auf. Die ausführliche Fassung mit Tabellen und Handbuch-Verweisen gibt es als <a href="X-H2S_Einfuehrung_und_Lernpfad.pdf" target="_blank" rel="noopener">PDF „Einführung &amp; Lernpfad“</a> zum Nachlesen.</p>

  ${chapters}
</section>`;
}
