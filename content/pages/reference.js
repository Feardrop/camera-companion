import { PAGES } from "../pages.js";
import { FACTS, MANUAL_PDF_URL } from "../data/facts.js";
import { MENU_PATHS } from "../data/menu-paths.js";
import { RAW_SETTINGS } from "../data/raw-settings.js";
import { localize } from "../../build/lib/i18n.js";
import { renderSteps } from "../../build/lib/content-helpers.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  cheatSheet: { de: "Spickzettel", en: "Cheat sheet" },
  autoUpdateFact: { de: "<b>Presets speichern Änderungen automatisch</b> (Auto-Update AN). Q-Menü zeigt den Ist-Zustand; Soll-Zustand steht auf der Seite „Belegung“. Schutzmodus:",
                    en: "<b>Presets save changes automatically</b> (Auto Update ON). The Q menu shows the current state; the intended state lives on the “My Setup” page. Protected mode:" },
  triangleFact: { de: "<b>Belichtungsdreieck:</b> Blende (klein = unscharfer Hintergrund) · Zeit (kurz = Bewegung einfrieren) · ISO (hoch = heller, aber körniger).",
                  en: "<b>Exposure triangle:</b> aperture (small number = blurry background) · shutter speed (fast = freezes motion) · ISO (higher = brighter but grainier)." },
  exposureFact: { de: "<b>Bild zu hell/dunkel:</b> zuerst Belichtungskorrektur (±) prüfen.", en: "<b>Shot too bright/dark:</b> check exposure correction (±) first." },
  modeAFact: { de: "<b>Modus A</b> = du wählst die Blende, Kamera den Rest. Der beste erste Schritt aus den Presets.",
               en: "<b>Mode A</b> = you choose the aperture, the camera handles the rest. The best first step away from the presets." },
  menuPathsHeading: { de: "Wichtige Menüwege", en: "Key menu paths" },
  formatsHeading: { de: "Bildformate &amp; RAW-Entwicklung", en: "Image formats &amp; RAW development" },
  whatIsWhat: { de: "Was ist was?", en: "What's what?" },
  rawDef: { de: "<b>RAW</b> — das digitale Negativ: alle Sensordaten, riesige Reserven für die Nachbearbeitung, muss aber „entwickelt“ werden (in der Kamera, s.&nbsp;u., oder am Rechner). Für wichtige Bilder und schwieriges Licht.",
            en: "<b>RAW</b> — the digital negative: all the sensor data, huge headroom for editing, but it has to be “developed” (in the camera, see below, or on a computer). For images that matter and tricky light." },
  jpegDef: { de: "<b>JPEG</b> — das klassische fertige Bild (8&nbsp;Bit). Überall kompatibel, aber technisch überholt.",
             en: "<b>JPEG</b> — the classic finished image (8-bit). Compatible everywhere, but technically dated." },
  heifDef: { de: "<b>HEIF</b> — der moderne JPEG-Nachfolger (10&nbsp;Bit Farbtiefe): sichtbar mehr Qualitätsreserven bei kleineren Dateien. iPhone, Mac und aktuelles Windows zeigen HEIF direkt an.",
             en: "<b>HEIF</b> — the modern JPEG successor (10-bit color depth): noticeably more quality headroom at smaller file sizes. iPhone, Mac and current Windows display HEIF natively." },
  howToUse: { de: "<b>Wie nutzt du was?</b> Alltag: <b>HEIF</b>. Wichtige Motive / kniffliges Licht: <b>RAW&nbsp;+&nbsp;HEIF</b> (beides wird gespeichert). JPEG nur, falls ein altes Gerät oder ein Webdienst HEIF nicht annimmt — oder per RAW-Konvertierung nachträglich erzeugen.",
             en: "<b>How to use which?</b> Everyday: <b>HEIF</b>. Important subjects / tricky light: <b>RAW&nbsp;+&nbsp;HEIF</b> (both get saved). JPEG only if an old device or web service won't accept HEIF — or generate one afterwards via RAW conversion." },
  whereToSet: { de: "Wo einstellen?", en: "Where to set this?" },
  formatLine: {
    de: `Format: <span class="osd">${"${jpegHeif}"}</span> (S.&nbsp;129)<br>
      RAW dazu: <span class="osd">MENU → IQ → BILDQUALITÄT → z.&nbsp;B. RAW+</span> (S.&nbsp;127)<br>
      RAW-Kompression: <span class="osd">MENU → IQ → RAW-AUFNAHME</span> (S.&nbsp;128, „verlustfrei komprimiert“ ist ein guter Standard)`,
    en: `Format: <span class="osd">${"${jpegHeif}"}</span><br>
      RAW too: <span class="osd">MENU → IQ → IMAGE QUALITY → e.g. RAW+</span><br>
      RAW compression: <span class="osd">MENU → IQ → RAW RECORDING</span> (“lossless compressed” is a good default)`,
  },
  developHeading: { de: "RAW in der Kamera entwickeln", en: "Developing RAW in the camera" },
  developIntro: { de: "— ohne Computer, direkt auf der Reise:", en: "— no computer needed, right on the trip:" },
  step1: { de: `Bild in der Wiedergabe anzeigen (RAW-Symbol) → <span class="osd">MENU/OK → RAW-KONVERTIERUNG</span>`,
           en: `Show the image in playback (RAW icon) → <span class="osd">MENU/OK → RAW CONVERSION</span>` },
  step2: { de: `<b>Zuerst DATEITYP auf HEIF stellen</b> — legt das Ausgabeformat der Kopie fest.`,
           en: `<b>Set FILE FORMAT to HEIF first</b> — this decides the copy's output format.` },
  step3: { de: `Weitere Einstellungen nach Bedarf anpassen (Fokushebel: markieren → rechts öffnet Optionen → wählen → MENU/OK bestätigt; Liste aller Einstellungen unten).`,
           en: `Adjust any other settings you need (focus lever: highlight → right opens options → choose → MENU/OK confirms; full list of settings below).` },
  step4: { de: `Taste <span class="osd">Q</span> zeigt eine Vorschau der Kopie.`, en: `The <span class="osd">Q</span> button shows a preview of the copy.` },
  step5: { de: `<span class="osd">MENU/OK</span> speichert die Kopie als neue Datei — das Original-RAW bleibt unverändert erhalten.`,
           en: `<span class="osd">MENU/OK</span> saves the copy as a new file — the original RAW stays unchanged.` },
  step2Hint: { de: "<b>Wichtig: Schritt 2 immer zuerst.</b> Wird DATEITYP nicht umgestellt, entsteht aus Versehen ein altes JPEG statt eines hochwertigen HEIF — unabhängig davon, was du sonst noch änderst.",
               en: "<b>Important: always do step 2 first.</b> If FILE FORMAT isn't changed, you accidentally get an old-style JPEG instead of a high-quality HEIF — regardless of what else you change." },
  bwHint: { de: "So wird z.&nbsp;B. aus einem C1-Schwarzweiß-RAW nachträglich doch ein Farbbild: FILMSIMULATION in Schritt 3 auf PROVIA o.&nbsp;ä. wechseln.",
            en: "This is also how a C1 black &amp; white RAW can become a color image after the fact: switch FILM SIMULATION to PROVIA or similar in step 3." },
  allSettingsSummary: { de: "Alle RAW-Konvertierungs-Einstellungen erklärt", en: "Every RAW-conversion setting explained" },
  notAllAvailable: { de: "Nicht jede Einstellung steht immer zur Verfügung — abhängig davon, wie das Bild aufgenommen wurde.",
                      en: "Not every setting is always available — it depends on how the image was shot." },
  chipRawConv: { de: "📖 Handbuch: RAW-Konvertierung · S. 220", en: "📖 Manual: RAW conversion" },
  chipJpegHeif: { de: "📖 Handbuch: JPEG/HEIF · S. 129", en: "📖 Manual: JPEG/HEIF" },
  chipExercise: { de: "✓ Übung: RAW-Konvertierung üben", en: "✓ Exercise: practice RAW conversion" },
  chipSos: { de: "✚ SOS: Bilder plötzlich schwarzweiß", en: "✚ SOS: shots suddenly black &amp; white" },
  manualsHeading: { de: "Handbücher", en: "Manuals" },
  officialManualTag: { de: "PDF · DEUTSCH", en: "PDF" },
  officialManualTitle: { de: "Offizielles Handbuch (deutsch)", en: "Official manual" },
  officialManualDesc: { de: "Download, 7 MB — mit allen Abbildungen, offline nutzbar", en: "Download — with every illustration, works offline (page numbers not yet verified against this app)" },
  webManualTag: { de: "WEB · EN", en: "WEB" },
  webManualTitle: { de: "Online-Handbuch X-H2S", en: "Online manual, X-H2S" },
  webManualDesc: { de: "Durchsuchbar, handyfreundlich", en: "Searchable, phone-friendly" },
  manualNote: { de: "Der Volltext des deutschen Handbuchs steckt auf der Seite „Handbuch“ (Suche funktioniert offline); das PDF mit Abbildungen gibt es dort per Download-Button.",
                en: "The manual text lives on the “Manual” page (search works offline); the PDF with illustrations is available there via the download button." },
  introPdfTag: { de: "PDF · DEUTSCH", en: "PDF · GERMAN" },
  introPdfTitle: { de: "Einführung &amp; Lernpfad (16 Seiten)", en: "Introduction &amp; Learning Path (16 pages)" },
  introPdfDesc: { de: "Das ausführliche Begleitdokument zu dieser Website", en: "The detailed companion document to this site (German only)" },
  videosDeHeading: { de: "Videos: Deutsch", en: "Videos: German" },
  videosEnHeading: { de: "Videos &amp; Guides: Englisch", en: "Videos &amp; guides: English" },
  ytMust: { de: "YOUTUBE · PFLICHT", en: "YOUTUBE · MUST-WATCH" },
  yt: { de: "YOUTUBE", en: "YOUTUBE" },
  vid1title: { de: "Die Presets C1–C7 erklärt", en: "The C1–C7 presets explained" },
  vid1desc: { de: "Genau das System dieser Kamera", en: "Exactly this camera's preset system" },
  vid2title: { de: "Autofokus-Tipps X-H2/X-H2S", en: "Autofocus tips, X-H2/X-H2S" },
  vid2desc: { de: "Fokusmodi &amp; Motiverkennung (Fujifilm DE)", en: "Focus modes &amp; subject detection (Fujifilm Germany)" },
  vid3title: { de: "Custom Settings erklärt (fuji-store.de)", en: "Custom settings explained (fuji-store.de)" },
  vid3desc: { de: "Benutzereinstellungen vertieft", en: "A deeper look at custom settings" },
  vid4title: { de: "Einstellungs-Kurs X-T5/X-H2(s)", en: "Settings course, X-T5/X-H2(s)" },
  vid4desc: { de: "Menüpunkt für Menüpunkt (Pixelcatcher)", en: "Menu item by menu item (Pixelcatcher)" },
  pal2techVidTitle: { de: "pal2tech: Recommended Settings", en: "pal2tech: Recommended Settings" },
  pal2techVidDesc: { de: "Der beste Fuji-Erklärkanal, ruhiges Englisch", en: "The best Fuji explainer channel, calm and clear English" },
  pal2techGuideTitle: { de: "pal2tech: alle Schritt-für-Schritt-Guides", en: "pal2tech: all step-by-step guides" },
  pal2techGuideDesc: { de: "PASM-Rad, Zonen-AF, Back-Button-Fokus u.v.m.", en: "PASM dial, zone AF, back-button focus and more" },
  peltierTag: { de: "KURS · DE-UNTERTITEL", en: "COURSE" },
  peltierTitle: { de: "Peltier: X-H2/X-H2S Komplettkurs", en: "Peltier: X-H2/X-H2S full course" },
  peltierDesc: { de: "Strukturierter Videokurs mit deutschen Untertiteln", en: "A structured video course (German subtitles available)" },
};

