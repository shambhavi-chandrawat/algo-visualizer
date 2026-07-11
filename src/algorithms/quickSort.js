import { STEP_TYPES } from "../core/stepTypes.js";

export function quickSort(array) {

    const arr = [...array];
    const steps = [];

    quickSortHelper(arr, 0, arr.length - 1, steps);

    return steps;
}

function quickSortHelper(arr, low, high, steps) {

    if (low >= high) {
        return;
    }

    const pivotIndex = partition(arr, low, high, steps);

    quickSortHelper(arr, low, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, high, steps);
}

function partition(arr, low, high, steps) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {

        steps.push({
            type: STEP_TYPES.COMPARE,
            first: j,
            second: high
        });

        if (arr[j] < pivot) {

            i++;

            [arr[i], arr[j]] = [arr[j], arr[i]];

            steps.push({
                type: STEP_TYPES.SWAP,
                first: i,
                second: j
            });
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
        type: STEP_TYPES.SWAP,
        first: i + 1,
        second: high
    });

    return i + 1;
}