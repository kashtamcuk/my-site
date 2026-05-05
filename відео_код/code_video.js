

function updateTheme() {
    const theme = localStorage.getItem('marsTheme') || '#ff5722';
    const bgColors = {
        "#ff5722": "#0a0400",
        "#00d4ff": "#00050a",
        "#4caf50": "#020a02",
        "#e91e63": "#0a0005"
    };
            
    document.documentElement.style.setProperty('--accent', theme);
    document.documentElement.style.setProperty('--border', theme + "66");
    document.documentElement.style.setProperty('--bg', bgColors[theme] || "#050200");
            
    const r = parseInt(theme.slice(1,3), 16), g = parseInt(theme.slice(3,5), 16), b = parseInt(theme.slice(5,7), 16);
    document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b}, 0.2)`);
}

updateTheme();
window.addEventListener('storage', updateTheme);
 