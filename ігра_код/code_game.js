
        const music = document.getElementById('bgMusic');
        const mCtrl = document.getElementById('music-control');
        const deniedMsg = document.getElementById('access-denied');

        function updateTheme() {
            const themeColor = localStorage.getItem('marsTheme') || '#00d4ff';
            document.documentElement.style.setProperty('--accent', themeColor);
            
            const r = parseInt(themeColor.slice(1, 3), 16);
            const g = parseInt(themeColor.slice(3, 5), 16);
            const b = parseInt(themeColor.slice(5, 7), 16);
            document.documentElement.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.25)`);
        }

        function checkProgression() {
            const phobosDone = localStorage.getItem('phobos_complete') === 'true';
            const deimosDone = localStorage.getItem('deimos_complete') === 'true';

            const deimosNode = document.getElementById('deimos');
            const marsNode = document.getElementById('mars');

            if (!phobosDone) deimosNode.classList.add('locked');
            else deimosNode.classList.remove('locked');

            if (!deimosDone) marsNode.classList.add('locked');
            else marsNode.classList.remove('locked');
        }

        function showDenied() {
            deniedMsg.style.display = 'block';
            setTimeout(() => deniedMsg.style.display = 'none', 2000);
        }

        function updateVolume() {
            const vol = localStorage.getItem('marsVol') || 70;
            music.volume = vol / 100;
        }

        mCtrl.onclick = () => {
            if (music.paused) {
                music.play();
                mCtrl.innerText = "🔊";
            } else {
                music.pause();
                mCtrl.innerText = "🔇";
            }
        };

        window.onload = () => {
            updateTheme();
            checkProgression();
            updateVolume();
            setInterval(() => {
                document.getElementById('os-clock').innerText = new Date().toLocaleTimeString();
            }, 1000);
            
            document.querySelectorAll('.node').forEach(node => {
                node.addEventListener('click', (e) => {
                    if (node.classList.contains('locked')) {
                        e.preventDefault();
                        showDenied();
                    }
                });

                node.onmouseenter = () => {
                    if (!node.classList.contains('locked')) {
                        const s = new Audio('загальна_озвучка/click-effect.mp3');
                        s.volume = (localStorage.getItem('marsVol') || 70) / 400; // Тихіше ніж музика
                        s.play().catch(()=>{});
                    }
                };
            });
        };

        document.addEventListener('click', () => {
            if (music.paused) {
                updateVolume();
                music.play().catch(()=>{});
            }
        }, { once: true });

        window.addEventListener('storage', (e) => {
            if (e.key === 'marsTheme') updateTheme();
            if (e.key === 'marsVol') updateVolume();
            checkProgression();
        });
   