let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let lines = 16;
let columns = 16;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * (columns - 1) + 1) * box,
    y: Math.floor(Math.random() * (lines - 1) + 1) * box
}

let moveSet = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
}

let invertedMoveSet = {
    37: "right",
    38: "down",
    39: "left",
    40: "up"
}

document.addEventListener("keydown", update);

function drawBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, lines * box, columns * box)
}

function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

function update(event) {
    let move = event.keyCode.toString()
    if(Object.keys(moveSet).includes(move)) {
        if(direction != invertedMoveSet[move]) {
            direction = moveSet[move];
        }
    }
}

function checkBounds() {
    if(snake[0].x > (columns - 1) * box) {
        snake[0].x = 0;
    }
    if(snake[0].x < 0) {
        snake[0].x = columns * box;
    }
    if(snake[0].y > (lines - 1) * box) {
        snake[0].y = 0;
    }
    if(snake[0].y < 0) {
        snake[0].y = lines * box;
    }
}

function checkAutoCollision() {
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('game over');
        }
    }
}

function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") {
        snakeX += box;
    }
    if(direction == "left") {
        snakeX -= box;
    }
    if(direction == "up") {
        snakeY -= box;
    }
    if(direction == "down") {
        snakeY += box;
    }

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * (columns - 1) + 1) * box;
        food.y = Math.floor(Math.random() * (lines - 1) + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function gameLoop() {
    drawBG();
    checkBounds();
    checkAutoCollision();
    drawSnake();
    drawFood();
    moveSnake()
}

let jogo = setInterval(gameLoop, 100);
