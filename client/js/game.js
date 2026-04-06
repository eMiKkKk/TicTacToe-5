import { createEmptyBoard, makeMove, checkWin} from './gameLogic.js';


let currentBoard = createEmptyBoard(20);
let currentPlayer = 'X';
let finalScoreStats = {
  'X': 0,
  'O': 0
};
let isGameActive = true;

const mainWrapper = document.getElementById('app');


const header = document.createElement('header');
header.className = 'main__header';
mainWrapper.append(header);

const loginButtons = document.createElement('div');
loginButtons.className = 'login__buttons';
header.append(loginButtons)

const authButton = document.createElement('button');
authButton.className = 'auth__button';
authButton.textContent = 'Login';
loginButtons.append(authButton);

const solButton = document.createElement('button');
solButton.className = 'sol__button';
solButton.textContent = 'Solana';
loginButtons.append(solButton);

const somButton = document.createElement('button');
somButton.className = 'som__button';
somButton.textContent = 'Somnia';
loginButtons.append(somButton);

const exitButton = document.createElement('button');
exitButton.className = 'exit__button';
exitButton.textContent = 'Отключиться';
loginButtons.append(exitButton);


const title = document.createElement('h1');
title.className = 'main__heading';
title.textContent = 'ЗАГАЛОВАК';
mainWrapper.appendChild(title);

const scoreField = document.createElement('p');  //счётчик побед
scoreField.className = 'scorefield';
function updateScore() {
  scoreField.textContent = `Счёт: \n Игрок X: ${finalScoreStats.X}   Игрок О:  ${finalScoreStats.O}`;
}
updateScore();
mainWrapper.appendChild(scoreField);

const gameField = document.createElement('div'); //игровое поле
gameField.className = 'gamefield';
mainWrapper.append(gameField);

const mainButtons = document.createElement('div');
mainButtons.className = 'main__buttons';
mainWrapper.append(mainButtons);

const newGameButton = document.createElement('button'); //новая игра
newGameButton.className = ('button__newgame');
newGameButton.textContent = 'Новая игра';
mainButtons.appendChild(newGameButton);

const localGameButton = document.createElement('button'); //локальный режим
localGameButton.className = ('button__localgame');
localGameButton.textContent = 'Сетевая игра';
mainButtons.appendChild(localGameButton);




function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function renderBoard(size) {
  gameField.innerHTML = '';

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.className = 'gamecell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.className = 'gamecell'
      // console.log('ячейка создана!')
      gameField.append(cell);
    }
  }
}

renderBoard(20);


newGameButton.addEventListener('click', () => {
  renderBoard(20);
  currentBoard = createEmptyBoard(20);
  currentPlayer = 'X';
  isGameActive = true;
});

function flashWinner(array){
  for (let i = 0; i < array.length; i++) {
    const cell = document.querySelector(`.gamecell[data-row='${array[i][0]}'][data-col='${array[i][1]}']`)
    cell.classList.add('flashed');
  }
}

gameField.addEventListener('click', (e) => {

  if (!e.target.dataset.blocked && isGameActive) {  //проверка на затяную клетку

  currentBoard = makeMove(currentBoard, +e.target.dataset.row, +e.target.dataset.col, currentPlayer);
  // console.log('dataset:',e.target.dataset.row, e.target.dataset.col)
  e.target.textContent = currentPlayer;
  e.target.dataset.blocked = true;
  const isWinning = checkWin(currentBoard, +e.target.dataset.row, +e.target.dataset.col, currentPlayer);
  console.log(isWinning);
  if (isWinning) {
    finalScoreStats[currentPlayer]++;
    updateScore();
    flashWinner(isWinning);
    isGameActive = false;
  }
  switchPlayer();
}
})