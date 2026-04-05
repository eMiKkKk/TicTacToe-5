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
    const colIndex = lastCol - i;
    if (colIndex >= 0 && board[lastRow][colIndex] === player) {
      countLeft++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    const colIndex = lastCol + i;
    if (colIndex < board.length && board[lastRow][colIndex] === player) {
      countRight++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    if (rowIndex >= 0 && board[rowIndex][lastCol] === player) {
      countUp++;
    }
    else break;
  }
    for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    if (rowIndex < board.length && board[rowIndex][lastCol] === player) {
      countDown++;
    }
    else break;
  }
      for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    const colIndex = lastCol - i;
    if (rowIndex >= 0 && colIndex >= 0 && board[rowIndex][colIndex] === player) {
      countUpLeft++;
    }
    else break;
  }
      for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    const colIndex = lastCol + i;
    if (rowIndex >= 0 && colIndex < board.length && board[rowIndex][colIndex] === player) {
      countUpRight++;
    }
    else break;
  }
        for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    const colIndex = lastCol + i;
    if (rowIndex < board.length && colIndex < board.length && board[rowIndex][colIndex] === player) {
      countDownRight++;
    }
    else break;
  }
          for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    const colIndex = lastCol - i;
    if (rowIndex < board.length && colIndex >= 0 && board[rowIndex][colIndex] === player) {
      countDownLeft++;
    }
    else break;
  }

  console.log('count: ', countLeft, countRight)
  if (countLeft + countRight + 1 >= 5 ||
    countUp + countDown + 1 >=5 ||
    countUpLeft + countDownRight + 1 >=5 ||
    countUpRight + countDownLeft + 1 >=5  ) {
    alert(`${player} победил!`);
    return true;
  }
  else return false;

};


export { createEmptyBoard, makeMove, checkWin};