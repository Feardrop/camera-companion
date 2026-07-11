import { FACTS } from "../data/facts.js";
import { localize } from "../../build/lib/i18n.js";
import { icon } from "../../build/lib/partials/icons.js";
import { renderSteps } from "../../build/lib/content-helpers.js";

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  phoneHeading: { de: "Handy-Setup: FUJIFILM XApp", en: "Phone setup: FUJIFILM XApp" },
  phoneIntro: { de: "Einmal einrichten, dreifach profitieren — <b>am besten noch vor der Reise:</b>", en: "Set it up once, benefit three times over — <b>ideally before the trip:</b>" },
  stepPair: { de: `<b>Koppeln:</b> App „FUJIFILM XApp“ installieren (App Store / Play Store), Bluetooth an, in der App „Kamera koppeln“ und den Anweisungen folgen.`,
              en: `<b>Pair it:</b> install the “FUJIFILM XApp” (App Store / Play Store), turn on Bluetooth, tap “Pair camera” in the app and follow the instructions.` },
  stepBackup: { de: `<b>Einstellungs-Backup:</b> In der XApp die Funktion zum <b>Sichern/Wiederherstellen der Kameraeinstellungen</b> nutzen („Registrierung/Wiederherstellung der Kameraeinstellungen“). Damit lassen sich alle Presets und Menüs im Notfall mit einem Fingertipp zurückspielen — das Sicherheitsnetz gegen versehentlich veränderte Presets (Auto-Update!). Nach dem Verifizieren der Belegung einmal sichern.`,
                en: `<b>Settings backup:</b> use the XApp's <b>save/restore camera settings</b> feature (“Register/Restore Camera Settings”). It lets you restore every preset and menu with a single tap in an emergency — the safety net against accidentally changed presets (Auto Update!). Back up once you've verified your setup.` },
  stepGeo: { de: `<b>Geo-Tagging:</b> Standortsync in der App erlauben und an der Kamera <span class="osd">${"${geo}"}</span>. Dann steht in jedem Foto automatisch der Aufnahmeort.`,
             en: `<b>Geo-tagging:</b> allow location sync in the app and on the camera set <span class="osd">${"${geo}"}</span>. Every photo then carries its shooting location automatically.` },
  stepTransfer: { de: `<b>Bilder übertragen:</b> in der Wiedergabe auswählen &amp; senden — oder Auto-Übertragung aktivieren.`,
                  en: `<b>Transfer images:</b> select &amp; send from playback — or turn on automatic transfer.` },
  bluetoothHint: { de: "Bluetooth kostet kaum Akku; WLAN wird nur während der Übertragung aktiviert.", en: "Bluetooth barely uses any battery; Wi-Fi only turns on during a transfer." },
  officialTag: { de: "OFFIZIELL", en: "OFFICIAL" },
  officialTitle: { de: "XApp-Infoseite von Fujifilm", en: "Fujifilm's XApp info page" },
  officialDesc: { de: "Download-Links und Funktionsübersicht", en: "Download links and a feature overview" },
  backupHeading: { de: "Unterwegs sichern — drei Wege", en: "Backing up on the road — three ways" },
  way1: { de: `<b>Weg 1 · Direkt ans Android-Handy:</b> Kamera einschalten und per USB-C-Kabel mit dem Handy verbinden — die Kamera erscheint als Laufwerk, Bilder einfach in der Dateien-App rüberziehen.`,
          en: `<b>Way 1 · Straight to an Android phone:</b> turn the camera on and connect it to the phone with a USB-C cable — the camera shows up as a drive, just drag the images over in the Files app.` },
  way2: { de: `<b>Weg 2 · Manuell über USB-C-Hub:</b> SD-Karte in den Hub stecken und die Dateien auf SSD/Stick kopieren. <span class="hint">Hinweis: Die CFexpress liest du mit dem beigelegten Kombi-Reader (SD&nbsp;+&nbsp;CFE) aus — oder einfach erst zu Hause nach der Reise am Rechner. Das reicht völlig, denn die Fotos liegen ja als Backup auch auf der SD.</span>`,
          en: `<b>Way 2 · Manually via a USB-C hub:</b> plug the SD card into the hub and copy the files to an SSD/thumb drive. <span class="hint">Note: read the CFexpress card with the included combo reader (SD&nbsp;+&nbsp;CFE) — or just wait until you're home and do it on a computer. That's perfectly fine, since the photos are already backed up on the SD card too.</span>` },
  way3: { de: `<b>Weg 3 · Mit der FUJIFILM XApp:</b> Kamera koppeln (siehe Karte oben), dann Bilder auswählen und übertragen. Zum Platzsparen die <b>Verkleinern-Funktion</b> aktivieren: <span class="osd">MENU → Netzwerk/USB → Bild übertragen/verkleinern AN</span> bzw. die Größenoption in der XApp — überträgt handygerechte, kleinere Dateien.`,
          en: `<b>Way 3 · With the FUJIFILM XApp:</b> pair the camera (see the card above), then select images and transfer them. To save space, turn on the <b>resize</b> feature: <span class="osd">MENU → Network/USB → Image Transfer/Resize ON</span>, or the size option in the XApp — sends smaller, phone-friendly files.` },
  hiccupHint: { de: "Wenn die Übertragung mal hakt: nicht ärgern, einfach nochmal probieren — Verbindung trennen, App neu öffnen, ggf. Bluetooth aus/an. Das löst es fast immer.",
                en: "If a transfer ever hiccups: don't worry, just try again — disconnect, reopen the app, toggle Bluetooth off/on if needed. That fixes it almost every time." },
  chipResize: { de: "Handbuch: Größe ändern · S. 226", en: "Manual: resize · p. 226" },
  chipTransferPhone: { de: "Handbuch: Bild auf Smartphone übertragen · S. 232", en: "Manual: transfer images to phone · p. 232" },
  cardsHeading: { de: "Speicherkarten: Backup auf beide Karten", en: "Memory cards: backup to both cards" },
  cardsIntro: { de: "Diese Kamera ist auf <b>SICHERUNG (Backup)</b> für beide Steckplätze eingestellt — Steckplatz&nbsp;1 = CFexpress, Steckplatz&nbsp;2 = SD. Das bedeutet:",
                en: "This camera is set to <b>BACKUP</b> across both card slots — slot&nbsp;1 = CFexpress, slot&nbsp;2 = SD. That means:" },
  cardsPhotos: { de: "<b>Jedes Foto</b> (HEIF <b>und</b> RAW) wird <b>gleichzeitig auf beide Karten</b> geschrieben — eine automatische Sicherheitskopie. Fällt eine Karte aus oder geht verloren, ist kein Bild weg.",
                 en: "<b>Every photo</b> (HEIF <b>and</b> RAW) is written <b>to both cards at once</b> — an automatic backup copy. If one card fails or gets lost, no image is gone." },
  cardsVideos: { de: "<b>Videos</b> werden dagegen <b>immer nur auf die CFexpress (Steckplatz&nbsp;1)</b> gespeichert — auf der SD-Karte liegen also keine Videos.",
                 en: "<b>Videos</b>, on the other hand, are <b>always saved only to the CFexpress card (slot&nbsp;1)</b> — so the SD card never has videos on it." },
  cardsWarn: { de: "Beide Karten füllen sich bei Fotos parallel; die kleinere bzw. vollere Karte begrenzt. Meldet die Kamera „voll“, die betroffene Karte tauschen oder aufräumen — danach geht es weiter.",
               en: "Both cards fill up in parallel with photos; whichever is smaller or fuller becomes the limit. If the camera says “full”, swap or clear the affected card — then you're good to keep shooting." },
  cardsSettingHint: { de: `Einstellung ansehen/ändern: <span class="osd">MENU → Schraubenschlüssel → DATENSPEICHER-EINSTELLUNG</span>`,
                      en: `View/change this setting: <span class="osd">MENU → wrench icon → DATA STORAGE SETTING</span>` },
  chipDataStorage: { de: "Handbuch: Datenspeicher-Einstellung · S. 281", en: "Manual: data storage setting · p. 281" },
};

