const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#resetBtn");
const statusText = document.querySelector("#statusText");
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let currentPlayer = "X";

createGame();

function createGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });
  resetBtn.addEventListener("click", resetGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const currentIndex = this.getAttribute("cellIndex");
  if (options[currentIndex] != "" || !running) {
    return;
  }

  updateCell(this, currentIndex);
  checkWinner();
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function updateCell(cell, cellIndex) {
  options[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
}

function highlightCell(cell, color) {
  cell.style.color = `${color}`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    let condition = winCondition[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      for (let i = 0; i < condition.length; i++) {
        highlightCell(cells[condition[i]], "red");
      }
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "DRAW";
  } else {
    changePlayer();
  }
}

function resetGame() {
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    highlightCell(cell, "black");
  });
}
