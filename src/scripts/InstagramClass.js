export default class InstagramSlider {
	constructor(containerSelector, config = {}) {
		const defaultConfig = {
			speed: 500,
			timing: 'cubic-bezier(0.4, 0.0, 1, 1)',
			activeClass: '',
			autoplay: false,
			delay: 5000,
			triggerOnIndexCallback: null,
			triggerOnAutoPlayToggle: null
		}
		this.id = containerSelector
		this.config = { ...defaultConfig, ...config }
		this.container = document.getElementById(containerSelector)
		this.elementsContainer = this.container.querySelector(
			`#${containerSelector}-elements-container`
		)
		this.indexContainer = this.container.querySelector(`#${containerSelector}-index-container`)

		// this.navigateNext = this.config.navigation && this.container.querySelector(`#${containerSelector}-nav-next`)
		// this.navigatePrev = this.config.navigation &&  this.container.querySelector(`#${containerSelector}-nav-prev`)

		this.items = [...this.elementsContainer.children]
		this.paginationItems = this.indexContainer ? [...this.indexContainer.children] : null
		this.activeIndex = 0
		this.isPlaying = false
		this.touchStartTime = Date.now()
		this.touchTimeout = null
		this.timer = null
		this.init()
	}

	init() {
		this.initElements()
		this.initEvents()
		this.fadeInContainer()
		this.handleIndexUpdate(this.activeIndex)
		this.startAutoplay()
	}

	initElements() {
		this.container.style.position = 'relative'
		this.container.style.opacity = 0
		this.items.forEach((item) => {
			item.style.opacity = 0
			item.style.transition = `opacity ${this.config.speed}ms ${this.config.timing}`
		})
		if (this.paginationItems) {
			this.paginationItems.forEach((item, index) => {
				item.addEventListener('mouseenter', () => this.handlePaginationMouseEnter(index))
				item.addEventListener('mouseleave', () => this.handlePaginationMouseLeave())
				item.addEventListener('touchstart', (event) =>
					this.handlePaginationTouchStart(event, index)
				)
			})
		}
	}

	initEvents() {
		this.container.addEventListener('touchstart', () => this.handleContainerTouchStart())
		this.container.addEventListener('touchend', (e) => this.handleContainerTouchEnd(e))
		this.container.addEventListener('touchcancel', () => this.handleContainerTouchCancel())
	}

	fadeInContainer() {
		setTimeout(() => {
			this.container.style.opacity = 1
		}, this.config.speed)
	}

	startAutoplay() {
		if (this.config.autoplay) {
			this.isPlaying = true
			this.config.triggerOnAutoPlayToggle && this.config.triggerOnAutoPlayToggle(this.isPlaying)
			if (this.id === 'accesories-slider-nav-next') {
				console.log('start autoplay; ', this.activeIndex)
			}
			this.timer = new Timer(() => {
				this.next()
				this.startAutoplay()
			}, this.config.delay)
		}
	}

	stopAutoplay() {
		if (this.isPlaying) {
			this.isPlaying = false
			this.config.triggerOnAutoPlayToggle && this.config.triggerOnAutoPlayToggle(this.isPlaying)
			this.timer.pause()
		}
	}

	resumeAutoplay() {
		this.isPlaying = true
		this.config.triggerOnAutoPlayToggle && this.config.triggerOnAutoPlayToggle(this.isPlaying)
		this.timer.resume()
	}

	next() {
		const newIndex = (this.activeIndex + 1) % this.items.length
		this.handleIndexUpdate(newIndex)
	}

	previous() {
		const newIndex = this.activeIndex > 0 ? (this.activeIndex - 1) % this.items.length : 0
		this.handleIndexUpdate(newIndex)
	}

	navigatePrevious() {
		this.timer.cancel()
		this.previous()
		this.startAutoplay()
	}

	navigateNext() {
		this.timer.cancel()
		this.next()
		this.startAutoplay()
	}

	fadeOutItem(index) {
		this.items[index].style.opacity = 0
		this.removeActiveClass(index)
	}

	fadeInItem(index) {
		this.items[index].style.opacity = 1
		this.addActiveClass(index)
	}

	addActiveClass(index) {
		if (this.config.activeClass && this.paginationItems) {
			this.paginationItems[index].classList.add(this.config.activeClass)
		}
	}

	removeActiveClass(index) {
		if (this.config.activeClass && this.paginationItems) {
			this.paginationItems[index].classList.remove(this.config.activeClass)
		}
	}

	handlePaginationMouseEnter(index) {
		if (document.body.clientWidth > 580) {
			this.stopAutoplay()
			this.handleIndexUpdate(index)
		}
	}

	handlePaginationMouseLeave() {
		this.resumeAutoplay()
	}

	handlePaginationTouchStart(event, index) {
		event.stopPropagation()
		this.timer.cancel()
		this.handleIndexUpdate(index)
	}

	handleIndexUpdate(index) {
		this.fadeOutItem(this.activeIndex)
		this.activeIndex = index
		this.config.triggerOnIndexCallback && this.config.triggerOnIndexCallback(this.activeIndex)
		this.fadeInItem(this.activeIndex)
	}

	handleContainerTouchStart() {
		this.touchStartTime = Date.now()

		clearTimeout(this.touchTimeout)
		this.stopAutoplay()
		this.touchTimeout = setTimeout(() => {}, 300)
	}

	handleContainerTouchEnd(e) {
		clearTimeout(this.touchTimeout)
		const touchDuration = Date.now() - this.touchStartTime
		if (touchDuration < 300) {
			this.timer.cancel()
			const touchLeftSide = this.container.scrollWidth / 2 > e.changedTouches?.[0]?.clientX

			if (touchLeftSide) {
				this.previous()
			} else {
				this.next()
			}

			this.startAutoplay()
		} else {
			this.resumeAutoplay()
		}
	}

	handleContainerTouchCancel() {
		clearTimeout(this.touchTimeout)
		this.resumeAutoplay()
	}
}

export var Timer = function (callback, delay) {
	var timerId,
		start,
		remaining = delay

	this.pause = function () {
		window.clearTimeout(timerId)
		timerId = null
		remaining -= Date.now() - start
	}

	this.cancel = function () {
		window.clearTimeout(timerId)
		timerId = null
	}

	this.resume = function () {
		if (timerId) {
			return
		}

		this.getRemaining = function () {
			return remaining
		}

		start = Date.now()
		timerId = window.setTimeout(callback, remaining)
	}

	this.resume()
}
