
        const questions = [
            { q: "Яка головна візуальна відмінність Деймоса від Фобоса?", options: ["Має яскраво-червоний колір", "На ньому зовсім немає кратерів", "Поверхня набагато гладкіша через пил", "Має ідеальну кулясту форму"], correctAnswer: "Поверхня набагато гладкіша через пил", fact: "На Деймосі шар пилу (реголіту) ховає нерівності кратерів, роблячи його поверхню гладкою.", audio: "подорж_між_сопутниками_на_марс/deimos1.mp3" },
            { q: "Яка доля чекає на Деймос у далекому майбутньому?", options: ["Впаде на Марс", "Поступово віддаляється від планети", "Перетвориться на кільце", "Зіткнеться з Сонцем"], correctAnswer: "Поступово віддаляється від планети", fact: "Деймос знаходиться вище критичної позначки і поступово летить геть від Марса.", audio: "подорж_між_сопутниками_на_марс/deimos2.mp3" },
            { q: "Скільки часу потрібно Деймосу для одного оберту?", options: ["7 годин", "Приблизно 30 годин", "88 днів", "1 годину"], correctAnswer: "Приблизно 30 годин", fact: "Один оберт триває близько 1.26 доби.", audio: "подорж_між_сопутниками_на_марс/deimos3.mp3" },
            { q: "Хто офіційно відкрив Деймос у 1877 році?", options: ["Нікола Тесла", "Йоганн Кеплер", "Асаф Голл", "Галілео Галілей"], correctAnswer: "Асаф Голл", fact: "Асаф Голл відкрив обидва супутники Марса у серпні 1877 року.", audio: "подорж_між_сопутниками_на_марс/deimos4.mp3" },
            { q: "Що означає назва «Деймос»?", options: ["Жах", "Темрява", "Швидкість", "Камінь"], correctAnswer: "Жах", fact: "Деймос перекладається як 'Жах' — вірний супутник бога війни.", audio: "подорж_між_сопутниками_на_марс/deimos5.mp3" },
            { q: "Який приблизний діаметр цього супутника?", options: ["Понад 100 км", "Близько 12 км", "1 метр", "3474 км"], correctAnswer: "Близько 12 км", fact: "Це один із найдрібніших супутників — його радіус лише 6.2 км.", audio: "подорж_між_сопутниками_на_марс/deimos6.mp3" }
        ];

        let currentIdx = 0;
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
            
            // Завантаження теми та гучності
            const themeColor = localStorage.getItem('marsTheme') || '#00d4ff';
            document.documentElement.style.setProperty('--accent', themeColor);
            document.documentElement.style.setProperty('--glow', themeColor + '40');

            const userVol = (localStorage.getItem('marsVol') || 70) / 100;
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

            // Озвучка та показ факту
            document.getElementById('fact-text').innerText = data.fact;
            document.getElementById('fact-box').style.display = 'block';
            
            factAudio.src = data.audio;
            factAudio.play().catch(()=>{});
            
            document.getElementById('next-button').style.display = 'block';
        }

        function handleNext() {
            // МИТТЄВА ЗУПИНКА ПОПЕРЕДНЬОГО ЗВУКУ
            factAudio.pause();
            factAudio.currentTime = 0;

            if (currentIdx < questions.length - 1) {
                currentIdx++;
                showQuestion();
            } else {
                localStorage.setItem('deimos_complete', 'true');
                document.getElementById('quiz-box').innerHTML = `
                    <h2 style="color:var(--accent); text-align:center; font-family:Orbitron;">DEIMOS SYNC SUCCESS</h2>
                    <p style="text-align:center; margin: 20px 0;">Усі дані супутника Жаху успішно дешифровано.</p>
                    <button class="next-btn" style="display:block" onclick="window.location.href='game.html'">Return to Bridge</button>
                `;
                document.body.classList.add('global-correct');
            }
        }

        window.onload = init;
