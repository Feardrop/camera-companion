// Presets-Seite: Modusrad-Interaktion. Die Dial-Buttons und Karten selbst
// sind bereits von build/build.js statisch gerendert (content/data/presets.js)
// — dieses Skript filtert/markiert nur noch die vorhandenen Elemente.
function pick(id) {
  document.querySelectorAll(".stop").forEach(s => s.classList.remove("sel"));
  const st = document.getElementById("stop-" + id);
  if (st) st.classList.add("sel");
  document.querySelectorAll("#presetCards .card").forEach(c => {
    c.style.display = c.dataset.preset === id ? "" : "none";
  });
  const back = document.getElementById("presetBack");
  if (back) back.style.display = "";
}
function showAllPresets() {
  document.querySelectorAll(".stop").forEach(s => s.classList.remove("sel"));
  document.querySelectorAll("#presetCards .card").forEach(c => { c.style.display = ""; });
  const back = document.getElementById("presetBack");
  if (back) back.style.display = "none";
}
document.getElementById("dial").addEventListener("click", e => {
  const btn = e.target.closest(".stop");
  if (btn) pick(btn.dataset.preset);
});
