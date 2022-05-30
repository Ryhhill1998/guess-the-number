
// generate random chosen number for game
let chosenNumber = Math.floor(Math.random() * 20) + 1;

// create variable for game Score
let score = document.querySelector(".score").textContent;

// create game on variable to allow user interaction
let gameOn = true;

// create set object to contain all unique guesses
let guesses = new Set();

// Check user guess against chosen number
document.querySelector(".check").addEventListener("click", function() {

  if (!gameOn) return;

  const guess = document.querySelector(".guess").value;

  let response;
  let correct = false;

  // When guess is not valid
  if (!guess || guess < 1 || guess > 20) {
    response = "Invalid input!";

  // When user guesses the same number twice
  } else if (guesses.has(guess)) {
    response = "You already guessed that number!";

  // When guess is too low
  } else if (guess < chosenNumber) {
    response = "Too low!";

  // When guess is too high
  } else if (guess > chosenNumber) {
    response = "Too high!";

  // When guess is correct
  } else {
    response = "Right!";
    correct = true;
    gameOn = false;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = chosenNumber;
  }

  if (!correct) score--;

  if (score === 0) {
    gameOn = false;
    response = "GAME OVER!";
    document.querySelector("body").style.backgroundColor = "red";
  }

  if (!guesses.has(guess)) guesses.add(guess);

  document.querySelector(".message").textContent = response;
  document.querySelector(".score").textContent = score;
});


// Restart game if user clicks again
document.querySelector(".again").addEventListener("click", function() {

  if (gameOn) return;

  gameOn = true;
  chosenNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  guesses = new Set();

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
});
