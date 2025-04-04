const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const winnerScreen = document.getElementById("winnerScreen");
const winnerMessage = document.getElementById("winnerMessage");
const newGameButton = document.getElementById("newGame");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

// Create board
function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    });
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (!cells[index] && gameActive) {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            showWinner(`${currentPlayer} Wins! 🎉`);
        } else if (cells.every(cell => cell !== null)) {
            showWinner("It's a Draw! 🤝");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Check winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

// Show winner screen
function showWinner(message) {
    gameActive = false;
    winnerMessage.textContent = message;
    winnerScreen.style.display = "flex";
}

// Reset game
function resetGame() {
    cells.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    winnerScreen.style.display = "none";
    createBoard();
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

// Initialize game
createBoard();
statusText.textContent = "Player X's Turn";
