"use strict";

let flag = "pen-flag";
let counter = 9;
let winningLine = null;

const squaresArray = Array.from(document.getElementsByClassName("square"));
const newgamebtn = document.getElementById("btn90");
const newgamebtn_display = document.getElementById("newgame-btn");

const msgtxt1 = 'Penguins Attack! (your turn)';
const msgtxt2 = 'WhiteBear Attack! (computer turn)';
const msgtxt3 = 'Penguins Win!!';
const msgtxt4 = 'WhiteBear Win!!';
const msgtxt5 = 'Draw!!';

const gameSound = [
  "sound/click_sound1.mp3",
  "sound/click_sound2.mp3",
  "sound/penwin_sound.mp3",
  "sound/bearwin_sound.mp3",
  "sound/draw_sound.mp3"
];

const lineArray = [
  ["a_1","a_2","a_3"],
  ["b_1","b_2","b_3"],
  ["c_1","c_2","c_3"],
  ["a_1","b_1","c_1"],
  ["a_2","b_2","c_2"],
  ["a_3","b_3","c_3"],
  ["a_1","b_2","c_3"],
  ["a_3","b_2","c_1"]
].map(ids => ids.map(id => document.getElementById(id)));

window.onload = () => setMessage("pen-turn");

squaresArray.forEach(square => {
  square.addEventListener("click", () => {
    if (isSelect(square) === "0") {
      document.getElementById("squaresBox").classList.add("js-unclickable");
      setTimeout(bearTurn, 800);
    }
  });
});

function isSelect(square) {
  if (flag === "pen-flag") {
    square.classList.add("js-pen-checked","js-unclickable");
    if (isWinner("js-pen-checked")) return endGame("pen");
    flag = "bear-flag";
    setMessage("bear-turn");
  } else {
    square.classList.add("js-bear-checked","js-unclickable");
    if (isWinner("js-bear-checked")) return endGame("bear");
    flag = "pen-flag";
    setMessage("pen-turn");
  }
  counter--;
  if (counter === 0) return endGame("draw");
  return "0";
}

function isWinner(cls) {
  return lineArray.some(line =>
    line.every(sq => sq.classList.contains(cls))
  );
}

function endGame(type) {
  setMessage(type === "pen" ? "pen-win" : type === "bear" ? "bear-win" : "draw");
  newgamebtn_display.classList.remove("js-hidden");
  squaresArray.forEach(s => s.classList.add("js-unclickable"));
  return "1";
}

function bearTurn() {
  const moves = squaresArray.filter(s => !s.classList.contains("js-unclickable"));
  if (moves.length) isSelect(moves[Math.floor(Math.random() * moves.length)]);
  document.getElementById("squaresBox").classList.remove("js-unclickable");
}

function setMessage(id) {
  document.getElementById("msgtext").innerText =
    id === "pen-turn" ? msgtxt1 :
    id === "bear-turn" ? msgtxt2 :
    id === "pen-win" ? msgtxt3 :
    id === "bear-win" ? msgtxt4 : msgtxt5;
}

newgamebtn.onclick = () => location.reload();
