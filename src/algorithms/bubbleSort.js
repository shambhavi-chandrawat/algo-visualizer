import { STEP_TYPES } from "../core/stepTypes.js";

export function bubbleSort(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) { // n-i-1 because last i elements are already sorted
            steps.push({ type: STEP_TYPES.COMPARE, first: j, second: j + 1 });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ type: STEP_TYPES.SWAP, first: j, second: j + 1 });
            }
        }
        steps.push({ type: STEP_TYPES.SORTED, index: n - i - 1 });
    }

    if (n > 0) steps.push({ type: STEP_TYPES.SORTED, index: 0 });

    return steps;
}