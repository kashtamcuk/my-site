// --- програвач звуку  ---
const bgMusic = new Audio('загальна_озвучка/fon_menu.mp3');
bgMusic.loop = true;


function applySavedTheme() {
    const theme = localStorage.getItem('marsTheme') || '#ff5722';
    const root = document.documentElement;

    // Мапа фонових кольорів для відповідних тем
    const bgMap = {
        "#ff5722": "#1a0800", // Помаранчевий (Марс)
        "#00d4ff": "#000a1a", // Блакитний (Лід)
        "#4caf50": "#051a05", // Зелений (Біокупол)
        "#e91e63": "#1a0008"  // Рожевий (Неон)
    };

    // Конвертація HEX у RGB для ефекту світіння
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    // Встановлення CSS змінних
    root.style.setProperty('--accent-color', theme);
    root.style.setProperty('--bg-color-1', bgMap[theme] || "#1a0800");
    root.style.setProperty('--glow', `rgba(${hexToRgb(theme)}, 0.4)`);
}

/**
 *  місії для розблокування Хабу
 */
function checkMissionStatus() {
    const isPassed = localStorage.getItem('mars_complete') === 'true';
    const hubBtn = document.getElementById('hub-btn');
    
    if (!hubBtn) return;

    if (!isPassed) {
        hubBtn.classList.add('is-locked');
        hubBtn.innerHTML = "🔒 ХАБ ЗАБЛОКОВАНО";
    } else {
        hubBtn.classList.remove('is-locked');
        hubBtn.classList.add('unlocked-btn');
        hubBtn.innerText = "МУЛЬТИМЕДІЙНИЙ ХАБ";
        hubBtn.style.color = "white"; 
    }
}

/**
 * перевірка коли хочуть відкрити хаб не розблокувавши
 */
function tryEnterHub() {
    const isPassed = localStorage.getItem('mars_complete') === 'true';

    if (isPassed) {
        navigate('colony.html');
    } else {
        // Ефект помилки доступу
        const warning = document.getElementById('lock-warning');
        if (warning) {
            warning.style.opacity = "1";
            setTimeout(() => warning.style.opacity = "0", 3000);
        }
        
        const errorSnd = new Audio('загальна_озвучка/error.mp3');
        errorSnd.play().catch(() => {});
    }
}

/**
 * Плавна навігація між сторінками з ефектом виходу
 */
function navigate(url) {
    const clickSnd = new Audio('загальна_озвучка/click-effect.mp3');
    clickSnd.play().catch(() => {});

    const mainContainer = document.getElementById('main-menu');
    if (mainContainer) {
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'scale(0.95)'; // Легке зменшення при виході
    }

    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

/**
 *годинник та випадкові координати
 */
function updateTelemetry() {
    // Оновлення часу
    const clockEl = document.getElementById('live-clock');
    if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();

    // Симуляція коливання координат
    const coordsEl = document.getElementById('coords');
    if (coordsEl) {
        const lat = (18.44 + Math.random() * 0.005).toFixed(3);
        const lon = (77.45 + Math.random() * 0.005).toFixed(3);
        coordsEl.innerText = `${lat}°N ${lon}°E`;
    }
}

// --- Обробники подій ---

// Запуск фонової музики після першої взаємодії користувача
document.addEventListener('click', () => { 
    bgMusic.play().catch(err => console.log("Audio play blocked")); 
}, { once: true });

window.onload = () => {
    applySavedTheme();
    checkMissionStatus();
    setInterval(updateTelemetry, 1000);
};
