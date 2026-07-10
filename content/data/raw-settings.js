// RAW-KONVERTIERUNG menu settings, explained one by one (referenz.html).
// A plain data array (rather than hand-typed table rows) so each setting is
// also indexable by the global search — e.g. searching "Klarheit" or
// "Objektivmod" should land directly on this section.
export const RAW_SETTINGS = [
  ["AUFN.BED. BERÜCKS.", "Kopie exakt mit den Einstellungen von der Aufnahme erzeugen — der schnelle Reset auf den Originalzustand."],
  ["DATEITYP", "<b>Immer zuerst auf HEIF stellen.</b> Ausgabeformat der Kopie — HEIF bessere Qualität (10 Bit) bei kleinerer Datei, JPEG nur für alte Geräte/Webdienste."],
  ["BILDGRÖSSE", "Auflösung der Kopie (L/M/S) — kleiner zum schnellen Teilen unterwegs, L zum Aufbewahren/Drucken."],
  ["BILDQUALITÄT", "Kompressionsgrad (Fein/Normal) — bei wichtigen Bildern Fein wählen."],
  ["PUSH/PULL-VERARB.", "Belichtung nachträglich heller/dunkler ziehen. In kleinen Schritten arbeiten — große Sprünge erzeugen sichtbares Rauschen."],
  ["DYNAMIKBEREICH", "Zeichnung in hellen Bildbereichen verbessern — hilfreich bei kontrastreichem Licht (Himmel, Strand)."],
  ["D-BEREICHSPRIORITÄT", "Reduziert Detailverlust in Lichtern <b>und</b> Schatten gleichzeitig — die stärkere Variante für harte Kontraste."],
  ["FILMSIMULATION", "Bildlook nachträglich wechseln — z.&nbsp;B. aus einem C1-Schwarzweiß-RAW mit PROVIA ein Farbbild erzeugen."],
  ["MONOCHROME FARBE", "Farbstich für Schwarzweißbilder (nur bei ACROS/MONOCHROME) — z.&nbsp;B. leicht warm oder kühl einfärben."],
  ["KÖRNUNGSEFFEKT", "Filmkorn nachträglich hinzufügen — analoger Look."],
  ["FARBE CHROME-EFFEKT", "Mehr Zeichnung in kräftig gesättigten Rot-/Gelb-/Grüntönen."],
  ["FARBE CHROM FX BLAU", "Dasselbe für Blautöne — z.&nbsp;B. für Himmel und Wasser."],
  ["WEISSABGLEICH", "Farbstich korrigieren, falls beim Fotografieren falsch eingestellt."],
  ["WA VERSCHIEBEN", "Weißabgleich feinjustieren (Richtung Amber/Blau bzw. Grün/Magenta)."],
  ["TONKURVE", "Kontrast in Lichtern und Schatten getrennt anpassen."],
  ["FARBE", "Farbsättigung erhöhen oder verringern."],
  ["SCHÄRFE", "Konturen schärfen oder weicher zeichnen."],
  ["RAUSCHREDUKTION HIGH-ISO", "Bildrauschen reduzieren — nützlich bei Nacht-/Innenaufnahmen mit hohem ISO."],
  ["KLARHEIT", "Feinkontrast erhöhen, ohne hart nachzuschärfen."],
  ["OBJEKTIVMOD.-OPT.", "Korrigiert Beugung und Randunschärfe des Objektivs — am besten AN lassen."],
  ["FARBRAUM", "Farbraum wählen — sRGB für Web/Teilen (Empfehlung für unterwegs), Adobe RGB für professionellen Druck."],
  ["HDR-MODUS", "Verringert Detailverluste in Lichtern und Schatten gleichzeitig, ähnlich D-Bereichspriorität."],
];
