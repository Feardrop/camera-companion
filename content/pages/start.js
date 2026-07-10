import { PAGES } from "../pages.js";
import { FACTS } from "../data/facts.js";
import { TUTORIAL } from "../data/tutorial.js";
import { localize } from "../../build/lib/i18n.js";
import { renderBody, renderDetails } from "../../build/lib/content-helpers.js";

const hrefFor = slug => PAGES.find(p => p.slug === slug).file;

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js"];

const T = {
  overview: { de: "Auf einen Blick", en: "At a glance" },
  switchLine: {
    de: "<b>Schalter oben links:</b> <span class=\"osd\">STILL</span> = Foto · <span class=\"osd\">MOVIE</span> = Video (jeweils eigene Presets!).",
    en: "<b>Switch, top left:</b> <span class=\"osd\">STILL</span> = photo · <span class=\"osd\">MOVIE</span> = video (each has its own presets!).",
  },
  dialLine: {
    de: "<b>Modusrad:</b> C1 Schwarzweiß · C2 warm/hell · C3 Porträt/Allround · C4/C5 Tiere &amp; Action · C6 Zeitlupe · C7 Video 50p.",
    en: "<b>Mode dial:</b> C1 black &amp; white · C2 warm/bright · C3 portrait/all-rounder · C4/C5 animals &amp; action · C6 slow motion · C7 video 50p.",
  },
  unsurePreset: { de: "Unsicher, welches Preset? Nimm C3 — damit geht fast nichts schief.", en: "Not sure which preset? Go with C3 — you can barely go wrong with it." },
  quickAccess: { de: "Schnellzugriff", en: "Quick access" },
  navSos: { de: "✚ Problem? SOS", en: "✚ Got a problem? SOS" },
  navPresets: { de: "◎ Preset-Wahl", en: "◎ Choose a preset" },
  navManual: { de: "📖 Handbuch-Suche", en: "📖 Search the manual" },
  navExercises: { de: "✓ Übungen", en: "✓ Exercises" },
  journeyHeading: { de: "Dein Weg durch die App", en: "Your path through the app" },
  step1t: { de: "Grundlagen lernen", en: "Learn the basics" },
  step1d: { de: "Das Tutorial unten auf dieser Seite — 8 kurze Kapitel, je 5–15 Minuten.", en: "The tutorial below on this page — 8 short chapters, 5–15 minutes each." },
  step2t: { de: "Presets kennenlernen", en: "Get to know the presets" },
  step2d: { de: "Welche Rad-Position wofür da ist — und die Auto-Update-Falle verstehen.", en: "Which dial position is for what — and understanding the Auto Update trap." },
  step3t: { de: "Kamera prüfen &amp; eintragen", en: "Check &amp; note your setup" },
  step3d: { de: "Tatsächliche Belegung von C1–C7 und Tasten verifizieren, auf der Seite „Belegung“ notieren, Auto-Update AN/AUS entscheiden.", en: "Verify the real C1–C7 and button assignments, note them on the “My Setup” page, decide Auto Update on/off." },
  step4t: { de: "XApp koppeln + Backup", en: "Pair the XApp + back up" },
  step4d: { de: "Einstellungs-Backup als Sicherheitsnetz, Bildübertragung, Geo-Tagging.", en: "A settings backup as a safety net, image transfer, geo-tagging." },
  step5t: { de: "Üben — vor und auf der Reise", en: "Practice — before and during the trip" },
  step5d: { de: "7 abhakbare Übungen führen dich zum Enthusiasten-Level.", en: "7 checkable exercises take you to enthusiast level." },
  step6t: { de: "Unterwegs bei Problemen", en: "If something goes wrong on the road" },
  step6d: { de: "SOS löst die 15 häufigsten Situationen; für alles andere: Handbuch-Suche.", en: "SOS covers the 15 most common situations; for anything else: search the manual." },
  autoUpdateHeading: { de: "🔁 Auto-Update der Presets: AN oder AUS?", en: "🔁 Preset Auto Update: on or off?" },
  autoUpdateP: {
    de: "Diese Kamera speichert Änderungen automatisch dauerhaft ins aktive C-Preset (<b>Auto-Update = AN</b>). Wer versehentliches Verstellen verhindern will, schaltet es aus — dann springt jedes Preset beim Radwechsel auf den gespeicherten Stand zurück:",
    en: "This camera saves changes into the active C preset automatically and permanently (<b>Auto Update = ON</b>). If you'd rather prevent accidental changes from sticking, turn it off — then every preset snaps back to its saved state when you switch the dial away and back:",
  },
  turnOff: { de: "Ausschalten:", en: "Turn off:" },
  turnOn: { de: "Einschalten:", en: "Turn on:" },
  autoUpdateHint: {
    de: "Empfehlung für den Einstieg: DEAKT. — so kann nichts dauerhaft verstellt werden.",
    en: "Recommended starting point: OFF — so nothing can get permanently changed by accident.",
  },
  tutorialHeading: { de: "Tutorial — Schritt für Schritt", en: "Tutorial — step by step" },
  tutorialIntro: {
    de: "Die Kapitel bauen aufeinander auf. Die ausführliche Fassung mit Tabellen und Handbuch-Verweisen gibt es als <a href=\"X-H2S_Einfuehrung_und_Lernpfad.pdf\" target=\"_blank\" rel=\"noopener\">PDF „Einführung &amp; Lernpfad“</a> zum Nachlesen.",
    en: "The chapters build on each other. A more detailed version with tables and manual cross-references is available as a (German-language) PDF, <a href=\"X-H2S_Einfuehrung_und_Lernpfad.pdf\" target=\"_blank\" rel=\"noopener\">“Einführung &amp; Lernpfad”</a>, for further reading.",
  },
};

