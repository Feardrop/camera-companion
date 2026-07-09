# X-H2S Reisebegleiter

Mobile Begleit-Website für die Fujifilm X-H2S: Tutorial, Preset-Guide, Troubleshooting,
durchsuchbares Handbuch (deutscher Volltext), Übungsplan und Notiz-Formular.

## Struktur

```
index.html        Startseite: Überblick, Schnellzugriff, geführter Weg, Tutorial
presets.html      Modusrad C1–C7, Situationswahl, Auto-Update-Hinweise
sos.html          Erste Hilfe nach Symptomen (15 häufige Probleme)
handbuch.html     Volltextsuche im dt. Handbuch + Kapitel-Sprungmarken + PDF-Download
uebungen.html     6 abhakbare Übungen (Fortschritt in localStorage)
mehr.html         Belegung notieren, XApp, Sichern unterwegs, Bildformate,
                  Karten-Backup, Spickzettel, Menüwege, Links
assets/css/style.css      zentrales Stylesheet (Design-Tokens in :root)
assets/js/ui.js           Header/Navigation, go(), openPage()-Weiterleitung, Storage-Helfer
assets/js/<seite>.js      Logik der jeweiligen Seite
assets/data/manual-de.js  Volltext des dt. Handbuchs als JS-Array (404 Seiten, ~450 KB)
assets/icons/             App-Icons (192/512/maskable/apple-touch)
manifest.webmanifest      PWA-Manifest (Name, Icons, Standalone-Modus)
sw.js                     Service Worker (Precache + Offline-Betrieb)
```

## Konventionen

- **Seiten-Deep-Link ins Handbuch:** `handbuch.html?page=220` öffnet gedruckte Seite 220.
  Von anderen Seiten aus einfach `openPage(220)` aufrufen (ui.js leitet weiter).
- **Seitenzahlen:** gedruckte Seite = PDF-Seite − 24 (`OFFSET` in manual-de.js).
- **Speicher:** localStorage mit Präfix `xh2s_` (Übungen: `xh2s_ex`, Belegung: `xh2s_fields`).
  Funktioniert erst, wenn die Seiten über http(s) oder file:// im Browser laufen.
- **Design-Tokens** (Farben, Fonts) stehen in `:root` in style.css.

## Als App installieren (PWA)

Die Site ist eine installierbare Web-App (Manifest + Service Worker, komplett offline-fähig):

- **Android (Chrome):** Seite öffnen → Menü ⋮ → „App installieren" / „Zum Startbildschirm hinzufügen".
- **iPhone (Safari):** Seite öffnen → Teilen-Symbol → „Zum Home-Bildschirm".

Voraussetzung: Auslieferung über **https** (GitHub Pages erfüllt das). Der Service Worker
(`sw.js`) precached alle Seiten und Assets — nach dem ersten Besuch funktioniert alles offline.
**Wichtig beim Deployen:** die `CACHE`-Version in `sw.js` hochzählen (z. B. `xh2s-v2`),
sonst sehen installierte Apps alte Inhalte.

## Veröffentlichen (GitHub Pages)

Der Inhalt dieses Ordners muss das Wurzelverzeichnis der veröffentlichten Site sein
(index.html zuoberst). Bei einem `src`-Ordner im Repo: unter Settings → Pages entweder
den Branch-Ordner entsprechend wählen oder die Dateien in den Pages-Stammordner legen.
Alle Pfade sind relativ — die Site läuft auch lokal per Doppelklick auf index.html.

## Handbuch-Text aktualisieren

`pdftotext -layout x-h2s_manual_de_s_f.pdf -` je Seite splitten (Form Feed `\f`) und als
JSON-Array in `assets/data/manual-de.js` schreiben (`const MANUAL = [...]; const OFFSET = 24;`).
