export const scripts = ["assets/data/manual-de.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/handbuch.js"];

export function render() {
  return `<section id="tab-handbuch">
  <h2>Offizielles Handbuch (deutsch)</h2>
  <div class="card">
    <p style="margin-top:0">Der komplette <b>Text</b> aller 404 Seiten ist in dieser App eingebaut und <b>offline durchsuchbar</b> — die Suche funktioniert immer, auch ohne Netz. Beim Öffnen einer Seite zeigt die App zusätzlich die <b>echte PDF-Seite mit Abbildungen</b> an (braucht dafür einmal Netzverbindung); ohne Netz springt sie automatisch auf die eingebaute Text-Ansicht zurück.</p>
    <div class="dlbtns">
      <a class="btn" href="https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf" target="_blank" rel="noopener">📥 Handbuch-PDF herunterladen (deutsch, 7 MB)</a>
      <a class="btn ghost" href="https://fujifilm-dsc.com/en/manual/x-h2s/" target="_blank" rel="noopener">🌐 Online-Handbuch (Web)</a>
    </div>
  </div>

  <div class="search">
    <input id="q" type="search" placeholder="Im Handbuch suchen … z. B. Selbstauslöser" oninput="doSearch()">
  </div>
  <div id="mres"></div>

  <h2>Direkt zu den Kapiteln</h2>
  <div class="chips">
    <button class="chip" onclick="openPage(358)">🚑 Fehlerbehebung · 358</button>
    <button class="chip" onclick="openPage(365)">⚠️ Warnmeldungen · 365</button>
    <button class="chip" onclick="openPage(220)">🎞️ RAW-Konvertierung · 220</button>
    <button class="chip" onclick="openPage(129)">🖼️ JPEG/HEIF · 129</button>
    <button class="chip" onclick="openPage(1)">Kap. 1 Grundlagen · 1</button>
    <button class="chip" onclick="openPage(37)">Kap. 2 Erste Schritte · 37</button>
    <button class="chip" onclick="openPage(55)">Kap. 3 Foto-Basics · 55</button>
    <button class="chip" onclick="openPage(63)">Kap. 4 Video-Basics · 63</button>
    <button class="chip" onclick="openPage(71)">Kap. 5 Fotografieren · 71</button>
    <button class="chip" onclick="openPage(125)">Kap. 6 Aufnahmemenüs · 125</button>
    <button class="chip" onclick="openPage(142)">Custom Settings · 142</button>
    <button class="chip" onclick="openPage(157)">Motiverkennung · 157</button>
    <button class="chip" onclick="openPage(213)">Kap. 7 Wiedergabe · 213</button>
    <button class="chip" onclick="openPage(243)">Kap. 9 Setup · 243</button>
    <button class="chip" onclick="openPage(268)">Tasten/Räder · 268</button>
    <button class="chip" onclick="openPage(285)">Kap. 10 Shortcuts · 285</button>
  </div>

  <div id="pageview" style="display:none" class="pageview">
    <div class="pagenav">
      <button onclick="stepPage(-1)" aria-label="Vorherige Seite">‹</button>
      <div class="pg" id="pglabel"></div>
      <button onclick="stepPage(1)" aria-label="Nächste Seite">›</button>
      <button onclick="closePage()" aria-label="Schließen">✕</button>
    </div>
    <p class="mut" id="pdfstatus" style="display:none">PDF-Seite wird geladen …</p>
    <div class="pdfpage" id="pdfpage" style="display:none">
      <canvas id="pdfCanvas"></canvas>
      <div id="pdfTextLayer" class="pdf-text-layer"></div>
    </div>
    <div class="pagetext" id="pgtext" style="display:none"></div>
    <p class="mut" style="margin:10px 0 0" id="pdffallbacknote">Nur-Text-Ansicht (ohne Abbildungen, PDF nicht verfügbar) · <a id="pdfdeep" href="https://fujifilm-dsc.com/en-int/manual/x-h2s/x-h2s_manual_de_s_f.pdf" target="_blank" rel="noopener">PDF stattdessen extern öffnen</a></p>
  </div>
</section>`;
}