export function render(locale) {
  const t = localize(T, locale);
  const facts = localize(FACTS, locale);
  const stepGeo = t.stepGeo.replace("${geo}", facts.geotaggingPath);
  // Both language editions of the manual share identical pagination (see
  // CLAUDE.md), so these page numbers are valid in both locales.
  const chips = `<div class="chips" style="margin-bottom:0">
      <button class="chip" onclick="openPage(226)">${icon("book")}${t.chipResize}</button>
      <button class="chip" onclick="openPage(232)">${icon("book")}${t.chipTransferPhone}</button>
    </div>`;
  const dataStorageChip = `<div class="chips" style="margin-bottom:0">
      <button class="chip" onclick="openPage(281)">${icon("book")}${t.chipDataStorage}</button>
    </div>`;

  return `<section id="tab-connection">
  <h2>${t.phoneHeading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.phoneIntro}</p>
    ${renderSteps([t.stepPair, t.stepBackup, stepGeo, t.stepTransfer])}
    <p class="hint">${t.bluetoothHint}</p>
  </div>

  <a class="lnk" href="https://app.fujifilm-dsc.com/"><em>${t.officialTag}</em><b>${t.officialTitle}</b><span>${t.officialDesc}</span></a>

  <h2>${t.backupHeading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.way1}</p>
    <p>${t.way2}</p>
    <p>${t.way3}</p>
    <p class="hint">${t.hiccupHint}</p>
    ${chips}
  </div>

  <h2>${t.cardsHeading}</h2>
  <div class="card">
    <p style="margin-top:0">${t.cardsIntro}</p>
    <p>${icon("check-circle")}${t.cardsPhotos}</p>
    <p>${icon("video")}${t.cardsVideos}</p>
    <p>${icon("alert-triangle")}${t.cardsWarn}</p>
    <p class="hint">${t.cardsSettingHint}</p>
    ${dataStorageChip}
  </div>
</section>`;
}
