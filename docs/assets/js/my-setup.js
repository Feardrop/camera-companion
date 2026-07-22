// Belegung-Seite: Formular-Interaktion. Die Felder selbst sind bereits von
// build/build.js statisch gerendert (content/data/belegung-fields.js) —
// dieses Skript liest/schreibt nur noch den localStorage-Inhalt.
const saved = store.get("fields") || {};
document.querySelectorAll("#fields [data-field]").forEach(el => {
  const k = el.dataset.field;
  if (saved[k] !== undefined) el.value = saved[k];
});

function saveFields() {
  const data = {};
  document.querySelectorAll("#fields [data-field]").forEach(el => {
    data[el.dataset.field] = el.value;
  });
  const ok = store.set("fields", data);
  const m = document.getElementById("savedMsg");
  m.textContent = ok ? t("saved") : t("saveUnavailable");
  setTimeout(() => (m.textContent = ""), 4000);
}
