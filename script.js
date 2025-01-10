const heartContainer = document.querySelector('.heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Генерируем случайные параметры
    const size = Math.random() * 20 + 10; // Размер сердечка
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`; // Случайное положение по горизонтали
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`; // Длительность анимации
    
    heartContainer.appendChild(heart);
    
    // Удаляем сердечко из DOM после анимации
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Создаем сердечки каждые 300 мс
setInterval(createHeart, 300);
