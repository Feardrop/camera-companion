# X-H2S Companion

Mobile Begleit-Website für die Fujifilm X-H2S: Tutorial, Preset-Guide, Troubleshooting,
durchsuchbares Handbuch, Übungsplan und Notiz-Formular. Zweisprachig — Englisch (Standard) und Deutsch.

## Struktur

Quellcode liegt in `content/` (Seiten-/Daten-Definitionen) und `src/` (statische Browser-Assets); ein kleiner
Node-Build (`node build/build.js`, keine Abhängigkeiten) fügt beides zu **zwei parallelen Baumstrukturen**
zusammen: `docs/` (Englisch, der Ordner, den GitHub Pages tatsächlich veröffentlicht) und `docs/de/`
(Deutsch). Beide verwenden dieselben (englischen) Dateinamen — nur der Inhalt unterscheidet sich. **Nach
jeder Änderung unter `content/` oder `src/` einmal den Build laufen lassen**, bevor committet wird. Siehe
`CLAUDE.md` für die vollständige Architektur-Doku (inkl. i18n-Mechanismus).

```
content/pages.js            Seitenliste (Datei, Slug, Icon, zweisprachiges Label/Titel, Tab-Zugehörigkeit)
content/data/*.js            Strukturierte Inhalte (Presets, SOS, Übungen, Tutorial, Menüwege, RAW-Einstellungen, …) — jedes Feld {de,en}
content/i18n/strings.js       Laufzeit-UI-Texte (Such-Dialog, Speichern-Meldung, …), {de,en}
content/pages/*.js           Ein Modul pro Ausgabeseite (render(locale) + benötigte <script>-Tags)
build/build.js                Build-Einstiegspunkt: content/ + src/ → docs/ (en) + docs/de/ (de)
build/lib/i18n.js              localize(value, locale) — löst {de,en}-Paare zur Build-Zeit auf
src/css/style.css             zentrales Stylesheet (Design-Tokens in :root, für beide Sprachen identisch)
src/js/ui.js                   Storage-Helfer, openPage()-Weiterleitung, Sprach-Umschaltung, Service-Worker-Registrierung
src/js/<seite>.js              Interaktions-Logik der jeweiligen Seite
src/js/vendor/pdfjs/            vendorte PDF.js-Bibliothek (In-App-PDF-Ansicht im Handbuch)
src/manual-de.pdf               vendorte offizielle Handbuch-PDF (deutsch)
src/manual-en.pdf               vendorte offizielle Handbuch-PDF (englisch)
src/data/manual-de.js           Volltext des dt. Handbuchs als JS-Array (404 Seiten, ~450 KB)
src/data/manual-en.js           Volltext des engl. Handbuchs als JS-Array (404 Seiten, ~410 KB)
src/icons/                      App-Icons (192/512/maskable/apple-touch)
src/fonts/                      vendorte Web-Fonts (Fraunces, IBM Plex Sans/Mono), SIL OFL 1.1
build/lib/partials/icons.js    SVG-Icon-Set (ersetzt sämtliche Emoji als UI-Symbole)
content/data/manifest.js         PWA-Manifest-Inhalt (Name, Icons, Standalone-Modus), zweisprachig
docs/                             GENERIERT — nicht von Hand bearbeiten, wird bei jedem Build überschrieben
```

## Konventionen

- **Seiten-Deep-Link ins Handbuch:** `manual.html?page=220` öffnet gedruckte Seite 220 (optional
  `&q=Suchwort` markiert und scrollt zum Treffer in der PDF-Ansicht). Von anderen Seiten aus einfach
  `openPage(220)` aufrufen (ui.js leitet weiter).
- **Seitenzahlen:** gedruckte Seite = PDF-Seite − 24 (`OFFSET`, identisch in beiden Sprachen — verifiziert
  gegen beide vendorten PDFs, siehe unten).
- **Speicher:** localStorage mit Präfix `xh2s_` (Übungen: `xh2s_ex`, Notizen: `xh2s_fields`, Sprachwahl:
  `xh2s_lang`). Beide Sprach-Bäume teilen sich dieselbe Domain/denselben Origin und damit denselben
  localStorage. Funktioniert erst, wenn die Seiten über http(s) oder file:// im Browser laufen.
