window.onload = (event) => {
    console.log("Page is fully loaded!");

    if (showEpilepsyWarningAtStart == "true") {
        showEpilepsyWarning();
    } else {
        makeNewBGColor(bgColorFromLocalStorage);
        currentBGColorText.innerText = bgColorFromLocalStorage;
    }
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        callToAction.children[0].innerText = "Tap here!";
        callToAction.children[1].innerText =
            "... and tap really fast to party!";
    }
};

let bgColor = document.getElementById("bgColor");
let warningTextWrapper = document.getElementById("warningTextWrapper");
let warningText = document.getElementById("warningText");
// dontShowWarningAgain is the checkbox in the warning textbox. Works without me defining it in JS.
let currentBGColorText = document.getElementById("currentBGColorText");
let callToAction = document.getElementById("callToAction");
let currentBGColorContainer = document.getElementById(
    "currentBGColorContainer"
);
let bgColorFromLocalStorage = localStorage.bgColor;

// Toggles warning textbox and toggles autorun new color
let showEpilepsyWarningAtStart =
    localStorage.getItem("showEpilepsyWarningAtStart") || "true";

// Use promise and async here to save function to variable! ????
function makeNewBGColor(color) {
    if (color === undefined) {
        return (bgColor.style.backgroundColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6));
    } else {
        bgColor.style.backgroundColor = color;
    }
}

function showEpilepsyWarning() {
    warningText.style.display = "flex";
}

function removeEpilepsyWarning() {
    warningText.style.display = "none";
}

// Code to change color

window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        removeEpilepsyWarning();
        bgColor.style.transitionDuration = "500ms";
        currentBGColorText.innerText = makeNewBGColor();
        localStorage.setItem("bgColor", currentBGColorText.innerText);
    }
});

bgColor.addEventListener("pointerdown", (e) => {
    removeEpilepsyWarning();
    bgColor.style.transitionDuration = "500ms";
    currentBGColorText.innerText = makeNewBGColor();

    localStorage.setItem("bgColor", currentBGColorText.innerText);
    if (dontShowWarningAgain.checked === true) {
        console.log("checkbox true");
        localStorage.setItem("showEpilepsyWarningAtStart", "false");
    }
});

callToAction.addEventListener("pointerdown", (e) => {
    removeEpilepsyWarning();
    bgColor.style.transitionDuration = "500ms";
    currentBGColorText.innerText = makeNewBGColor();

    localStorage.setItem("bgColor", currentBGColorText.innerText);
    if (dontShowWarningAgain.checked === true) {
        console.log("checkbox true");
        localStorage.setItem("showEpilepsyWarningAtStart", "false");
    }
});

//Code to copy color to clipboard

currentBGColorContainer.addEventListener("pointerdown", (e) => {
    navigator.clipboard.writeText(currentBGColorText.innerText);
    console.log(`Copied ${currentBGColorText.innerText} to clipboard!`);
});
