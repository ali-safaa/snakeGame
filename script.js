const playBoard = document.querySelector("[data-playBoard]");
const scoreElement = document.querySelector("[data-score]");
const highScoreElement = document.querySelector("[data-highScore]");
const left = document.querySelector("[data-left]");
const right = document.querySelector("[data-right]");
const up = document.querySelector("[data-up]");
const down = document.querySelector("[data-down]");

let foodX;
let foodY;
let snakeX = 10;
let snakeY = 2;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `high score: ${highScore}`;

function initGame() {
     if (gameOver) return handleGameOver();
     snakeX += velocityX;
     snakeY += velocityY;
     snakeBody[0] = [snakeX, snakeY];

     if (snakeX == foodX && snakeY == foodY) {
          changeFoodPosition();
          snakeBody.push([foodX, foodY]);
          score++;
          highScore = score >= highScore ? score : highScore;
          localStorage.setItem("highScore", highScore);
          scoreElement.innerText = `score: ${score}`;
     }
     let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
     for (let i = 0; i < snakeBody.length; i++) {
          htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
          if (
               i !== 0 &&
               snakeBody[0][1] === snakeBody[i][1] &&
               snakeBody[0][0] === snakeBody[i][0]
          ) {
               gameOver = true;
          }
     }
     for (i = snakeBody.length - 1; i > 0; i--) {
          snakeBody[i] = snakeBody[i - 1];
     }

     if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
          gameOver = true;
     }
     playBoard.innerHTML = htmlMarkup;
}

setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
left.addEventListener("click", leftDirection);
right.addEventListener("click", rightDirection);
up.addEventListener("click", upDirection);
down.addEventListener("click", downDirection);

function changeDirection(e) {
     switch (e.key) {
          case "ArrowUp":
               velocityX = 0;
               velocityY = -1;
               break;
          case "ArrowDown":
               velocityX = 0;
               velocityY = 1;
               break;
          case "ArrowLeft":
               velocityX = -1;
               velocityY = 0;
               break;
          case "ArrowRight":
               velocityX = 1;
               velocityY = 0;

          default:
               break;
     }
     initGame();
}

function leftDirection() {
     velocityX = -1;
     velocityY = 0;
}

function rightDirection() {
     velocityX = 1;
     velocityY = 0;
}

function upDirection() {
     velocityX = 0;
     velocityY = -1;
}

function downDirection() {
     velocityX = 0;
     velocityY = 1;
}

function changeFoodPosition() {
     foodX = Math.floor(Math.random() * 30) + 1;
     foodY = Math.floor(Math.random() * 30) + 1;
}

changeFoodPosition();
initGame();

function handleGameOver() {
     clearInterval(setIntervalId);
     alert("you are dead, please reload page to continue");
}
