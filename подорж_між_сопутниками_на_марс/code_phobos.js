
        let questions = [
            { 
                q: "Яке походження Фобоса найбільш імовірним?", 
                options: ["Уламок Землі", "Захоплений астероїд", "Частина Марса", "Згасла комета"], 
                correctAnswer: "Захоплений астероїд", 
                fact: "Фобос дуже схожий на астероїди C-типу. Вважається, що Марс захопив його своєю гравітацією з поясу астероїдів.",
                audio: "подорж_між_сопутниками_на_марс/fact1.mp3" 
            },
            { 
                q: "Яка доля чекає на Фобос через 30-50 млн років?", 
                options: ["Вилетить у космос", "Розпадеться у кільце", "Зіткнеться з Деймосом", "Вибухне"], 
                correctAnswer: "Розпадеться у кільце", 
                fact: "Фобос поступово наближається до Марса. Сили тяжіння розірвуть його, створивши кільце навколо планети.",
                audio: "подорж_між_сопутниками_на_марс/fact2.mp3" 
            },
            { 
                q: "Як називається найбільший ударний кратер на Фобосі?", 
                options: ["Олімп", "Стікні", "Кассіні", "Марінер"], 
                correctAnswer: "Стікні", 
                fact: "Кратер Стікні настільки великий (9 км), що удар, який його створив, ледь не розколов увесь супутник.",
                audio: "подорж_між_сопутниками_на_марс/fact3.mp3" 
            },
            { 
                q: "За який час Фобос робить повний оберт навколо Марса?", 
                options: ["24 години", "30 днів", "7 годин 39 хвилин", "12 годин"], 
                correctAnswer: "7 годин 39 хвилин", 
                fact: "Фобос обертається швидше, ніж сам Марс навколо своєї осі, тому він сходить і заходить двічі на марсіанську добу.",
                audio: "подорж_між_сопутниками_на_марс/fact4.mp3" 
            }
        ];

        let currentIdx = 0;
        const bgMusic = document.getElementById('bg-music');
        const factAudio = document.getElementById('fact-player');
        const sfxCorrect = document.getElementById('sfx-correct');
        const sfxError = document.getElementById('sfx-error');
        const mainCard = document.getElementById('main-card');

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function init() {
            shuffle(questions);
            const themeColor = localStorage.getItem('marsTheme') || '#00d4ff';
            document.documentElement.style.setProperty('--accent', themeColor);
            document.documentElement.style.setProperty('--glow', themeColor + '40');

            const userVol = (localStorage.getItem('marsVol') || 70) / 100;
            bgMusic.volume = userVol * 0.2;
            factAudio.volume = userVol;
            sfxCorrect.volume = userVol;
            sfxError.volume = userVol;

            showQuestion();
        }

        function showQuestion() {
            const data = questions[currentIdx];
            document.getElementById('question').innerText = data.q;
            document.getElementById('counter').innerText = `КРОК: ${currentIdx + 1} / ${questions.length}`;
            document.getElementById('progress-fill').style.width = ((currentIdx + 1) / questions.length * 100) + "%";
            
            const optionsBox = document.getElementById('options-container');
            optionsBox.innerHTML = '';
            
            shuffle([...data.options]).forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = `> ${opt}`;
                btn.onclick = () => checkChoice(opt, btn);
                optionsBox.appendChild(btn);
            });

            document.getElementById('next-button').style.display = 'none';
            document.getElementById('fact-box').style.display = 'none';
            document.body.classList.remove('global-correct', 'global-wrong');
            mainCard.classList.remove('shake');
        }

        function checkChoice(selectedText, btn) {
            const data = questions[currentIdx];
            const allBtns = document.querySelectorAll('.option-btn');
            allBtns.forEach(b => b.disabled = true);

            if (selectedText.includes(data.correctAnswer)) {
                btn.classList.add('correct');
                document.body.classList.add('global-correct');
                sfxCorrect.play().catch(()=>{});
            } else {
                btn.classList.add('wrong');
                document.body.classList.add('global-wrong');
                mainCard.classList.add('shake');
                sfxError.play().catch(()=>{});
                allBtns.forEach(b => {
                    if(b.innerText.includes(data.correctAnswer)) b.classList.add('correct');
                });
            }

            document.getElementById('fact-text').innerText = data.fact;
            document.getElementById('fact-box').style.display = 'block';
            
            factAudio.src = data.audio;
            setTimeout(() => {
                factAudio.play().catch(()=>{});
                document.getElementById('next-button').style.display = 'block';
            }, 400);
        }

        function handleNext() {
            factAudio.pause();
            factAudio.currentTime = 0;

            if (currentIdx < questions.length - 1) {
                currentIdx++;
                showQuestion();
            } else {
                localStorage.setItem('phobos_complete', 'true');
                document.getElementById('quiz-box').innerHTML = `
                    <h2 style="color:var(--accent); text-align:center; font-family:Orbitron; margin-top:20px;">PHOBOS SYNC SUCCESS</h2>
                    <p style="text-align:center; margin: 30px 0; font-size:1.2rem;">Протокол завершено. Дані про внутрішній супутник додано до бази.</p>
                    <button class="next-btn" style="display:block" onclick="window.location.href='game.html'">Return to Bridge</button>
                `;
                document.body.classList.add('global-correct');
            }
        }

        document.getElementById('music-ui').onclick = () => {
            if (bgMusic.paused) { bgMusic.play(); document.getElementById('music-ui').innerText = "🔊"; }
            else { bgMusic.pause(); document.getElementById('music-ui').innerText = "🔇"; }
        };

        document.addEventListener('click', () => { if (bgMusic.paused) bgMusic.play().catch(()=>{}); }, { once: true });
        window.onload = init;
   