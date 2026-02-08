// Полный код приложения без сокращений страниц
const app = () => {
	// Базовая структура
	document.body.innerHTML = `
        <div id="app">
            <div class="loading-screen">
                <div class="heart-loader">❤️</div>
                <p>Загружаю любовь...</p>
            </div>
        </div>
    `

	// Стили (включая адаптивность и анимации)
	const style = document.createElement('style')
	style.textContent = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #f9f0ff 0%, #fff0f5 100%);
            min-height: 100vh;
            overflow-x: hidden;
            color: #5a3d5c;
        }
        #app { position: relative; min-height: 100vh; }
        .loading-screen {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%);
            display: flex; flex-direction: column; justify-content: center;
            align-items: center; z-index: 1000; transition: opacity 1s;
        }
        .heart-loader { font-size: 60px; animation: heartbeat 1.2s infinite; }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
        .hidden { display: none !important; }
        
        .nav-container {
            position: fixed; top: 20px; right: 20px; z-index: 100;
            display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end;
            max-width: 300px;
        }
        .nav-btn {
            background: rgba(255, 255, 255, 0.9); border: 2px solid #ff6b9d;
            color: #ff6b9d; padding: 5px 10px; border-radius: 15px;
            cursor: pointer; font-size: 12px; transition: all 0.3s;
        }
        .nav-btn.active { background: #ff6b9d; color: white; }
        
        .page {
            display: none; min-height: 100vh; padding: 80px 20px;
            flex-direction: column; justify-content: center; align-items: center;
            animation: fadeIn 0.8s ease-out;
        }
        .page.active { display: flex; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        h1 { font-size: 3em; text-align: center; margin-bottom: 20px; background: linear-gradient(45deg, #ff6b9d, #c779d0); -webkit-background-clip: text; color: transparent; }
        h2 { color: #ff6b9d; margin-bottom: 20px; text-align: center; }
        .content { max-width: 800px; text-align: center; line-height: 1.6; }
        .message-box { background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 2px dashed #ff6b9d; max-width: 600px; }
        .heart { color: #ff6b9d; font-size: 2em; animation: float 3s infinite; margin: 15px; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        
        .memories-container, .gallery { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; }
        .memory-card, .gallery-item { background: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); width: 200px; text-align: center; }
        
        .countdown { font-size: 2em; color: #ff6b9d; font-weight: bold; margin: 20px 0; }
        .wish-input { padding: 12px; border: 2px solid #ff6b9d; border-radius: 10px; width: 80%; max-width: 300px; margin-bottom: 10px; }
        .wish-btn { background: #ff6b9d; color: white; border: none; padding: 12px 25px; border-radius: 20px; cursor: pointer; }
        
        .photo-frame { width: 250px; height: 250px; border: 10px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transform: rotate(-3deg); margin: 20px; overflow: hidden; }
        .photo-placeholder { background: #ffe4e1; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 50px; }
    `
	document.head.appendChild(style)

	// Массив из ВСЕХ 14 страниц
	const pages = [
		{
			id: 'welcome',
			title: 'Старт',
			content: `<h1>С Днем Рождения, Моя Невозможная!</h1><div class="heart">❤️</div><p>Ты — самое прекрасное, что случилось в моей жизни.</p>`,
		},
		{
			id: 'letter',
			title: 'Письмо',
			content: `<div class="message-box"><h2>Моя дорогая</h2><p>Каждый день с тобой — это подарок судьбы. Твоя улыбка освещает мои дни...</p></div>`,
		},
		{
			id: 'memories',
			title: 'Память',
			content: `<h2>Наши воспоминания</h2><div class="memories-container">${Array(6).fill('<div class="memory-card"><h3>Момент</h3><div class="heart">❤️</div><p>В моем сердце...</p></div>').join('')}</div>`,
		},
		{
			id: 'reasons',
			title: '100 причин',
			content: `<h2>Почему я тебя люблю</h2><div class="gallery">${['Улыбка', 'Доброта', 'Мудрость', 'Забота', 'Поддержка', 'Красота', 'Искренность', 'Юмор', 'Решительность', 'Нежность', 'Сила', 'Любовь'].map(r => `<div class="gallery-item"><h3>${r}</h3></div>`).join('')}</div>`,
		},
		{
			id: 'promises',
			title: 'Обещания',
			content: `<div class="message-box"><h2>Я обещаю...</h2><p>• Быть рядом<br>• Поддерживать<br>• Любить сильнее<br>• Беречь нас</p></div>`,
		},
		{
			id: 'future',
			title: 'Будущее',
			content: `<h2>Мечты</h2><div class="photo-frame"><div class="photo-placeholder">✨</div></div><p>Путешествия, уютный дом и бесконечное счастье вместе.</p>`,
		},
		{
			id: 'gifts',
			title: 'Подарки',
			content: `<h2>Мои дары тебе</h2><div class="gallery">${['Любовь', 'Забота', 'Верность', 'Радость'].map(g => `<div class="gallery-item"><h3>${g}</h3></div>`).join('')}</div>`,
		},
		{
			id: 'qualities',
			title: 'Качества',
			content: `<h2>Твоя особенность</h2><div class="memories-container">${['Ум', 'Доброта', 'Свет'].map(q => `<div class="memory-card"><h3>${q}</h3><div class="heart">⭐</div></div>`).join('')}</div>`,
		},
		{
			id: 'song',
			title: 'Песня',
			content: `<div class="message-box"><h2>Мелодия сердца</h2><p>Ты — самая прекрасная песня, что звучит во мне вечно.</p><div class="heart">🎵</div></div>`,
		},
		{
			id: 'countdown',
			title: 'Таймер',
			content: `<h2>До новой даты</h2><div id="countdownTimer" class="countdown"></div>`,
		},
		{
			id: 'wishes',
			title: 'Желание',
			content: `<h2>Загадай желание</h2><input type="text" class="wish-input" placeholder="..."><br><button class="wish-btn" onclick="makeWish()">Отправить в космос</button><div id="wishMessage"></div>`,
		},
		{
			id: 'eternity',
			title: 'Вечность',
			content: `<h1>На вечность...</h1><div class="heart" style="font-size:4em">∞</div><p>Моя любовь не имеет границ.</p>`,
		},
		{
			id: 'final',
			title: 'Финал',
			content: `<h1>Люблю тебя!</h1><div style="font-size:60px">🎂🎉</div><p>Твой [Твое Имя]</p>`,
		},
		{
			id: 'bonus',
			title: 'P.S.',
			content: `<h2>И еще кое-что...</h2><p>Ты просто лучшая во всей вселенной! ❤️</p>`,
		},
	]

	let currentPage = 0

	const renderApp = () => {
		const appDiv = document.getElementById('app')
		appDiv.innerHTML =
			'<div class="nav-container"></div><div id="pages-container"></div>'

		const nav = appDiv.querySelector('.nav-container')
		const container = appDiv.querySelector('#pages-container')

		pages.forEach((page, i) => {
			// Кнопки
			const btn = document.createElement('button')
			btn.className = 'nav-btn'
			btn.textContent = i + 1
			btn.onclick = () => showPage(i)
			nav.appendChild(btn)

			// Страницы
			const pDiv = document.createElement('div')
			pDiv.className = `page ${i === 0 ? 'active' : ''}`
			pDiv.id = `page-${i}`
			pDiv.innerHTML = `<div class="content">${page.content}</div>`
			container.appendChild(pDiv)
		})

		updateCountdown()
		setInterval(updateCountdown, 1000)
	}

	window.showPage = index => {
		currentPage = index
		document
			.querySelectorAll('.page')
			.forEach(p => p.classList.remove('active'))
		document
			.querySelectorAll('.nav-btn')
			.forEach(b => b.classList.remove('active'))

		document.getElementById(`page-${index}`).classList.add('active')
		document.querySelectorAll('.nav-btn')[index].classList.add('active')
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const updateCountdown = () => {
		const el = document.getElementById('countdownTimer')
		if (!el) return
		const target = new Date(new Date().getFullYear() + 1, 0, 1)
		const diff = target - new Date()
		const d = Math.floor(diff / 86400000)
		const h = Math.floor((diff / 3600000) % 24)
		const m = Math.floor((diff / 60000) % 60)
		const s = Math.floor((diff / 1000) % 60)
		el.innerHTML = `${d}д : ${h}ч : ${m}м : ${s}с`
	}

	window.makeWish = () => {
		const val = document.querySelector('.wish-input').value
		if (val) {
			document.getElementById('wishMessage').innerHTML =
				`<p>Твое желание "<b>${val}</b>" принято! ✨</p>`
			document.querySelector('.wish-input').value = ''
		}
	}

	// Запуск
	setTimeout(() => {
		document.querySelector('.loading-screen').style.opacity = '0'
		setTimeout(() => {
			document.querySelector('.loading-screen').classList.add('hidden')
			renderApp()
			showPage(0)
		}, 1000)
	}, 2000)
}

app()
 