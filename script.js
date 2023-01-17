"use strict";

// EL - DOM elements
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const diceEL = document.querySelector(".dice");
const btnNewEL = document.querySelector(".btn--new");
const btnRollEL = document.querySelector(".btn--roll");
const btnHoldEL = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

/**
 * Initializing initial game values and states (or restarting the game)
 */
const initGame = function () {
  setDefaultStates();
  resetScores();
  resetCurrentScores();
  setDefaultClasses();
};

/**
 * Resetting default game states
 */
function setDefaultStates() {
  activePlayer = 0;
  playing = true;
}

/**
 * Resets score for both players
 */
function resetScores() {
  scores = [0, 0];
  score0EL.textContent = scores[0];
  score1EL.textContent = scores[1];
}

/**
 * Resets current score for both players
 */
function resetCurrentScores() {
  currentScore = 0;
  current0EL.textContent = currentScore;
  current1EL.textContent = currentScore;
}

/**
 * Settign initial classes for DOM elements
 */
function setDefaultClasses() {
  btnRollEL.classList.remove("hidden");
  btnHoldEL.classList.remove("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  diceEL.classList.add("hidden");
}

/**
 * Rolls the dice
 * @param {number} diceSides number of sides of the dice
 * @returns {number} generated number
 */
const generateRandomDice = function (diceSides) {
  const generatedNum = Math.trunc(Math.random() * diceSides) + 1;
  diceEL.classList.remove("hidden");
  diceEL.src = `dice-${generatedNum}.png`;
  return generatedNum;
};

/**
 * Adding dice to current scores for active player
 * @param {number} rolledNumber rolled number
 */
const addToCurrentScore = function (rolledNumber) {
  currentScore += rolledNumber;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

/**
 * Adding current score amount to global score for active player
 */
const addToGlobalScore = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

/**
 * Ends the game
 */
const endGame = function () {
  playing = false;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  diceEL.classList.add("hidden");
  btnRollEL.classList.add("hidden");
  btnHoldEL.classList.add("hidden");
};

// initialization of the game when the page is first loaded
initGame();

// "roll" button functionality
btnRollEL.addEventListener("click", function () {
  if (playing) {
    const rolledNumber = generateRandomDice(6);

    if (rolledNumber !== 1) {
      addToCurrentScore(rolledNumber);
    } else {
      switchPlayer();
    }
  }
});

// "hold" button functionality
btnHoldEL.addEventListener("click", function () {
  if (playing) {
    addToGlobalScore();

    if (scores[activePlayer] >= 100) {
      endGame();
    } else {
      switchPlayer();
    }
  }
});

btnNewEL.addEventListener("click", initGame);
