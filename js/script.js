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
  
  let score = 0;
  let character = "";
  
  const getName = () => name;
  const getWins = () => wins;
  const incrementScore = () => wins++;
  const getCharacter = () => character;
  const setMark = (char) => character = char;

  return {getName, getWins, getCharacter, setMark, incrementScore};
}

function checkWinner(player) {
  const board = GameBoard.getBoard();
  const pChar = player.getCharacter();

  // Check row winning pattern
  for (let i = 0; i < GameBoard.getRows(); i++) {
    if (board[i][0] === pChar && board[i][1] === pChar && board[i][2] === pChar) {
      return player;
    }
  }

  // Check column winning pattern
  for (let i = 0; i < GameBoard.getColumns(); i++) {
    if (board[0][i] === pChar && board[1][i] === pChar && board[2][i] === pChar) {
      return player;
    }
  }

  // Check for diagonal win pattern
  if (board[0][0] === pChar && board[1][1] === pChar && board[2][2]) {
    return player;
  } else if (board[0][2] === pChar && board[1][1] === pChar && board[2][0]) {
    return player;
  }

  // No one wins yet
  return false;
}

/*
  play round:
  - until someone wins the round doesn't end
  - player can select a cell to put his mark
  - players will take turns until someone wins
    - when a player has made a move it decision will automatically switched to other player
  - when a player wins a score will be added
*/
function playRound(players) {
  let activePlayer = players[0];
  

}

const GameController = (function () {
  
  const player1 = createPlayer("1");
  const player2 = createPlayer("2");
  const players = [player1, player2];

  player1.setMark("X");
  player2.setMark("O");

  GameBoard.createBoard("");

  let activePlayer = players[0];

  const cellContainer = document.querySelector(".container");

  cellContainer.addEventListener("click", (e) => {
    let cellTarget = e.target;
    let cellIndex = cellTarget.getAttribute("data-cell-index");

    if (cellTarget.textContent === "") {
      cellTarget.textContent = activePlayer.getCharacter();
      const rowCol = cellIndex.toString().split("");
      GameBoard.setCell(rowCol[0], rowCol[1], activePlayer.getCharacter());
      console.log(checkWinner(activePlayer));
      activePlayer = (activePlayer === player1) ? player2 : player1;
    }

    
  })

  playRound(players);

  // before and after every round check if a player won

  // Render
})()

