const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;  // Уменьшаем ширину канваса для мобильных устройств
canvas.height = 300; // Уменьшаем высоту канваса

const tileSize = 25; // Увеличиваем размер плитки для змейки и пищи
let snake = [{ x: 150, y: 150 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomTile(), y: getRandomTile() };
let gameRunning = true;
let score = 0; // Переменная для хранения очков
let title = ''; // Переменная для хранения титула

// Загружаем изображение для головы змейки
const headImage = new Image();
headImage.src = 'images/gamephoto.jpg'; // Укажите путь к вашему изображению

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
    score++; // Увеличиваем количество очков
    updateTitle(); // Обновляем титул в зависимости от очков
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
  drawRect(food.x, food.y, 'red');  // Рисуем пищу

  snake.forEach((segment, index) => {
    if (index === 0) {
      drawHead(segment.x, segment.y);  // Рисуем голову змейки
    } else {
      drawRect(segment.x, segment.y, 'green');  // Рисуем тело змейки
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
