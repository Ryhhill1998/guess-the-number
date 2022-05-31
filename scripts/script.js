
// create function to generate chosen number for game
const generateNumber = function() {
  return Math.floor(Math.random() * 20) + 1;
};

// generate random chosen number for game
let chosenNumber = generateNumber();

// create game on variable to allow user interaction
let gameOn = true;

// create set object to contain all unique guesses
let guesses = new Set();

// create constants for all dom items to be selected
const submit = document.querySelector(".submit");
const guess = document.querySelector(".guess");
const header = document.querySelector("header");
const number = document.querySelector(".number");
const highscore = document.querySelector(".highscore");
const guessLabel = document.querySelector(".guess-number");
const message = document.querySelector(".message");
const replay = document.querySelector(".replay");
const deleteButton = document.querySelector(".delete");

// create variable for game guessNumber
let guessNumber = guessLabel.textContent;

// create high score variable
let highscoreValue = highscore.textContent;

// create functions to change appearance of dom
const updateMessage = function(newMessage) {
  message.textContent = newMessage;
};

const updateGuessNumber = function(guesses) {
  guessLabel.textContent = guessNumber;
};

const updateHighscore = function(newHighscore) {
  highscoreValue = newHighscore;
  highscore.textContent = newHighscore;
};

const resetGuessInput = function() {
  guess.value = "";
};

// create game over function for game won and game lost
const gameOver = function(outcome) {
  gameOn = false;
  const colour = (outcome === "win" ? "#60b347" : "red");
  const newMessage = (outcome === "win" ? "Correct! Well done!" : "Game over! You lose!");
  header.style.borderColor = colour;
  number.style.color = colour;
  number.style.borderColor = colour;
  number.style.width = "30rem";
  number.textContent = chosenNumber;
  updateMessage(newMessage);
};

// submit user guess against chosen number
submit.addEventListener("click", function() {

  if (!gameOn) return;

  // create variable to hold guess submitted by player
  const guessValue = guess.value;

  // When guess is not valid
  if (!guessValue || guessValue < 1 || guessValue > 20) {
    updateMessage("Invalid input!");

  // When guess is correct
  } else if (guessValue == chosenNumber) {
    guessNumber++;
    updateGuessNumber(guessNumber);
    gameOver("win");
    if (highscoreValue === "--" || guessNumber < highscoreValue) {
      updateHighscore(guessNumber);
    }

  // guess is too high or too low
  } else {
    if (guesses.has(guessValue)) {
      updateMessage("You already guessed that number!");
    } else {
      guesses.add(guessValue);
      updateMessage(guessValue > chosenNumber ? "Too high!" : "Too low");
    }
    guessNumber++;
    updateGuessNumber(guessNumber);
  }

  // check if player lost game
  if (guessNumber === 10) {
    gameOver("lose");
  }

});

// delete user input if delete button clicked
deleteButton.addEventListener("click", function() {
  resetGuessInput();
});

// Restart game if user clicks replay
replay.addEventListener("click", function() {

  if (gameOn) return;

  gameOn = true;
  chosenNumber = generateNumber();
  guessNumber = 0;
  guesses = new Set();

  header.style.borderColor = "#82DBD8";
  guessLabel.textContent = guessNumber;
  resetGuessInput();
  number.style.width = "15rem";
  number.textContent = "?";
  number.style.color = "#222";
  number.style.borderColor = "#82DBD8";
  updateMessage("Start guessing...");
});
