const gameArea = document.querySelector('.game-area');
const scoreBoard = document.querySelector("#score");
const highScoreBoard = document.querySelector("#high-score");
const timeBoard = document.querySelector("#time");
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const gameHeight = 50;
const gameWidth = 50;
let Score = 0;
let  highScore = 0;
let time = "00-00";
const savedHighScore = localStorage.getItem('highScore');


const col = Math.floor(gameArea.clientWidth / gameWidth);
const rows = Math.floor(gameArea.clientHeight / gameHeight);
let setIntervalID = null;
let timeIntervalID = null;

let food = { x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * col) };
const boxes = [];
let snake = [
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
        clearInterval(setIntervalID);
        document.querySelector('.modal').classList.remove('hidden');
        restartBtn.parentElement.classList.remove('hidden');
        startBtn.parentElement.classList.add('hidden');
        return;
    }

    if(head.x === food.x && head.y === food.y) {
        boxes[`${food.x}-${food.y}`].classList.remove('food');
        food ={ x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * col) };
        boxes[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);
        Score += 10;
        scoreBoard.innerText = `${Score}`;
        if (Score > highScore) {
            highScore = Score;
            localStorage.setItem('highScore', highScore.toString());
            highScoreBoard.innerText = `${highScore}`;
        }
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


startBtn.addEventListener('click', () => {
    document.querySelector('.modal').classList.add('hidden');
    setIntervalID =setInterval(() => {
    drawSnake();
}, 400);
timeIntervalID = setInterval(() => {
    let [mins, secs] = time.split('-').map(Number);
    secs++;
    if (secs === 60) {
        mins++;
        secs = 0;
    }
    time = `${mins}-${secs}`;
    timeBoard.innerText = `${time}`;
}, 1000);
});
restartBtn.addEventListener('click', resetGame);
function resetGame() {
    boxes[`${food.x}-${food.y}`].classList.remove('food');
    snake.forEach(segment => {
        boxes[`${segment.x}-${segment.y}`].classList.remove('snake');
    });
    snake = [
        { x: 1, y: 3 }, 
    ];
    drection = 'DOWN';
     setIntervalID =setInterval(() => {
    drawSnake();
}, 400);
    Score = 0;
    time = "00-00";
    scoreBoard.innerText = `${Score}`;
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * col) };
    boxes[`${food.x}-${food.y}`].classList.add('food');
    document.querySelector('.modal').classList.add('hidden');
}

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
