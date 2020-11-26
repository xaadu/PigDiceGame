'use strict';


// DOM Variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// VARIABLES

let scores, currentScore, activePlayer, isPlaying;


// INITIALIZER
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
}

// Player Switching Function
const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    activePlayer ^= 1;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${dice}.png`;

        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else switchPlayer();
    }
});

// Button Hold Functionality
btnHold.addEventListener('click', function () {
    if (isPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            isPlaying = false;
        } else switchPlayer();
    }
});

// Button New Functionality
btnNew.addEventListener('click', init);


init();