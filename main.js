window.onload = (event) => {
    console.log("Page is fully loaded!");
    if (showEpilepsyWarningAtStart) {
        showEpilepsyWarning();
    } else {
        currentBGColorText.innerText = makeNewBGColor();
    }
    // The autoformatter does this. Yes, it is valid code...
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        // callToAction.innerText = "Tap the screen!";
        callToAction.children[0].innerText = "Tap here!";
        callToAction.children[1].innerText =
            "... and tap really fast to party!";
    }
};

let bgColor = document.getElementById("bgColor");
// let newBGColor = "";
let warningText = document.getElementById("warningText");
let currentBGColorText = document.getElementById("currentBGColorText");
let callToAction = document.getElementById("callToAction");

// Toggles warning textbox and toggles autorun new color
let showEpilepsyWarningAtStart = Boolean(false);

function makeNewBGColor(params) {
    // Color generator code one-liner from: https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
    return (bgColor.style.backgroundColor =
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6));
}

function showEpilepsyWarning() {
    warningText.style.display = "flex";
}

function removeEpilepsyWarning() {
    warningText.style.display = "none";
}

// Code to change color

window.addEventListener(
    "keydown",
    (e) => {
        if (e.key === " ") {
            currentBGColorText.innerText = makeNewBGColor();
            removeEpilepsyWarning();
        }
    }
    // makes it so that listener is only run once. no changing the color again.
    // { once: true }
);

//FYI: "touchmove" is also wacky
callToAction.addEventListener("touchstart", (e) => {
    currentBGColorText.innerText = makeNewBGColor();
    removeEpilepsyWarning();
});

// YES, this WORKS and could REPLACE keydown and touchstart, but it only executes once. Is that what I want? Probably.
// window.addEventListener("pointerdown", (e) => {
//     currentBGColorText.innerText = makeNewBGColor();
//     removeEpilepsyWarning();
// });

// Copy to clipboard; Currently doesn't work for mobile/Android, may require secure context as solution.

["touchstart", "click"].forEach((evt) => {
    currentBGColorText.addEventListener(evt, (e) => {
        navigator.clipboard.writeText(currentBGColorText.innerText);
        console.log(`Copied ${currentBGColorText.innerText} to clipboard!`);
    });
});

// THIS CODE DOESNT RUN ON FENIX??? I tried to window. ...
// currentBGColorText.addEventListener("touchstart", (e) => {
//     navigator.clipboard.writeText(currentBGColorText.innerText);
// });

// DEBUG function to test if on mobile devices navigator.clipboard does anything, but it doesnt even resolve or catch. like it just doesnt run at all.
// currentBGColorText.addEventListener("touchstart", (e) => {
//     navigator.clipboard
//         .writeText(currentBGColorText.innerText)
//         .then(() => {
//             currentBGColorText.innerText = "copied!";
//         })
//         .catch(() => {
//             currentBGColorText.innerText = "couldnt copy idk lol";
//         });
// });

/////////////////////////////////////////////////////////////

// todo:
// -check if mobile then change text to tap the screen
// Solved: Checks if mobile via A LOT of checks, as "navigator.userAgentData.mobile" IS AN EXPERIMENTAL feature, and only works in these browsers: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData#browser_compatibility

// Add user toggle to change showEpilepsyWarningAtStart and store with this API \/
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage

// -EPILEPSY WARNING: Prevent user from holding down spacebar?
// Solved: By default a color transition takes 500ms, though I DID make it easier to change its value, it's in the :root element

// html input Slider that changes value of transition of color for css element for no reason and makes even more unneccessary JS code?

// maybe just add another js file. and seperate this...?
// but sharing vars between files.. ugh

// button nearbottom near hex value with copy icon that copies to clipboard. Use clipboard api. hopefully works and i dont need "secure context"
// icon via google material design or local svg?

// Add new Colors to array and make a list view or sth. Ideally with preview icon of color (and their respective hex value ofc.)
// on mobile via hamburger menu
