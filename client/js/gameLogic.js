

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


function checkWin(board, lastRow, lastCol, player) {
  let countLeft = 0;
  let countRight = 0;
  let countUp = 0;
  let countDown = 0;
  let countDownLeft = 0;
  let countDownRight = 0;
  let countUpRight = 0;
  let countUpLeft = 0;

  for (let i = 1; i <= 4; i++) {
    const colIndex = lastCol - i;
    if (colIndex >= 0 && board[lastRow][colIndex] === player) countLeft++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const colIndex = lastCol + i;
    if (colIndex < board.length && board[lastRow][colIndex] === player) countRight++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    if (rowIndex >= 0 && board[rowIndex][lastCol] === player) countUp++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    if (rowIndex < board.length && board[rowIndex][lastCol] === player) countDown++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    const colIndex = lastCol - i;
    if (rowIndex >= 0 && colIndex >= 0 && board[rowIndex][colIndex] === player) countUpLeft++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow - i;
    const colIndex = lastCol + i;
    if (rowIndex >= 0 && colIndex < board.length && board[rowIndex][colIndex] === player) countUpRight++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    const colIndex = lastCol + i;
    if (rowIndex < board.length && colIndex < board.length && board[rowIndex][colIndex] === player) countDownRight++;
    else break;
  }
  for (let i = 1; i <= 4; i++) {
    const rowIndex = lastRow + i;
    const colIndex = lastCol - i;
    if (rowIndex < board.length && colIndex >= 0 && board[rowIndex][colIndex] === player) countDownLeft++;
    else break;
  }

  if (countLeft + countRight + 1 >= 5) {
    const cells = getLine(board, lastRow, lastCol, player, 'horizontal');
    return cells;
  }
  if (countUp + countDown + 1 >= 5) {
    const cells = getLine(board, lastRow, lastCol, player, 'vertical');
    return cells;
  }
  if (countUpLeft + countDownRight + 1 >= 5) {
    const cells = getLine(board, lastRow, lastCol, player, 'diagonalMain');
    return cells;
  }
  if (countUpRight + countDownLeft + 1 >= 5) {
    const cells = getLine(board, lastRow, lastCol, player, 'diagonalAnti');
    return cells;
  }
  return null;
}

function getLine(board, row, col, player, direction) {
  const cells = [[row, col]];
  if (direction === 'horizontal') {
    for (let i = 1; i <= 4; i++) {
      const c = col - i;
      if (c >= 0 && board[row][c] === player) cells.push([row, c]);
      else break;
    }
    for (let i = 1; i <= 4; i++) {
      const c = col + i;
      if (c < board.length && board[row][c] === player) cells.push([row, c]);
      else break;
    }
  } else if (direction === 'vertical') {
    for (let i = 1; i <= 4; i++) {
      const r = row - i;
      if (r >= 0 && board[r][col] === player) cells.push([r, col]);
      else break;
    }
    for (let i = 1; i <= 4; i++) {
      const r = row + i;
      if (r < board.length && board[r][col] === player) cells.push([r, col]);
      else break;
    }
  } else if (direction === 'diagonalMain') {
    for (let i = 1; i <= 4; i++) {
      const r = row - i;
      const c = col - i;
      if (r >= 0 && c >= 0 && board[r][c] === player) cells.push([r, c]);
      else break;
    }
    for (let i = 1; i <= 4; i++) {
      const r = row + i;
      const c = col + i;
      if (r < board.length && c < board.length && board[r][c] === player) cells.push([r, c]);
      else break;
    }
  } else if (direction === 'diagonalAnti') {
    for (let i = 1; i <= 4; i++) {
      const r = row - i;
      const c = col + i;
      if (r >= 0 && c < board.length && board[r][c] === player) cells.push([r, c]);
      else break;
    }
    for (let i = 1; i <= 4; i++) {
      const r = row + i;
      const c = col - i;
      if (r < board.length && c >= 0 && board[r][c] === player) cells.push([r, c]);
      else break;
    }
  }
  return cells;
}




export { createEmptyBoard, makeMove, checkWin};