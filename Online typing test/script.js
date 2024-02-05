let textToType = document.getElementById("text-to-type").innerText;
let userInput = document.getElementById("user-input");
let textPreview = document.getElementById("text-preview");
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");
let timerValue = document.getElementById("timer-value");
let timerInterval;

function startTest() {
  textPreview.innerText = textToType;
  userInput.value = "";
  startBtn.style.display = "none";
  stopBtn.style.display = "inline-block";
  resetBtn.style.display = "inline-block";
  userInput.removeAttribute("disabled");

  let seconds = 60;
  timerInterval = setInterval(function () {
    seconds--;
    timerValue.innerText = `${seconds} s`;

    if (seconds === 0) {
      stopTest();
    }
  }, 1000);
}

function stopTest() {
  clearInterval(timerInterval);
  startBtn.style.display = "none";
  stopBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  userInput.setAttribute("disabled", "true");
  calculateStats();
}

function resetTest() {
  clearInterval(timerInterval);
  startBtn.style.display = "inline-block";
  stopBtn.style.display = "none";
  resetBtn.style.display = "none";
  timerValue.innerText = "0 s";
  userInput.removeAttribute("disabled");
  resetStats();
}


function calculateStats() {
    let typedWords = userInput.value.split(/\s+/).filter(word => word !== "").length;
    let correctWords = calculateCorrectWords(userInput.value, textToType);
    let incorrectWords = typedWords - correctWords;
  
    let timeTakenInMinutes = 60 - parseInt(timerValue.innerText);
  
    let grossWordsPerMinute = (typedWords / timeTakenInMinutes).toFixed(2);
    let netWordsPerMinute = (correctWords / timeTakenInMinutes).toFixed(2);
    let accuracy = ((netWordsPerMinute * 100) / grossWordsPerMinute).toFixed(2);
  
    document.getElementById("gross-words-value").innerText = typedWords;
    document.getElementById("gwpm-value").innerText = grossWordsPerMinute;
    document.getElementById("net-words-value").innerText = correctWords;
    document.getElementById("nwpm-value").innerText = netWordsPerMinute;
    document.getElementById("accuracy-value").innerText = accuracy + " %";
  }
  
  function calculateCorrectWords(userInput, textToType) {
    let inputWords = userInput.split(/\s+/).filter(word => word !== "");
    let targetWords = textToType.split(/\s+/).filter(word => word !== "");
  
    let correctWords = 0;
  
    for (let i = 0; i < Math.min(inputWords.length, targetWords.length); i++) {
      if (inputWords[i] === targetWords[i]) {
        correctWords++;
      }
    }
  
    return correctWords;
  }
  

  function resetStats() {
    document.getElementById("timer-value").innerText = "0 s";
    document.getElementById("wpm-value").innerText = "0";
    document.getElementById("wps-value").innerText = "0";
    document.getElementById("errors-value").innerText = "0";
    document.getElementById("gross-words-value").innerText = "0";
    document.getElementById("gwpm-value").innerText = "0";
    document.getElementById("net-words-value").innerText = "0";
    document.getElementById("nwpm-value").innerText = "0";
    document.getElementById("accuracy-value").innerText = "0.00%";
  }
  
  
  
