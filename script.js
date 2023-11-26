// Select all elements with the class "box" (represents the tic-tac-toe grid cells)
let boxes = document.querySelectorAll(".box");

// Initialize the current player's turn to "X"
let turn = "X";

// Initialize a variable to track whether the game is over
let isGameOver = false;

// Loop through each grid cell element
boxes.forEach(e => {
    // Clear the inner HTML of each grid cell
    e.innerHTML = "";
    
    // Add a click event listener to each grid cell
    e.addEventListener("click", () => {
        // Check if the game is not over and the clicked cell is empty
        if (!isGameOver && e.innerHTML === "") {
            // Set the inner HTML of the clicked cell to the current player's symbol (either "X" or "O")
            e.innerHTML = turn;
            
            // Check for a win condition
            cheakWin();
            
            // Check for a draw condition
            cheakDraw();
            
            // Change the turn to the other player
            changeTurn();
        }
    })
})

// Function to change the turn from "X" to "O" or vice versa
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";      
    }
}

// Function to check for a win condition
function cheakWin() {
    // Define an array of win conditions (indices of grid cells that form a winning combination)
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    // Loop through the win conditions
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // If the three cells in a win condition have the same non-empty symbol, the game is won
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#results").classList.add('blink'); 
            document.querySelector("#play-again").style.display = "inline";

            // Highlight the winning cells with a background color
            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#f70303";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

// Function to check for a draw condition
function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        // Check if all grid cells are filled
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        // If it's a draw, end the game
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#results").classList.remove('blink');
            document.querySelector("#play-again").style.display = "inline";
           
        }
    }
}

// Add a click event listener to the "Play Again" button
document.querySelector("#play-again").addEventListener("click", () => {
    // Reset the game state
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Clear the grid cells, remove background colors, and set text color back to white
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#0b0b0b";
    });
});