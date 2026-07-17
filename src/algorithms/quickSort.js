import { STEP_TYPES } from "../core/stepTypes.js";

export function quickSort(array) {
    const steps = [];
    const arr = [...array];
    quickSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
}

function quickSortHelper(arr, low, high, steps) {
    if (low >= high) {
        if (low === high) steps.push({ type: STEP_TYPES.SORTED, index: low });
        return;
    }
    const pivotIndex = partition(arr, low, high, steps);
    steps.push({ type: STEP_TYPES.SORTED, index: pivotIndex });
    quickSortHelper(arr, low, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, high, steps);
}

function partition(arr, low, high, steps) {
    steps.push({ type: STEP_TYPES.PIVOT, index: high });
    let i = low - 1;

    for (let j = low; j < high; j++) {
        steps.push({ type: STEP_TYPES.COMPARE, first: j, second: high });
        if (arr[j] <= arr[high]) {
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ type: STEP_TYPES.SWAP, first: i, second: j });
            }
        }
    }

    const pivotFinal = i + 1;
    if (pivotFinal !== high) {
        [arr[pivotFinal], arr[high]] = [arr[high], arr[pivotFinal]];
        steps.push({ type: STEP_TYPES.SWAP, first: pivotFinal, second: high });
    }

    return pivotFinal;
}