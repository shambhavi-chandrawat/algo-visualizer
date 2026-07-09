import { generateArray, renderArray } from "./src/core/array.js";
import { playSteps, pauseAnimation, resumeAnimation, resetAnimation, stepForward, getAnimationState, setAnimationSpeed } from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";
import { selectionSort } from "./src/algorithms/selectionSort.js";
import { insertionSort} from "./src/algorithms/insertionSort.js";
import { mergeSort } from "./src/algorithms/mergeSort.js";

let currentArray = generateArray();
renderArray(currentArray);
let originalArray = [...currentArray];

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");
const resetButton = document.getElementById("reset-btn");
const stepButton = document.getElementById("step-btn");
const speedSlider = document.getElementById("speed-slider");

playButton.addEventListener("click", () => {
    if (getAnimationState() !== "idle") {
        return;
    }
    const algorithm = document.getElementById("algorithm-select").value;

let steps;

if (algorithm === "bubble") {
    steps = bubbleSort(currentArray);
}
else if (algorithm === "selection") {
    steps = selectionSort(currentArray);
    
}
else if (algorithm === "insertion") {
    steps = insertionSort(currentArray);
}
else if (algorithm === "merge") {
    steps = mergeSort(currentArray);
}
else {
        return;
    }

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

speedSlider.addEventListener("input", () => {
    setAnimationSpeed(Number(speedSlider.value));
});