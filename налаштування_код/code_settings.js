   
        const bgMusic = new Audio('загальна_озвучка/fon_menu.mp3');
        bgMusic.loop = true;

        function playClickSound() {
            const clickSnd = new Audio('загальна_озвучка/click-effect.mp3');
            clickSnd.volume = (localStorage.getItem('marsVol') || 70) / 100;
            clickSnd.play().catch(()=>{});
        }

        function adjustVolume(val) {
            bgMusic.volume = (val / 100) * 0.5;
            document.getElementById('log').innerText = `AUDIO_GAIN_SET_TO: ${val}dB`;
        }

        const bgColors = {
            "#ff5722": "#1a0800",
            "#00d4ff": "#000a1a",
            "#4caf50": "#051a05",
            "#e91e63": "#1a0008"
        };

        window.onload = function() {
            const theme = localStorage.getItem('marsTheme') || '#ff5722';
            const fx = localStorage.getItem('marsFX') !== 'false';
            const vol = localStorage.getItem('marsVol') || '70';
            
            document.getElementById('colorTheme').value = theme;
            document.getElementById('checkFX').checked = fx;
            document.getElementById('volume').value = vol;

            updateThemePreview(theme);
            toggleFX();
            
            document.querySelectorAll('button, select, input').forEach(el => {
                el.addEventListener('click', playClickSound);
            });
        };

        function updateThemePreview(color) {
            document.documentElement.style.setProperty('--accent-color', color);
            const darkBg = bgColors[color] || "#000";
            document.getElementById('bg').style.backgroundColor = darkBg;
            const r = parseInt(color.slice(1,3), 16), g = parseInt(color.slice(3,5), 16), b = parseInt(color.slice(5,7), 16);
            document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b}, 0.3)`);
        }

        function toggleFX() {
            const isChecked = document.getElementById('checkFX').checked;
            document.getElementById('fx').style.display = isChecked ? 'block' : 'none';
        }

        function saveAndExit() {
            localStorage.setItem('marsTheme', document.getElementById('colorTheme').value);
            localStorage.setItem('marsFX', document.getElementById('checkFX').checked);
            localStorage.setItem('marsVol', document.getElementById('volume').value);
            localStorage.setItem('marsLang', document.getElementById('lang').value);

            document.getElementById('log').innerText = "UPDATING_CORE_REGISTRY...";
            setTimeout(() => { window.location.href = 'index.html'; }, 800);
        }

        document.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.volume = (localStorage.getItem('marsVol') || 70) / 200;
                bgMusic.play().catch(() => {});
            }
        }, { once: true });
