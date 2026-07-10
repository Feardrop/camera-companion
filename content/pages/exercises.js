import { EX } from "../data/exercises.js";
import { localize } from "../../build/lib/i18n.js";

export const scripts = ["assets/data/strings.js", "assets/js/ui.js", "assets/js/search.js", "assets/js/exercises.js"];

const T = {
  heading: { de: "Trainingsplan", en: "Training plan" },
};

function renderExercise(e, i) {
  return `<div class="ex" id="ex-${i}" data-i="${i}">
      <label class="head"><input type="checkbox" data-i="${i}">
        <span><span class="phase">${e.ph}</span><br><span class="t">${e.t}</span></span></label>
      <ol class="steps">${e.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <div class="goal">${e.goal}</div>
    </div>`;
}

export function render(locale) {
  const t = localize(T, locale);
  const ex = localize(EX, locale);
  return `<section id="tab-exercises">
  <h2>${t.heading}</h2>
  <div class="progress" id="prog"></div>
  <div id="exList">
    ${ex.map(renderExercise).join("\n    ")}
  </div>
</section>`;
}
