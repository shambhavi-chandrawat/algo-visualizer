import { generateArray, renderArray } from "./src/core/array.js";
import { STEP_TYPES, playSteps, resumeAnimation, pauseAnimation, } from "./src/core/animationEngine.js";

console.log("main.js loaded");

const array = generateArray();
renderArray(array);

const fakeSteps = [
    {
        type: STEP_TYPES.COMPARE,
        first: 0,
        second: 1
    },

    {
        type: STEP_TYPES.SWAP,
        first: 0,
        second: 1
    },

    {
        type: STEP_TYPES.COMPARE,
        first: 1,
        second: 2
    },

    {
        type: STEP_TYPES.SWAP,
        first: 1,
        second: 2
    },

    {
        type: STEP_TYPES.SORTED,
        index: 0
    }

];

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const resumeButton = document.getElementById("resume-btn");
const generateButton = document.getElementById("generate-btn");

console.log(playButton);
console.log(pauseButton);
console.log(resumeButton);

playButton.addEventListener("click", () => {
    playSteps(fakeSteps);
});
pauseButton.addEventListener("click", () => {
    pauseAnimation();
});
resumeButton.addEventListener("click", () => {
    resumeAnimation();
});

