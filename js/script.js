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

  const getCell = function (row, column) {
    return board[row - 1][column - 1];
  }

  const getBoard = () => board;

  return {
    getBoard, 
    createBoard, 
    setCell,
    getCell,
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
  const getScore = () => score;
  const incrementScore = () => score++;
  const getCharacter = () => character;
  const setMark = (char) => character = char;

  return {getName, getScore, getCharacter, setMark, incrementScore};
}

function checkWinner(player) {
  const board = GameBoard.getBoard();
  const pChar = player.getCharacter();

  // Check row winning pattern
  for (let i = 0; i < GameBoard.getRows(); i++) {
    if (board[i][0] === pChar && board[i][1] === pChar && board[i][2] === pChar) {
      console.log("Wins by row")
      player.incrementScore();
      return player;
    }
  }

  // Check column winning pattern
  for (let i = 0; i < GameBoard.getColumns(); i++) {
    if (board[0][i] === pChar && board[1][i] === pChar && board[2][i] === pChar) {
      console.log("Wins by column")
      player.incrementScore();
      return player;
    }
  }

  // Check for diagonal win pattern
  if (board[0][0] === pChar && board[1][1] === pChar && board[2][2] === pChar) {
    console.log("Wins by diagonal from top left to bottom right")
    player.incrementScore();
    return player;
  } else if (board[0][2] === pChar && board[1][1] === pChar && board[2][0] === pChar) {
    console.log("Wins by diagonal from top left to bottom right")
    player.incrementScore();
    return player;
  }

  // true if it's a tie, false if there's no winner
  return board.every(row => row.every(cell => cell !== ""));
}

function resetRound(cellContainer, emptyCell) {
  GameBoard.createBoard(emptyCell);
  for (let child of cellContainer.children) {
    child.textContent = emptyCell;
  }
}

const GameController = (function () {
  
  const player1 = createPlayer("1");
  const player2 = createPlayer("2");
  const players = [player1, player2];
  const emptyCell = "";

  player1.setMark("X");
  player2.setMark("O");

  GameBoard.createBoard(emptyCell);

  let activePlayer = players[0];

  const cellContainer = document.querySelector(".container");
  const announcement = document.querySelector("#announcement");
  const pOneScore = document.querySelector("#pOneScore");
  const pTwoScore = document.querySelector("#pTwoScore");

  cellContainer.addEventListener("click", (e) => {
    let cellTarget = e.target;
    let cellIndex = cellTarget.getAttribute("data-cell-index");

    if (cellTarget.textContent === "") {
      
      const rowCol = cellIndex.toString().split("");
      GameBoard.setCell(rowCol[0], rowCol[1], activePlayer.getCharacter());
      cellTarget.textContent = GameBoard.getCell(rowCol[0], rowCol[1]);
      
      // Winning pattern
      if (checkWinner(activePlayer) === activePlayer) {
        console.log(activePlayer);
        resetRound(cellContainer, emptyCell);
      } else if (checkWinner(activePlayer)) {  // It's a tie
        resetRound(cellContainer, emptyCell);
      }

      pOneScore.textContent = player1.getScore();
      pTwoScore.textContent = player2.getScore();
      activePlayer = (activePlayer === player1) ? player2 : player1;
    }
  })
})()

