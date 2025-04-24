const GameBoard = (function () {
  const board = [];

  const createBoard = function (row, column, value) {
    for (let x = 0; x < row; x++) {
      board[x] = [];
      for (let y = 0; y < column; y++) {
        board[x][y] = value
      }
    }
  }

  const setCell = function (row, column, value) {
    board[row - 1][column - 1] = value;
  }

  const getBoard = () => board;
  return {getBoard, createBoard, setCell};
})()

function createPlayer(name) {
  
  let wins = 0;
  let character = "";
  
  const getName = () => name;
  const getWins = () => wins;
  const getCharacter = () => character;
  const setCharacter = (char) => character = char;

  return {getName, getWins, getCharacter, setCharacter};
}

const GameController = (function () {
  
  const player1 = createPlayer("1");
  const player2 = createPlayer("2");

  player1.setCharacter("X");
  player2.setCharacter("O");

  GameBoard.createBoard(3, 3, 0);
  
  // Update board

  GameBoard.setCell(3, 3, player1.getCharacter());

  // Render
})()

