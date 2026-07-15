import { generateArray, renderArray } from "./src/core/array.js";
import {
  playSteps,
  pauseAnimation,
  resumeAnimation,
  resetAnimation,
  stepForward,
  getAnimationState,
  setAnimationSpeed,
} from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";
import { selectionSort } from "./src/algorithms/selectionSort.js";
import { insertionSort } from "./src/algorithms/insertionSort.js";
import { mergeSort } from "./src/algorithms/mergeSort.js";
import { quickSort } from "./src/algorithms/quickSort.js";

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
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");

const homePage = document.getElementById("home-page");
const visualizerPage = document.getElementById("visualizer-page");
const algorithmCards = document.querySelectorAll(".algorithm-card");
const backBtn = document.getElementById("back-btn");

sizeValue.textContent = sizeSlider.value;

playButton.addEventListener("click", () => {
  if (getAnimationState() !== "idle") {
    return;
  }
  const algorithm = selectedAlgorithm;

  let steps;

  if (algorithm === "bubble") {
    steps = bubbleSort(currentArray);
  } else if (algorithm === "selection") {
    steps = selectionSort(currentArray);
  } else if (algorithm === "insertion") {
    steps = insertionSort(currentArray);
  } else if (algorithm === "merge") {
    steps = mergeSort(currentArray);
  } else if (algorithm === "quick") {
    steps = quickSort(currentArray);
  } else {
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
  renderArray(currentArray); // re-render the bars
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

sizeSlider.addEventListener("input", () => {
  if (getAnimationState() !== "idle") {
    return;
  }
  const size = Number(sizeSlider.value);

  sizeValue.textContent = size;

  resetAnimation();

  currentArray = generateArray(size);
  originalArray = [...currentArray];

  renderArray(currentArray);
});

const algorithmNames = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
};

let selectedAlgorithm = "bubble";

const currentAlgorithmHeading = document.getElementById("current-algorithm");

algorithmCards.forEach((card) => {
  card.addEventListener("click", () => {
    const algorithm = card.dataset.algorithm;

    if (!algorithm) {
      alert("Comparison mode coming soon 🚀");
      return;
    }

    selectedAlgorithm = algorithm;

    currentAlgorithmHeading.textContent = algorithmNames[algorithm];

    homePage.style.display = "none";
    visualizerPage.style.display = "block";

    resetAnimation();

    playButton.disabled = false;

    currentArray = generateArray(Number(sizeSlider.value));
    originalArray = [...currentArray];

    renderArray(currentArray);
  });
});

backBtn.addEventListener("click", () => {
  visualizerPage.style.display = "none";
  homePage.style.display = "block";
});
