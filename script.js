let playBoard = document.querySelector("[data-playBoard]");

let foodX;
let foodY;
let snakeX = 10;
let snakeY = 2;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;

function initGame() {
     if (gameOver) return handleGameOver();
     snakeX += velocityX;
     snakeY += velocityY;
     snakeBody[0] = [snakeX, snakeY];

     if (snakeX == foodX && snakeY == foodY) {
          changeFoodPosition();
          snakeBody.push([foodX, foodY]);
          console.log(snakeBody);
     }
     let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
     for (let i = 0; i < snakeBody.length; i++) {
          htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
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
function changeFoodPosition() {
     foodX = Math.floor(Math.random() * 30) + 1;
     foodY = Math.floor(Math.random() * 30) + 1;
}

changeFoodPosition();
initGame();

function handleGameOver() {
     clearInterval(setIntervalId);
     alert("you are dead, press ok to continue");
}
