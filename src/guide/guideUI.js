const guideText = document.getElementById("guide-text");
const guideName = document.querySelector(".guide-name");
const guidePanel = document.querySelector(".guide-panel");
const nextButton = document.getElementById("guide-next-btn");

export function showGuide() {
    guidePanel.style.display = "flex";
}

export function hideGuide() {
    guidePanel.style.display = "none";
}

export function setGuideName(name) {
    guideName.textContent = name;
}

export function setGuideMessage(message) {
    guideText.textContent = message;
}

export async function typeMessage(message) {
    guideText.textContent = "";

    for (const letter of message) {
        guideText.textContent += letter;
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}
export function initializeGuide() {

    showGuide();

    setGuideName("Shambhavi 🌸");

    setGuideMessage(
        "Hi! I'm your algorithm guide. Press Play and I'll explain every important step."
    );
    
    hideNextButton();
}

export function showNextButton() {
    nextButton.style.display = "block";
}

export function hideNextButton() {
    nextButton.style.display = "none";
}

nextButton.addEventListener("click",()=>{
continueTutorial();
hideNextButton();
});