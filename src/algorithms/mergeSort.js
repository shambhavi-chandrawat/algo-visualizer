import { STEP_TYPES } from "../core/stepTypes.js";

export function mergeSort(array) {

    const arr = [...array];
    const steps = [];

    mergeSortHelper(arr, 0, arr.length - 1, steps);

    return steps;
}

function mergeSortHelper(arr, left, right, steps) {

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    mergeSortHelper(arr, left, mid, steps);
    mergeSortHelper(arr, mid + 1, right, steps);

    merge(arr, left, mid, right, steps);
}

function merge(arr, left, mid, right, steps) {

    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArray.length && j < rightArray.length) {

        // Record comparison
        steps.push({
            type: STEP_TYPES.COMPARE,
            first: left + i,
            second: mid + 1 + j
        });

        if (leftArray[i] <= rightArray[j]) {

            arr[k] = leftArray[i];

            steps.push({
                type: STEP_TYPES.OVERWRITE,
                index: k,
                value: leftArray[i]
            });

            i++;
        }
        else {

            arr[k] = rightArray[j];

            steps.push({
                type: STEP_TYPES.OVERWRITE,
                index: k,
                value: rightArray[j]
            });

            j++;
        }

        k++;
    }

    while (i < leftArray.length) {

        arr[k] = leftArray[i];

        steps.push({
            type: STEP_TYPES.OVERWRITE,
            index: k,
            value: leftArray[i]
        });

        i++;
        k++;
    }

    while (j < rightArray.length) {

        arr[k] = rightArray[j];

        steps.push({
            type: STEP_TYPES.OVERWRITE,
            index: k,
            value: rightArray[j]
        });

        j++;
        k++;
    }
}
