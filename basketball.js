const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const closeBtn = document.getElementById('close-btn');
const ball = document.getElementById('ball');
const message = document.getElementById('message');
let isDragging = false;
let velocityX = 0;
let velocityY = 0;
let posX = 0;
let posY = 0;
let rotation = 0;

// 搜尋功能
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '籃球') {
        ball.style.display = 'block';
        closeBtn.style.display = 'inline-block';
        const ballSize = window.innerWidth <= 600 ? 60 : 100; // 響應式尺寸
        posX = window.innerWidth / 2 - ballSize / 2;
        posY = window.innerHeight / 2 - ballSize / 2;
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
        velocityX = 0;
        velocityY = 0;
        showMessage('嘿，你找到了一顆籃球！拖著玩玩看吧！');
    } else {
        ball.style.display = 'none';
        closeBtn.style.display = 'none';
        showMessage('試試輸入「籃球」看看？');
    }
});

// 關閉功能
closeBtn.addEventListener('click', () => {
    ball.style.display = 'none';
    closeBtn.style.display = 'none';
    velocityX = 0;
    velocityY = 0;
    showMessage('籃球已關閉，再搜尋就能回來！');
});

// 拖動功能
ball.addEventListener('mousedown', (e) => {
    isDragging = true;
    velocityX = 0;
    velocityY = 0;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const ballSize = window.innerWidth <= 600 ? 60 : 100;
        posX = Math.max(0, Math.min(e.clientX - ballSize / 2, window.innerWidth - ballSize));
        posY = Math.max(0, Math.min(e.clientY - ballSize / 2, window.innerHeight - ballSize));
        rotation += 10;
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
        ball.style.transform = `rotate(${rotation}deg)`;
    }
});

document.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
        velocityX = (Math.random() - 0.5) * 10;
        velocityY = -10;
        animateBall();
        showMessage('哇，球飛出去啦！');
    }
});

// 籃球彈跳
function animateBall() {
    if (!isDragging && ball.style.display === 'block') {
        const ballSize = window.innerWidth <= 600 ? 60 : 100;
        velocityY += 0.5;
        posX += velocityX;
        posY += velocityY;
        rotation += velocityX;
        ball.style.transform = `rotate(${rotation}deg)`;

        // 限制在視窗內
        if (posX <= 0) {
            posX = 0;
            velocityX = -velocityX * 0.8;
        }
        if (posX >= window.innerWidth - ballSize) {
            posX = window.innerWidth - ballSize;
            velocityX = -velocityX * 0.8;
        }
        if (posY >= window.innerHeight - ballSize) {
            posY = window.innerHeight - ballSize;
            velocityY = -velocityY * 0.6;
            velocityX *= 0.9;
        }
        if (posY <= 0) {
            posY = 0;
            velocityY = -velocityY * 0.8;
        }

        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';

        if (Math.abs(velocityY) > 0.1 || Math.abs(velocityX) > 0.1) {
            requestAnimationFrame(animateBall);
        } else {
            showMessage('球停下來了，拖一下再玩！');
        }
    }
}

// 顯示訊息並淡出
function showMessage(text) {
    message.textContent = text;
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

// 視窗大小改變時調整位置
window.addEventListener('resize', () => {
    if (ball.style.display === 'block') {
        const ballSize = window.innerWidth <= 600 ? 60 : 100;
        posX = Math.min(posX, window.innerWidth - ballSize);
        posY = Math.min(posY, window.innerHeight - ballSize);
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
    }
});
