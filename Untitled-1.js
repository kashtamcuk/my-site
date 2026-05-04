function applyGlobalSettings() {
    const bgColors = {
        "#ff5722": "#1a0800",
        "#00d4ff": "#000a1a",
        "#4caf50": "#051a05",
        "#e91e63": "#1a0008"
    };

    const theme = localStorage.getItem('marsTheme') || '#ff5722';
    const fx = localStorage.getItem('marsFX') !== 'false';
    const darkBg = bgColors[theme] || "#000000";

    // Міняємо акцентний колір (текст/рамки)
    document.documentElement.style.setProperty('--accent-color', theme);
    
    // Міняємо фон меню
    document.body.style.background = `radial-gradient(circle at center, ${darkBg} 0%, #000 100%)`;
    
    // Вмикаємо/вимикаємо ефекти ліній, якщо є блок з класом .scanlines
    const fxBlock = document.querySelector('.scanlines');
    if (fxBlock) {
        fxBlock.style.display = fx ? 'block' : 'none';
    }
}

// Запускаємо при завантаженні
window.onload = applyGlobalSettings;