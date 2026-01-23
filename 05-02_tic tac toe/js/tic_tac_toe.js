"use strict";

let flag = "pen-flag";   // pen = white bear, bear = penguin
let counter = 9;

// squares
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// messages
const msgtxt1 =
    '<p class="image"><img src="img/penguins.jpg" width="61" height="61"></p>' +
    '<p class="text">Penguins Attack!</p>';

const msgtxt2 =
    '<p class="image"><img src="img/whitebear.jpg" width="61" height="61"></p>' +
    '<p class="text">Whitebear Attack!</p>';

// initial message
window.addEventListener("DOMContentLoaded", function () {
    setMessage("pen-turn");
}, false);

// click events
[a_1,a_2,a_3,b_1,b_2,b_3,c_1,c_2,c_3].forEach(square => {
    square.addEventListener("click", function () {
        isSelect(square);
    }, false);
});

function isSelect(selectSquare) {

    if (flag === "pen-flag") {
        // White Bear
        selectSquare.classList.add("js-pen-checked");
        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        // Penguin
        selectSquare.classList.add("js-bear-checked");
        setMessage("pen-turn");
        flag = "pen-flag";
    }

    selectSquare.classList.add("js-unclickable");
    counter--;

   
}

function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;

        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;

        case "draw":
            document.getElementById("msgtext").innerHTML = "<p>Draw Game!</p>";
            break;

        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}
