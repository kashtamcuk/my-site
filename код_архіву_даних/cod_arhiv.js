// --- Керування аудіо-озвучкою карток ---
let currentAudio = null; // Тут тримаю посилання на звук, який грає зараз
let currentBtn = null;   // А тут запам'ятовую кнопку, яку натиснули

function playAudio(file, btn) {
    // Перевірка: якщо звук уже грає і я натиснув на ту саму кнопку — просто зупиняю
    if (currentAudio && !currentAudio.paused && currentBtn === btn) {
        stopAll();
        return;
    }

    // Якщо до цього щось грало — вимикаю перед запуском нового
    stopAll();

    // Завантажую файл і запам'ятовую кнопку
    currentAudio = new Audio(file);
    currentBtn = btn;
    currentAudio.play();

    // Міняю текст на кнопці, щоб було видно, що можна зупинити
    btn.innerHTML = "<span>⏹ STOP</span>";
    btn.classList.add('active-voice');

    // Коли запис дограє до кінця — повертаю кнопку в початковий стан
    currentAudio.onended = () => {
        resetButton(btn);
    };
}

function stopAll() {
    // Функція, щоб швидко все вимкнути і скинути час на нуль
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        resetButton(currentBtn);
    }
}

function resetButton(btn) {
    // Повертаю кнопці стандартний вигляд з іконкою звуку
    if (btn) {
        btn.innerHTML = "<span>🔊 PLAY_VOICE</span>";
        btn.classList.remove('active-voice');
    }
}

// --- Калькулятор ваги на Марсі ---
function calcWeight() {
    // Беру число, яке ввів користувач (вага на Землі)
    const earth = document.getElementById('earthWeight').value;
    if (earth > 0) {
        // Марс менший, тому множу на 0.38 (це 38% від нашої гравітації)
        const mars = (earth * 0.38).toFixed(1);
        document.getElementById('weightValue').innerText = mars;
        // Показую блок з результатом, який за замовчуванням прихований
        document.getElementById('marsResult').style.display = 'block';
    }
}

// --- Керування фоновою музикою ---
function toggleMarsMusic() {
    // Шукаю елементи плеєра та кнопок на сторінці
    const audio = document.getElementById("marsOrbitAudio");
    const panel = document.getElementById("mars-audio-module");
    const btn = document.getElementById("playPauseBtn");
    const statusText = document.getElementById("status-text");

    // Перемикач: якщо стоїть на паузі — вмикаю, якщо грає — вимикаю
    if (audio.paused) {
        audio.play();
        panel.classList.add("active");
        btn.innerText = "TERMINATE_SIGNAL";
        statusText.innerText = "SIGNAL_STABLE_100%";
    } else {
        audio.pause();
        panel.classList.remove("active");
        btn.innerText = "RECONNECT_ORBITER";
        statusText.innerText = "SIGNAL_LOST";
    }
}

// --- Глобальні налаштування системи (Mars OS) ---
function applyGlobalSettings() {
    // Витягую налаштування, які ми зберегли раніше в браузері (колір, звук, ефекти)
    const themeColor = localStorage.getItem('marsTheme') || '#ff5722'; 
    const isFXEnabled = localStorage.getItem('marsFX') !== 'false';
    const volume = localStorage.getItem('marsVol') || 70;

    // Міняю колір всього інтерфейсу через CSS змінні
    document.documentElement.style.setProperty('--neon-blue', themeColor);
    document.documentElement.style.setProperty('--neon-orange', themeColor);

    // Вмикаю або вимикаю візуальні ефекти (смуги сканування)
    const scanlines = document.querySelectorAll('.scan-bar');
    scanlines.forEach(line => {
        line.style.display = isFXEnabled ? 'block' : 'none';
    });

    // 4. Налаштовую гучність фонової музики (роблю трохи тихіше від основної)
    const mainAudio = document.getElementById('marsOrbitAudio');
    if (mainAudio) {
        mainAudio.volume = (volume / 100) * 0.5;
    }
    
    // Чисто для себе в консоль, щоб бачити, що все підвантажилось
    console.log("Mars OS settings applied:", { themeColor, volume, fx: isFXEnabled });
}

// --- Ініціалізація при завантаженні ---
// Коли сторінка повністю завантажилась — запускаю налаштування
window.onload = applyGlobalSettings;

// Якщо змінити налаштування в іншому вікні (наприклад, у вкладці Settings), вони оновляться і тут
window.addEventListener('storage', (e) => {
    applyGlobalSettings();
});