export function render(locale) {
  const t = localize(T, locale);
  const facts = localize(FACTS, locale);
  const tutorial = localize(TUTORIAL, locale);
  const chapters = tutorial.map(ch => renderDetails({
    id: ch.id,
    summaryHtml: `${ch.num} · ${ch.title}<span class="sev">${ch.minutes}</span>`,
    bodyHtml: renderBody(ch),
  })).join("\n\n");

  return `<section id="tab-start">
  <h2>${t.overview}</h2>
  <div class="card">
    <p style="margin-top:0">${facts.shutter}</p>
    <p>${t.switchLine}</p>
    <p>${t.dialLine}</p>
    <p>${facts.lostInMenu} <b>${locale === "de" ? "Etwas verstellt?" : "Something off?"}</b> <span class="osd">Q</span> ${locale === "de" ? "zeigt alles auf einen Blick." : "shows everything at a glance."}</p>
    <p class="hint">${t.unsurePreset}</p>
  </div>

  <h2>${t.quickAccess}</h2>
  <div class="quicknav">
    <a href="${hrefFor("sos")}">${t.navSos}</a>
    <a href="${hrefFor("presets")}">${t.navPresets}</a>
    <a href="${hrefFor("manual")}">${t.navManual}</a>
    <a href="${hrefFor("exercises")}">${t.navExercises}</a>
  </div>

  <h2>${t.journeyHeading}</h2>
  <div class="journey">
    <a class="jstep" href="#tut1" onclick="document.getElementById('tut1').open=true">
      <div class="no">1</div><div class="tx"><b>${t.step1t}</b><span>${t.step1d}</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("presets")}">
      <div class="no">2</div><div class="tx"><b>${t.step2t}</b><span>${t.step2d}</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("my-setup")}">
      <div class="no">3</div><div class="tx"><b>${t.step3t}</b><span>${t.step3d}</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("connection")}">
      <div class="no">4</div><div class="tx"><b>${t.step4t}</b><span>${t.step4d}</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("exercises")}">
      <div class="no">5</div><div class="tx"><b>${t.step5t}</b><span>${t.step5d}</span></div><div class="go">›</div>
    </a>
    <a class="jstep" href="${hrefFor("sos")}">
      <div class="no">✚</div><div class="tx"><b>${t.step6t}</b><span>${t.step6d}</span></div><div class="go">›</div>
    </a>
  </div>

  <div class="card">
    <h3>${t.autoUpdateHeading}</h3>
    <p>${t.autoUpdateP}</p>
    <p><b>${t.turnOff}</b> <span class="osd">${facts.autoUpdateDisablePath}</span><br>
       <b>${t.turnOn}</b> <span class="osd">${facts.autoUpdateEnablePath}</span></p>
    <p class="hint">${t.autoUpdateHint} ${facts.autoUpdateOtherLang}</p>
  </div>

  <h2>${t.tutorialHeading}</h2>
  <p class="mut" style="margin:0 0 10px">${t.tutorialIntro}</p>

  ${chapters}
</section>`;
}
