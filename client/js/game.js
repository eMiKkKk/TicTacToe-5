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



function renderBoard(size) {
  gameField.innerHTML = '';
  const cell = document.createElement('div');
  cell.className = 'gamecell'
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
  cell.className = 'gamecell'
      // console.log('ячейка создана!')
      gameField.append(cell);
    }
  }
}

renderBoard(20);

