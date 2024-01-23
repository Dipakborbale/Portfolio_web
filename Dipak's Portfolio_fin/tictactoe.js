// tictactoe.js
document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const resetButton = document.getElementById("reset-button");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    if (gameBoard.every((cell) => cell !== "")) {
      return "T";
    }

    return null;
  }

  function handleClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      renderBoard();
      const winner = checkWinner();
      if (winner) {
        handleGameEnd(winner);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
      }
    }
  }

  function handleGameEnd(winner) {
    if (winner === "T") {
      status.textContent = "It's a tie!";
    } else {
      status.textContent = `${winner} wins!`;
    }
    currentPlayer = "";
  }

  function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    renderBoard();
    updateStatus();
  }

  function renderBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = value;
      cell.addEventListener("click", () => handleClick(index));
      board.appendChild(cell);
    });
  }

  function updateStatus() {
    if (currentPlayer) {
      status.textContent = `Current player: ${currentPlayer}`;
    }
  }

  resetButton.addEventListener("click", resetGame);

  resetGame();
});
