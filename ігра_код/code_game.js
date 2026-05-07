// Витягую музику і кнопку керування, щоб потім з ними працювати
const music = document.getElementById('bgMusic');
const mCtrl = document.getElementById('music-control');
const deniedMsg = document.getElementById('access-denied');

// Функція для оновлення кольорів інтерфейсу
function updateTheme() {
    // Беремо колір з пам'яті браузера, якщо порожньо — ставимо блакитний за замовчуванням
    const themeColor = localStorage.getItem('marsTheme') || '#00d4ff';
    document.documentElement.style.setProperty('--accent', themeColor);
    
    // Переганяю HEX колір у RGB, щоб зробити напівпрозоре свічення
    const r = parseInt(themeColor.slice(1, 3), 16);
    const g = parseInt(themeColor.slice(3, 5), 16);
    const b = parseInt(themeColor.slice(5, 7), 16);
    document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.25)`);
}

// Перевірка, які рівні (Фобос, Деймос) вже пройдені
function checkProgression() {
    const phobosDone = localStorage.getItem('phobos_complete') === 'true';
    const deimosDone = localStorage.getItem('deimos_complete') === 'true';

    const deimosNode = document.getElementById('deimos');
    const marsNode = document.getElementById('mars');

    // Якщо Фобос не пройшли — Деймос закритий
    if (!phobosDone) deimosNode.classList.add('locked');
    else deimosNode.classList.remove('locked');

    // Якщо Деймос не пройшли — головна база Марс теж заблокована
    if (!deimosDone) marsNode.classList.add('locked');
    else marsNode.classList.remove('locked');
}

// Показую напис "Доступ заборонено" на 2 секунди
function showDenied() {
    deniedMsg.style.display = 'block';
    setTimeout(() => deniedMsg.style.display = 'none', 2000);
}

// Оновлюю гучність музики з налаштувань
function updateVolume() {
    const vol = localStorage.getItem('marsVol') || 70;
    music.volume = vol / 100;
}

// Клік по іконці динаміка: вмикаю або вимикаю звук
mCtrl.onclick = () => {
    if (music.paused) {
        music.play();
        mCtrl.innerText = "🔊";
    } else {
        music.pause();
        mCtrl.innerText = "🔇";
    }
};

// Основна логіка, яка спрацьовує при завантаженні сторінки
window.onload = () => {
    updateTheme();
    checkProgression();
    updateVolume();
    
    // Запускаю годинник терміналу, щоб оновлювався щосекунди
    setInterval(() => {
        document.getElementById('os-clock').innerText = new Date().toLocaleTimeString();
    }, 1000);
    
    // Налаштовую всі точки на карті
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', (e) => {
            // Якщо рівень закритий не даю перейти і показую помилку
            if (node.classList.contains('locked')) {
                e.preventDefault();
                showDenied();
            }
        });

        // Ефект звуку при наведенні мишки на доступний рівень
        node.onmouseenter = () => {
            if (!node.classList.contains('locked')) {
                const s = new Audio('загальна_озвучка/click-effect.mp3');
                // Ставлю звук ефекту тихіше щоб не було заголосно
                s.volume = (localStorage.getItem('marsVol') || 70) / 400; 
                s.play().catch(()=>{});
            }
        };
    });
};

// Автозапуск музики після першого кліку (бо браузери самі не дають вмикати звук)
document.addEventListener('click', () => {
    if (music.paused) {
        updateVolume();
        music.play().catch(()=>{});
    }
}, { once: true });

// Слідкую за змінами в налаштуваннях 
window.addEventListener('storage', (e) => {
    if (e.key === 'marsTheme') updateTheme();
    if (e.key === 'marsVol') updateVolume();
    checkProgression();
});
   