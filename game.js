const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 25; // Размер плитки
let snake = [{ x: 150, y: 150 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomTile(), y: getRandomTile() };
let gameRunning = true;
let score = 0;
let title = '';

// Загружаем изображение для головы змейки
const headImage = new Image();
headImage.src = 'images/gamephoto.jpg'; // Укажите путь к вашему изображению

headImage.onload = () => {
  console.log('Image loaded successfully');
};

headImage.onerror = () => {
  console.error('Error loading image');
};

// Устанавливаем фиксированные размеры канваса
canvas.width = 400;
canvas.height = 400;

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawHead(x, y) {
  if (headImage.complete) {
    ctx.drawImage(headImage, x, y, tileSize, tileSize);
  }
}

function getRandomTile() {
  return Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = { x: getRandomTile(), y: getRandomTile() };
    score++;
    updateTitle();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameRunning = false;
  }
}

function updateTitle() {
  if (score === 1) {
    title = 'Nurai pro';
  } else if (score === 2) {
    title = 'Nurai pro max';
  } else if (score === 3) {
    title = 'Nurai Ultra Pro Max';
  } else if (score >= 4) {
    title = 'Nurai Godzilla';
  }
}

function drawGame() {
  if (!gameRunning) {
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(food.x, food.y, 'red');

  snake.forEach((segment, index) => {
    if (index === 0) {
      drawHead(segment.x, segment.y);
    } else {
      drawRect(segment.x, segment.y, 'green');
    }
  });

  moveSnake();

  // Отображаем очки и титул
  ctx.fillStyle = 'white';
  ctx.font = '20px Impact';
  ctx.fillText(`Score: ${score}`, 20, 30);
  ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 30);
}

function changeDirection(newDirection) {
  if (
    (newDirection.x + direction.x !== 0) ||
    (newDirection.y + direction.y !== 0)
  ) {
    direction = newDirection;
  }
}

document.addEventListener('keydown', event => {
  const keyMap = {
    ArrowUp: { x: 0, y: -tileSize },
    ArrowDown: { x: 0, y: tileSize },
    ArrowLeft: { x: -tileSize, y: 0 },
    ArrowRight: { x: tileSize, y: 0 }
  };

  const newDirection = keyMap[event.key];
  if (newDirection) changeDirection(newDirection);
});

document.getElementById('up').addEventListener('click', () => changeDirection({ x: 0, y: -tileSize }));
document.getElementById('down').addEventListener('click', () => changeDirection({ x: 0, y: tileSize }));
document.getElementById('left').addEventListener('click', () => changeDirection({ x: -tileSize, y: 0 }));
document.getElementById('right').addEventListener('click', () => changeDirection({ x: tileSize, y: 0 }));

setInterval(drawGame, 150); // 150 ms для замедления игры
