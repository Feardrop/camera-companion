// Gemeinsame Such-Engine (searchAll) + globale Such-Oberfläche (Header-Icon,
// <dialog>-Overlay). searchAll() wird auch von handbuch.js für die
// Inline-Handbuchsuche verwendet — eine Engine, zwei Einstiegspunkte.
const TYPE_LABELS = {
  sos: "SOS", preset: "Presets", tutorial: "Tutorial", exercise: "Übungen",
  "raw-setting": "RAW-Einstellungen", menupath: "Menüwege", manual: "Handbuch",
};
const TYPE_ORDER = ["sos", "preset", "tutorial", "exercise", "raw-setting", "menupath", "manual"];

const WORD_CHAR = /[a-z0-9äöüß]/i;
function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }

function countMatches(haystackLower, needleLower) {
  let idx = 0, total = 0, wholeWord = 0;
  while ((idx = haystackLower.indexOf(needleLower, idx)) !== -1) {
    total++;
    const before = haystackLower[idx - 1];
    const after = haystackLower[idx + needleLower.length];
    if ((!before || !WORD_CHAR.test(before)) && (!after || !WORD_CHAR.test(after))) wholeWord++;
    idx += needleLower.length;
  }
  return { total, wholeWord };
}

// Kurze Anfragen (<4 Zeichen, z.B. "Q", "AF") zählen nur als Ganzwort-Treffer,
// damit sie nicht in jedem Wort als Teilstring aufploppen.
function scoreOne(titleLower, textLower, needleLower, isShort) {
  const t = countMatches(titleLower, needleLower);
  const b = countMatches(textLower, needleLower);
  let score = 0;
  if (t.total > 0) score += 100 + Math.min(t.total, 3) * 5;
  score += Math.min(b.wholeWord, 20) * 10;
  if (!isShort) score += Math.min(Math.max(0, b.total - b.wholeWord), 20) * 2;
  return { score, occurrences: b.total || t.total };
}

function snippetFor(text, needleLower) {
  const idx = text.toLowerCase().indexOf(needleLower);
  if (idx === -1) return text.slice(0, 120);
  const start = Math.max(0, idx - 55);
  return text.substring(start, idx + needleLower.length + 70).replace(/\s+/g, " ");
}

function highlightHtml(text, query) {
  const escaped = esc(text);
  const re = new RegExp(escapeRegex(esc(query)), "gi");
  return escaped.replace(re, m => "<mark>" + m + "</mark>");
}

function ensureLower(doc) {
  if (doc._textLower === undefined) doc._textLower = (doc.text || "").toLowerCase();
  return doc._textLower;
}

