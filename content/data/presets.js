import { RAW_KONV_LINK } from "./facts.js";

// Mode-dial C1–C7 + the standard video preset. Rendered into static preset
// cards at build time; assets/js/presets.js only handles the click-to-filter
// interaction on the already-rendered markup, it no longer builds this list.
// Every translatable field is {de,en}; build/lib/i18n.js's localize()
// resolves it per locale before content/pages/presets.js templates it.
// `swatch` is a CSS gradient standing in for the sample photography a film
// simulation would normally show — locale-invariant (color, not copy), and
// loosely modeled on each simulation's actual color science (see
// CLAUDE.md's "Design system" section): Acros greyscale, Classic Neg warm
// amber, Pro Neg Hi neutral skin tones, Astia soft nature tones, Eterna
// desaturated cinema teal.
export const PRESETS = [
  { id: "C1", v: false,
    swatch: "linear-gradient(180deg,#5a5a5a,#111)",
    look: { de: "ACROS · Schwarzweiß", en: "ACROS · black & white" },
    title: { de: "Kräftiges Schwarzweiß", en: "Bold black & white" },
    use: { de: "Architektur, Straßenszenen, ausdrucksstarke Porträts, dramatisches Licht.",
           en: "Architecture, street scenes, expressive portraits, dramatic light." },
    note: { de: `Nicht wundern: Sucherbild ist absichtlich schwarzweiß. RAW behält die Farben — <a href='${RAW_KONV_LINK}'>nachträglich in der Kamera zurückholen</a>.`,
            en: `Don't worry — the viewfinder image is deliberately black & white on purpose. The RAW file keeps all the colors — <a href='${RAW_KONV_LINK}'>bring them back in-camera afterwards</a>.` } },
  { id: "C2", v: false,
    swatch: "linear-gradient(180deg,#e0a865,#8a5a2c)",
    look: { de: "CLASSIC NEG. · warm · +1 EV", en: "CLASSIC NEG. · warm · +1 EV" },
    title: { de: "„Cuban“ — warmer Analog-Look", en: "“Cuban” — warm analog look" },
    use: { de: "Urlaubsstimmung, Straßen, Cafés, goldenes Abendlicht.",
           en: "Vacation mood, streets, cafés, golden-hour light." },
    note: { de: "Belichtet bewusst +1 heller. Wirkt das Bild ZU hell: Korrektur Richtung 0 drehen (und wegen Auto-Update später wieder auf +1 zurück).",
            en: "Deliberately exposed +1 brighter. If a shot looks TOO bright, dial the correction back toward 0 (and remember to set it back to +1 afterwards — Auto Update keeps whatever you last dialed in)." } },
  { id: "C3", v: false,
    swatch: "linear-gradient(180deg,#d9b48f,#9c6b4a)",
    look: { de: "PRO NEG. HI · neutral", en: "PRO NEG. HI · neutral" },
    title: { de: "Porträts &amp; Allrounder", en: "Portraits &amp; all-rounder" },
    use: { de: "Menschen, Gruppen — und der sichere Startpunkt, wenn du unsicher bist.",
           en: "People, groups — and the safe default whenever you're not sure what to pick." },
    note: { de: "Natürliche Hauttöne. Fokusfeld mit dem Joystick aufs Gesicht schieben.",
            en: "Natural skin tones. Nudge the focus point onto the face with the joystick." } },
  { id: "C4", v: false,
    swatch: "linear-gradient(180deg,#c9b978,#748a52)",
    look: { de: "ASTIA · Serie ~30 B/s · Pre-Shot · Tier/Vogel-AF", en: "ASTIA · ~30 fps burst · pre-shot · animal/bird AF" },
    title: { de: "Tiere, Vögel &amp; Action", en: "Animals, birds &amp; action" },
    use: { de: "Wildtiere, Vögel im Flug, spielende Kinder, Sport.",
           en: "Wildlife, birds in flight, kids playing, sports." },
    note: { de: "Halb drücken &amp; Motiv verfolgen — die Kamera puffert schon Bilder VOR dem Durchdrücken. Erzeugt viele Fotos: Karte im Blick behalten! Fn1 schaltet die Tiererkennung an/aus; die Motiv-Art (Tier/Vogel) wählst du im Q-Menü.",
            en: "Half-press and track the subject — the camera buffers frames BEFORE you fully press the shutter. This produces a lot of photos, so keep an eye on your card. Fn1 toggles animal detection on/off; pick the subject type (animal/bird) in the Q menu." } },
  { id: "C5", v: false,
    swatch: "linear-gradient(180deg,#b8c48a,#647a4a)",
    look: { de: "vermutlich ähnlich C4 · Tier/Vogel-AF", en: "likely similar to C4 · animal/bird AF" },
    title: { de: "Tiere &amp; Action (zweite Variante)", en: "Animals &amp; action (second variant)" },
    use: { de: "Zweite Action-Belegung — oft eine Variante von C4 (z. B. andere Serienbild-Geschwindigkeit oder Verschlusszeit), Werksbelegung ist aber nicht einheitlich.",
           en: "A second action slot — often a variant of C4 (e.g. a different burst speed or shutter speed), though the factory default isn't consistent across cameras." },
    note: { de: "Diese Kamera liefert C4 und C5 oft mit ähnlicher, ergänzender Belegung aus. Rad auf C5 drehen, <span class=\"osd\">Q</span> drücken und die echte Belegung prüfen — dann auf der Seite „Belegung“ eintragen.",
            en: "This camera often ships C4 and C5 with similar, complementary settings. Turn the dial to C5, press <span class=\"osd\">Q</span> and check the real settings — then note them down on the “My Setup” page." } },
  { id: "C6", v: true,
    swatch: "linear-gradient(180deg,#6f9c94,#2c4a48)",
    look: { de: "4K 100p · ETERNA", en: "4K 100p · ETERNA" },
    title: { de: "Zeitlupe (4×)", en: "Slow motion (4×)" },
    use: { de: "Wasser, Tiere in Bewegung, Sport — alles, was in Zeitlupe magisch wird.",
           en: "Water, animals in motion, sports — anything that turns magical in slow motion." },
    note: { de: "Nur im MOVIE-Modus. Braucht viel Licht, Speicher und Akku; bei Hitze Pausen machen.",
            en: "MOVIE mode only. Needs plenty of light, storage and battery — take breaks if the camera gets hot." } },
  { id: "C7", v: true,
    swatch: "linear-gradient(180deg,#7a92a0,#37505c)",
    look: { de: "4K 50p · ETERNA", en: "4K 50p · ETERNA" },
    title: { de: "Video für Bewegung", en: "Video for motion" },
    use: { de: "Bewegte Szenen; lässt sich im Schnitt auf halbe Geschwindigkeit bremsen.",
           en: "Scenes with motion; can be slowed to half speed in editing." },
    note: { de: "Nur im MOVIE-Modus.", en: "MOVIE mode only." } },
  { id: "VID", v: true,
    swatch: "linear-gradient(180deg,#8aa0a8,#425a62)",
    videoLabel: { de: "Video-Standard", en: "Video default" },
    look: { de: "4K 25p · ETERNA", en: "4K 25p · ETERNA" },
    title: { de: "Standard-Video", en: "Standard video" },
    use: { de: "Ruhige Szenen, Schwenks, Erzählendes — der normale filmische Look.",
           en: "Calm scenes, pans, narrative shots — the everyday cinematic look." },
    note: { de: "Ruhige, langsame Kamerabewegungen sehen am besten aus.",
            en: "Slow, steady camera movement looks best." } },
];
