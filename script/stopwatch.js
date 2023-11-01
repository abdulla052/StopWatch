let milliSeconds = 0;
let seconds = 0;
let minutes = 0;

let intervalId;

let lapList = [];
let lapHtml = "";

const millisecondElement = document.querySelector(".seconds");
const secondsElement = document.querySelector(".minutes");
const minutesElement = document.querySelector(".hours");

const timeContainerElement = document.querySelector(".time-container");
const startElement = document.querySelector(".start-btn");
const lapElement = document.querySelector(".lap-btn");
const lapTimesElement = document.querySelector(".lap-time-container");

lapElement.disabled = true;

function startStopWatch() {
  if (startElement.innerText === "Start") {
    intervalId = setInterval(() => {
      milliSeconds++;
      if (milliSeconds === 100) {
        seconds++;
        milliSeconds = 0;
      }
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      updateDisplay();
    }, 10);
    startChanges();
  } else if (startElement.innerText === "Stop") {
    stopChanges();
  }
}

function startChanges() {
  startElement.innerText = "Stop";
  startElement.classList.add("start-color");
  timeContainerElement.classList.add("border-orange");
  lapElement.classList.add("lap-off");
  lapElement.disabled = false;
  if (lapElement.innerText === "Reset") {
    lapElement.innerText = "Lap";
    lapElement.classList.remove("reset-style");
  }
}

function stopChanges() {
  clearInterval(intervalId);
  startElement.innerText = "Start";
  startElement.classList.remove("start-color");
  timeContainerElement.classList.remove("border-orange");
  lapElement.innerText = "Reset";
  lapElement.classList.add("reset-style");
}

function lapAndResetBtn() {
  if (lapElement.innerText === "Reset") {
    resetAction();
  } else if (lapElement.innerText === "Lap") {
    lapAction();
  }
  updateDisplay();
}

function resetAction() {
  lapElement.innerText = "Lap";
  lapTimesElement.innerHTML = "";
  lapElement.classList.remove("reset-style");
  lapElement.classList.remove("lap-off");
  clearInterval(intervalId);
  milliSeconds = 0;
  seconds = 0;
  minutes = 0;
  lapList = [];
  console.log(lapList);
  lapElement.disabled = true;
  updateDisplay();
}

function lapAction() {
  const lapMilliSeconds = milliSeconds.toString().padStart(2, 0);
  const lapSeconds = seconds.toString().padStart(2, 0);
  const lapMinutes = minutes.toString().padStart(2, 0);

  lapList.push(`${lapMinutes}:${lapSeconds}:${lapMilliSeconds}`);
  updateDisplay();
}

function updateDisplay() {
  millisecondElement.textContent = milliSeconds.toString().padStart(2, 0);
  secondsElement.textContent = seconds.toString().padStart(2, 0);
  minutesElement.textContent = minutes.toString().padStart(2, 0);

  lapList.forEach((value, index) => {
    lapHtml += `<div class="lap-lines">
                <div class="left-align">Lap ${index + 1}</div>
                <div class="right-align">${value}</div>
                </div>`;
  });

  lapTimesElement.innerHTML = lapHtml;
  lapHtml = "";
}

startElement.addEventListener("click", () => startStopWatch());
lapElement.addEventListener("click", () => lapAndResetBtn());
