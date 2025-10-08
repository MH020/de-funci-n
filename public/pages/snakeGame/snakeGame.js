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
let gameLoop;
let score = 0; 
let gameContainer;
let socreTitle; 

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

function restartGame(){
    context.clearRect(0, 0, board.width, board.height); 
    gameOver = false;
    board.remove();
    snakeX = 0; 
    snakeY = 0; 
    speedX = 0; 
    speedY = 0; 
    snakeBody.length = 0; 
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    score = 0; 
    gameContainer.remove();     
}

async function postScore(name, score) {
      const response = await fetch('/postScore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, score: score })
  })
  return response; 
}

function gameOverModal(){
    const modal = document.createElement("div")
    const modalContent  = document.createElement("div")
    modal.appendChild(modalContent); 
    modal.classList.add("modal"); 

    const title = document.createElement("h3"); 
    title.textContent = "game over man game over"; 

    const buttonContainer = document.createElement("div"); 

    modalContent.appendChild(title);
    modalContent.appendChild(buttonContainer);

    const restartButton = document.createElement("button"); 
    restartButton.textContent = "restart"; 

    buttonContainer.appendChild(restartButton); 

    restartButton.addEventListener("click", () => {
        modal.remove();
        restartGame(); 
        createSnakeGame();  
    }); 

    const addScoreButton = document.createElement("button"); 
    addScoreButton.textContent = "save score"; 
    buttonContainer.appendChild(addScoreButton); 

    addScoreButton.addEventListener("click", () => {
        modalContent.remove()
        const saveScoreForm = document.createElement("div"); 
        modal.appendChild(saveScoreForm); 

        const saveScoreTitle = document.createElement("h2"); 
        saveScoreTitle.textContent = "please input a nick name to save your score, max 4 chars"
        saveScoreForm.appendChild(saveScoreTitle); 

        const nameAndScoreHolder = document.createElement("div")
        saveScoreForm.appendChild(nameAndScoreHolder)

        const nameInput = document.createElement("input");
        nameInput.placeholder = "Your name";
        nameInput.maxLength = 4; // limit to 4 chars
        nameAndScoreHolder.appendChild(nameInput);

        const scoreDisplay = document.createElement("div")
        scoreDisplay.textContent = score; 
        nameAndScoreHolder.appendChild(scoreDisplay)

        const saveScoreButtonContainer = document.createElement("div")
        saveScoreForm.appendChild(saveScoreButtonContainer); 

        const postScoreButton = document.createElement("button")
        postScoreButton.textContent = "save score"
        saveScoreButtonContainer.appendChild(postScoreButton)

        const resetButton = document.createElement("button");
        saveScoreButtonContainer.appendChild(resetButton); 
        resetButton.textContent = "restart game "

        postScoreButton.addEventListener("click", async () =>{
            const playerName = nameInput.value

            if (playerName.length === 0 || playerName.length > 4) {
            alert("Please enter a name between 1-4 characters");
            return;
        }
        const scoreposted = await postScore(playerName,score);
            

        })


        resetButton.addEventListener("click", () => {

        })
    })


    document.body.appendChild(modal); 
}

function update() {
    if (gameOver) {
        clearInterval(gameLoop);
        gameOverModal();
        return;
    }
    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    // snake eats the food: 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); 
        score += 100; 
        socreTitle.textContent = `your current score is ${score}`
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
        //gameOverModal();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            //gameOverModal();
        }
    }
}

function createSnakeGame(){

    gameContainer = document.createElement("div");
    gameContainer.classList.add("gameContainer"); 
    document.body.appendChild(gameContainer);

    board = document.createElement("canvas")
    board.classList.add("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize
    context = board.getContext("2d");
    gameContainer.appendChild(board)
    placeFood(); 


    const scoreBoard = document.createElement("div"); 
    socreTitle = document.createElement("h2"); 
    socreTitle.textContent = `your current score is ${score}`
    scoreBoard.appendChild(socreTitle); 
    gameContainer.appendChild(scoreBoard)

    document.addEventListener("keydown", changeDirection)

    gameLoop = setInterval(update, 1000/15); 
}

createSnakeGame();
