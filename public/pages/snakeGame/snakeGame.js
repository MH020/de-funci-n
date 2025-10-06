const blockSize = 25; 
const total_row = 17; 
const total_col = 17; 
let board; 
let context; 

let snakeX = blockSize * 5; 
let snakeY = blockSize *5; 

let speedX = 0; 
let speedY = 0; 

const snakeBody = []; 

let foodX; 
let foodY; 

let gameOver = false; 

function placeFood() {

    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}

function changeDirection(e) {
    if (e.key == "w" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (e.key == "s" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.key == "a" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.key == "d" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}

function gameOverModal(){
    const modal = document.createElement("div")
    modal.classList.add("modal"); 

    const title = document.createElement("h3"); 
    title.textContent = "game over man game over"; 

    const buttonContainer = document.createElement("div"); 

    const restartButton = document.createElement("button"); 
    restartButton.textContent = "restart"; 

    buttonContainer.appendChild(restartButton); 

    restartButton.addEventListener("click", () => {
        createSnakeGame(); 
        modal.remove(); 
    }); 

    const addScoreButton = document.createElement("button"); 
    addScoreButton.textContent = "restart"; 
    buttonContainer.appendChild(addScoreButton); 

    addScoreButton.addEventListener("click", () => {
        
    })

    modal.appendChild(title);
    modal.appendChild(buttonContainer);

    document.body.appendChild(modal); 
}

function update() {
    if (gameOver) {
        clearInterval(gameLoop);
        gameOverModal();
    }
    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        gameOverModal();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            gameOverModal();
        }
    }
}

function createSnakeGame(){
    board = document.createElement("canvas")
    board.classList.add("board");
    document.body.appendChild(board);
    board.height = total_row * blockSize;
    board.width = total_col * blockSize
    context = board.getContext("2d");
    placeFood(); 
    document.addEventListener("keydown", changeDirection)

    const gameLoop = setInterval(update, 1000/15); 
}

createSnakeGame();
