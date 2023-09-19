'use strict';
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const newGameBTN = document.querySelector('.btn--new');
const roleDiceBTN = document.querySelector('.btn--roll');
const saveScoreBTN = document.querySelector('.btn--save');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let pigSound = function oink() {
    var audio = document.getElementById('pig');
    audio.play();
}

let currentScore, activePlayer, totalScores, isWinner;

//init game
const initGame = function () {
    currentScore = 0;
    activePlayer = 0;
    totalScores = [0, 0];
    isWinner = false;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
};
initGame();

//Switch players
const switchActivePlayers = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// role dice
roleDiceBTN.addEventListener('click', function() {
    if (!isWinner) {
    //Generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Show number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice${diceNumber}.png`;

    // Switch player and delete current score if dice number 1
    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        pigSound()
        switchActivePlayers();
        
    }
    }
});

saveScoreBTN.addEventListener('click', function() {
    if (!isWinner) {
        totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
    }

    if (totalScores[activePlayer] >= 100) {
        isWinner = true;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceElement.classList.add('hidden');
    } else {
        switchActivePlayers();
        
    }
});

//New game

newGameBTN.addEventListener('click', initGame);
