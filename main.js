import { generateArray, renderArray } from "./src/core/array.js";
import { playSteps, pauseAnimation, resumeAnimation, resetAnimation, stepForward, getAnimationState } from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";

let currentArray = generateArray();
renderArray(currentArray);
let originalArray = [...currentArray];

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");
const resetButton = document.getElementById("reset-btn");
const stepButton = document.getElementById("step-btn");

playButton.addEventListener("click", () => {
    if (getAnimationState() !== "idle") {
        return;
    }
    const steps = bubbleSort(currentArray);
    playSteps(steps);
});

pauseButton.addEventListener("click", () => {
    pauseAnimation();
});

resumeButton.addEventListener("click", () => {
    resumeAnimation();
});

generateButton.addEventListener("click", () => {
    resetAnimation(); //reset the animation before generating a new array
    playButton.disabled = false;

    currentArray = generateArray(); // generate and store new array
     originalArray = [...currentArray];
    renderArray(currentArray);     // re-render the bars
});

resetButton.addEventListener("click", () => {
    resetAnimation();
    playButton.disabled = false;
    currentArray = [...originalArray];
    renderArray(currentArray);
});

stepButton.addEventListener("click", () => {
    stepForward();
});