import { renderStep, clearStep } from "../ui/renderer.js";
import { STEP_TYPES } from "./stepTypes.js";

export { STEP_TYPES }; // re-exported in case other files still import it from here

let animationSteps = []; //which step will be executed
let currentStepIndex = 0; //which step we are currently on
let isPlaying = false; //whether the engine is in pause or play mode

//starting a new animation
export async function playSteps(steps) {
    if (isPlaying) return; // ignore calls while a run is already in progress

    animationSteps = steps;
    currentStepIndex = 0;
    isPlaying = true;

    await playNextStep(); //since playNextStep is an async function 
}

//pausing an animation
export function pauseAnimation() {
    console.log("pause button pressed");
    isPlaying = false;
}

//for resuming the animation from the current index
export async function resumeAnimation() {
    if(isPlaying) //to prevent the engine from excuting the same step multiple times if we press the resume button more than once 
        return; 

    isPlaying = true;
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
    if (!isPlaying) {
        return;
    }
    if (currentStepIndex >= animationSteps.length) {
        isPlaying = false;
        return;
    }
    await runSingleStep(true);
    // Pause button may have been pressed while waiting
    if (!isPlaying) {
        return;
    }
    await playNextStep();
}

export function resetAnimation() {
    isPlaying = false;
    animationSteps = [];
    currentStepIndex = 0;
}

// Executes exactly ONE step
async function runSingleStep(allowPause = false) {
    const currentStep = animationSteps[currentStepIndex];
    renderStep(currentStep);
    await sleep(1000);
    if (allowPause && !isPlaying) {
        return;
    }
    clearStep(currentStep);
    currentStepIndex++;
}

export async function stepForward() {
     if (isPlaying) {
        return;
    }
    if (currentStepIndex >= animationSteps.length) {
        return;
    }
    await runSingleStep(false);
}