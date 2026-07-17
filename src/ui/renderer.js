import { STEP_TYPES } from "../core/stepTypes.js";

export function renderStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === STEP_TYPES.COMPARE) {
        const first = bars[step.first];
        const second = bars[step.second];
        if (!first || !second) return;
        first.classList.add("comparing");
        second.classList.add("comparing");
    }
    else if (step.type === STEP_TYPES.SWAP) {
        const first = bars[step.first];
        const second = bars[step.second];
        if (!first || !second) return;
        first.classList.add("swapping");
        second.classList.add("swapping");
        const tempHeight = first.style.height;
        first.style.height = second.style.height;
        second.style.height = tempHeight;
    }
    else if (step.type === STEP_TYPES.SORTED) {
        const bar = bars[step.index];
        if (!bar) return;
        bar.classList.add("sorted");
    }
    else if (step.type === STEP_TYPES.OVERWRITE) {
        const bar = bars[step.index];
        if (!bar) return;
        bar.style.height = `${step.value}px`;
        bar.classList.add("comparing");
    }
    else if (step.type === STEP_TYPES.PIVOT) {
        const bar = bars[step.index];
        if (!bar) return;
        bar.classList.add("pivot");
    }
}

export function clearStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === STEP_TYPES.COMPARE) {
        const first = bars[step.first];
        const second = bars[step.second];
        if (!first || !second) return;
        first.classList.remove("comparing");
        second.classList.remove("comparing");
    }
    else if (step.type === STEP_TYPES.SWAP) {
        const first = bars[step.first];
        const second = bars[step.second];
        if (!first || !second) return;
        first.classList.remove("swapping");
        second.classList.remove("swapping");
    }
    else if (step.type === STEP_TYPES.OVERWRITE) {
        const bar = bars[step.index];
        if (!bar) return;
        bar.classList.remove("comparing");
    }
    else if (step.type === STEP_TYPES.PIVOT) {
        const bar = bars[step.index];
        if (!bar) return;
        bar.classList.remove("pivot");
    }
    // SORTED is never cleared
}