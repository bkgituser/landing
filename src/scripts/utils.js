function incrementCounter(selector, current, target, duration, letter = '') {
	let counter = document.getElementById(selector)
	let stepTime = Math.abs(Math.floor(duration / target))
	if (current < target && counter) {
		current++
		counter.innerText = current.toString() + letter
		setTimeout(() => incrementCounter(selector, current, target, duration, letter), stepTime)
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

export { incrementCounter, incrementCounterInInterval }
