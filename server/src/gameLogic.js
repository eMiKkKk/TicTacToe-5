

function createEmptyBoard(size=15) {
    const board = [];
    for (let i = 0; i < size; i++) {
        board.push(new Array(size).fill(null));
    }
    return board;

}