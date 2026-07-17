import { STEP_TYPES } from "../core/stepTypes.js";

export function insertionSort(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    steps.push({ type: STEP_TYPES.SORTED, index: 0 });

    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0) {
            steps.push({ type: STEP_TYPES.COMPARE, first: j - 1, second: j });
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                steps.push({ type: STEP_TYPES.SWAP, first: j - 1, second: j });
                j--;
            } else {
                break;
            }
        }
        steps.push({ type: STEP_TYPES.SORTED, index: i });
    }

    return steps;
}