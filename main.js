import { generateArray, renderArray } from "./src/core/array.js";
import { STEP_TYPES, playSteps } from "./src/core/animationEngine.js";

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

console.log(fakeSteps);
playSteps(fakeSteps);