import { FACTS } from "../data/facts.js";

export const scripts = ["assets/js/ui.js"];

export function render() {
  return `<section id="tab-verbindung">
  <h2>Handy-Setup: FUJIFILM XApp</h2>
  <div class="card">
    <p style="margin-top:0">Einmal einrichten, dreifach profitieren — <b>am besten noch vor der Reise:</b></p>
    <p><b>1 · Koppeln:</b> App „FUJIFILM XApp“ installieren (App Store / Play Store), Bluetooth an, in der App „Kamera koppeln“ und den Anweisungen folgen.</p>
    <p><b>2 · Einstellungs-Backup:</b> In der XApp die Funktion zum <b>Sichern/Wiederherstellen der Kameraeinstellungen</b> nutzen („Registrierung/Wiederherstellung der Kameraeinstellungen“). Damit lassen sich alle Presets und Menüs im Notfall mit einem Fingertipp zurückspielen — das Sicherheitsnetz gegen versehentlich veränderte Presets (Auto-Update!). Nach dem Verifizieren der Belegung einmal sichern.</p>
    <p><b>3 · Geo-Tagging:</b> Standortsync in der App erlauben und an der Kamera <span class="osd">${FACTS.geotaggingPath}</span>. Dann steht in jedem Foto automatisch der Aufnahmeort.</p>
    <p><b>4 · Bilder übertragen:</b> in der Wiedergabe auswählen &amp; senden — oder Auto-Übertragung aktivieren.</p>
    <p class="hint">Bluetooth kostet kaum Akku; WLAN wird nur während der Übertragung aktiviert.</p>
  </div>

  <a class="lnk" href="https://app.fujifilm-dsc.com/"><em>OFFIZIELL</em><b>XApp-Infoseite von Fujifilm</b><span>Download-Links und Funktionsübersicht</span></a>

  <h2>Unterwegs sichern — drei Wege</h2>
  <div class="card">
    <p style="margin-top:0"><b>Weg 1 · Direkt ans Android-Handy:</b> Kamera einschalten und per USB-C-Kabel mit dem Handy verbinden — die Kamera erscheint als Laufwerk, Bilder einfach in der Dateien-App rüberziehen.</p>
    <p><b>Weg 2 · Manuell über USB-C-Hub:</b> SD-Karte in den Hub stecken und die Dateien auf SSD/Stick kopieren. <span class="hint">Hinweis: Die CFexpress liest du mit dem beigelegten Kombi-Reader (SD&nbsp;+&nbsp;CFE) aus — oder einfach erst zu Hause nach der Reise am Rechner. Das reicht völlig, denn die Fotos liegen ja als Backup auch auf der SD.</span></p>
    <p><b>Weg 3 · Mit der FUJIFILM XApp:</b> Kamera koppeln (siehe Karte oben), dann Bilder auswählen und übertragen. Zum Platzsparen die <b>Verkleinern-Funktion</b> aktivieren: <span class="osd">MENU → Netzwerk/USB → Bild übertragen/verkleinern AN</span> bzw. die Größenoption in der XApp — überträgt handygerechte, kleinere Dateien.</p>
    <p class="hint">Wenn die Übertragung mal hakt: nicht ärgern, einfach nochmal probieren — Verbindung trennen, App neu öffnen, ggf. Bluetooth aus/an. Das löst es fast immer.</p>
    <div class="chips" style="margin-bottom:0">
      <button class="chip" onclick="openPage(314)">📖 Handbuch: Übertragung/Verkleinern · S. 314</button>
      <button class="chip" onclick="openPage(232)">📖 Handbuch: Bild auf Smartphone übertragen · S. 232</button>
    </div>
  </div>

  <h2>Speicherkarten: Backup auf beide Karten</h2>
  <div class="card">
    <p style="margin-top:0">Diese Kamera ist auf <b>SICHERUNG (Backup)</b> für beide Steckplätze eingestellt — Steckplatz&nbsp;1 = CFexpress, Steckplatz&nbsp;2 = SD. Das bedeutet:</p>
    <p>✅ <b>Jedes Foto</b> (HEIF <b>und</b> RAW) wird <b>gleichzeitig auf beide Karten</b> geschrieben — eine automatische Sicherheitskopie. Fällt eine Karte aus oder geht verloren, ist kein Bild weg.</p>
    <p>📹 <b>Videos</b> werden dagegen <b>immer nur auf die CFexpress (Steckplatz&nbsp;1)</b> gespeichert — auf der SD-Karte liegen also keine Videos.</p>
    <p>⚠️ Beide Karten füllen sich bei Fotos parallel; die kleinere bzw. vollere Karte begrenzt. Meldet die Kamera „voll“, die betroffene Karte tauschen oder aufräumen — danach geht es weiter.</p>
    <p class="hint">Einstellung ansehen/ändern: <span class="osd">MENU → Schraubenschlüssel → DATENSPEICHER-EINSTELLUNG</span></p>
    <div class="chips" style="margin-bottom:0">
      <button class="chip" onclick="openPage(281)">📖 Handbuch: Datenspeicher-Einstellung · S. 281</button>
    </div>
  </div>
</section>`;
}
