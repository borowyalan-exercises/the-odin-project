let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function addEventListeners() {
  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      playSingleRound(e.target.id, computerPicks());
    });
  });

  const resetGameButton = document.querySelector("#resetGame");
  resetGameButton.addEventListener("click", () => {
    //reset internal variables
    gameOver = false;
    playerScore = 0;
    computerScore = 0;

    // reset ui
    updateScore(0, 0);
    document.querySelector("#winner").textContent = "";
    document.querySelector("#result").textContent = "";
  });
}

function playSingleRound(playerSelection, computerSelection) {
  if (gameOver) return;

  // determine the result
  let result;

  if (playerSelection == computerSelection) return "draw";

  if (playerSelection == "rock") {
    if (computerSelection == "paper") result = "lose";
    if (computerSelection == "scissors") result = "win";
  }

  if (playerSelection == "paper") {
    if (computerSelection == "rock") result = "win";
    if (computerSelection == "scissors") result = "lose";
  }

  if (playerSelection == "scissors") {
    if (computerSelection == "rock") result = "lose";
    if (computerSelection == "paper") result = "win";
  }

  //increment score
  switch (result) {
    case "win":
      playerScore += 1;
      break;
    case "lose":
      computerScore += 1;
      break;
  }

  // display result
  document.querySelector("#result").textContent = result;
  updateScore(playerScore, computerScore);
}

function computerPicks() {
  const min = 1;
  const max = 3;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomNumber == 1) {
    return "rock";
  } else if (randomNumber == 2) {
    return "paper";
  } else if (randomNumber == 3) {
    return "scissors";
  }
}

function updateScore(playerScore, computerScore) {
  const winnerPlaceholder = document.querySelector("#winner");
  const scorePlaceholder = document.querySelector("#score");

  // check for winner, end the game if found
  if (playerScore == 5 && computerScore < 5) {
    winnerPlaceholder.textContent = "You won the game!";
    gameOver = true;
  } else if (computerScore == 5 && playerScore < 5) {
    winnerPlaceholder.textContent = "You lost the game!";
    gameOver = true;
  }

  scorePlaceholder.textContent = `Player: ${playerScore}, Computer: ${computerScore}`;
}

addEventListeners();
