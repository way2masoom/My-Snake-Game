console.log("Hello");

// Ensure all code runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Selecting the GameArea Div
    const gameArena = document.getElementById('game-arena')
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of the game
    let gameStarted = false; // game status
    let intervalId = '';

    let food = { x: 300, y: 200 }; // {X:15*20,y:10*20} // -> call coordinate -> pixels || Pixel of top left Pixel for food
    let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }]; // Position of Snake [head,body,body tail]

    let dx = cellSize; // +20;
    let dy = 0;

    // Update Snake Position based on the direction 
    function updateSnake() {
        const newHead = { x: snake[0].x + dx, y: snake[0].y + dy }
        snake.unshift(newHead); // add new head to the snake

        // checking collision with food
        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            //TODO: Move food 
        } else {
            snake.pop();
        }
    }

    // function to change Direction
    function changeDirection(e) { // e-> Event
        console.log("key Press", e);
        // direction validation for the key press 
        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingLeft = dx === -cellSize;
        const isGoingRight = dx == cellSize;

        if (e.key === 'ArrowUp' && !isGoingDown) {
            dx = 0;
            dy = -cellSize;
        } else if (e.key === 'ArrowDown' && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if (e.key === 'ArrowLeft' && !isGoingRight) {
            dx = -cellSize
            dy = 0
        } else if (e.key === 'ArrowRight' && !isGoingLeft) {
            dx = cellSize
            dy = 0;
        }
    }

    // Function to Draw the food Div
    function drawDiv(x, y, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`
        divElement.style.left = `${x}px`
        return divElement;
    }

    // Function to draw Food and Snake in the GameArena Or On the canvas
    function drawFoodAndSnake() {
        // it will wiped out everything and redraw with new position
        gameArena.innerHTML = ''; // Clear the game Area

        // Making Snake
        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(snakeElement);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

    }

    // Function to over the function
    function isGameOver() {
        // snake Body Collision checks
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        // Wall collision checks
        const hitLeftWall = snake[0].x < 0 // snake[0]--> head
        const hitRightWal = snake[0].x > arenaSize - cellSize;
        const hitTopWall = snake[0].y < 0
        const hitBottomWall = snake[0].y > arenaSize - cellSize;
        return hitLeftWall || hitRightWal || hitTopWall || hitBottomWall;
    }

    // Game loop Function 
    function gameLoop() {
        intervalId = setInterval(() => {
            if (isGameOver()) {
                clearInterval(intervalId);
                gameStarted = false;
                return;
            }

            updateSnake();
            drawFoodAndSnake();
        }, 200)
    }

    // Function to run the Game the user Click on the start button
    function runGame() {
        if (!gameStarted) {
            gameStarted = true;
            // calling the Direction function to move the snake
            document.addEventListener('keydown', changeDirection)

            // drawFoodAnd Snake(); // When game is started draw food & snake
            gameLoop()
        }
    }

    //Crating a function for Initial Game
    function initiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';

        document.body.insertBefore(scoreBoard, gameArena); // Inserting score board before Game Arena

        // Buttons for the Game
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game'
        startButton.classList.add('start-button');

        // Logic for Start button
        startButton.addEventListener('click', function startGame() {
            startButton.style.display = 'none'; // Hiding the Start button when click

            // Calling the RunGame function
            runGame();
        })

        document.body.appendChild(startButton); // Append start Button to the Body

    }

    // Calling the Initial game Function 
    initiateGame();

})
