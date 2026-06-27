import { renderStep, clearStep } from "../ui/renderer.js";
export const STEP_TYPES = {
    COMPARE: "compare",
    SWAP: "swap",
    SORTED: "sorted"
}; //for making our code safer and prevent future spelking mistakes

export async function playSteps(steps) {
    for (let i = 0; i < steps.length; i++) {
        const currentStep = steps[i];
        renderStep(currentStep);
        await sleep (1000); //causes a 1 second wait after each step
        clearStep(currentStep);
  }
}

//adding the sleep function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}