- **Design-Tokens** (Farben, Fonts, Abstände, Ecken-Radien) stehen in `:root` in style.css.
- **Version:** `package.json`'s `version`-Feld ist die einzige Quelle — wird auf der "About"/"Über"-Seite
  angezeigt und fließt automatisch in den Service-Worker-Cache-Namen ein (siehe unten). Eine Versionsnummer
  gilt für beide Sprach-Bäume.

## Sprache / i18n

Englisch ist Standard (`docs/`), Deutsch ein vollständiger Parallelbaum (`docs/de/`) mit identischen
Dateinamen. Erkennung: Beim ersten Besuch einer englischen Seite prüft `ui.js`, ob `navigator.language`
mit `de` beginnt und noch keine Präferenz gespeichert ist (`xh2s_lang`) — falls ja, einmaliger Redirect nach
`docs/de/`. Auf der About-Seite gibt es außerdem einen manuellen Umschalter. Details und der komplette
Übersetzungsmechanismus (`{de,en}`-Paare + `localize()`) stehen in `CLAUDE.md`.

Das Handbuch (Text **und** PDF) ist vollständig zweisprachig und komplett offline nutzbar — beide offiziellen
PDFs (`src/manual-de.pdf`, `src/manual-en.pdf`) liegen direkt im Repo, keine Netzverbindung zu Fujifilm mehr
nötig. Siehe "Handbuch-Text aktualisieren" unten.

## Als App installieren (PWA)

Die Site ist eine installierbare Web-App (Manifest + Service Worker, komplett offline-fähig):

- **Android (Chrome):** Seite öffnen → Menü ⋮ → „App installieren" / „Zum Startbildschirm hinzufügen".
- **iPhone (Safari):** Seite öffnen → Teilen-Symbol → „Zum Home-Bildschirm".

Voraussetzung: Auslieferung über **https** (GitHub Pages erfüllt das). Der Service Worker
(`sw.js`, je Sprach-Baum) precached alle Seiten und Assets — nach dem ersten Besuch funktioniert alles offline.
Die `CACHE`-Version wird beim Build automatisch aus `package.json`'s `version` plus einem Inhalts-Hash
erzeugt — kein manuelles Hochzählen einer Konstante mehr nötig. Zum bewussten Auslösen eines Cache-Resets
(z. B. bei einer echten neuen Version) einfach die `version` in `package.json` hochzählen und neu bauen.

## Veröffentlichen (GitHub Pages)

Unter **Settings → Pages → Deploy from a branch** den Branch und als Ordner **`/docs`** wählen (nicht
„/ (root)"). GitHub Pages unterstützt ohne eigenen GitHub-Actions-Workflow nur „/" oder „/docs" als
Veröffentlichungsordner — deshalb heißt der generierte Ausgabeordner bewusst `docs/`. `docs/de/` liegt als
Unterordner darin und wird automatisch mitveröffentlicht. Alle Pfade darin sind relativ — die Site läuft auch
lokal per Doppelklick auf `docs/index.html` bzw. `docs/de/index.html`.

## Handbuch-Text aktualisieren

Beide PDFs sind im Repo vendort (`src/manual-de.pdf`, `src/manual-en.pdf` — offizielle Fujifilm-Dokumente,
nicht generiert). Bei einer neuen PDF-Version (z. B. nach einem Firmware-Update) die passende Datei ersetzen
und den Text neu extrahieren:

```
pdftotext -layout src/manual-de.pdf -   # bzw. src/manual-en.pdf
```

Pro Seite (getrennt durch Form Feed `\f`) jede Zeile auf einzelne Leerzeichen normalisieren (mehrfache
Leerzeichen zu einem zusammenfassen, leere Zeilen verwerfen) und als JS-Array in `src/data/manual-de.js` bzw.
`manual-en.js` schreiben (`const MANUAL = [...]; const OFFSET = 24;`), dann `node build/build.js` laufen
lassen. `OFFSET` ist für beide aktuellen PDF-Ausgaben identisch (24, seitengenau verifiziert) — nach einem PDF-
Austausch sicherheitshalber neu prüfen, bevor man sich auf die gemeinsame Seitenzahlen-Liste in
`content/pages/manual.js`/`reference.js`/`connection.js` verlässt.
