import { renderStep, clearStep } from "../ui/renderer.js";
import { STEP_TYPES } from "./stepTypes.js";

export { STEP_TYPES }; // re-exported in case other files still import it from here

let animationSteps = []; //which step will be executed
let currentStepIndex = 0; //which step we are currently on
let animationState = "idle";

//starting a new animation

export async function playSteps(steps) {
    if (animationState !== "idle") {
        return;
    }
    animationSteps = steps;
    currentStepIndex = 0;

    animationState = "playing";

    await playNextStep();
}

//pausing an animation
export function pauseAnimation() {
    if (animationState !== "playing") {
        return;
    }

    animationState = "paused";
}

//for resuming the animation from the current index
export async function resumeAnimation() {
    if (animationState !== "paused") {
        return;
    }

    animationState = "playing";

    await playNextStep();
}

//adding the sleep function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//this will do the execution of the step one at a time 
async function playNextStep() {
    if (animationState !== "playing") {
    return;
}
    if (currentStepIndex >= animationSteps.length) {
        animationState = "idle";
        return;
    }
    await runSingleStep(true);
    // Pause button may have been pressed while waiting
    if (animationState !== "playing") {
        return;
    }
    await playNextStep();
}

export function resetAnimation() {
    animationState = "idle";
    animationSteps = [];
    currentStepIndex = 0;
}

// Executes exactly ONE step
async function runSingleStep(allowPause = false) {
    const currentStep = animationSteps[currentStepIndex];
    renderStep(currentStep);
    await sleep(1000);
    if (allowPause && animationState !== "playing") {
    return;
}
    clearStep(currentStep);
    currentStepIndex++;
}

export async function stepForward() {
     if (animationState !== "paused") {
    return;
}
    if (currentStepIndex >= animationSteps.length) {
        return;
    }
    await runSingleStep(false);
}

export function getAnimationState() {
    return animationState;
}