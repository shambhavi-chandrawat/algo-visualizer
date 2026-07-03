import { generateArray, renderArray } from "./src/core/array.js";
import { STEP_TYPES } from "./src/core/stepTypes.js"; // import from source, not animationEngine
import { playSteps, pauseAnimation, resumeAnimation } from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";

console.log("main.js loaded");

let currentArray = generateArray();
renderArray(currentArray);

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");

playButton.addEventListener("click", () => {
    const steps = bubbleSort(currentArray); // use real steps, not fakeSteps
    playSteps(steps);
});

pauseButton.addEventListener("click", () => {
    pauseAnimation();
});

resumeButton.addEventListener("click", () => {
    resumeAnimation();
});

generateButton.addEventListener("click", () => {
    currentArray = generateArray(); // generate and store new array
    renderArray(currentArray);     // re-render the bars
});