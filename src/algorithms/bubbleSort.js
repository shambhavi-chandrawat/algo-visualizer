import { STEP_TYPES } from "../core/stepTypes.js";

export function bubbleSort(array) {
    const steps = [];
    const arr = [...array]; // we'll not modify the original array, so we create a copy of it
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            // Record every comparison
            steps.push({
                type: STEP_TYPES.COMPARE,
                first: j,
                second: j + 1
            });

            // Swap if needed
            if (arr[j] > arr[j + 1]) {

                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                steps.push({
                    type: STEP_TYPES.SWAP,
                    first: j,
                    second: j + 1
                });
            }
        }

        // Last element of this pass is now sorted
        steps.push({
            type: STEP_TYPES.SORTED,
            index: n - i - 1
        });
    }

    // First element is also sorted at the end
    if (n > 0) {
        steps.push({
            type: STEP_TYPES.SORTED,
            index: 0
        });
    }

    return steps;
}