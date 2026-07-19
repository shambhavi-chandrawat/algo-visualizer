let tutorialEnabled = true;
let waiting = false;

export function enableTutorial(){

    tutorialEnabled = true;

}

export function disableTutorial(){

    tutorialEnabled = false;

}

export function isTutorialEnabled(){

    return tutorialEnabled;

}

export function isWaiting(){

    return waiting;

}

export function wait(){

    waiting = true;

}

export function continueTutorial(){

    waiting = false;

}

let waiting=false;

export function waitForUser(){

waiting=true;

}

export function continueTutorial(){

waiting=false;

}

export function isWaiting(){

return waiting;

}