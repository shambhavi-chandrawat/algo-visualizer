export const STEP_TYPES = {
    COMPARE: "compare",
    SWAP: "swap",
    SORTED: "sorted"
}; //for making our code safer and prevent future spelking mistakes

export async function playSteps(steps) {
    for (let i = 0; i < steps.length; i++) {
        const currentStep = steps[i];
    if (currentStep.type === STEP_TYPES.COMPARE) {
        console.log(`Comparing ${currentStep.first} and ${currentStep.second}`);
    }
    else if (currentStep.type === STEP_TYPES.SWAP) {
        console.log(`Swapping ${currentStep.first} and ${currentStep.second}`);
    }
    else if (currentStep.type === STEP_TYPES.SORTED) {
        console.log(`Bar ${currentStep.index} is sorted`);
    }
    await sleep (1000); //causes a 1 second wait after each step
  }
}

//adding the sleep function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}