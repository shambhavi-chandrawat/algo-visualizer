import { STEP_TYPES } from "../core/animationEngine.js";
export function renderStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === STEP_TYPES.COMPARE) {

        const firstBar = bars[step.first];
        const secondBar = bars[step.second];
        firstBar.style.backgroundColor = "orange";
        secondBar.style.backgroundColor = "orange";
    }
    else if ( step.type == STEP_TYPES.SWAP ){
        const firstBar = bars[step.first];
        const secondBar = bars[step.second];

        const tempHeight = firstBar.style.height;
        firstBar.style.height=secondBar.style.height;
        secondBar.style.height=tempHeight;
    }
    else if (step.type === STEP_TYPES.SORTED) {
    const sortedBar = bars[step.index];
    sortedBar.style.backgroundColor = "green";
}
}

export function clearStep(step) {
    const bars = document.querySelectorAll(".bar");
    if (step.type === STEP_TYPES.COMPARE) {

        const firstBar = bars[step.first];
        const secondBar = bars[step.second];
        firstBar.style.backgroundColor = "steelblue";
        secondBar.style.backgroundColor = "steelblue";
    }

}