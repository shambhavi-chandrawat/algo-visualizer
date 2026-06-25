export const STEP_TYPES = {
    COMPARE: "compare",
    SWAP: "swap",
    SORTED: "sorted"
}; //for making our code safer and prevent future spelking mistakes

export function playSteps(steps) {
console.log(steps);
console.log(steps[0]);
console.log(steps[0].type);
console.log(steps[0].first);
console.log(steps[0].second);

}