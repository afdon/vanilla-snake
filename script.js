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
// Move snake
// Start game func
// Listen to keypress
