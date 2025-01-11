const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomTile(), y: getRandomTile() };
let gameRunning = true;

// Загружаем изображение для головы змейки
const headImage = new Image();
headImage.src = './gamephoto.jpg'; // Укажите путь к вашему изображению

// Ожидаем, пока изображение загрузится
headImage.onload = () => {
  console.log('Image loaded successfully');
};

headImage.onerror = () => {
  console.error('Error loading image');
};

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawHead(x, y) {
  // Проверяем, загрузилось ли изображение перед рисованием
  if (headImage.complete) {
    ctx.drawImage(headImage, x, y, tileSize, tileSize); // Рисуем изображение вместо головы
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

function drawGame() {
  if (!gameRunning) {
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(food.x, food.y, 'red');

  // Рисуем голову змейки как изображение, а остальные сегменты как прямоугольники
  snake.forEach((segment, index) => {
    if (index === 0) {
      drawHead(segment.x, segment.y); // Голова
    } else {
      drawRect(segment.x, segment.y, 'green'); // Остальные сегменты
    }
  });

  moveSnake();
}

function changeDirection(newDirection) {
  if (
    (newDirection.x + direction.x !== 0) ||
    (newDirection.y + direction.y !== 0)
  ) {
    direction = newDirection;
  }
}

// Обработка нажатий клавиш
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

// Обработка кликов по кнопкам
document.getElementById('up').addEventListener('click', () => changeDirection({ x: 0, y: -tileSize }));
document.getElementById('down').addEventListener('click', () => changeDirection({ x: 0, y: tileSize }));
document.getElementById('left').addEventListener('click', () => changeDirection({ x: -tileSize, y: 0 }));
document.getElementById('right').addEventListener('click', () => changeDirection({ x: tileSize, y: 0 }));

// Увеличиваем интервал времени для замедления игры
setInterval(drawGame, 150); // Измените значение 150 на 200, если хотите еще больше замедлить игру