// Durchsucht SEARCH_INDEX (gefiltert per `types`, falls gesetzt) und optional
// das Handbuch (übergib `manual: {list: MANUAL, offset: OFFSET}`, wenn
// geladen — global search lädt es bei Bedarf nach, s. u.).
function searchAll(query, { types = null, manual = null, limit = 30 } = {}) {
  const q = query.trim();
  if (!q) return [];
  const needleLower = q.toLowerCase();
  const isShort = needleLower.length < 4;
  const hits = [];

  if (typeof SEARCH_INDEX !== "undefined") {
    for (const doc of SEARCH_INDEX) {
      if (types && !types.includes(doc.type)) continue;
      const { score } = scoreOne(doc.title.toLowerCase(), ensureLower(doc), needleLower, isShort);
      if (score > 0) hits.push({ doc, score, snippet: snippetFor(doc.text, needleLower) });
    }
  }

  if (manual && (!types || types.includes("manual"))) {
    manual.list.forEach((text, i) => {
      if (!text) return;
      const textLower = text.toLowerCase();
      const { score } = scoreOne("", textLower, needleLower, isShort);
      if (score <= 0) return;
      const pdf = i + 1;
      const printed = pdf - manual.offset;
      hits.push({
        doc: {
          id: `manual-${pdf}`, type: "manual",
          title: printed >= 1 ? "S. " + printed : "Vorspann " + pdf,
          target: `handbuch.html?page=${printed}`,
          text,
        },
        score, snippet: snippetFor(text, needleLower),
      });
    });
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

// ---- Tippfehler-Vorschlag (Edit-Distanz 1) gegen die Titel-Begriffe aller
// nicht-Handbuch-Einträge — kompaktes, thematisch relevantes Wörterbuch. ----
let _termDict = null;
function termDict() {
  if (_termDict) return _termDict;
  const set = new Set();
  if (typeof SEARCH_INDEX !== "undefined") {
    for (const doc of SEARCH_INDEX) {
      doc.title.toLowerCase().split(/[^a-zäöüß0-9]+/i).forEach(w => { if (w.length > 2) set.add(w); });
    }
  }
  _termDict = Array.from(set);
  return _termDict;
}
function withinEditDistance1(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    edits++;
    if (edits > 1) return false;
    if (a.length === b.length) { i++; j++; }
    else if (a.length > b.length) { i++; }
    else { j++; }
  }
  edits += (a.length - i) + (b.length - j);
  return edits <= 1;
}
function suggestTypo(query) {
  const needle = query.trim().toLowerCase();
  if (needle.length < 3) return null;
  for (const term of termDict()) {
    if (term !== needle && withinEditDistance1(needle, term)) return term;
  }
  return null;
}

// ---- Globale Suche: Header-Icon + <dialog>-Overlay ----
function loadScriptOnce(src, isLoaded) {
  return new Promise((resolve, reject) => {
    if (isLoaded()) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Laden fehlgeschlagen: " + src));
    document.head.appendChild(s);
  });
}
const ensureSearchIndexLoaded = () => loadScriptOnce("assets/data/search-index.js", () => typeof SEARCH_INDEX !== "undefined");
const ensureManualLoaded = () => loadScriptOnce("assets/data/manual-de.js", () => typeof MANUAL !== "undefined");

let _dialogEl = null;
function buildDialog() {
  const dlg = document.createElement("dialog");
  dlg.className = "search-dialog";
  dlg.innerHTML = `<div class="search-dialog-head">
      <input type="search" id="globalQ" placeholder="Suche in der ganzen App … z. B. RAW, Q, Blende" autocomplete="off">
      <button type="button" class="search-close" aria-label="Schließen">✕</button>
    </div>
    <div id="globalRes"></div>`;
  document.body.appendChild(dlg);
  dlg.querySelector(".search-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  let timer;
  dlg.querySelector("#globalQ").addEventListener("input", e => {
    clearTimeout(timer);
    const value = e.target.value;
    timer = setTimeout(() => runGlobalSearch(value), 120);
  });
  return dlg;
}

function renderGlobalResults(hits, query) {
  const container = document.getElementById("globalRes");
  if (!query.trim()) { container.innerHTML = ""; return; }
  if (!hits.length) {
    const suggestion = suggestTypo(query);
    container.innerHTML = suggestion
      ? `<p class="mut">Keine Treffer für „${esc(query)}“. Meintest du <button class="chip" type="button" data-retry="${esc(suggestion)}">${esc(suggestion)}</button>?</p>`
      : `<p class="mut">Keine Treffer für „${esc(query)}“.</p>`;
    const retryBtn = container.querySelector("[data-retry]");
    if (retryBtn) retryBtn.addEventListener("click", () => {
      const input = document.getElementById("globalQ");
      input.value = retryBtn.dataset.retry;
      runGlobalSearch(input.value);
    });
    return;
  }
  const groups = {};
  hits.forEach(h => { (groups[h.doc.type] = groups[h.doc.type] || []).push(h); });
  container.innerHTML = TYPE_ORDER.filter(t => groups[t]).map(t => `
    <p class="mut" style="margin:14px 0 4px">${TYPE_LABELS[t]}</p>
    ${groups[t].map(h => `<a class="res" href="${h.doc.target}">
      <span class="pg">${esc(h.doc.title)}</span>
      <div class="snip">…${highlightHtml(h.snippet, query)}…</div>
    </a>`).join("")}`).join("");
}

async function runGlobalSearch(query) {
  const container = document.getElementById("globalRes");
  if (!query.trim()) { container.innerHTML = ""; return; }
  if (typeof SEARCH_INDEX === "undefined") {
    container.innerHTML = '<p class="mut">Suchindex wird geladen …</p>';
    try { await ensureSearchIndexLoaded(); } catch (e) { container.innerHTML = '<p class="mut">Suchindex konnte nicht geladen werden.</p>'; return; }
  }
  if (typeof MANUAL === "undefined") { await ensureManualLoaded().catch(() => {}); }
  const manual = (typeof MANUAL !== "undefined") ? { list: MANUAL, offset: OFFSET } : null;
  renderGlobalResults(searchAll(query, { manual }), query);
}

function openSearch() {
  const dlg = _dialogEl || (_dialogEl = buildDialog());
  dlg.showModal();
  const input = dlg.querySelector("#globalQ");
  input.value = "";
  document.getElementById("globalRes").innerHTML = "";
  input.focus();
  ensureSearchIndexLoaded().catch(() => {});
}
window.openSearch = openSearch;
