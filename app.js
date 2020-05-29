/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
    After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
	roundScore,
	activePlayer,
	dice1,
	dice2,
	gamePlaying,
	lastDice1,
	lastDice2,
	maxScore;

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	maxScore = 100;
	lastDice1 = 0;
	lastDice2 = 0;
	document.getElementById('dice1').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
	gamePlaying = true;
}

document.querySelector('.btn-new').addEventListener('click', init);
init();

function nextPlayer() {
	roundScore = 0;
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('dice1').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		var dice1DOM = document.getElementById('dice1');
		var dice2DOM = document.getElementById('dice2');

		dice1DOM.style.display = 'block';
		dice1DOM.src = 'img/dice-' + dice1 + '.png';
		dice2DOM.style.display = 'block';
		dice2DOM.src = 'img/dice-' + dice2 + '.png';

		if ((dice1 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6)) {
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice1 !== 1 && dice2 !== 1) {
			// var current = ;
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
		} else {
			nextPlayer();
		}
		lastDice1 = dice1;
		lastDice2 = dice2;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent =
			scores[activePlayer];

		var input = document.getElementById('max-score').value;
		if (input) {
			maxScore = input;
		}

		if (1 <= scores[activePlayer]) {
			if (maxScore <= scores[activePlayer]) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document
					.querySelector('.player-' + activePlayer + '-panel')
					.classList.add('winner');
				gamePlaying = false;
			} else {
				nextPlayer();
			}
		} else {
			nextPlayer();
		}
	}
});
