const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const diffcultySelect = document.getElementById("difficulty");

//list of words for game

const words = [
  "sexy",
  "dominant",
  "labrador",
  "mare",
  "beast",
  "artificial",
  "superstitious",
  "word",
  "chocolate",
  "nutella",
  "admit",
  "fuark",
  "dominant"
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;
//set difficulty to value in LocalStorage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty select value
diffcultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//focus on text field on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);
//generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add to dom
function addWordtoDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//Game over

function gameOver() {
  endGameEl.innerHTML = `
            <h1> Time ran out</h1>
            <p>Your final score is ${score}</p>
            <button onclick='location.reload()'>Reload</button>
        `;
  endGameEl.style.display = "flex";
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}
addWordtoDOM();

//event listeners

//Typing
text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordtoDOM();
    updateScore();

    //clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});
//Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

//settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
