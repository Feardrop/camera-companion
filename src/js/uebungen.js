// Übungen-Seite: Checkbox-/Fortschritts-Interaktion. Der Übungstext selbst
// ist bereits von build/build.js statisch gerendert (content/data/exercises.js)
// — dieses Skript liest/schreibt nur noch den localStorage-Fortschritt.
let done = store.get("ex") || {};
const exList = document.getElementById("exList");
const items = Array.from(exList.querySelectorAll(".ex"));

function paint() {
  items.forEach(el => {
    const i = el.dataset.i;
    const checked = !!done[i];
    el.classList.toggle("done", checked);
    el.querySelector("input[type=checkbox]").checked = checked;
  });
  const n = Object.values(done).filter(Boolean).length;
  document.getElementById("prog").innerHTML = `<b>${n} / ${items.length}</b> Übungen abgeschlossen`;
}

exList.addEventListener("change", e => {
  const cb = e.target.closest("input[type=checkbox]");
  if (!cb) return;
  const i = cb.closest(".ex").dataset.i;
  done[i] = cb.checked;
  store.set("ex", done);
  paint();
});

paint();
