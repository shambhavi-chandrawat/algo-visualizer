import { STEP_TYPES } from "../core/stepTypes.js";

export function selectionSort(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            steps.push({ type: STEP_TYPES.COMPARE, first: minIndex, second: j });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            steps.push({ type: STEP_TYPES.SWAP, first: i, second: minIndex });
        }

        steps.push({ type: STEP_TYPES.SORTED, index: i });
    }

    steps.push({ type: STEP_TYPES.SORTED, index: n - 1 });
    return steps;
}