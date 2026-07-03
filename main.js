import { generateArray, renderArray } from "./src/core/array.js";
import { STEP_TYPES } from "./src/core/stepTypes.js"; // import from source, not animationEngine
import { playSteps, pauseAnimation, resumeAnimation, resetAnimation } from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";

let currentArray = generateArray();
renderArray(currentArray);
let originalArray = [...currentArray];

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");
const resetButton = document.getElementById("reset-btn");

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
    resetAnimation(); //reset the animation before generating a new array
    currentArray = generateArray(); // generate and store new array
    let originalArray = [...currentArray];
    renderArray(currentArray);     // re-render the bars
});

resetButton.addEventListener("click", () => {
    resetAnimation();
    currentArray = [...originalArray];
    renderArray(currentArray);
});