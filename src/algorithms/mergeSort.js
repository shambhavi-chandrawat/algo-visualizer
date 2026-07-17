import { STEP_TYPES } from "../core/stepTypes.js";

export function mergeSort(array) {
    const steps = [];
    const arr = [...array];
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
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        steps.push({ type: STEP_TYPES.COMPARE, first: left + i, second: mid + 1 + j });
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            steps.push({ type: STEP_TYPES.OVERWRITE, index: k, value: leftArr[i] });
            i++;
        } else {
            arr[k] = rightArr[j];
            steps.push({ type: STEP_TYPES.OVERWRITE, index: k, value: rightArr[j] });
            j++;
        }
        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({ type: STEP_TYPES.OVERWRITE, index: k, value: leftArr[i] });
        i++; k++;
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({ type: STEP_TYPES.OVERWRITE, index: k, value: rightArr[j] });
        j++; k++;
    }
}