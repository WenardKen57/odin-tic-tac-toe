const GameBoard = (function () {
  const board = [];
  let rows = 3;
  let columns = 3;

  const setRowNumber = (rowValue) => rows = rowValue;
  const setColumnNumber = (columnValue) => columns = columnValue;
  const getRows = () => rows;
  const getColumns = () => columns;

  const createBoard = function (value) {
    for (let x = 0; x < getRows(); x++) {
      board[x] = [];
      for (let y = 0; y < getColumns(); y++) {
        board[x][y] = value;
      }
    }
  }

  const setCell = function (row, column, value) {
    board[row - 1][column - 1] = value;
  }

  const getBoard = () => board;

  return {
    getBoard, 
    createBoard, 
    setCell, 
    setRowNumber, 
    setColumnNumber,
    getRows,
    getColumns
  };
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

function checkWinner(player) {
  const board = GameBoard.getBoard();
  const pChar = player.getCharacter();
  /*
    1. create winning patterns
    2. compare the board to winning patterns to see if someone wins
      1. 
    3. return winner
  */


  // Check row winning pattern
  for (let i = 0; i < GameBoard.getRows(); i++) {
    if (board[i][0] === pChar && board[i][1] === pChar && board[i][2] === pChar) {
      return true;
    }
  }

  // Check column winning pattern
  for (let i = 0; i < GameBoard.getColumns(); i++) {
    if (board[0][i] === pChar && board[1][i] === pChar && board[2][i] === pChar) {
      return true;
    }
  }

  // Check for diagonal win pattern
  if (board[0][0] === pChar && board[1][1] === pChar && board[2][2]) {
    return true;
  } else if (board[0][2] === pChar && board[1][1] === pChar && board[2][0]) {
    return true;
  }

  // No one wins
  return false;
}

const GameController = (function () {
  
  const player1 = createPlayer("1");
  const player2 = createPlayer("2");
  const players = [];

  player1.setCharacter("X");
  player2.setCharacter("O");
  players.push(player1);
  players.push(player2);

  GameBoard.createBoard(0);

  let activePlayer = players[0];
  
  // Update board

  GameBoard.setCell(1, 3, player1.getCharacter());
  GameBoard.setCell(2, 2, player1.getCharacter());
  GameBoard.setCell(3, 1, player1.getCharacter());

  console.log(checkWinner(activePlayer));

  // before and after every round check if a player won

  // Render
})()

