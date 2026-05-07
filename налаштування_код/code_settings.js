// Створюю об'єкт для фонової музики і ставлю її на повтор
const bgMusic = new Audio('загальна_озвучка/fon_menu.mp3');
bgMusic.loop = true;

// Функція для звуку кліку при натисканні на кнопки
function playClickSound() {
    const clickSnd = new Audio('загальна_озвучка/click-effect.mp3');
    // Беремо гучність із пам'яті браузера, якщо там порожньо — ставимо 70
    clickSnd.volume = (localStorage.getItem('marsVol') || 70) / 100;
    clickSnd.play().catch(()=>{}); // Граємо звук, ігноруємо помилки якщо вони будуть
}

// Міняємо гучність фонової музики і виводимо текст у лог
function adjustVolume(val) {
    bgMusic.volume = (val / 100) * 0.5;
    document.getElementById('log').innerText = `AUDIO_GAIN_SET_TO: ${val}dB`;
}

// Список темних кольорів для фону, щоб вони пасували до основних кольорів теми
const bgColors = {
    "#ff5722": "#1a0800", // Помаранчевий фон
    "#00d4ff": "#000a1a", // Блакитний фон
    "#4caf50": "#051a05", // Зелений фон
    "#e91e63": "#1a0008"  // Рожевий фон
};

// Коли сторінка повністю завантажилась
window.onload = function() {
    //збережені налаштування користувача
    const theme = localStorage.getItem('marsTheme') || '#ff5722';
    const fx = localStorage.getItem('marsFX') !== 'false';
    const vol = localStorage.getItem('marsVol') || '70';
    
    // Ставимо значення у всі поля налаштувань
    document.getElementById('colorTheme').value = theme;
    document.getElementById('checkFX').checked = fx;
    document.getElementById('volume').value = vol;

    // Оновлюємо вигляд і ефекти 
    updateThemePreview(theme);
    toggleFX();
    
    //звук кліку на всі кнопки
    document.querySelectorAll('button, select, input').forEach(el => {
        el.addEventListener('click', playClickSound);
    });
};

// Функція для зміни кольорів усієї сторінки
function updateThemePreview(color) {
    // Міняємо головний колір
    document.documentElement.style.setProperty('--accent-color', color);
    // Шукаємо підходящий темний фон з нашого списку
    const darkBg = bgColors[color] || "#000";
    document.getElementById('bg').style.backgroundColor = darkBg;
    
    // Вираховуємо RGB з коду кольору, щоб зробити м'яке світіння 
    const r = parseInt(color.slice(1,3), 16), g = parseInt(color.slice(3,5), 16), b = parseInt(color.slice(5,7), 16);
    document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b}, 0.3)`);
}

// Вмикаємо або вимикаємо візуальний ефект
function toggleFX() {
    const isChecked = document.getElementById('checkFX').checked;
    document.getElementById('fx').style.display = isChecked ? 'block' : 'none';
}

// Зберігаємо все, що наклацали, у пам'ять браузера і повертаємось на головну
function saveAndExit() {
    localStorage.setItem('marsTheme', document.getElementById('colorTheme').value);
    localStorage.setItem('marsFX', document.getElementById('checkFX').checked);
    localStorage.setItem('marsVol', document.getElementById('volume').value);
    localStorage.setItem('marsLang', document.getElementById('lang').value);

    document.getElementById('log').innerText = "UPDATING_CORE_REGISTRY...";
    // Невелика затримка для ефекту "завантаження" перед виходом
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

// Фонова музика не запуститься сама без кліку, тому запускаємо її при першому ж натисканні
document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.volume = (localStorage.getItem('marsVol') || 70) / 200;
        bgMusic.play().catch(() => {});
    }
}, { once: true }); // Спрацює лише один раз