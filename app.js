// Главный файл app.js - Полностью готовый вариант
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
        </div>
    `

	// Встроенные стили CSS
	const style = document.createElement('style')
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
        
        .nav-container {
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 100;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            max-width: 300px;
            background: rgba(255,255,255,0.9);
            padding: 10px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(255,107,157,0.2);
        }
        
        .nav-btn {
            background: white;
            border: 2px solid #ff6b9d;
            color: #ff6b9d;
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.3s;
        }
        
        .nav-btn:hover, .nav-btn.active {
            background: #ff6b9d;
            color: white;
            transform: scale(1.1);
        }
        
        .page {
            min-height: 100vh;
            padding: 80px 20px 40px;
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
        }
        
        h2 {
            font-size: 2em;
            margin-bottom: 25px;
        }
        
        .content {
            max-width: 800px;
            width: 100%;
            text-align: center;
            line-height: 1.6;
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
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 20px;
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
            gap: 20px;
            margin: 30px 0;
            max-width: 1000px;
        }
        
        .memory-card, .gallery-item {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 200px;
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
            margin: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .countdown {
            font-size: 2.5em;
            font-weight: bold;
            color: #ff6b9d;
            margin: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .wish-input {
            width: 300px;
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
            padding: 15px 40px;
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
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            margin-top: 40px;
            background: rgba(255,255,255,0.9);
            border-radius: 20px 20px 0 0;
            width: 100%;
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            .nav-container {
                top: 10px;
                right: 10px;
                padding: 8px;
                max-width: 250px;
            }
            .nav-btn {
                padding: 6px 10px;
                font-size: 11px;
            }
            .page {
                padding: 70px 15px 30px;
            }
            .memory-card, .gallery-item {
                width: 150px;
                padding: 15px;
            }
        }
    `
	document.head.appendChild(style)

	// Полностью наполненные страницы
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
            </div>`,
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
            </div>`,
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
                    <div class="memory-card">
                        <h3>Тихие вечера 🕯️</h3>
                        <p>Когда весь мир останавливается</p>
                    </div>
                    <div class="memory-card">
                        <h3>Общие мечты 🌠</h3>
                        <p>Планы на наше будущее</p>
                    </div>
                </div>
            </div>`,
		},
		{
			id: 'reasons',
			title: '100 причин любить тебя',
			content: `<div class="content">
                <h2>💝 Почему я люблю тебя</h2>
                <p>Я мог бы перечислять причины вечно, но вот лишь некоторые из них:</p>
                <div class="gallery">
                    ${[
											'Твоя невероятная улыбка',
											'Твоя добрая душа',
											'Твой ум',
											'Твоя забота',
											'Твоя поддержка',
											'Твоя красота',
											'Твоя искренность',
											'Твое чувство юмора',
											'Твоя решительность',
											'Твоя нежность',
											'Твоя сила',
											'Твоя любовь',
										]
											.map(
												(reason, i) => `
                        <div class="gallery-item">
                            <h3>${i + 1}</h3>
                            <p>${reason}</p>
                        </div>
                    `,
											)
											.join('')}
                </div>
                <p style="margin-top: 30px;">...и еще 88 причин, которые не поместились здесь, но живут в моем сердце!</p>
            </div>`,
		},
		{
			id: 'promises',
			title: 'Мои вечные обещания',
			content: `<div class="message-box">
                <h2>🤝 Клятвы моего сердца</h2>
                <div class="love-letter">
                    <p><strong>Я обещаю...</strong></p>
                    <p>💖 Всегда быть рядом, в радости и в печали</p>
                    <p>💖 Поддерживать тебя во всех начинаниях</p>
                    <p>💖 Любить тебя сильнее с каждым днем</p>
                    <p>💖 Делать тебя счастливой каждую секунду</p>
                    <p>💖 Уважать твои мечты и помогать им сбываться</p>
                    <p>💖 Быть твоей опорой и защитой</p>
                    <p>💖 Создавать с тобой новые прекрасные воспоминания</p>
                    <p>💖 Ценить каждое мгновение, проведенное вместе</p>
                    <p>💖 Любить тебя вечно, без условий и оговорок</p>
                </div>
            </div>`,
		},
		{
			id: 'future',
			title: 'Наше светлое будущее',
			content: `<div class="content">
                <h2>🌟 О чем я мечтаю с тобой</h2>
                <div class="photo-frame">
                    🏡
                </div>
                <p>Я вижу наше будущее ярким и счастливым!</p>
                <div class="memories-container">
                    <div class="memory-card">
                        <h3>Путешествия ✈️</h3>
                        <p>Открывать мир вместе</p>
                    </div>
                    <div class="memory-card">
                        <h3>Уютный дом 🏠</h3>
                        <p>Наше семейное гнездышко</p>
                    </div>
                    <div class="memory-card">
                        <h3>Новые горизонты 🌅</h3>
                        <p>Вместе покорять вершины</p>
                    </div>
                    <div class="memory-card">
                        <h3>Общие увлечения 🎨</h3>
                        <p>Находить новые хобби</p>
                    </div>
                </div>
                <p style="margin-top: 30px;">С тобой даже самые смелые мечты кажутся достижимыми!</p>
            </div>`,
		},
		{
			id: 'gifts',
			title: 'Подарки от сердца',
			content: `<div class="content">
                <h2>🎁 То, что я хочу дарить тебе всегда</h2>
                <p>Материальные подарки — это хорошо, но вот что действительно ценно:</p>
                <div class="gallery">
                    ${[
											'Бесконечную любовь',
											'Искреннюю заботу',
											'Душевное тепло',
											'Поддержку в мечтах',
											'Терпение и понимание',
											'Радость каждый день',
											'Верность навсегда',
											'Счастье в мелочах',
										]
											.map(
												(gift, i) => `
                        <div class="gallery-item">
                            <h3>🎀</h3>
                            <p>${gift}</p>
                        </div>
                    `,
											)
											.join('')}
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #fff0f5; border-radius: 10px;">
                    <p>💝 И конечно, много-много объятий, поцелуев и нежных слов!</p>
                </div>
            </div>`,
		},
		{
			id: 'qualities',
			title: 'Твои удивительные качества',
			content: `<div class="content">
                <h2>✨ Что делает тебя уникальной</h2>
                <p>Ты — собранное совершенство из лучших качеств:</p>
                <div class="memories-container">
                    ${[
											'Доброта',
											'Ум',
											'Красота',
											'Чувство юмора',
											'Мудрость',
											'Сила духа',
											'Чуткость',
											'Терпение',
											'Энергия',
											'Талантливость',
										]
											.map(
												quality => `
                        <div class="memory-card">
                            <h3>⭐</h3>
                            <p>${quality}</p>
                        </div>
                    `,
											)
											.join('')}
                </div>
                <div style="margin-top: 30px; font-size: 1.2em;">
                    <p>Ты — идеальное сочетание всего самого лучшего! 🌈</p>
                </div>
            </div>`,
		},
		{
			id: 'song',
			title: 'Песня для тебя',
			content: `<div class="message-box">
                <h2>🎶 Мелодия моего сердца</h2>
                <div class="love-letter">
                    <p>Если бы мне пришлось написать песню о тебе,</p>
                    <p>В ней были бы ноты твоего серебристого смеха,</p>
                    <p>Аккорды твоей нежности,</p>
                    <p>Ритм твоего сердца, бьющегося в унисон с моим,</p>
                    <p>И бесконечный припев любви, повторяющийся вечность.</p>
                    <p>Ты — самая прекрасная симфония,</p>
                    <p>Которую когда-либо слышал этот мир.</p>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 3em;">
                    🎵❤️🎵
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <p><em>"Любовь моя — ты музыка души моей"</em></p>
                </div>
            </div>`,
		},
		{
			id: 'countdown',
			title: 'До следующего Дня Рождения',
			content: `<div class="content">
                <h2>⏳ Следующий год с тобой</h2>
                <p>Я уже с нетерпением жду, когда мы будем отмечать твой следующий день рождения!</p>
                <div class="countdown" id="countdownTimer">
                    Загрузка...
                </div>
                <p>Каждый день с тобой — это подарок, но твой день рождения — особенный!</p>
                <div class="photo-frame">
                    📅
                </div>
                <p style="margin-top: 20px;">Обещаю, следующий год будет еще лучше!</p>
            </div>`,
		},
		{
			id: 'wishes',
			title: 'Загадай желание',
			content: `<div class="content">
                <h2>🌠 Загадай желание в день рождения!</h2>
                <p>В этот волшебный день все желания сбываются!</p>
                <input type="text" class="wish-input" placeholder="Напиши свое самое заветное желание..." id="wishInput">
                <button class="wish-btn" onclick="makeWish()">✨ Загадать желание ✨</button>
                <div id="wishMessage" style="margin-top: 20px;"></div>
                <div style="margin-top: 30px; font-size: 0.9em; color: #666;">
                    <p>Я обещаю сделать все возможное, чтобы оно сбылось! 💪</p>
                </div>
            </div>`,
		},
		{
			id: 'eternity',
			title: 'На вечность',
			content: `<div class="content">
                <h1>♾️ На вечность...</h1>
                <div style="font-size: 4em; margin: 30px;">∞</div>
                <p>Моя любовь к тебе не знает границ времени.</p>
                <p>Она существовала до нас и будет существовать вечно.</p>
                <p>Даже если все звезды погаснут,</p>
                <p>Даже если время остановится,</p>
                <p>Моя любовь к тебе останется.</p>
                <div style="margin-top: 40px; padding: 20px; background: rgba(255,107,157,0.1); border-radius: 15px;">
                    <p>Ты — моя вечность. Ты — мое всё.</p>
                </div>
            </div>`,
		},
		{
			id: 'final',
			title: 'С любовью...',
			content: `<div class="content">
                <h1>🎉 С Днем Рождения, Моя Любовь! 🎉</h1>
                <div style="font-size: 4em; margin: 30px;">
                    🎂❤️✨
                </div>
                <p>Пусть этот день будет наполнен смехом, радостью и любовью!</p>
                <p>Пусть каждый момент будет особенным и запоминающимся!</p>
                <p>Пусть все твои мечты сбываются, а планы реализуются!</p>
                <div class="footer">
                    <h3>С бесконечной любовью и обожанием,</h3>
                    <h2 style="color: #ff6b9d; margin: 20px;">Твой верный парень </h2>
                    <p style="margin-top: 20px; font-size: 1.2em;">
                        💖 Тот, кто любит тебя больше жизни 💖
                    </p>
                    <div style="margin-top: 30px; font-size: 2em;">
                        💕💞💓💗💖💝
                    </div>
                </div>
            </div>`,
		},
	]

	// Простые анимации
	const createFallingHearts = () => {
		const container = document.getElementById('particles-container')
		const hearts = ['❤️', '💕', '💖', '💗']

		setInterval(() => {
			if (Math.random() > 0.7) {
				// Реже для производительности
				const heart = document.createElement('div')
				heart.className = 'falling-heart'
				heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
				heart.style.left = Math.random() * 100 + '%'
				heart.style.fontSize = Math.random() * 15 + 15 + 'px'
				heart.style.opacity = Math.random() * 0.5 + 0.3

				container.appendChild(heart)
				setTimeout(() => heart.remove(), 5000)
			}
		}, 800)
	}

	// Быстрая инициализация
	const init = () => {
		const loadingScreen = document.querySelector('.loading-screen')
		const loadingHearts = document.querySelector('.loading-hearts')

		// Быстрые сердечки на экране загрузки
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const heart = document.createElement('div')
				heart.className = 'falling-heart'
				heart.textContent = '❤️'
				heart.style.left = Math.random() * 100 + '%'
				heart.style.animationDuration = '1.5s'
				loadingHearts.appendChild(heart)
			}, i * 300)
		}

		// Быстрая загрузка - всего 1 секунда
		setTimeout(() => {
			loadingScreen.style.opacity = '0'
			setTimeout(() => {
				loadingScreen.classList.add('hidden')
				renderApp()

				// Запускаем анимации после загрузки
				setTimeout(createFallingHearts, 500)
			}, 300)
		}, 1000)
	}

	// Рендер всего приложения
	const renderApp = () => {
		const appDiv = document.getElementById('app')

		// Навигация
		const nav = document.createElement('div')
		nav.className = 'nav-container'

		pages.forEach((page, index) => {
			const btn = document.createElement('button')
			btn.className = `nav-btn ${index === 0 ? 'active' : ''}`
			btn.textContent = `${index + 1}`
			btn.title = page.title
			btn.onclick = () => showPage(index)
			nav.appendChild(btn)
		})

		// Контейнер для страниц
		const pagesContainer = document.createElement('div')
		pagesContainer.id = 'pages-container'

		// Добавляем все страницы сразу (они легкие)
		pages.forEach((page, index) => {
			const pageDiv = document.createElement('div')
			pageDiv.className = `page ${index === 0 ? 'active' : ''}`
			pageDiv.id = `page-${page.id}`
			pageDiv.innerHTML = page.content
			pagesContainer.appendChild(pageDiv)
		})

		// Добавляем в DOM
		appDiv.appendChild(nav)
		appDiv.appendChild(pagesContainer)

		// Показываем фейерверки
		document.getElementById('fireworks').style.display = 'block'

		// Инициализируем функции
		initFunctions()
	}

	// Инициализация всех функций
	const initFunctions = () => {
		// Таймер обратного отсчета
		const updateCountdown = () => {
			const countdownEl = document.getElementById('countdownTimer')
			if (!countdownEl) return

			const now = new Date()
			const nextYear = now.getFullYear() + 1
			const targetDate = new Date(nextYear, now.getMonth(), now.getDate() + 1)

			const diff = targetDate - now
			const days = Math.floor(diff / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			)
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((diff % (1000 * 60)) / 1000)

			countdownEl.innerHTML = `
                <div>${days} дней</div>
                <div style="font-size: 0.6em; margin-top: 10px;">${hours}ч ${minutes}м ${seconds}с</div>
            `
		}

		updateCountdown()
		setInterval(updateCountdown, 1000)

		// Функция для загадывания желания
		window.makeWish = () => {
			const input = document.getElementById('wishInput')
			const message = document.getElementById('wishMessage')

			if (input && input.value.trim()) {
				const wish = input.value.trim()
				message.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 3em; margin: 10px;">✨🌟✨</div>
                        <h3 style="color: #ff6b9d;">Желание принято!</h3>
                        <p>"${wish}"</p>
                        <p style="margin-top: 15px;">Это прекрасное желание! Я сделаю все, чтобы оно сбылось! 💪</p>
                        <div style="font-size: 2em; margin-top: 15px;">🎁💝🎀</div>
                    </div>
                `

				// Анимация
				input.value = ''
				input.style.transform = 'scale(1.1)'
				setTimeout(() => (input.style.transform = 'scale(1)'), 300)

				// Прокрутка к сообщению
				setTimeout(() => {
					message.scrollIntoView({ behavior: 'smooth', block: 'center' })
				}, 500)
			} else {
				const message = document.getElementById('wishMessage')
				message.innerHTML = `
                    <div style="text-align: center; color: #ff6b9d;">
                        <p>Напиши свое желание, и я помогу ему сбыться! ✨</p>
                    </div>
                `
			}
		}

		// Автоматическая прокрутка страниц
		let currentPage = 0
		const autoScroll = setInterval(() => {
			currentPage = (currentPage + 1) % pages.length
			showPage(currentPage)
		}, 30000) // 30 секунд на страницу

		// Остановка автопрокрутки при клике
		document.querySelectorAll('.nav-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				clearInterval(autoScroll)
			})
		})
	}

	// Функция показа страницы
	const showPage = index => {
		// Обновляем активную кнопку
		document.querySelectorAll('.nav-btn').forEach((btn, i) => {
			btn.classList.toggle('active', i === index)
		})

		// Обновляем активную страницу
		document.querySelectorAll('.page').forEach((page, i) => {
			page.classList.toggle('active', i === index)
		})

		// Плавная прокрутка вверх
		window.scrollTo({ top: 0, behavior: 'smooth' })

		// Если это страница с желаниями - фокус на input
		if (pages[index].id === 'wishes') {
			setTimeout(() => {
				const input = document.getElementById('wishInput')
				if (input) input.focus()
			}, 500)
		}
	}

	// Запускаем приложение
	init()
}

// Запуск
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', app)
} else {
	app()
}
