// The 8-chapter step-by-step tutorial on the start page, as static <details>
// accordions rendered at build time (no client JS involved, same as before).
export const TUTORIAL = [
  { id: "tut1", num: 1, title: "Kamera startklar machen", minutes: "5 MIN", type: "ol", items: [
    "<b>Akku:</b> Klappe an der Unterseite, Akku mit Kontakten voran einschieben bis zum Klick. Laden geht auch direkt per USB-C in der Kamera (Powerbank funktioniert).",
    "<b>Speicherkarte:</b> Fach rechts. Zwei Slots — SD reicht für Fotos völlig; CFexpress ist für Highspeed-Video.",
    "<b>Einschalten:</b> Ring um den Auslöser auf ON.",
    "<b>Neue Karte formatieren:</b> <span class=\"osd\">MENU → Schraubenschlüssel → BEN.-EINSTELLUNG → FORMATIEREN</span> <span class=\"warn\">(löscht alles!)</span>",
    "<b>Sucher scharf stellen:</b> Dioptrienrädchen links am Sucher drehen, bis die eingeblendete Schrift knackscharf ist.",
  ] },
  { id: "tut2", num: 2, title: "Das erste Foto &amp; Video", minutes: "5 MIN", type: "mixed",
    body: "<p><b>Foto:</b> Schalter auf <span class=\"osd\">STILL</span> → Rad auf <b>C3</b> → Auslöser halb drücken (grüner Rahmen = scharf) → ganz durchdrücken. Ansehen: Play-Taste; zurück: Auslöser antippen.</p><p><b>Video:</b> Schalter auf <span class=\"osd\">MOVIE</span> → roter REC-Knopf startet und stoppt. Standard ist 4K 25p mit dem filmischen Eterna-Look.</p><p class=\"hint\">Übe das zweistufige Drücken bewusst — es ist DER wichtigste Handgriff.</p>" },
  { id: "tut3", num: 3, title: "Die wichtigsten Bedienelemente", minutes: "10 MIN", type: "ul", items: [
    "<b>Moduswahlrad</b> (oben links): P/A/S/M + deine Presets C1–C7. Auf Reisen lebst du auf C1–C7.",
    "<b>Vorderes + hinteres Einstellrad:</b> verstellen je nach Modus Blende, Zeit oder Belichtungskorrektur.",
    "<b>Fokushebel (Joystick):</b> schiebt das Fokusfeld — z. B. auf ein Gesicht am Rand. Drücken = zurück zur Mitte.",
    "<b>Q-Taste:</b> Schnellmenü mit den 16 wichtigsten Einstellungen.",
    "<b>MENU/OK</b> öffnet/bestätigt · <b>DISP/BACK</b> bricht ab und wechselt die Anzeigen.",
    "<b>AF-ON:</b> fokussiert ohne auszulösen („Back-Button-Fokus“, für später).",
    "<b>Sucher/Display:</b> Augensensor schaltet automatisch um; Display seitlich ausklappbar.",
    "<b>Schulterdisplay</b> oben: Akku, Restbilder, Kernwerte auf einen Blick.",
  ] },
  { id: "tut4", num: 4, title: "Belichtung verstehen", minutes: "15 MIN", type: "mixed",
    body: "<p><b>Drei Werte, ein Bild:</b></p><ul><li><b>Blende</b> (f-Zahl): kleine Zahl = viel Licht + unscharfer Hintergrund (Porträt) · große Zahl = alles scharf (Landschaft).</li><li><b>Verschlusszeit:</b> kurz (1/1000) friert Bewegung ein · lang (1/15) verwischt sie (Wasser!).</li><li><b>ISO:</b> Lichtempfindlichkeit. Hoch = heller, aber körniger. Bis 6400 bleibt die X-H2S gutmütig.</li></ul><p><b>Die Modi:</b> P = Automatik mit Eingriff · <b>A = du wählst die Blende</b> (der beste erste Schritt aus den Presets!) · S = du wählst die Zeit · M = beides selbst (mit Auto-ISO alltagstauglich).</p><p><b>Belichtungskorrektur (±):</b> Bild zu dunkel/hell? Hinteres Einstellrad drehen. +1 = doppelt so hell. Genau so ist C2 gebaut. Im Sucher siehst du das Ergebnis VOR dem Auslösen.</p><p><b>Histogramm</b> (einblendbar mit DISP/BACK): Berg rechts angequetscht = Lichter „ausgefressen“, links = Schatten abgesoffen. Anlehnen ja, anstoßen nein.</p>" },
  { id: "tut5", num: 5, title: "Autofokus meistern", minutes: "15 MIN", type: "mixed",
    body: "<p><b>Fokusmodus-Schalter</b> vorne an der Kamera: <span class=\"osd\">S</span> = einmal scharfstellen (Unbewegtes) · <span class=\"osd\">C</span> = permanent nachführen (Bewegtes) · <span class=\"osd\">M</span> = manuell am Ring (mit Peaking-Hilfe).</p><p><b>WO scharf:</b> Fokusfeld mit dem Joystick schieben; Feldgröße: Einzelpunkt = Kontrolle, Zone = Bewegung, Weit = Kamera entscheidet.</p><p><b>Motiverkennung:</b> Die Kamera erkennt Gesichter/Augen, Tiere, Vögel, Fahrzeuge und klebt am Motiv. In C4/C5 schon aktiv.</p><p><b>Deine Direkttasten:</b> <span class=\"osd\">Fn2</span> = Augen-/Gesichtserkennung (Menschen) AN/AUS · <span class=\"osd\">Fn1</span> = Motiverkennung Tiere AN/AUS. <b>Welche Art</b> von Motiv erkannt wird (Tier, Vogel, Auto, …), wählst du in der entsprechenden Kachel im <span class=\"osd\">Q</span>-Menü.</p><p><b>Pre-Shot</b> (in C4/C5): Bei halb gedrücktem Auslöser puffert die Kamera schon Bilder — beim Durchdrücken sind auch die Momente DAVOR gespeichert. Der abfliegende Vogel ist im Kasten, bevor du reagiert hast.</p>" },
  { id: "tut6", num: 6, title: "Filmsimulationen — die Bildlooks", minutes: "10 MIN", type: "mixed",
    body: "<p>Digitale Nachbildungen legendärer Fuji-Filme — fertige Looks ohne Nachbearbeitung:</p><ul><li><b>Provia</b> neutral · <b>Velvia</b> knallig (Landschaft) · <b>Astia</b> sanft (dein C4/C5)</li><li><b>Classic Chrome</b> dokumentarisch · <b>Classic Negative</b> analog-charaktervoll (dein C2)</li><li><b>Pro Neg. Hi</b> Porträt-Spezialist (dein C3) · <b>Acros</b> edles Schwarzweiß (dein C1)</li><li><b>Eterna</b> flacher Kino-Look (dein Video-Standard) · <b>Nostalgic Neg.</b> 70er-Album</li></ul><p class=\"hint\">Würzen kannst du mit Körnung, Color Chrome, Dynamikbereich, Weißabgleich — daraus bestehen die berühmten „Film-Rezepte“ (fujixweekly.com).</p>" },
  { id: "tut7", num: 7, title: "Video-Basics", minutes: "10 MIN", type: "ul", items: [
    "<b>Bildrate:</b> 25p = normal/filmisch · 50p = flüssiger, halbierbar · 100p = 4×-Zeitlupe. Deine Presets kümmern sich um die passende Verschlusszeit.",
    "<b>Stabilisierung:</b> IBIS + digitaler IS machen Handaufnahmen ruhig — trotzdem: langsame, geschmeidige Bewegungen.",
    "<b>Ton:</b> internes Mikro ok, Wind ist sein Feind — nah ans Motiv.",
    "<b>Praxis:</b> 3 Sekunden vor der Action starten, 3 danach weiterlaufen lassen — das braucht der Schnitt. Bei Hitze/100p Pausen einplanen.",
  ] },
  { id: "tut8", num: 8, title: "Dein Lernpfad zum Enthusiasten", minutes: "PLAN", type: "mixed",
    body: "<p><b>Phase 1 — vor der Reise:</b> Tutorial-Kapitel 1–3 + Presets verifizieren und im Seite „Mehr“ eintragen + XApp koppeln &amp; Backup + Übungen 1–3.</p><p><b>Phase 2 — auf der Reise:</b> 80 % einfach fotografieren, 20 % bewusst gestalten (±-Korrektur, Fokusfeld schieben, 1× täglich Modus A) + Übungen 4–6.</p><p><b>Phase 3 — danach:</b> Bilder sichten, EXIF-Werte der Lieblingsbilder anschauen, Kapitel 4–6 nochmal lesen, pal2tech abonnieren.</p><p class=\"hint\">Die abhakbaren Übungen findest du im Seite „Übungen“.</p>" },
];
