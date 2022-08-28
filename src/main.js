window.onload = (event) => {
    console.log("Page is fully loaded!");
    if (showEpilepsyWarningAtStart) {
        showEpilepsyWarning();
    } else {
        makeNewBGColor(bgColorFromLocalStorage);
        currentBGColorText.innerText = bgColorFromLocalStorage;
        // bgColor.style.transitionDuration = 1000;
    }
    // The autoformatter does this. Yes, it is valid code...
    // I am reworking this "autorun" section soon!
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
let warningText = document.getElementById("warningText");
let currentBGColorText = document.getElementById("currentBGColorText");
let callToAction = document.getElementById("callToAction");
let currentBGColorContainer = document.getElementById(
    "currentBGColorContainer"
);
let bgColorFromLocalStorage = localStorage.bgColor;

// Toggles warning textbox and toggles autorun new color
let showEpilepsyWarningAtStart = Boolean(false);

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
        bgColor.style.transitionDuration = "500ms";
        currentBGColorText.innerText = makeNewBGColor();
        localStorage.setItem("bgColor", currentBGColorText.innerText);
        removeEpilepsyWarning();
    }
});

callToAction.addEventListener("pointerdown", (e) => {
    bgColor.style.transitionDuration = "500ms";
    currentBGColorText.innerText = makeNewBGColor();
    localStorage.setItem("bgColor", currentBGColorText.innerText);
    removeEpilepsyWarning();
});

//Code to copy color to clipboard

currentBGColorContainer.addEventListener("pointerdown", (e) => {
    navigator.clipboard.writeText(currentBGColorText.innerText);
    console.log(`Copied ${currentBGColorText.innerText} to clipboard!`);
});
