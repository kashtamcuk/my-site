/**
 * MARS ARCHIVE v2.0 - CORE LOGIC
 */

// --- 1. Керування аудіо-озвучкою карток ---
let currentAudio = null; // Змінна для збереження поточного аудіо
let currentBtn = null;   // Змінна для поточної активної кнопки

function playAudio(file, btn) {
    // Якщо цей же файл уже грає — зупиняємо його
    if (currentAudio && !currentAudio.paused && currentBtn === btn) {
        stopAll();
        return;
    }

    // Зупиняємо попередній файл, якщо він грав
    stopAll();

    // Створюємо та запускаємо нове аудіо
    currentAudio = new Audio(file);
    currentBtn = btn;
    currentAudio.play();

    // Візуал кнопки при старті
    btn.innerHTML = "<span>⏹ STOP</span>";
    btn.classList.add('active-voice');

    // Коли аудіо закінчиться — повертаємо кнопку в норму
    currentAudio.onended = () => {
        resetButton(btn);
    };
}

function stopAll() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        resetButton(currentBtn);
    }
}

function resetButton(btn) {
    if (btn) {
        btn.innerHTML = "<span>🔊 PLAY_VOICE</span>";
        btn.classList.remove('active-voice');
    }
}

// --- 2. Калькулятор ваги на Марсі ---
function calcWeight() {
    const earth = document.getElementById('earthWeight').value;
    if (earth > 0) {
        // Коефіцієнт гравітації Марса (38%)
        const mars = (earth * 0.38).toFixed(1);
        document.getElementById('weightValue').innerText = mars;
        document.getElementById('marsResult').style.display = 'block';
    }
}

// --- 3. Керування фоновою музикою (Орбітальний сигнал) ---
function toggleMarsMusic() {
    const audio = document.getElementById("marsOrbitAudio");
    const panel = document.getElementById("mars-audio-module");
    const btn = document.getElementById("playPauseBtn");
    const statusText = document.getElementById("status-text");

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

// --- 4. Глобальні налаштування системи (Mars OS) ---
function applyGlobalSettings() {
    // 1. Отримуємо дані з пам'яті (LocalStorage)
    const themeColor = localStorage.getItem('marsTheme') || '#ff5722'; 
    const isFXEnabled = localStorage.getItem('marsFX') !== 'false';
    const volume = localStorage.getItem('marsVol') || 70;

    // 2. Застосовуємо колірну схему до CSS-змінних
    document.documentElement.style.setProperty('--neon-blue', themeColor);
    document.documentElement.style.setProperty('--neon-orange', themeColor);

    // 3. Застосовуємо ефекти сканування
    const scanlines = document.querySelectorAll('.scan-bar');
    scanlines.forEach(line => {
        line.style.display = isFXEnabled ? 'block' : 'none';
    });

    // 4. Керування рівнем гучності фонового аудіо
    const mainAudio = document.getElementById('marsOrbitAudio');
    if (mainAudio) {
        mainAudio.volume = (volume / 100) * 0.5;
    }
    
    console.log("Mars OS settings applied:", { themeColor, volume, fx: isFXEnabled });
}

// --- 5. Ініціалізація при завантаженні ---
window.onload = applyGlobalSettings;

// Слухаємо зміни в localStorage (якщо налаштування змінені в іншому вікні)
window.addEventListener('storage', (e) => {
    applyGlobalSettings();
});