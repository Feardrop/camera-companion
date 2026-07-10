import { PAGES } from "../pages.js";
import { FACTS } from "../data/facts.js";
import { MENU_PATHS } from "../data/menu-paths.js";
import { RAW_SETTINGS } from "../data/raw-settings.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/js/ui.js", "assets/js/search.js"];

export function render() {
  const menuRows = MENU_PATHS.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("\n    ");
  const rawSettingRows = RAW_SETTINGS.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("\n        ");

  return `<section id="tab-referenz">
  <h2>Spickzettel</h2>
  <div class="fact">${FACTS.shutter}</div>
  <div class="fact">${FACTS.lostInMenu}</div>
  <div class="fact"><b>Presets speichern Änderungen automatisch</b> (Auto-Update AN). Q-Menü zeigt den Ist-Zustand; Soll-Zustand steht auf der Seite „Belegung“. Schutzmodus: ${FACTS.autoUpdateDisablePath}</div>
  <div class="fact"><b>Belichtungsdreieck:</b> Blende (klein = unscharfer Hintergrund) · Zeit (kurz = Bewegung einfrieren) · ISO (hoch = heller, aber körniger).</div>
  <div class="fact"><b>Bild zu hell/dunkel:</b> zuerst Belichtungskorrektur (±) prüfen.</div>
  <div class="fact"><b>Modus A</b> = du wählst die Blende, Kamera den Rest. Der beste erste Schritt aus den Presets.</div>

  <h2>Wichtige Menüwege</h2>
  <table class="mini">
    ${menuRows}
  </table>


  <h2 id="raw-konvertierung">Bildformate &amp; RAW-Entwicklung</h2>
  <div class="card">
    <p style="margin-top:0"><b>Was ist was?</b></p>
    <p><b>RAW</b> — das digitale Negativ: alle Sensordaten, riesige Reserven für die Nachbearbeitung, muss aber „entwickelt“ werden (in der Kamera, s.&nbsp;u., oder am Rechner). Für wichtige Bilder und schwieriges Licht.</p>
    <p><b>JPEG</b> — das klassische fertige Bild (8&nbsp;Bit). Überall kompatibel, aber technisch überholt.</p>
    <p><b>HEIF</b> — der moderne JPEG-Nachfolger (10&nbsp;Bit Farbtiefe): sichtbar mehr Qualitätsreserven bei kleineren Dateien. iPhone, Mac und aktuelles Windows zeigen HEIF direkt an.</p>
    <p><b>Wie nutzt du was?</b> Alltag: <b>HEIF</b>. Wichtige Motive / kniffliges Licht: <b>RAW&nbsp;+&nbsp;HEIF</b> (beides wird gespeichert). JPEG nur, falls ein altes Gerät oder ein Webdienst HEIF nicht annimmt — oder per RAW-Konvertierung nachträglich erzeugen.</p>
    <p><b>Wo einstellen?</b><br>
      Format: <span class="osd">${FACTS.jpegHeifPath}</span> (S.&nbsp;129)<br>
      RAW dazu: <span class="osd">MENU → IQ → BILDQUALITÄT → z.&nbsp;B. RAW+</span> (S.&nbsp;127)<br>
      RAW-Kompression: <span class="osd">MENU → IQ → RAW-AUFNAHME</span> (S.&nbsp;128, „verlustfrei komprimiert“ ist ein guter Standard)</p>
  </div>

  <div class="card">
    <p style="margin-top:0"><b>RAW in der Kamera entwickeln</b> — ohne Computer, direkt auf der Reise:</p>
    <p>① Bild in der Wiedergabe anzeigen (RAW-Symbol) → <span class="osd">MENU/OK → RAW-KONVERTIERUNG</span><br>
       ② <b>Zuerst DATEITYP auf HEIF stellen</b> — legt das Ausgabeformat der Kopie fest.<br>
       ③ Weitere Einstellungen nach Bedarf anpassen (Fokushebel: markieren → rechts öffnet Optionen → wählen → MENU/OK bestätigt; Liste aller Einstellungen unten).<br>
       ④ Taste <span class="osd">Q</span> zeigt eine Vorschau der Kopie.<br>
       ⑤ <span class="osd">MENU/OK</span> speichert die Kopie als neue Datei — das Original-RAW bleibt unverändert erhalten.</p>
    <p class="hint"><b>Wichtig: Schritt ② immer zuerst.</b> Wird DATEITYP nicht umgestellt, entsteht aus Versehen ein altes JPEG statt eines hochwertigen HEIF — unabhängig davon, was du sonst noch änderst.</p>
    <p class="hint">So wird z.&nbsp;B. aus einem C1-Schwarzweiß-RAW nachträglich doch ein Farbbild: FILMSIMULATION in Schritt ③ auf PROVIA o.&nbsp;ä. wechseln.</p>
  </div>

  <details>
    <summary>Alle RAW-Konvertierungs-Einstellungen erklärt</summary>
    <div class="body">
      <table class="mini">
        ${rawSettingRows}
      </table>
      <p class="hint">Nicht jede Einstellung steht immer zur Verfügung — abhängig davon, wie das Bild aufgenommen wurde.</p>
    </div>
  </details>

  <div class="chips" style="margin:10px 0 20px">
    <button class="chip" onclick="openPage(220)">📖 Handbuch: RAW-Konvertierung · S. 220</button>
    <button class="chip" onclick="openPage(129)">📖 Handbuch: JPEG/HEIF · S. 129</button>
    <a class="chip" href="${hrefFor("uebungen")}">✓ Übung: RAW-Konvertierung üben</a>
    <a class="chip" href="${hrefFor("sos")}">✚ SOS: Bilder plötzlich schwarzweiß</a>
  </div>

  <h2>Handbücher</h2>
  <a class="lnk" href="https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf"><em>PDF · DEUTSCH</em><b>Offizielles Handbuch (deutsch)</b><span>Download, 7 MB — mit allen Abbildungen, offline nutzbar</span></a>
  <a class="lnk" href="https://fujifilm-dsc.com/en/manual/x-h2s/"><em>WEB · EN</em><b>Online-Handbuch X-H2S</b><span>Durchsuchbar, handyfreundlich</span></a>
  <p class="mut">Der Volltext des deutschen Handbuchs steckt auf der Seite „Handbuch“ (Suche funktioniert offline); das PDF mit Abbildungen gibt es dort per Download-Button.</p>

  <a class="lnk" href="X-H2S_Einfuehrung_und_Lernpfad.pdf" target="_blank" rel="noopener"><em>PDF · DEUTSCH</em><b>Einführung &amp; Lernpfad (16 Seiten)</b><span>Das ausführliche Begleitdokument zu dieser Website</span></a>

  <h2>Videos: Deutsch</h2>
  <a class="lnk" href="https://www.youtube.com/watch?v=2gh4e6giFfQ"><em>YOUTUBE · PFLICHT</em><b>Die Presets C1–C7 erklärt</b><span>Genau das System dieser Kamera</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=IcCmSHWJ3VU"><em>YOUTUBE · PFLICHT</em><b>Autofokus-Tipps X-H2/X-H2S</b><span>Fokusmodi &amp; Motiverkennung (Fujifilm DE)</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=4VF3JrYjaPs"><em>YOUTUBE</em><b>Custom Settings erklärt (fuji-store.de)</b><span>Benutzereinstellungen vertieft</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=fI3uVUQVMPI"><em>YOUTUBE</em><b>Einstellungs-Kurs X-T5/X-H2(s)</b><span>Menüpunkt für Menüpunkt (Pixelcatcher)</span></a>

  <h2>Videos &amp; Guides: Englisch</h2>
  <a class="lnk" href="https://pal2tech.com/videos/2022/10/14/2022-fujifilm-xh2s-and-xh2-recommended-settings-for-setup"><em>VIDEO · EN</em><b>pal2tech: Recommended Settings</b><span>Der beste Fuji-Erklärkanal, ruhiges Englisch</span></a>
  <a class="lnk" href="https://pal2tech.com/guides/"><em>TEXT · EN</em><b>pal2tech: alle Schritt-für-Schritt-Guides</b><span>PASM-Rad, Zonen-AF, Back-Button-Fokus u.v.m.</span></a>
  <a class="lnk" href="https://www.peltierphotocourses.com/courses/fujifilm-xh2-xh2s-tutorial"><em>KURS · DE-UNTERTITEL</em><b>Peltier: X-H2/X-H2S Komplettkurs</b><span>Strukturierter Videokurs mit deutschen Untertiteln</span></a>
</section>`;
}
