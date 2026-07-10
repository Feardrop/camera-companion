# X-H2S Reisebegleiter

Mobile Begleit-Website für die Fujifilm X-H2S: Tutorial, Preset-Guide, Troubleshooting,
durchsuchbares Handbuch (deutscher Volltext), Übungsplan und Notiz-Formular.

## Struktur

Quellcode liegt in `content/` (Seiten-/Daten-Definitionen) und `src/` (statische Browser-Assets); ein kleiner
Node-Build (`node build/build.js`, keine Abhängigkeiten) fügt beides zu `docs/` zusammen — dem Ordner, den
GitHub Pages tatsächlich veröffentlicht. **Nach jeder Änderung unter `content/` oder `src/` einmal den Build
laufen lassen**, bevor committet wird. Siehe `CLAUDE.md` für die vollständige Architektur-Doku.

```
content/pages.js          Seitenliste (Datei, Slug, Icon, Label, Tab-Zugehörigkeit)
content/data/*.js          Strukturierte Inhalte (Presets, SOS, Übungen, Tutorial, Menüwege, RAW-Einstellungen, …)
content/pages/*.js         Ein Modul pro Ausgabeseite (render() + benötigte <script>-Tags)
build/build.js              Build-Einstiegspunkt: content/ + src/ → docs/
src/css/style.css           zentrales Stylesheet (Design-Tokens in :root)
src/js/ui.js                 Storage-Helfer, openPage()-Weiterleitung, Service-Worker-Registrierung
src/js/<seite>.js            Interaktions-Logik der jeweiligen Seite
src/js/vendor/pdfjs/           vendorte PDF.js-Bibliothek (In-App-PDF-Ansicht im Handbuch)
src/data/manual-de.js         Volltext des dt. Handbuchs als JS-Array (404 Seiten, ~450 KB)
src/icons/                     App-Icons (192/512/maskable/apple-touch)
src/manifest.webmanifest        PWA-Manifest (Name, Icons, Standalone-Modus)
docs/                            GENERIERT — nicht von Hand bearbeiten, wird bei jedem Build überschrieben
```

## Konventionen

- **Seiten-Deep-Link ins Handbuch:** `handbuch.html?page=220` öffnet gedruckte Seite 220 (optional
  `&q=Suchwort` markiert und scrollt zum Treffer in der PDF-Ansicht). Von anderen Seiten aus einfach
  `openPage(220)` aufrufen (ui.js leitet weiter).
- **Seitenzahlen:** gedruckte Seite = PDF-Seite − 24 (`OFFSET` in manual-de.js).
- **Speicher:** localStorage mit Präfix `xh2s_` (Übungen: `xh2s_ex`, Belegung: `xh2s_fields`).
  Funktioniert erst, wenn die Seiten über http(s) oder file:// im Browser laufen.
- **Design-Tokens** (Farben, Fonts, Abstände, Ecken-Radien) stehen in `:root` in style.css.
- **Version:** `package.json`'s `version`-Feld ist die einzige Quelle — wird auf der Seite „Über" angezeigt
  und fließt automatisch in den Service-Worker-Cache-Namen ein (siehe unten).

## Als App installieren (PWA)

Die Site ist eine installierbare Web-App (Manifest + Service Worker, komplett offline-fähig):

- **Android (Chrome):** Seite öffnen → Menü ⋮ → „App installieren" / „Zum Startbildschirm hinzufügen".
- **iPhone (Safari):** Seite öffnen → Teilen-Symbol → „Zum Home-Bildschirm".

Voraussetzung: Auslieferung über **https** (GitHub Pages erfüllt das). Der Service Worker
(`sw.js`) precached alle Seiten und Assets — nach dem ersten Besuch funktioniert alles offline.
Die `CACHE`-Version wird beim Build automatisch aus `package.json`'s `version` plus einem Inhalts-Hash
erzeugt — kein manuelles Hochzählen einer Konstante mehr nötig. Zum bewussten Auslösen eines Cache-Resets
(z. B. bei einer echten neuen Version) einfach die `version` in `package.json` hochzählen und neu bauen.

## Veröffentlichen (GitHub Pages)

Unter **Settings → Pages → Deploy from a branch** den Branch und als Ordner **`/docs`** wählen (nicht
„/ (root)"). GitHub Pages unterstützt ohne eigenen GitHub-Actions-Workflow nur „/" oder „/docs" als
Veröffentlichungsordner — deshalb heißt der generierte Ausgabeordner bewusst `docs/`. Alle Pfade darin sind
relativ — die Site läuft auch lokal per Doppelklick auf `docs/index.html`.

## Handbuch-Text aktualisieren

`pdftotext -layout x-h2s_manual_de_s_f.pdf -` je Seite splitten (Form Feed `\f`) und als
JSON-Array in `src/data/manual-de.js` schreiben (`const MANUAL = [...]; const OFFSET = 24;`), dann
`node build/build.js` laufen lassen.
