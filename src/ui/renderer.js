import { STEP_TYPES } from "../core/stepTypes.js";

export function renderStep(step) {
  const bars = document.querySelectorAll(".bar");

  if (step.type === STEP_TYPES.COMPARE) {
    const firstBar = bars[step.first];
    const secondBar = bars[step.second];
    if (!firstBar || !secondBar) return;

    firstBar.classList.add("comparing");
    secondBar.classList.add("comparing");
  } else if (step.type === STEP_TYPES.SWAP) {
    const firstBar = bars[step.first];
    const secondBar = bars[step.second];
    if (!firstBar || !secondBar) return;

    const tempHeight = firstBar.style.height;
    firstBar.style.height = secondBar.style.height;
    secondBar.style.height = tempHeight;
  } else if (step.type === STEP_TYPES.SORTED) {
    const sortedBar = bars[step.index];
    if (!sortedBar) return;

    sortedBar.classList.add("sorted");
  } else if (step.type === STEP_TYPES.OVERWRITE) {
    const bar = bars[step.index];

    if (!bar) return;

    bar.style.height = `${step.value}px`;
  }
}

export function clearStep(step) {
  const bars = document.querySelectorAll(".bar");

  if (step.type === STEP_TYPES.COMPARE) {
    const firstBar = bars[step.first];
    const secondBar = bars[step.second];
    if (!firstBar || !secondBar) return;

    firstBar.classList.remove("comparing");
    secondBar.classList.remove("comparing");
  }
}
