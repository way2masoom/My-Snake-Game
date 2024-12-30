console.log("Hello");

// Ensure all code runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Selecting the GameArea Div
    const gameArena = document.getElementById('game-arena')
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of the game
    let gameStarted = false; // game status

    let food = { x: 300, y: 200 }; // {X:15*20,y:10*20} // -> call coordinate -> pixels || Pixel of top left Pixel for food
    let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }]; // Position of Snake


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
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y,'snake');
            gameArena.appendChild(snakeElement);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

    }

    // Function to run the Game the user Click on the start button
    function runGame() {
        if (!gameStarted) {
            gameStarted = true;
            drawFoodAndSnake(); // When game is started draw food & snake
            // gameLoop();  TODO: Implement game loop
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
