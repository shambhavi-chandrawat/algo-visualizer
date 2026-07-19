export const TutorialMessages = {
    compare(step) {
        return `We are comparing ${step.values[0]} and ${step.values[1]}. Let's see which one is smaller.`;
    },
    swap(step) {
        return `Since ${step.values[0]} is larger, we swap these two elements.`;
    },
    sorted(step) {
        return `${step.value} is now in its correct position.`;
    },
    newMinimum(step) {
        return `Great! We found a new minimum value.`;
    }
};

export const BubbleTutorial={

intro:

"Let's learn Bubble Sort together!",

firstCompare:

"We always compare two neighbouring bars.",

firstSwap:

"The left bar is bigger, so we swap them.",

passComplete:

"The largest element has reached the end!",

finished:

"Awesome! Bubble Sort is complete."

}