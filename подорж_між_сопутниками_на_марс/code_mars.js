
let questions = [
            { 
                q: "Чому Марс називають «Червоною планетою»?", 
                options: ["Через високу температуру", "Через оксид заліза (іржу)", "Через червоні рослини", "Це колір атмосфери"], 
                correctAnswer: "Через оксид заліза (іржу)", 
                fact: "Поверхня Марса вкрита реголітом, багатим на залізо, яке окислюється і надає планеті характерного іржавого кольору.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact1.mp3" 
            },
            { 
                q: "Як називається найвища гора Марса (та всієї Сонячної системи)?", 
                options: ["Еверест", "Гора Стікні", "Олімп", "Марінер"], 
                correctAnswer: "Олімп", 
                fact: "Олімп — це згаслий вулкан висотою понад 21 км, що втричі вище за Еверест.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact2.mp3" 
            },
            { 
                q: "Скільки часу триває один рік на Марсі?", 
                options: ["365 днів", "687 днів", "120 днів", "2 роки"], 
                correctAnswer: "687 днів", 
                fact: "Марс знаходиться далі від Сонця, тому йому потрібно майже вдвічі більше часу, ніж Землі, щоб зробити повний оберт.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact3.mp3" 
            },
            { 
                q: "Який газ складає 95% атмосфери Марса?", 
                options: ["Кисень", "Азот", "Вуглекислий газ", "Метан"], 
                correctAnswer: "Вуглекислий газ", 
                fact: "Атмосфера Марса дуже розріджена і складається переважно з CO2, що робить дихання без скафандра неможливим.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact4.mp3" 
            },
            { 
                q: "Яка гравітація на Марсі порівняно із земною?", 
                options: ["Така сама", "У 2 рази сильніша", "Приблизно 38% від земної", "Гравітації немає"], 
                correctAnswer: "Приблизно 38% від земної", 
                fact: "Через меншу масу планети, на Марсі ви могли б стрибнути у три рази вище, ніж на Землі.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact5.mp3" 
            },
            { 
                q: "Як називаються два супутники Марса?", 
                options: ["Місяць та Сонце", "Фобос та Деймос", "Титан та Європа", "Іо та Каллісто"], 
                correctAnswer: "Фобос та Деймос", 
                fact: "Їхні назви перекладаються з грецької як «Страх» та «Жах» — вічні супутники бога війни Ареса.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact6.mp3" 
            },
            { 
                q: "Як називається грандіозна система каньйонів на Марсі?", 
                options: ["Великий каньйон", "Долина Марінера", "Рівнина Утопія", "Затока Райдуги"], 
                correctAnswer: "Долина Марінера", 
                fact: "Це найбільший каньйон у Сонячній системі. Він у 10 разів довший і в 3 рази глибший за Великий каньйон у США.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact7.mp3" 
            },
            { 
                q: "Яка середня температура на поверхні Марса?", 
                options: ["+20°C", "-63°C", "+100°C", "-150°C"], 
                correctAnswer: "-63°C", 
                fact: "Хоча вдень на екваторі може бути +20°C, вночі температура падає до екстремальних -125°C.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact8.mp3" 
            },
            { 
                q: "Що знаходиться на полюсах Марса?", 
                options: ["Активні вулкани", "Крижані шапки", "Ліси", "Океани рідкої води"], 
                correctAnswer: "Крижані шапки", 
                fact: "Вони складаються із суміші водяного льоду та замерзлого вуглекислого газу (сухого льоду).",
                audio: "подорж_між_сопутниками_на_марс/mars_fact9.mp3" 
            },
            { 
                q: "Яка тривалість марсіанської доби (сола)?", 
                options: ["12 годин", "24 години 37 хвилин", "48 годин", "10 годин"], 
                correctAnswer: "24 години 37 хвилин", 
                fact: "Марсіанська доба дуже схожа на земну, тому колоністам буде легше адаптувати свій біологічний годинник.",
                audio: "подорж_між_сопутниками_на_марс/mars_fact10.mp3" 
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
            // Пріоритет кольору для Марса, якщо не задано в налаштуваннях
            const themeColor = localStorage.getItem('marsTheme') || '#ff4d00';
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
                localStorage.setItem('mars_complete', 'true');
                document.getElementById('quiz-box').innerHTML = `
                    <h2 style="color:var(--accent); text-align:center; font-family:Orbitron; margin-top:20px;">MARS SYNC SUCCESS</h2>
                    <p style="text-align:center; margin: 30px 0; font-size:1.2rem;">Базова синхронізація завершена. Ласкаво просимо на Червону планету.</p>
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
    