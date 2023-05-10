// Define the canvas and context
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

// Define the size of each grid cell
let gridSize = 20;
let gridWidth = canvas.width / gridSize;
let gridHeight = canvas.height / gridSize;

// Initialize the snake and food
class Snakeclass {

    // constructor to draw the snake and food

    constructor() {
        this.score = 0;
        this.snake = [
            { x: gridWidth / 2, y: gridHeight / 2 }
        ];
        this.food = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };

        // Set the initial direction
        this.direction = "stop";
        this.canvas_element = document.getElementById("gameCanvas");
    }

    // to reset the states
    reset() {
        clearInterval(gameloop);
        gameloop = setInterval(gameRun, 100);
        this.canvas_element.style.borderColor = "Black";
        this.score = 0;
        score_element.dispatchEvent(score_change);
        this.snake = [
            { x: gridWidth / 2, y: gridHeight / 2 }
        ];
        this.food = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };

        // Set the initial direction
        this.direction = "stop";

        // Clear the game over text
        document.getElementById("game_over").innerText = "";
    }
    // function to draw the snake and food
    draw() {

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        for (const element of this.snake) {
            let snakePart = element;
            context.fillStyle = "green";
            context.fillRect(
                snakePart.x * gridSize,
                snakePart.y * gridSize,
                gridSize,
                gridSize
            );
        }

        // Draw the food
        context.fillStyle = "red";
        context.fillRect(
            this.food.x * gridSize,
            this.food.y * gridSize,
            gridSize,
            gridSize
        );
    }

    checkCollision() {
        let head = this.snake[0];
        if (this.snake.length > 2) {
            for (let i = 1; i < this.snake.length; i++) {
                if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
                    return true;
                }
            }
        }
        return false;
    }
    // To return the score
    getScore() {
        return this.score;
    }
    // Function to stop the game
    gameover() {
        document.removeEventListener("keydown", handleKeydown);
        document.getElementById("game_over").innerText = "Game Over!"
        const new_score = document.createElement("li")
        const parent_list = document.getElementById("score_list");
        if (parent_list.childElementCount > 10) {
            parent_list.removeChild(parent_list.children[0])
        }
        new_score.innerText = "Attempt-" + (parent_list.childElementCount + 1).toString() + "  ---- Score:  " + this.score.toString();
        parent_list.appendChild(new_score);
        this.canvas_element.style.borderColor = "red";
        this.canvas_element.classList.toggle("addCrash");
        clearInterval(gameloop);
    }
    // Function to update the game state
    update() {
        // Move the snake
        let head = {
            x: this.snake[0].x,
            y: this.snake[0].y
        };

        if (this.direction === "up") head.y--;
        else if (this.direction === "down") head.y++;
        else if (this.direction === "left") head.x--;
        else if (this.direction === "right") head.x++;
        this.snake.unshift(head);


        //  check if border reached or snake hit's itself
        if (head.x === gridWidth || head.x === -1 || head.y === gridHeight || head.y === -1 || this.checkCollision()) {
            this.gameover();
        }

        // Check if the snake has eaten the food
        if (head.x === this.food.x && head.y === this.food.y) {
            // Generate new food
            this.score = this.score + 1;
            score_element.dispatchEvent(score_change);
            this.food.x = Math.floor(Math.random() * gridWidth);
            this.food.y = Math.floor(Math.random() * gridHeight);
        } else {
            // Remove the tail segment
            this.snake.pop();
        }
    }
}

// Function to handle keydown events
function handleKeydown(event) {
    event.preventDefault();
    if (event.keyCode === 38 && game.direction != "down") game.direction = "up";
    else if (event.keyCode === 40 && game.direction != "up") game.direction = "down";
    else if (event.keyCode === 37 && game.direction != "right") game.direction = "left";
    else if (event.keyCode === 39 && game.direction !== "left") game.direction = "right";
}

// Start the game loop
let game = new Snakeclass()

function gameRun() {
    game.update();
    game.draw();
}
const score_change = new Event("score_change")
let gameloop = setInterval(gameRun, 100);
const score_element = document.getElementById("score_text");
score_element.addEventListener("score_change", function () {
    score_element.innerText = game.getScore();
}
);

let score_list = [];

// Event listener for keydown events
document.addEventListener("keydown", handleKeydown);
document.getElementById("restart").addEventListener("click", function () {
    document.addEventListener("keydown", handleKeydown);
    game.reset();
})

const keys = { "arrow_left":37,   "arrow_up" :38,  "arrow_right":39 , "arrow_down": 40 };
for (const  [key, value] of Object.entries(keys)) {
    document.getElementById(key).addEventListener("click", () => {
        handleKeydown(new KeyboardEvent('keypress', { keyCode: value }));
    });
}