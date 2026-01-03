const gameArea = document.querySelector('.game-area');
const gameHeight = 50;
const gameWidth = 50;

const col = Math.floor(gameArea.clientWidth / gameWidth);
const rows = Math.floor(gameArea.clientHeight / gameHeight);
let setIntervalID = null;

let food = { x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * col) };
const boxes = [];
const snake = [
    { x: 1, y: 3 },

];
let drection = 'DOWN';
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
        const box = document.createElement('div');
        box.classList.add('game-box');
        gameArea.appendChild(box);
        boxes[`${i}-${j}`] = box;
    }
}
function drawSnake() {
    // Move snake logic here
    boxes[`${food.x}-${food.y}`].classList.add('food');
    let head = null;
    if (drection === 'DOWN') {
        head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (drection === 'UP') {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (drection === 'LEFT') {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (drection === 'RIGHT') {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    }   
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= col) {
        alert('Game Over');
        clearInterval(setIntervalID);
        return;
    }

    if(head.x === food.x && head.y === food.y) {
        boxes[`${food.x}-${food.y}`].classList.remove('food');
        food ={ x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * col) };
        boxes[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);
    }
    snake.forEach(segment => {
         boxes[`${segment.x}-${segment.y}`].classList.remove('snake');
    });
    snake.unshift(head)
    snake.pop();
    snake.forEach(segment => {
        boxes[`${segment.x}-${segment.y}`].classList.add('snake');

    });
}
drawSnake();

setIntervalID =setInterval(() => {

    drawSnake();
}, 400);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && drection !== 'DOWN') {
        drection = 'UP';    
    } else if (e.key === 'ArrowDown' && drection !== 'UP') {
        drection = 'DOWN';
    } else if (e.key === 'ArrowLeft' && drection !== 'RIGHT') {
        drection = 'LEFT';
    } else if (e.key === 'ArrowRight' && drection !== 'LEFT') {
        drection = 'RIGHT';
    }   
}
);