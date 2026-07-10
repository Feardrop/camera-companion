import { RAW_KONV_LINK } from "./facts.js";

// Troubleshooting entries, one per <details> accordion on sos.html. Rendered
// as plain static <details> markup at build time (zero client JS needed to
// read SOS, same as before) — the data-array form is what makes each entry
// individually addressable for the global search index in a later phase.
export const SOS = [
  { id: "belichtung-falsch", severity: "HÄUFIG", summary: "Bild ist zu dunkel oder zu hell", type: "ol", items: [
    "<b>Belichtungskorrektur prüfen:</b> Auf dem Display nach dem Wert <span class=\"osd\">±0.0</span> suchen. Steht dort z.&nbsp;B. −2? Mit dem <b>hinteren Einstellrad</b> zurückdrehen. (C2 ist absichtlich auf +1!)",
    "Gegenlicht (Motiv vor heller Fenster/Sonne)? Korrektur auf +1 bis +2 oder Standort wechseln.",
    "Beachte: Wegen Auto-Update bleibt eine geänderte Korrektur im Preset gespeichert — selbst zurückstellen.",
  ] },
  { id: "sucher-unscharf", severity: "HÄUFIG", summary: "Alles im Sucher wirkt unscharf", type: "p",
    body: "Wenn Fotos auf dem rückseitigen Display scharf sind, aber der Sucher matschig wirkt: <b>Dioptrienrad</b> links am Sucher drehen, bis die eingeblendete Schrift knackscharf ist. Das verstellt sich gern beim Transport." },
  { id: "fokus-daneben", severity: "HÄUFIG", summary: "Fokus sitzt nicht / falsche Stelle scharf", type: "ol", items: [
    "<b>Fokusmodus-Schalter</b> vorne an der Kamera prüfen: steht er auf <span class=\"osd\">M</span>? Dann fokussiert nichts automatisch → auf <span class=\"osd\">S</span> (unbewegt) oder <span class=\"osd\">C</span> (bewegt) stellen.",
    "Fokusfeld mit dem <b>Joystick</b> auf das Motiv schieben. Joystick <b>drücken</b> = Feld zurück in die Mitte.",
    "Bei Menschen/Tieren: Erkennungsrahmen sichtbar? Falls nicht: <span class=\"osd\">Fn2</span> schaltet die Augen-/Gesichtserkennung, <span class=\"osd\">Fn1</span> die Tiererkennung an/aus. Die Motiv-Art (Tier/Vogel/…) steht im Q-Menü.",
    "Zu nah dran? Jedes Objektiv hat eine Naheinstellgrenze — einen Schritt zurück.",
  ] },
  { id: "loest-nicht-aus", severity: "HÄUFIG", summary: "Kamera löst nicht aus", type: "ol", items: [
    "Meldung auf dem Display? <span class=\"osd\">CARD FULL</span> / <span class=\"osd\">NO CARD</span> → siehe Speicherkarten-Punkte.",
    "AF-C wartet evtl. auf Schärfe: kurz neu ansetzen, halb drücken, durchdrücken.",
    "Akku fast leer? Wechseln/laden.",
    "Nichts hilft: Kamera AUS → 10 Sekunden warten → AN.",
  ] },
  { id: "karte-voll", severity: null, summary: "„CARD FULL“ — Speicherkarte voll", type: "ol", items: [
    "Ersatzkarte einsetzen (Fach rechts) — die einfachste Lösung.",
    "Wichtig zu wissen: Fotos werden als <b>Backup auf beide Karten</b> (CFexpress + SD) geschrieben — beide füllen sich parallel, und die volle Karte stoppt die Aufnahme. Also gezielt die volle Karte tauschen/leeren. Videos liegen nur auf der CFexpress.",
    "Oder aussortieren: Wiedergabe → <b>Papierkorb-Taste</b> → <span class=\"osd\">BILD</span> → Bilder einzeln löschen.",
    "<span class=\"warn\">FORMATIEREN löscht ALLES unwiderruflich — nur nutzen, wenn die Bilder gesichert sind.</span>",
  ] },
  { id: "karte-fehler", severity: null, summary: "„CARD ERROR“ / Karte wird nicht erkannt", type: "ol", items: [
    "Kamera aus, Karte entnehmen, Kontakte prüfen (sauber? trocken?), wieder einsetzen bis zum Klick.",
    "Zweite Karte probieren — erkennt die Kamera diese, ist die erste Karte das Problem: nicht mehr beschreiben, Bilder später am PC retten.",
    "Schreibschutz-Schieber an der SD-Karte auf „entriegelt“?",
  ] },
  { id: "akku-leer", severity: null, summary: "Akku leer / lädt nicht", type: "ul", items: [
    "Laden geht direkt per <b>USB-C</b> in der Kamera — auch mit Powerbank (am besten eine mit USB-PD). Lampe an der Kamera zeigt Ladevorgang.",
    "Kälte frisst Akku: Ersatzakku körpernah (Jackeninnentasche) warm halten.",
    "Sucher/Display verbrauchen am meisten — Pausen = Kamera aus.",
  ] },
  { id: "verstellt", severity: "HÄUFIG", summary: "Irgendetwas ist verstellt / Kamera verhält sich komisch", type: "ol", items: [
    "<span class=\"osd\">Q</span>-Taste drücken und die Kacheln überfliegen — was sieht ungewöhnlich aus? Dort direkt korrigieren.",
    "<span class=\"warn\">Achtung: Rad weg- und zurückdrehen hilft NICHT — diese Kamera speichert Änderungen automatisch ins Preset (Auto-Update). Gewünschte Werte selbst zurückstellen.</span>",
    "Aus dem Menü verirrt? <span class=\"osd\">DISP/BACK</span> mehrmals drücken.",
    "Größeres Chaos? Preset-Sollwerte stehen im Seite „Mehr“ (Meine Belegung); Einstellungs-Backup per XApp zurückspielen (Seite „Mehr“).",
    "Letzter Ausweg: Kamera aus, Akku 10 Sekunden raus, wieder rein.",
  ] },
  { id: "foto-oder-video", severity: null, summary: "Ich filme, wollte aber fotografieren (oder umgekehrt)", type: "p",
    body: "Der <b>STILL/MOVIE-Schalter</b> sitzt oben links unter dem Modusrad. <span class=\"osd\">STILL</span> = Foto, <span class=\"osd\">MOVIE</span> = Video. Beide Welten haben eigene Menüs und eigene C-Presets — deshalb sieht plötzlich „alles anders aus“." },
  { id: "schwarzweiss", severity: null, summary: "Bilder sind plötzlich schwarzweiß", type: "p",
    body: `Das Rad steht auf <b>C1</b> (Acros = Schwarzweiß-Preset) oder die Filmsimulation wurde umgestellt (Q-Menü prüfen — bleibt wegen Auto-Update gespeichert!). Rad auf C2/C3 drehen bzw. Simulation zurückstellen. RAW-Dateien enthalten übrigens immer alle Farben — <a href="${RAW_KONV_LINK}">so holst du sie nachträglich in der Kamera zurück</a>.` },
  { id: "display-schwarz", severity: null, summary: "Display schwarz / Sucher bleibt aus", type: "ol", items: [
    "Der <b>Augensensor</b> am Sucher schaltet das Display ab, sobald etwas nahe kommt (Finger, Gurt, Regenjacke!). Abstand schaffen.",
    "<span class=\"osd\">VIEW MODE</span>-Taste am Sucher drücken, bis „EVF/LCD Auto“ o.&nbsp;ä. gewählt ist.",
    "<span class=\"osd\">DISP/BACK</span> wechselt die Anzeige-Varianten — evtl. ist nur „Display aus“ aktiv.",
  ] },
  { id: "ueberhitzung", severity: null, summary: "Überhitzungs-Symbol beim Filmen (gelb/rot)", type: "mixed",
    body: "<p>Bei langen 4K-Aufnahmen (v.&nbsp;a. 100p) in der Sonne möglich. Gelb = Vorwarnung, rot = bald Abschaltung.</p><ul><li>Aufnahme pausieren, Kamera in den Schatten, ausschalten.</li><li>Display vom Gehäuse wegklappen (bessere Kühlung), kürzere Clips drehen.</li></ul>" },
  { id: "zeitzone", severity: null, summary: "Datum/Uhrzeit falsch (Zeitzone der Reise)", type: "p",
    body: "<span class=\"osd\">MENU/OK → Schraubenschlüssel → BEN.-EINSTELLUNG → WELTZEIT</span> → <b>ORTSZEIT</b> wählen und Zielzone einstellen. Zurück zu Hause wieder auf HEIMATZEIT. (Mit gekoppelter XApp kann auch das Handy die Zeit setzen.)" },
  { id: "handy-transfer", severity: null, summary: "Bilder aufs Handy / Geo-Tagging fehlt", type: "mixed",
    body: "<p>Beides läuft über die <b>FUJIFILM XApp</b> — Einrichtung siehe Seite „Mehr“ → „Handy-Setup“. Kurzfassung:</p><ol><li>Übertragen: In der Bild-Wiedergabe Bilder auswählen und senden, oder automatische Übertragung in der App aktivieren.</li><li>Geo-Tagging: In der XApp Standortsynchronisierung aktivieren + an der Kamera <span class=\"osd\">GEOTAGGING → AN</span> (im Netzwerk/USB-Menü). Bluetooth am Handy anlassen.</li></ol>" },
  { id: "wetter", severity: null, summary: "Regen, Gischt, Staub", type: "p",
    body: "Das Gehäuse ist wettergeschützt — leichter Regen ist okay, <b>wenn auch das Objektiv WR-gedichtet ist</b> (steht „WR“ im Objektivnamen?). Tropfen zügig mit Mikrofasertuch abnehmen, Objektivwechsel nur im Trockenen, nie nasse Kamera in die verschlossene Tasche." },
];
