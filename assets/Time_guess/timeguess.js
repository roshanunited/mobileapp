"use strict";

// DOM要素の取得
const elTimer = document.querySelector("#timer");
const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const btnReset = document.querySelector("#reset");

// 状態管理用の変数
let beginTime;
let timerID;
let elapsedTime = 0;
let audioActive = false;
let audioObj = null;

// 初期状態に設定
initButtons();

////////////////////////
// スタートボタン
////////////////////////
btnStart.addEventListener("click", () => {
  if (audioActive) playSound("end", "");
  playSound("start", "sound/start.mp3");

  switchButtonState("running");
  beginTime = Date.now();
  runTimer();
});


btnStop.addEventListener("click", () => {
  if (audioObj && !audioObj.paused) {
    audioObj.pause();
    audioObj.currentTime = 0;
  }

  if (audioActive) playSound("end", "");

  if (elTimer.textContent.slice(0, 5) === "00:10") {
    audioObj = new Audio("sound/stop2_long.mp3");
    audioObj.play();


    const body = document.body;
    body.style.backgroundImage = "url('img/fireworks.gif')";
    body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  } else {
    audioObj = new Audio("sound/stop1_long.mp3");
    audioObj.play();
  }

  elapsedTime += Date.now() - beginTime;
  clearTimeout(timerID);
  switchButtonState("stopped");
});


btnReset.addEventListener("click", () => {
  if (audioActive) playSound("end", "");
  playSound("start", "sound/reset.mp3");

  elTimer.textContent = "00:00.000";
  elapsedTime = 0;
  switchButtonState("initial");

  const body = document.body;
  body.style.backgroundImage = "";
  body.style.backgroundColor = "rgba(233, 168, 227, 0.6)";
});


function runTimer() {
  const timeDiff = Date.now() - beginTime + elapsedTime;
  const d = new Date(timeDiff);
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  elTimer.textContent = `${min}:${sec}.${ms}`;

  timerID = setTimeout(runTimer, 10);
}


function switchButtonState(state) {
  const hiddenClass = "timer-fontColor_hidden";
  const appearClass = "timer_appear";

  if (state === "initial") {
    btnStart.classList.remove("js-inactive", "js-unclickable");
    btnStop.classList.add("js-inactive", "js-unclickable");
    btnReset.classList.add("js-inactive", "js-unclickable");
    elTimer.classList.remove(hiddenClass, appearClass);
  }

  if (state === "running") {
    elTimer.classList.add(hiddenClass);
    btnStart.classList.add("js-inactive", "js-unclickable");
    btnStop.classList.remove("js-inactive", "js-unclickable");
    btnReset.classList.add("js-inactive", "js-unclickable");
  }

  if (state === "stopped") {
    elTimer.classList.remove(hiddenClass);
    elTimer.classList.add(appearClass);
    btnStart.classList.add("js-inactive", "js-unclickable");
    btnStop.classList.add("js-inactive", "js-unclickable");
    btnReset.classList.remove("js-inactive", "js-unclickable");
  }
}

function initButtons() {
  switchButtonState("initial");
}

const SoundController = {
  audio: null,
  active: false,

  start(file) {
    this.audio = new Audio(file);
    this.audio.currentTime = 0;
    this.audio.play();
    this.active = true;
  },

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.active = false;
    }
  }
};

function playSound(status, file) {
  if (status === "start") SoundController.start(file);
  else if (status === "end") SoundController.stop();
}

