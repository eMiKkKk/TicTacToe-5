

function createEmptyBoard(size=15) {
    const board = [];
    for (let i = 0; i < size; i++) {
        board.push(new Array(size).fill(null));
    }
    console.log(board)
    return board;

}


function makeMove(board, row, col, player) {

  const newBoard = board.map(row => [...row]);
  newBoard[row][col] = player;
  console.log(newBoard)
  return newBoard;

}

let currentBoard = createEmptyBoard(20);

function checkWin(board, lastRow, lastCol, player){

  let countLeft = 0;
  let countRight = 0;
  let countUp = 0;
  let countDown = 0;
  let countDownLeft = 0;
  let countDownRight = 0;
  let countUpRight = 0;
  let countUpLeft = 0;
  console.log('BOARD',board)
  for (let i = 1; i <= 4; i++) {
    if (board[lastRow][lastCol - i] === player) {
      countLeft++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    if (board[lastRow][lastCol + i] === player) {
      countRight++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    if (board[lastRow - i][lastCol] === player) {
      countUp++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    if (board[lastRow + i][lastCol] === player) {
      countDown++;
    }
    else break;
  }
      for (let i = 1; i <= 4; i++) {
    if (board[lastRow - i][lastCol -i] === player) {
      countUpLeft++;
    }
    else break;
  }
      for (let i = 1; i <= 4; i++) {
    if (board[lastRow - i][lastCol +i] === player) {
      countUpRight++;
    }
    else break;
  }
        for (let i = 1; i <= 4; i++) {
    if (board[lastRow + i][lastCol + i] === player) {
      countDownRight++;
    }
    else break;
  }
          for (let i = 1; i <= 4; i++) {
    if (board[lastRow + i][lastCol - i] === player) {
      countDownLeft++;
    }
    else break;
  }

  console.log('count: ', countLeft, countRight)
  if (countLeft + countRight + 1 >= 5 ||
    countUp + countDown + 1 >=5 ||
    countUpLeft + countDownRight + 1 >=5 ||
    countUpRight + countDownLeft + 1 >=5  ) {
    console.log(`${player} победил!`);
    return true;
  }
  else return false;

};


export { createEmptyBoard, makeMove, checkWin };
