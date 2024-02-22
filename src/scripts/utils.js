function incrementCounter(selector, current, target, duration, letter = '') {
	let counter = document.getElementById(selector)
	incrementNumber(counter, current, target, duration, (letter = ''))
}

function incrementCounterBySeparate(targetNumber, targetClass) {
	const numberElements = [...document.querySelectorAll(`.${targetClass}`)]
	const targetNumbers = targetNumber.toString().split('').map(Number)

	numberElements.forEach((element, index) => {
		const number = Number(element.innerText)
		const target = targetNumbers[index]
		// increment from 0 to target
		//if it's 0 makes the round
		incrementCounterInCircles(element, number, target, randomIntFromInterval(400, 1500))
	})
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function incrementNumber(counterElement, current, target, duration, letter) {
	let stepTime = Math.abs(Math.floor(duration / (target === 0 ? 9 : target)))

	if (current < target && counterElement) {
		current++
		counterElement.innerText = current.toString() + letter
		setTimeout(() => incrementNumber(counterElement, current, target, duration, letter), stepTime)
	}
}

function incrementCounterInCircles(counterElement, current, target, duration, letter = '') {
	let stepTime = Math.abs(Math.floor(duration / (target === 0 ? 9 : target)))
	if (current === 0 && counterElement) {
		current++
		counterElement.innerText = current.toString() + letter
		console.log({ counterElement, current, target })
		setTimeout(
			() => incrementCounterInCircles(counterElement, current, target, duration, letter),
			stepTime
		)
	} else if (current === 9 && counterElement) {
		current = 0
		counterElement.innerText = current.toString() + letter
	} else if (current === target) {
		counterElement.innerText = current.toString() + letter
	} else if (current !== target && counterElement) {
		current++
		counterElement.innerText = current.toString() + letter
		setTimeout(
			() => incrementCounterInCircles(counterElement, current, target, duration, letter),
			stepTime
		)
	}
}

function incrementCounterInInterval(selector, increment) {
	let counter = document.getElementById(selector)
	let current
	if (counter) {
		current = Number(counter.innerText) + increment + Math.floor(Math.random() * 9)
		counter.innerText = current.toString()
	}
}

export function setSizeOfBinds() {
	let isMobile = window.innerWidth <= 480
	let isMedium = window.innerWidth >= 768
	let isLandscape = window.innerHeight <= 480
	let isSmall = window.innerWidth < 768 && window.innerWidth > 480
	const bind1 = document.querySelector('.bind-zoom1')
	const sizeBind1 = bind1.getBoundingClientRect()
	const bind2 = document.querySelector('.bind-zoom2')
	const sizeBind2 = bind2.getBoundingClientRect()
	const feature1 = document.querySelector('.feature-smart-1').getBoundingClientRect()
	const feature2 = document.querySelector('.feature-smart-2').getBoundingClientRect()
	if (isLandscape) {
		return
	}
	if (isMobile) {
		const heightBind1Mobile = sizeBind1.y - feature1.y - feature1.height - 32
		bind1.style.height = `${heightBind1Mobile}px`
		bind1.style.width = `${1}px`

		const heightBind2Mobile = feature2.y - sizeBind2.y + 20
		bind2.style.height = `${heightBind2Mobile}px`
		bind2.style.width = `6px`
	} else if (isSmall) {
		const heightBind1Small = sizeBind1.y - feature1.y - feature1.height - 32
		bind1.style.height = `${heightBind1Small}px`
		bind1.style.width = `${1}px`

		const heightBind2Small = feature2.y - sizeBind2.y - 16
		bind2.style.height = `${heightBind2Small}px`
		bind2.style.width = `1px`
	} else if (isMedium) {
		const widthBind1Medium = sizeBind1.x - feature1.x
		const heightBind1Medium = sizeBind1.y - feature1.y - feature1.height - 16

		bind1.style.height = `${heightBind1Medium.toFixed(2)}px`
		bind1.style.width = `${widthBind1Medium.toFixed(2)}px`

		const widthBind2Medium = feature2.x - sizeBind2.x
		const heightBind2Medium = feature2.y - sizeBind2.y - 32

		bind2.style.height = `${heightBind2Medium.toFixed(2)}px`
		bind2.style.width = `${widthBind2Medium.toFixed(2)}px`
	}
}

export { incrementCounter, incrementCounterInInterval, incrementCounterBySeparate }
