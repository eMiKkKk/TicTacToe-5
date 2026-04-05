import { createEmptyBoard, makeMove, checkWin} from './gameLogic.js';


const mainWrapper = document.getElementById('app');

const title = document.createElement('h1');
title.className = 'main__heading';
title.textContent = 'ЗАГАЛОВАК';
mainWrapper.appendChild(title);

const gameField = document.createElement('div');
gameField.className = 'gamefield';
mainWrapper.append(gameField);

const mainButtons = document.createElement('div');
mainButtons.className = 'main__buttons';
mainWrapper.append(mainButtons);

const newGameButton = document.createElement('button');
newGameButton.className = ('button__newgame');
newGameButton.textContent = 'Новая игра';
mainButtons.appendChild(newGameButton);

const localGameButton = document.createElement('button');
localGameButton.className = ('button__localgame');
localGameButton.textContent = 'Сетевая игра';
mainButtons.appendChild(localGameButton);

let currentBoard = createEmptyBoard(20);
let currentPlayer = 'X';


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
});

gameField.addEventListener('click', (e) => {
  currentBoard = makeMove(currentBoard, +e.target.dataset.row, +e.target.dataset.col, currentPlayer);
  console.log('dataset:',e.target.dataset.row, e.target.dataset.col)
  e.target.textContent = currentPlayer;
  checkWin(currentBoard, +e.target.dataset.row, +e.target.dataset.col, currentPlayer)
  switchPlayer();
})