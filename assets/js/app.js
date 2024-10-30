const text = "Fullstack Software Developer.";
const typingSpeed = 150;
const resetDelay = 2000;

let i = 0;
const heroElement = document.getElementById("hero");

function typeText() {
    if (i < text.length) {
        heroElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(resetText, resetDelay);
    }
}

function resetText() {
    heroElement.textContent = "";
    i = 0;
    typeText();
}

typeText();