export function render(locale) {
  const t = localize(T, locale);
  const facts = localize(FACTS, locale);
  const menuRows = localize(MENU_PATHS, locale).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("\n    ");
  const rawSettingRows = localize(RAW_SETTINGS, locale).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("\n        ");
  const formatLine = t.formatLine.replace("${jpegHeif}", facts.jpegHeifPath);
  const manualPdfUrl = MANUAL_PDF_URL[locale];

  // Manual chapter chips carry printed-PDF page numbers from the German
  // manual; the English PDF's real pagination hasn't been confirmed yet (see
  // CLAUDE.md), so those two chips are German-only for now.
  const pageChips = locale === "de"
    ? `<button class="chip" onclick="openPage(220)">${t.chipRawConv}</button>
    <button class="chip" onclick="openPage(129)">${t.chipJpegHeif}</button>`
    : "";

  const videosDe = `<h2>${t.videosDeHeading}</h2>
  <a class="lnk" href="https://www.youtube.com/watch?v=2gh4e6giFfQ"><em>${t.ytMust}</em><b>${t.vid1title}</b><span>${t.vid1desc}</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=IcCmSHWJ3VU"><em>${t.ytMust}</em><b>${t.vid2title}</b><span>${t.vid2desc}</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=4VF3JrYjaPs"><em>${t.yt}</em><b>${t.vid3title}</b><span>${t.vid3desc}</span></a>
  <a class="lnk" href="https://www.youtube.com/watch?v=fI3uVUQVMPI"><em>${t.yt}</em><b>${t.vid4title}</b><span>${t.vid4desc}</span></a>`;

  const videosEn = `<h2>${t.videosEnHeading}</h2>
  <a class="lnk" href="https://pal2tech.com/videos/2022/10/14/2022-fujifilm-xh2s-and-xh2-recommended-settings-for-setup"><em>VIDEO · EN</em><b>${t.pal2techVidTitle}</b><span>${t.pal2techVidDesc}</span></a>
  <a class="lnk" href="https://pal2tech.com/guides/"><em>TEXT · EN</em><b>${t.pal2techGuideTitle}</b><span>${t.pal2techGuideDesc}</span></a>
  <a class="lnk" href="https://www.peltierphotocourses.com/courses/fujifilm-xh2-xh2s-tutorial"><em>${t.peltierTag}</em><b>${t.peltierTitle}</b><span>${t.peltierDesc}</span></a>`;

  return `<section id="tab-reference">
  <h2>${t.cheatSheet}</h2>
  <div class="fact">${facts.shutter}</div>
  <div class="fact">${facts.lostInMenu}</div>
  <div class="fact">${t.autoUpdateFact} ${facts.autoUpdateDisablePath}</div>
  <div class="fact">${t.triangleFact}</div>
  <div class="fact">${t.exposureFact}</div>
  <div class="fact">${t.modeAFact}</div>

  <h2>${t.menuPathsHeading}</h2>
  <table class="mini">
    ${menuRows}
  </table>


  <h2 id="raw-conversion">${t.formatsHeading}</h2>
  <div class="card">
    <p style="margin-top:0"><b>${t.whatIsWhat}</b></p>
    <p>${t.rawDef}</p>
    <p>${t.jpegDef}</p>
    <p>${t.heifDef}</p>
    <p>${t.howToUse}</p>
    <p><b>${t.whereToSet}</b><br>
      ${formatLine}</p>
  </div>

  <div class="card">
    <p style="margin-top:0"><b>${t.developHeading}</b> ${t.developIntro}</p>
    ${renderSteps([t.step1, t.step2, t.step3, t.step4, t.step5])}
    <p class="hint">${t.step2Hint}</p>
    <p class="hint">${t.bwHint}</p>
  </div>

  <details>
    <summary>${t.allSettingsSummary}</summary>
    <div class="body">
      <table class="mini">
        ${rawSettingRows}
      </table>
      <p class="hint">${t.notAllAvailable}</p>
    </div>
  </details>

  <div class="chips" style="margin:10px 0 20px">
    ${pageChips}
    <a class="chip" href="${hrefFor("exercises")}">${t.chipExercise}</a>
    <a class="chip" href="${hrefFor("sos")}">${t.chipSos}</a>
  </div>

  <h2>${t.manualsHeading}</h2>
  <a class="lnk" href="${manualPdfUrl}"><em>${t.officialManualTag}</em><b>${t.officialManualTitle}</b><span>${t.officialManualDesc}</span></a>
  <a class="lnk" href="https://fujifilm-dsc.com/en/manual/x-h2s/"><em>${t.webManualTag}</em><b>${t.webManualTitle}</b><span>${t.webManualDesc}</span></a>
  <p class="mut">${t.manualNote}</p>

  <a class="lnk" href="X-H2S_Einfuehrung_und_Lernpfad.pdf" target="_blank" rel="noopener"><em>${t.introPdfTag}</em><b>${t.introPdfTitle}</b><span>${t.introPdfDesc}</span></a>

  ${locale === "de" ? videosDe + "\n\n  " + videosEn : videosEn + "\n\n  " + videosDe}
</section>`;
}
