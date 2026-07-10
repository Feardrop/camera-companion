import { EX } from "../data/exercises.js";

export const scripts = ["assets/js/ui.js", "assets/js/uebungen.js"];

function renderExercise(e, i) {
  return `<div class="ex" data-i="${i}">
      <label class="head"><input type="checkbox" data-i="${i}">
        <span><span class="phase">${e.ph}</span><br><span class="t">${e.t}</span></span></label>
      <ol class="steps">${e.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <div class="goal">${e.goal}</div>
    </div>`;
}

export function render() {
  return `<section id="tab-uebungen">
  <h2>Trainingsplan</h2>
  <div class="progress" id="prog"></div>
  <div id="exList">
    ${EX.map(renderExercise).join("\n    ")}
  </div>
</section>`;
}
