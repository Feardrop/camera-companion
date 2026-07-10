import { RAW_KONV_LINK } from "./facts.js";

// Mode-dial C1–C7 + the standard video preset. Rendered into static preset
// cards at build time; assets/js/presets.js only handles the click-to-filter
// interaction on the already-rendered markup, it no longer builds this list.
export const PRESETS = [
  { id: "C1", v: false, look: "ACROS · Schwarzweiß", title: "Kräftiges Schwarzweiß",
    use: "Architektur, Straßenszenen, ausdrucksstarke Porträts, dramatisches Licht.",
    note: `Nicht wundern: Sucherbild ist absichtlich schwarzweiß. RAW behält die Farben — <a href='${RAW_KONV_LINK}'>nachträglich in der Kamera zurückholen</a>.` },
  { id: "C2", v: false, look: "CLASSIC NEG. · warm · +1 EV", title: "„Cuban“ — warmer Analog-Look",
    use: "Urlaubsstimmung, Straßen, Cafés, goldenes Abendlicht.",
    note: "Belichtet bewusst +1 heller. Wirkt das Bild ZU hell: Korrektur Richtung 0 drehen (und wegen Auto-Update später wieder auf +1 zurück)." },
  { id: "C3", v: false, look: "PRO NEG. HI · neutral", title: "Porträts &amp; Allrounder",
    use: "Menschen, Gruppen — und der sichere Startpunkt, wenn du unsicher bist.",
    note: "Natürliche Hauttöne. Fokusfeld mit dem Joystick aufs Gesicht schieben." },
  { id: "C4", v: false, look: "ASTIA · Serie ~30 B/s · Pre-Shot · Tier/Vogel-AF", title: "Tiere, Vögel &amp; Action",
    use: "Wildtiere, Vögel im Flug, spielende Kinder, Sport.",
    note: "Halb drücken &amp; Motiv verfolgen — die Kamera puffert schon Bilder VOR dem Durchdrücken. Erzeugt viele Fotos: Karte im Blick behalten! Fn1 schaltet die Tiererkennung an/aus; die Motiv-Art (Tier/Vogel) wählst du im Q-Menü." },
  { id: "C5", v: false, look: "vermutlich ähnlich C4 · Tier/Vogel-AF", title: "Tiere &amp; Action (zweite Variante)",
    use: "Zweite Action-Belegung — oft eine Variante von C4 (z. B. andere Serienbild-Geschwindigkeit oder Verschlusszeit), Werksbelegung ist aber nicht einheitlich.",
    note: "Diese Kamera liefert C4 und C5 oft mit ähnlicher, ergänzender Belegung aus. Rad auf C5 drehen, <span class=\"osd\">Q</span> drücken und die echte Belegung prüfen — dann auf der Seite „Mehr“ eintragen." },
  { id: "C6", v: true, look: "4K 100p · ETERNA", title: "Zeitlupe (4×)",
    use: "Wasser, Tiere in Bewegung, Sport — alles, was in Zeitlupe magisch wird.",
    note: "Nur im MOVIE-Modus. Braucht viel Licht, Speicher und Akku; bei Hitze Pausen machen." },
  { id: "C7", v: true, look: "4K 50p · ETERNA", title: "Video für Bewegung",
    use: "Bewegte Szenen; lässt sich im Schnitt auf halbe Geschwindigkeit bremsen.",
    note: "Nur im MOVIE-Modus." },
  { id: "VID", v: true, look: "4K 25p · ETERNA", title: "Standard-Video",
    use: "Ruhige Szenen, Schwenks, Erzählendes — der normale filmische Look.",
    note: "Ruhige, langsame Kamerabewegungen sehen am besten aus." },
];
