// get HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw map, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
      const snakeElement = createGameElement('div', 'snake');
      setPosition(snakeElement, segment);
      board.appendChild(snakeElement);
    });
  }

// Create snake or food

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }

// Set pos of snake or food

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
  }

// Draw food func
//test // draw ();

function drawFood() {
    if (gameStarted) {
      const foodElement = createGameElement('div', 'food');
      setPosition(foodElement, food);
      board.appendChild(foodElement);
    }
  }

// Generate food

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
  }

// Move snake

function move() {
    const head = { ...snake[0] };
    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }
    snake.unshift(head);

    //   snake.pop();
  
    if (head.x === food.x && head.y === food.y) {
      food = generateFood();
      increaseSpeed();
      clearInterval(gameInterval); // Clear past interval
      gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
      }, gameSpeedDelay);
    } else {
      snake.pop();
    }
  }
  
  // Test moving
  // setInterval(() => {
  //   move(); // move
  //   draw(); // draw new pos
  // }, 200);

// Start game func

function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  }

// Listen to keypress

function handleKeyPress(event) {
    if (
      (!gameStarted && event.code === 'Space') ||
      (!gameStarted && event.key === ' ')
    ) {
      startGame();
    } else {
      switch (event.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
      }
    }
  }
  
  document.addEventListener('keydown', handleKeyPress);