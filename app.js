// Главный файл app.js - Исправленная версия с адаптивной навигацией
const app = () => {
    // Сразу создаем базовую структуру
    document.body.innerHTML = `
        <div id="app">
            <div class="loading-screen">
                <div class="heart-loader">❤️</div>
                <p>Готовлю сюрприз...</p>
                <div class="loading-hearts"></div>
            </div>
            <canvas id="fireworks"></canvas>
            <div id="particles-container"></div>
            <div class="mobile-menu-btn">☰</div>
        </div>
    `;

    // Встроенные стили CSS
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #f9f0ff 0%, #fff0f5 100%);
            min-height: 100vh;
            overflow-x: hidden;
            color: #5a3d5c;
        }
        
        #app {
            position: relative;
            min-height: 100vh;
        }
        
        #fireworks {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
            display: none;
        }
        
        #particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .falling-heart {
            position: absolute;
            font-size: 20px;
            animation: fall 5s linear forwards;
            opacity: 0.8;
        }
        
        @keyframes fall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ff6b9d 0%, #ffc3a0 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .heart-loader {
            font-size: 60px;
            animation: heartbeat 1s infinite;
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .loading-screen p {
            color: white;
            font-size: 1.2em;
            margin-top: 10px;
        }
        
        .hidden {
            display: none !important;
        }
        
        /* Навигация для десктопа */
        .nav-container {
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 100;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            max-width: 300px;
            background: rgba(255,255,255,0.95);
            padding: 12px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(255,107,157,0.25);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,107,157,0.3);
        }
        
        .nav-btn {
            background: white;
            border: 2px solid #ff6b9d;
            color: #ff6b9d;
            padding: 10px 14px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav-btn:hover, .nav-btn.active {
            background: #ff6b9d;
            color: white;
            transform: scale(1.1);
            box-shadow: 0 4px 10px rgba(255,107,157,0.4);
        }
        
        /* Кнопка меню для мобильных */
        .mobile-menu-btn {
            display: none;
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 101;
            background: #ff6b9d;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255,107,157,0.4);
            transition: all 0.3s;
        }
        
        .mobile-menu-btn:hover {
            transform: scale(1.1);
        }
        
        /* Мобильное меню */
        .mobile-nav {
            display: none;
            position: fixed;
            top: 80px;
            right: 15px;
            z-index: 100;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            padding: 20px;
            max-width: 90vw;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .mobile-nav.active {
            display: block;
        }
        
        .mobile-nav-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        
        .mobile-nav-btn {
            background: white;
            border: 2px solid #ff6b9d;
            color: #ff6b9d;
            padding: 12px 5px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.3s;
            text-align: center;
            min-width: 50px;
        }
        
        .mobile-nav-btn:hover, .mobile-nav-btn.active {
            background: #ff6b9d;
            color: white;
        }
        
        .page {
            min-height: 100vh;
            padding: 90px 20px 40px;
            display: none;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 2;
        }
        
        .page.active {
            display: flex;
        }
        
        .page h1, .page h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #ff6b9d;
            width: 100%;
        }
        
        h1 {
            font-size: 2.5em;
            margin-bottom: 30px;
            padding: 0 15px;
        }
        
        h2 {
            font-size: 2em;
            margin-bottom: 25px;
            padding: 0 15px;
        }
        
        .content {
            max-width: 800px;
            width: 100%;
            text-align: center;
            line-height: 1.6;
            padding: 0 15px;
        }
        
        .heart {
            font-size: 2em;
            margin: 20px;
            animation: float 3s ease-in-out infinite;
            display: inline-block;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .message-box {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 20px 15px;
            max-width: 600px;
            border: 2px solid #ff6b9d;
            position: relative;
        }
        
        .message-box::before, .message-box::after {
            content: '💖';
            position: absolute;
            font-size: 20px;
        }
        
        .message-box::before {
            top: -10px;
            left: -10px;
        }
        
        .message-box::after {
            bottom: -10px;
            right: -10px;
        }
        
        .love-letter {
            font-style: italic;
            line-height: 1.8;
            text-align: left;
        }
        
        .love-letter p {
            margin: 15px 0;
            padding-left: 20px;
            position: relative;
        }
        
        .love-letter p::before {
            content: '❤️';
            position: absolute;
            left: -5px;
        }
        
        .memories-container, .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin: 30px 0;
            max-width: 1000px;
            padding: 0 10px;
        }
        
        .memory-card, .gallery-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            width: 180px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .memory-card:hover, .gallery-item:hover {
            transform: translateY(-5px);
        }
        
        .photo-frame {
            width: 250px;
            height: 250px;
            background: linear-gradient(45deg, #ffafbd, #ffc3a0);
            border-radius: 10px;
            margin: 30px 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .countdown {
            font-size: 2em;
            font-weight: bold;
            color: #ff6b9d;
            margin: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .wish-input {
            width: 90%;
            max-width: 300px;
            padding: 15px;
            border: 2px solid #ff6b9d;
            border-radius: 25px;
            font-size: 16px;
            margin: 20px;
            text-align: center;
            outline: none;
        }
        
        .wish-btn {
            background: #ff6b9d;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 18px;
            cursor: pointer;
            margin: 20px;
            transition: transform 0.3s;
        }
        
        .wish-btn:hover {
            transform: scale(1.05);
        }
        
        #wishMessage {
            margin-top: 20px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
        }
        
        .footer {
            text-align: center;
            padding: 30px 20px;
            margin-top: 40px;
            background: rgba(255,255,255,0.9);
            border-radius: 20px 20px 0 0;
            width: 100%;
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            h1 { 
                font-size: 1.8em; 
                margin-bottom: 20px;
                padding-top: 10px;
            }
            h2 { 
                font-size: 1.5em; 
                margin-bottom: 20px;
            }
            
            /* Прячем десктопную навигацию */
            .nav-container {
                display: none;
            }
            
            /* Показываем мобильную кнопку */
            .mobile-menu-btn {
                display: flex;
            }
            
            .page {
                padding: 80px 10px 30px;
            }
            
            .memory-card, .gallery-item {
                width: 45%;
                min-width: 140px;
                padding: 12px;
            }
            
            .photo-frame {
                width: 200px;
                height: 200px;
                margin: 20px;
            }
            
            .content {
                padding: 0 10px;
            }
            
            .message-box {
                margin: 15px 10px;
                padding: 20px;
            }
        }
        
        @media (max-width: 480px) {
            h1 { font-size: 1.6em; }
            h2 { font-size: 1.3em; }
            
            .memory-card, .gallery-item {
                width: 100%;
                max-width: 200px;
            }
            
            .mobile-nav-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .countdown {
                font-size: 1.5em;
            }
        }
        
        /* Для очень маленьких экранов */
        @media (max-width: 320px) {
            .mobile-nav {
                left: 10px;
                right: 10px;
                max-width: calc(100vw - 20px);
            }
            
            .mobile-nav-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    document.head.appendChild(style);

    // Страницы (оставляем те же самые, как в предыдущем коде)
    const pages = [
        {
            id: 'welcome',
            title: 'С Днем Рождения, Любимая!',
            content: `<div class="content">
                <h1>💖 С Днем Рождения, Моя Невозможная! 💖</h1>
                <div class="heart">❤️</div>
                <p>Сегодня твой особенный день — день, когда весь мир стал светлее с твоим появлением!</p>
                <p>Ты — самое прекрасное, что случилось в моей жизни, и сегодня я хочу сказать тебе все, что накопилось в моем сердце.</p>
                <div style="font-size: 3em; margin: 30px;">🎂✨🎉</div>
            </div>`
        },
        {
            id: 'letter',
            title: 'Письмо от всего сердца',
            content: `<div class="message-box">
                <h2>📜 Мое письмо к тебе</h2>
                <div class="love-letter">
                    <p>Моя дорогая, родная, единственная...</p>
                    <p>Каждое утро, просыпаясь, я благодарю судьбу за то, что ты есть в моей жизни.</p>
                    <p>Твоя улыбка — это солнце, которое освещает даже самые пасмурные дни.</p>
                    <p>Твой смех — самая красивая музыка, которую я когда-либо слышал.</p>
                    <p>Твои глаза — это целые вселенные, в которые я готов смотреть вечность.</p>
                    <p>С тобой я понял, что такое настоящее счастье. Ты делаешь меня лучше с каждым днем.</p>
                    <p>Я люблю тебя больше, чем все слова в мире могут выразить.</p>
                    <p>Твой навсегда...</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <div class="heart">💌</div>
                </div>
            </div>`
        },
        {
            id: 'memories',
            title: 'Наши прекрасные моменты',
            content: `<div class="content">
                <h2>📸 Моменты, которые я храню в сердце</h2>
                <p>Каждая секунда с тобой — это маленькое чудо, которое я бережно храню в памяти.</p>
                <div class="memories-container">
                    <div class="memory-card">
                        <h3>Первая встреча ✨</h3>
                        <p>Тот день, когда все изменилось...</p>
                    </div>
                    <div class="memory-card">
                        <h3>Первый смех 😄</h3>
                        <p>Звук, от которого тает сердце</p>
                    </div>
                    <div class="memory-card">
                        <h3>Первое "люблю" 💕</h3>
                        <p>Слова, изменившие все</p>
                    </div>
                    <div class="memory-card">
                        <h3>Наши прогулки 🌸</h3>
                        <p>Рука в руке, сердце к сердцу</p>
                    </div>
                </div>
            </div>`
        },
        {
            id: 'reasons',
            title: '100 причин любить тебя',
            content: `<div class="content">
                <h2>💝 Почему я люблю тебя</h2>
                <p>Я мог бы перечислять причины вечно, но вот лишь некоторые из них:</p>
                <div class="gallery">
                    ${['Твоя улыбка', 'Твоя душа', 'Твой ум', 'Твоя забота', 'Твоя поддержка', 'Твоя красота']
                        .map((reason, i) => `
                        <div class="gallery-item">
                            <h3>${i + 1}</h3>
                            <p>${reason}</p>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 30px;">...и еще 94 причины в моем сердце! 💖</p>
            </div>`
        },
        {
            id: 'promises',
            title: 'Мои обещания',
            content: `<div class="message-box">
                <h2>🤝 Мои обещания тебе</h2>
                <div class="love-letter">
                    <p><strong>Я обещаю...</strong></p>
                    <p>💖 Всегда быть рядом с тобой</p>
                    <p>💖 Поддерживать во всем</p>
                    <p>💖 Любить сильнее с каждым днем</p>
                    <p>💖 Делать тебя счастливой</p>
                    <p>💖 Уважать твои мечты</p>
                    <p>💖 Быть твоей опорой</p>
                    <p>💖 Создавать воспоминания</p>
                    <p>💖 Ценить каждое мгновение</p>
                </div>
            </div>`
        },
        {
            id: 'future',
            title: 'Наше будущее',
            content: `<div class="content">
                <h2>🌟 Наше светлое будущее</h2>
                <div class="photo-frame">🏡</div>
                <p>Я вижу наше будущее ярким и счастливым!</p>
                <div class="memories-container">
                    <div class="memory-card"><h3>Путешествия ✈️</h3><p>Вместе по миру</p></div>
                    <div class="memory-card"><h3>Наш дом 🏠</h3><p>Уютное гнездышко</p></div>
                    <div class="memory-card"><h3>Мечты 🌠</h3><p>Вместе к целям</p></div>
                </div>
            </div>`
        },
        {
            id: 'gifts',
            title: 'Мои подарки',
            content: `<div class="content">
                <h2>🎁 Подарки от сердца</h2>
                <div class="gallery">
                    ${['Любовь', 'Забота', 'Верность', 'Радость', 'Поддержка', 'Счастье']
                        .map((gift, i) => `
                        <div class="gallery-item">
                            <h3>🎀</h3>
                            <p>${gift}</p>
                        </div>
                    `).join('')}
                </div>
            </div>`
        },
        {
            id: 'qualities',
            title: 'Твои качества',
            content: `<div class="content">
                <h2>✨ Твои лучшие качества</h2>
                <div class="memories-container">
                    ${['Доброта', 'Ум', 'Красота', 'Юмор', 'Мудрость', 'Сила']
                        .map(quality => `
                        <div class="memory-card">
                            <h3>⭐</h3>
                            <p>${quality}</p>
                        </div>
                    `).join('')}
                </div>
            </div>`
        },
        {
            id: 'song',
            title: 'Песня для тебя',
            content: `<div class="message-box">
                <h2>🎶 Мелодия моего сердца</h2>
                <div class="love-letter">
                    <p>Ты — самая прекрасная симфония,</p>
                    <p>Которую когда-либо слышал этот мир.</p>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 3em;">🎵❤️🎵</div>
            </div>`
        },
        {
            id: 'countdown',
            title: 'До след. ДР',
            content: `<div class="content">
                <h2>⏳ До следующего Дня Рождения</h2>
                <div class="countdown" id="countdownTimer">Загрузка...</div>
                <p>Каждый день с тобой — это подарок!</p>
                <div class="photo-frame">📅</div>
            </div>`
        },
        {
            id: 'wishes',
            title: 'Желания',
            content: `<div class="content">
                <h2>🌠 Загадай желание!</h2>
                <input type="text" class="wish-input" placeholder="Твое желание..." id="wishInput">
                <button class="wish-btn" onclick="makeWish()">✨ Загадать ✨</button>
                <div id="wishMessage"></div>
            </div>`
        },
        {
            id: 'eternity',
            title: 'На вечность',
            content: `<div class="content">
                <h1>♾️ На вечность...</h1>
                <div style="font-size: 4em; margin: 30px;">∞</div>
                <p>Моя любовь к тебе вечна.</p>
            </div>`
        },
        {
            id: 'final',
            title: 'С любовью',
            content: `<div class="content">
                <h1>🎉 С Днем Рождения! 🎉</h1>
                <div style="font-size: 4em; margin: 30px;">🎂❤️✨</div>
                <div class="footer">
                    <h3>С бесконечной любовью,</h3>
                    <h2 style="color: #ff6b9d;">Твой верный парень</h2>
                    <p>💖 Люблю тебя больше жизни 💖</p>
                </div>
            </div>`
        }
    ];

    // Простые анимации
    const createFallingHearts = () => {
        const container = document.getElementById('particles-container');
        const hearts = ['❤️', '💕', '💖', '💗'];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const heart = document.createElement('div');
                heart.className = 'falling-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
                heart.style.opacity = Math.random() * 0.5 + 0.3;
                
                container.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }
        }, 800);
    };

    // Быстрая инициализация
    const init = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        
        // Быстрая загрузка - всего 0.8 секунды
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                renderApp();
                setTimeout(createFallingHearts, 500);
            }, 300);
        }, 800);
    };

    // Рендер приложения
    const renderApp = () => {
        const appDiv = document.getElementById('app');
        
        // Десктопная навигация
        const desktopNav = document.createElement('div');
        desktopNav.className = 'nav-container';
        
        pages.forEach((page, index) => {
            const btn = document.createElement('button');
            btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = `${index + 1}`;
            btn.title = page.title;
            btn.onclick = () => {
                showPage(index);
                closeMobileMenu();
            };
            desktopNav.appendChild(btn);
        });
        
        // Мобильная навигация
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        const mobileGrid = document.createElement('div');
        mobileGrid.className = 'mobile-nav-grid';
        
        pages.forEach((page, index) => {
            const btn = document.createElement('button');
            btn.className = `mobile-nav-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = `${index + 1}. ${page.title}`;
            btn.onclick = () => {
                showPage(index);
                closeMobileMenu();
            };
            mobileGrid.appendChild(btn);
        });
        
        mobileNav.appendChild(mobileGrid);
        
        // Контейнер для страниц
        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages-container';
        
        pages.forEach((page, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = `page ${index === 0 ? 'active' : ''}`;
            pageDiv.id = `page-${page.id}`;
            pageDiv.innerHTML = page.content;
            pagesContainer.appendChild(pageDiv);
        });
        
        // Добавляем всё в DOM
        appDiv.appendChild(desktopNav);
        appDiv.appendChild(mobileNav);
        appDiv.appendChild(pagesContainer);
        
        // Инициализируем функции
        initFunctions();
        
        // Обработчик кнопки меню
        const menuBtn = document.querySelector('.mobile-menu-btn');
        menuBtn.onclick = toggleMobileMenu;
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    };

    // Функции мобильного меню
    const toggleMobileMenu = () => {
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.classList.remove('active');
    };

    // Остальные функции
    const initFunctions = () => {
        // Таймер обратного отсчета
        const updateCountdown = () => {
            const countdownEl = document.getElementById('countdownTimer');
            if (!countdownEl) return;
            
            const now = new Date();
            const nextYear = now.getFullYear() + 1;
            const targetDate = new Date(nextYear, now.getMonth(), now.getDate() + 1);
            
            const diff = targetDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdownEl.innerHTML = `
                <div>${days} дней</div>
                <div style="font-size: 0.6em; margin-top: 10px;">${hours}ч ${minutes}м ${seconds}с</div>
            `;
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Функция для загадывания желания
        window.makeWish = () => {
            const input = document.getElementById('wishInput');
            const message = document.getElementById('wishMessage');
            
            if (input && input.value.trim()) {
                const wish = input.value.trim();
                message.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 3em; margin: 10px;">✨🌟✨</div>
                        <h3 style="color: #ff6b9d;">Желание принято!</h3>
                        <p>"${wish}"</p>
                        <p>Я сделаю все для его исполнения! 💪</p>
                    </div>
                `;
                
                input.value = '';
                input.style.transform = 'scale(1.1)';
                setTimeout(() => input.style.transform = 'scale(1)', 300);
            }
        };
        
        // Автопрокрутка страниц
        let currentPage = 0;
        const autoScroll = setInterval(() => {
            currentPage = (currentPage + 1) % pages.length;
            showPage(currentPage);
        }, 30000);
    };

    const showPage = (index) => {
        // Обновляем активные кнопки
        document.querySelectorAll('.nav-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        document.querySelectorAll('.mobile-nav-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        // Обновляем активную страницу
        document.querySelectorAll('.page').forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        
        // Плавная прокрутка вверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Закрываем мобильное меню
        closeMobileMenu();
    };

    // Запускаем приложение
    init();
};

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', app);
} else {
    app();
}