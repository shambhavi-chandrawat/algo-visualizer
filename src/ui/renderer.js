import { STEP_TYPES } from "../core/stepTypes.js";

export function renderStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === STEP_TYPES.COMPARE) {
        const firstBar = bars[step.first];
        const secondBar = bars[step.second];
        if (!firstBar || !secondBar) return;

        // remember current color before overwriting it
        firstBar.dataset.prevColor = firstBar.style.backgroundColor;
        secondBar.dataset.prevColor = secondBar.style.backgroundColor;

        firstBar.style.backgroundColor = "orange";
        secondBar.style.backgroundColor = "orange";
    }
    else if (step.type === STEP_TYPES.SWAP) {
        const firstBar = bars[step.first];
        const secondBar = bars[step.second];
        if (!firstBar || !secondBar) return;

        const tempHeight = firstBar.style.height;
        firstBar.style.height = secondBar.style.height;
        secondBar.style.height = tempHeight;
    }
    else if (step.type === STEP_TYPES.SORTED) {
        const sortedBar = bars[step.index];
        if (!sortedBar) return;

        sortedBar.style.backgroundColor = "green";
    }
}

export function clearStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === STEP_TYPES.COMPARE) {
        const firstBar = bars[step.first];
        const secondBar = bars[step.second];
        if (!firstBar || !secondBar) return;

        firstBar.style.backgroundColor = firstBar.dataset.prevColor || "steelblue";
        secondBar.style.backgroundColor = secondBar.dataset.prevColor || "steelblue";
    }
}