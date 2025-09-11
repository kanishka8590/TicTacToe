const board = document.getElementById('board');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const resetBtn = document.getElementById('reset');
const twoPlayerBtn = document.getElementById('twoPlayer');
const singlePlayerBtn = document.getElementById('singlePlayer');

let gameState = Array(9).fill('');
let currentPlayer = 'X';
let isSinglePlayer = false;
let scores = { X: 0, O: 0 };

// Winning combinations
const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin(player) {
  return winCombos.some(combo => combo.every(i => gameState[i] === player));
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function updateScores(player) {
  scores[player]++;
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function resetBoard() {
  gameState.fill('');
  renderBoard();
  currentPlayer = 'X';
}

function handleClick(e, index) {
  if (gameState[index]) return;
  gameState[index] = currentPlayer;
  renderBoard();
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    updateScores(currentPlayer);
    resetBoard();
    return;
  } 
  if (checkDraw()) {
    alert("It's a draw!");
    resetBoard();
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if(isSinglePlayer && currentPlayer === 'O') aiMove();
}

function aiMove() {
  const empty = gameState.map((v,i) => v === '' ? i : null).filter(v => v !== null);
  const choice = empty[Math.floor(Math.random() * empty.length)];
  gameState[choice] = 'O';
  renderBoard();
  if (checkWin('O')) {
    alert('AI wins!');
    updateScores('O');
    resetBoard();
    return;
  }
  if (checkDraw()) {
    alert("It's a draw!");
    resetBoard();
    return;
  }
  currentPlayer = 'X';
}

function renderBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell;
    div.addEventListener('click', (e) => handleClick(e, index));
    board.appendChild(div);
  });
}

// Mode buttons
twoPlayerBtn.addEventListener('click', () => {
  isSinglePlayer = false;
  resetBoard();
});
singlePlayerBtn.addEventListener('click', () => {
  isSinglePlayer = true;
  resetBoard();
});

// Reset button
resetBtn.addEventListener('click', () => {
  scores = { X: 0, O: 0 };
  scoreX.textContent = 0;
  scoreO.textContent = 0;
  resetBoard();
});

renderBoard();
