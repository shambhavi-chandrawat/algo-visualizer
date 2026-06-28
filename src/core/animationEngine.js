import { renderStep, clearStep } from "../ui/renderer.js";
export const STEP_TYPES = {
    COMPARE: "compare",
    SWAP: "swap",
    SORTED: "sorted"
}; //for making our code safer and prevent future spelking mistakes

let animationSteps = []; //which step will be executed
let currentStepIndex = 0; //which step we are currently on 
let isPlaying = false; //whether the engine is in pause or play mode

export async function playSteps(steps) {
    animationSteps = steps;
    currentStepIndex = 0;
    isPlaying = true;

    playNextStep();
}

//adding the sleep function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//this will do the exedution of the steps 
async function playNextStep() {
    if (!isPlaying) {
    return;
}
if (currentStepIndex >= animationSteps.length) {
    return;
}
const currentStep = animationSteps[currentStepIndex];
renderStep(currentStep);
await sleep(1000);
clearStep(currentStep);
currentStepIndex++;
await playNextStep(); //this will wait until the next recursive call gets completed
}