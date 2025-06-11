const board = document.getElementById('game-board');
const message = document.getElementById('message');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let score = { X: 0, O: 0 };

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.textContent = `Vez de: ${currentPlayer}`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  clickSound.play();

  const winInfo = checkWinner();
  if (winInfo) {
    gameActive = false;
    highlightWinningCells(winInfo.combo);
    winSound.play();
    message.textContent = `🏆 Jogador ${currentPlayer} venceu!`;
    score[currentPlayer]++;
    updateScore();
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    message.textContent = "⚖️ Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Vez de: ${currentPlayer}`;
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return { player: gameState[a], combo };
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    board.children[index].classList.add('vencedora');
  });
}

function restartGame() {
  currentPlayer = 'X';
  createBoard();
}

function updateScore() {
  scoreXEl.textContent = score.X;
  scoreOEl.textContent = score.O;
}

createBoard();
