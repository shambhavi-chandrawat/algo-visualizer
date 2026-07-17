import { renderStep, clearStep } from "../ui/renderer.js";
import { STEP_TYPES } from "./stepTypes.js";
export { STEP_TYPES }; // re-exported in case other files still import it from here

let animationSteps = []; //which step will be executed
let currentStepIndex = 0; //which step we are currently on
let animationState = "idle";
let animationSpeed = 50;
let comparisonCount = 0;
let swapCount = 0;
let onAnimationComplete = null;

export function setAnimationCompleteCallback(callback) {
  onAnimationComplete = callback;
}

function getCounterElements() {
    return {
        comparisonEl: document.getElementById("comparison-count"),
        swapEl: document.getElementById("swap-count")
    };
}

const comparisonElement = document.getElementById("comparison-count");
const swapElement = document.getElementById("swap-count");

//starting a new animation

export async function playSteps(steps) {
  if (animationState !== "idle") {
    return;
  }
  comparisonCount = 0;
  swapCount = 0;

const { comparisonEl, swapEl } = getCounterElements();
    if (comparisonEl) comparisonEl.textContent = 0;
    if (swapEl) swapEl.textContent = 0;

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

export function resetAnimation() {
    animationState = "idle";
    animationSteps = [];
    currentStepIndex = 0;
    comparisonCount = 0;
    swapCount = 0;

    const { comparisonEl, swapEl } = getCounterElements();
    if (comparisonEl) comparisonEl.textContent = 0;
    if (swapEl) swapEl.textContent = 0;

    document.querySelectorAll(".bar").forEach(bar => {
        bar.className = "bar"; // removes all state classes at once
    });
}

export function getAnimationState() {
  return animationState;
}

export function setAnimationSpeed(speed) {
  animationSpeed = speed;
}

export async function stepForward() {
    if (animationState === "playing") return; // don't interrupt active playback
    if (animationState === "idle") {
        // nothing loaded yet
        return;
    }
    if (currentStepIndex >= animationSteps.length) return;
    await runSingleStep(false);
}

async function playNextStep() {
    if (animationState !== "playing") return;

    if (currentStepIndex >= animationSteps.length) {
        animationState = "idle";
        // mark all bars sorted on completion
        document.querySelectorAll(".bar").forEach(bar => {
            bar.classList.add("sorted");
        });
        if (onAnimationComplete) onAnimationComplete();
        return;
    }

    await runSingleStep(true);

    if (animationState !== "playing") return;

    await playNextStep();
}

// Executes exactly ONE step
async function runSingleStep(allowPause) {
    const currentStep = animationSteps[currentStepIndex];
    const { comparisonEl, swapEl } = getCounterElements();

    if (currentStep.type === STEP_TYPES.COMPARE) {
        comparisonCount++;
        if (comparisonEl) comparisonEl.textContent = comparisonCount;
    }

    if (currentStep.type === STEP_TYPES.SWAP || currentStep.type === STEP_TYPES.OVERWRITE) {
        swapCount++;
        if (swapEl) swapEl.textContent = swapCount;
    }

    renderStep(currentStep);

    const delay = Math.max(20, 1100 - animationSpeed * 10);
    await sleep(delay);

    if (allowPause && animationState !== "playing") return;

    clearStep(currentStep);
    currentStepIndex++;
}

//adding the sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// safer — query at the point of use
function updateCounters() {
    const compEl = document.getElementById("comparison-count");
    const swapEl = document.getElementById("swap-count");
    if (compEl) compEl.textContent = comparisonCount;
    if (swapEl) swapEl.textContent = swapCount;
}