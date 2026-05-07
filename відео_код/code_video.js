// Функція, яка оновлює кольори на сторінці
function updateTheme() {
    // Дістаю збережений колір з пам'яті браузера, а якщо там порожньо — беру стандартний рудий
    const theme = localStorage.getItem('marsTheme') || '#ff5722';
    
    // Словник: під кожен колір акценту підбираю відповідний темний фон
    const bgColors = {
        "#ff5722": "#0a0400", // Для рудого — майже чорний з відтінком
        "#00d4ff": "#00050a", // Для блакитного
        "#4caf50": "#020a02", // Для зеленого
        "#e91e63": "#0a0005"  // Для рожевого
    };
            
    // Закидаю вибрані кольори прямо в змінні CSS
    document.documentElement.style.setProperty('--accent', theme);
    document.documentElement.style.setProperty('--border', theme + "66"); // Додаю прозорість для рамок
    document.documentElement.style.setProperty('--bg', bgColors[theme] || "#050200");
            
    // Розбираю HEX-код кольору на цифри (RGB), щоб зробити м'яке світіння через rgba
    const r = parseInt(theme.slice(1,3), 16), 
          g = parseInt(theme.slice(3,5), 16), 
          b = parseInt(theme.slice(5,7), 16);
    
    // Ставлю це світіння в CSS змінну --glow
    document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b}, 0.2)`);
}

// Запускаю оновлення теми відразу при завантаженні
updateTheme();

// Вішаю прослуховувач: якщо тема зміниться в іншому вікні/вкладці, вона оновиться і тут автоматично
window.addEventListener('storage', updateTheme);
 