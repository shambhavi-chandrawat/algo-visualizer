import { generateArray, renderArray } from "./src/core/array.js";
import {
    playSteps,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
    stepForward,
    getAnimationState,
    setAnimationSpeed,
    setAnimationCompleteCallback
} from "./src/core/animationEngine.js";
import { bubbleSort } from "./src/algorithms/bubbleSort.js";
import { selectionSort } from "./src/algorithms/selectionSort.js";
import { insertionSort } from "./src/algorithms/insertionSort.js";
import { mergeSort } from "./src/algorithms/mergeSort.js";
import { quickSort } from "./src/algorithms/quickSort.js";

// --- State ---
let currentArray = [];
let originalArray = [];
let selectedAlgorithm = "bubble";

// --- Elements ---
const homePage = document.getElementById("home-page");
const visualizerPage = document.getElementById("visualizer-page");
const algorithmCards = document.querySelectorAll(".algorithm-card");
const backBtn = document.getElementById("back-btn");
const currentAlgorithmHeading = document.getElementById("current-algorithm");
const descriptionElement = document.getElementById("algorithm-description");
const bestElement = document.getElementById("best-case");
const averageElement = document.getElementById("average-case");
const worstElement = document.getElementById("worst-case");
const spaceElement = document.getElementById("space-complexity");
const stableElement = document.getElementById("stable");
const inplaceElement = document.getElementById("inplace");
const complexityElement = document.getElementById("complexity");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");
const resetButton = document.getElementById("reset-btn");
const stepButton = document.getElementById("step-btn");
const speedSlider = document.getElementById("speed-slider");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");

// --- Algorithm metadata ---
const algorithmData = {
    bubble: {
        name: "Bubble Sort",
        description: "Repeatedly compares adjacent elements and swaps them until the array is sorted.",
        best: "O(n)", average: "O(n²)", worst: "O(n²)",
        space: "O(1)", stable: "Yes", inplace: "Yes"
    },
    selection: {
        name: "Selection Sort",
        description: "Repeatedly selects the smallest element from the unsorted portion and places it at its correct position.",
        best: "O(n²)", average: "O(n²)", worst: "O(n²)",
        space: "O(1)", stable: "No", inplace: "Yes"
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds the sorted array one element at a time by inserting each element into its correct position.",
        best: "O(n)", average: "O(n²)", worst: "O(n²)",
        space: "O(1)", stable: "Yes", inplace: "Yes"
    },
    merge: {
        name: "Merge Sort",
        description: "Recursively divides the array into halves, sorts them, and merges them back together.",
        best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)",
        space: "O(n)", stable: "Yes", inplace: "No"
    },
    quick: {
        name: "Quick Sort",
        description: "Partitions the array around a pivot and recursively sorts the left and right partitions.",
        best: "O(n log n)", average: "O(n log n)", worst: "O(n²)",
        space: "O(log n)", stable: "No", inplace: "Yes"
    }
};

// --- Navigation ---
algorithmCards.forEach(card => {
    card.addEventListener("click", () => {
        const algorithm = card.dataset.algorithm;
        if (!algorithm) {
            alert("Comparison mode coming soon 🚀");
            return;
        }

        selectedAlgorithm = algorithm;
        const data = algorithmData[algorithm];

        currentAlgorithmHeading.textContent = data.name;
        descriptionElement.textContent = data.description;
        bestElement.textContent = data.best;
        averageElement.textContent = data.average;
        worstElement.textContent = data.worst;
        spaceElement.textContent = data.space;
        stableElement.textContent = data.stable;
        inplaceElement.textContent = data.inplace;
        complexityElement.textContent = data.average;

        homePage.style.display = "none";
        visualizerPage.style.display = "block";

        resetAnimation();
        currentArray = generateArray(Number(sizeSlider.value));
        originalArray = [...currentArray];
        renderArray(currentArray);
        unlockControls();
    });
});

backBtn.addEventListener("click", () => {
    resetAnimation();
    visualizerPage.style.display = "none";
    homePage.style.display = "flex";  // ← matches the CSS declaration
});

// --- Controls ---
playButton.addEventListener("click", () => {
    if (getAnimationState() !== "idle") return;

    const sorters = { bubble: bubbleSort, selection: selectionSort, insertion: insertionSort, merge: mergeSort, quick: quickSort };
    const sorter = sorters[selectedAlgorithm];
    if (!sorter) return;

    const steps = sorter(currentArray);
    lockControls();
    playSteps(steps);
});

pauseButton.addEventListener("click", () => pauseAnimation());
resumeButton.addEventListener("click", () => resumeAnimation());
stepButton.addEventListener("click", () => stepForward());

generateButton.addEventListener("click", () => {
    resetAnimation();
    currentArray = generateArray(Number(sizeSlider.value));
    originalArray = [...currentArray];
    renderArray(currentArray);
    unlockControls();
});

resetButton.addEventListener("click", () => {
    resetAnimation();
    currentArray = [...originalArray];
    renderArray(currentArray);
    unlockControls();
});

speedSlider.addEventListener("input", () => {
    setAnimationSpeed(Number(speedSlider.value));
});

sizeSlider.addEventListener("input", () => {
    if (getAnimationState() !== "idle") return;
    const size = Number(sizeSlider.value);
    sizeValue.textContent = size;
    resetAnimation();
    currentArray = generateArray(size);
    originalArray = [...currentArray];
    renderArray(currentArray);
});

// --- Helpers ---
function lockControls() {
    generateButton.disabled = true;
    sizeSlider.disabled = true;
    playButton.disabled = true;
}

function unlockControls() {
    generateButton.disabled = false;
    sizeSlider.disabled = false;
    playButton.disabled = false;
}

setAnimationCompleteCallback(() => unlockControls());

// init
sizeValue.textContent = sizeSlider.value;

// ── THEME TOGGLE ──
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "light" ? "dark" : "light");
});

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "light" ? "🌙 Dark" : "☀️ Light";
}