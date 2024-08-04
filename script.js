let board = [];

function generateBoard() {
  board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      board[i][j] = "";
    }
  }
  return board;
}

function fillDiagBox(i, j) {
  const x = i * 3;
  const y = j * 3;
  let nums = new Set();
  while (nums.size < 9) {
    nums.add(Math.floor(Math.random() * 9) + 1);
  }
  nums = Array.from(nums);
  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      board[x + k][y + l] = nums.pop();
    }
  }
}

function fillDiagBoard() {
  for (let i = 0; i < 3; i++) {
    fillDiagBox(i, i);
  }
  return board;
}

function checkColumn(x, j) {
  for (let i = 0; i < 9; i++) {
    if (board[i][j] === x) {
      return true;
    }
  }
  return false;
}

function checkRow(x, i) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === x) {
      return true;
    }
  }
  return false;
}

function checkBox(a, i, j) {
  const x = (i + 1) * 3;
  const y = (j + 1) * 3;
  for (let h = x - 3; h < x; h++) {
    for (let l = y - 3; l < y; l++) {
      if (board[h][l] == a) {
        return true;
      }
    }
  }
  return false;
}

function validCellNum(num, row, col) {
  return (
    !checkBox(num, Math.floor(row / 3), Math.floor(col / 3)) &&
    !checkRow(num, row) &&
    !checkColumn(num, col)
  );
}

function findEmptyLocation() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return { row: i, col: j };
      }
    }
  }
  return null;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function vis(ms) {
  let empty = findEmptyLocation();
  if (!empty) {
    return true;
  }
  const { row, col } = empty;
  let cell = getCellElement(row, col);

  for (let x = 1; x < 10; x++) {
    cell.style.background = "red";
    cell.innerHTML = x;
    await sleep(ms);
    if (validCellNum(x, row, col)) {
      board[row][col] = x;
      cell.style.background = "transparent";

      fillBoard(row, col);
      await sleep(ms);
      if (await vis(10)) {
        return true;
      }

      board[row][col] = "";
      fillBoard(row, col);
      await sleep(ms);
    }

    cell.style.background = "transparent";
    cell.innerHTML = "";
  }
  return false;
}

function fill() {
  let empty = findEmptyLocation();
  if (!empty) {
    return true;
  }
  const { row, col } = empty;
  for (let x = 1; x < 10; x++) {
    if (validCellNum(x, row, col)) {
      board[row][col] = x;
      fillBoard();

      if (fill()) {
        return true;
      }
      board[row][col] = "";
    }
  }
  return false;
}

function removeNumbers(x) {
  while (x > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (board[row][col] == 0) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    board[row][col] = "";
    x--;
  }
  return board;
}

function generate() {
  generateBoard();
  fillDiagBoard();
  fill();
  removeNumbers(40);
  fillBoard();
}
async function colorize() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cell = getCellElement(i, j);
      cell.style.background = "#37ff37";
      await sleep(50);
    }
  }
}
async function visualize() {
  generateBoard(); // Initialize the board
  fillDiagBoard();
  await vis(10);

  fillBoard();
  await colorize();
}
function clearBoard() {
  board = [];
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.background = "transparent";
  });
}

async function solve() {
  fill();
  fillBoard();
}
function getCellElement(row, col) {
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  const cellRow = row % 3;
  const cellCol = col % 3;
  const boxIndex = boxRow * 3 + boxCol;
  const cellIndex = cellRow * 3 + cellCol;
  const boxes = document.querySelectorAll(".box");
  const cells = boxes[boxIndex].querySelectorAll(".cell");
  return cells[cellIndex];
}
function fillBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = getCellElement(i, j);
      cell.innerHTML = board[i][j];
    }
  }
}

console.log(board);
