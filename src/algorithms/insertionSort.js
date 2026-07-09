import { STEP_TYPES } from "../core/stepTypes.js";

export function insertionSort(array) {

    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {

        let j = i;

        while (j > 0) {

    steps.push({
        type: STEP_TYPES.COMPARE,
        first: j,
        second: j - 1
    });

    if (arr[j] >= arr[j - 1]) {
        break;
    }

    const temp = arr[j];
    arr[j] = arr[j - 1];
    arr[j - 1] = temp;

    steps.push({
        type: STEP_TYPES.SWAP,
        first: j,
        second: j - 1
    });
    j--;
}
steps.push({
    type: STEP_TYPES.SORTED,
    index: i
});
    }
    
    return steps;
}