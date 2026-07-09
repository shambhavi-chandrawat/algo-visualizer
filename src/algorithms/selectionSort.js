import { STEP_TYPES } from "../core/stepTypes.js";

export function selectionSort(array) {

    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            // Record every comparison
            steps.push({
                type: STEP_TYPES.COMPARE,
                first: minIndex,
                second: j
            });

            // Update minimum index
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap only if needed
        if (minIndex !== i) {

            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            steps.push({
                type: STEP_TYPES.SWAP,
                first: i,
                second: minIndex
            });
        }

        // Mark current position as sorted
        steps.push({
            type: STEP_TYPES.SORTED,
            index: i
        });
    }

    // Last element is also sorted
    if (n > 0) {
        steps.push({
            type: STEP_TYPES.SORTED,
            index: n - 1
        });
    }

    return steps;
}