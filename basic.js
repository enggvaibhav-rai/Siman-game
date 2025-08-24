const buttonColors = ["red", "yellow", "green", "purple"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start game on keypress
document.addEventListener("keydown", () => {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Handle button click
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
}

// Animation when user clicks
function animatePress(color) {
  const activeButton = document.getElementById(color);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Flash animation for Simon’s turn
function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 300);
}

// Check user input
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Game over function
function gameOver() {
  document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
  document.body.classList.add("game-over");

  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 200);

  startOver();
}

// Reset variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
