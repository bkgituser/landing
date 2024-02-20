// //  display element on mouse enter to index element
// //  fade element on mouse leave to index element

// export default class InstagramSlider {
// 	constructor(containerSelector, config = { activeClass }) {
// 		const {
// 			speed = 500,
// 			timing = 'ease-out',
// 			activeClass = '',
// 			autoplay = false,
// 			delay = 3000,
// 			triggerOnIndexCallback = null,
// 			triggerOnAutoPlayToggle = null
// 		} = config
// 		this._container = document?.getElementById(containerSelector)
// 		this._items = [
// 			...this._container.querySelector(`#${containerSelector}-elements-container`)?.children
// 		]

// 		this._paginationItems = this._container?.querySelector(
// 			`#${containerSelector}-index-container`
// 		) && [...this._container?.querySelector(`#${containerSelector}-index-container`)?.children]
// 		this._activeIndex = 0
// 		this._speed = speed
// 		this._timing = timing
// 		this._activeItemClass = activeClass
// 		this._autoplay = autoplay
// 		this._intervalId = null
// 		this._timeoutId = null
// 		this._delay = delay
// 		this._triggerOnIndexCallback = triggerOnIndexCallback
// 		this._triggerOnAutoPlayToggle = triggerOnAutoPlayToggle
// 		this._isPlaying = false
// 		this._hasIndexes = this._paginationItems
// 		this._touchStartTime = Date.now()
// 		this._touchTimeout = null
// 		this._initialize()
// 	}

// 	_initialize() {
// 		this._initialState()

// 		this._setActive(this._activeIndex)
// 		setTimeout(() => {
// 			this._container.style.opacity = 1
// 		}, this._speed)

// 		this._autoplayStart()
// 	}

// 	_initialState() {
// 		this._container.style.position = 'relative'
// 		this._container.style.opacity = 0

// 		this._items?.forEach((elem) => {
// 			elem.style.opacity = 0
// 			elem.style.transitionDuration = `${this._speed}ms`
// 			elem.style.transitionTimingFunction = this._timing
// 			elem.style.transitionProperty = 'all'
// 		})

// 		this._hasIndexes &&
// 			this._paginationItems?.forEach((item, index) => {
// 				if (!this._isTouchEnabled()) {
// 					item.addEventListener('mouseenter', () => {
// 						if (document.body.clientWidth > 580) {
// 							this._stopAutoPlay()

// 							this._removeActiveIndex(this._activeIndex)
// 							this._setActive(index)
// 							this._activeIndex = index
// 						}
// 					})

// 					item.addEventListener('mouseleave', () => {
// 						this._autoplayStart()
// 					})
// 				} else {
// 					item.addEventListener('touchstart', (event) => {
// 						this._removeActiveIndex(this._activeIndex)
// 						this._setActive(index)
// 						this._activeIndex = index
// 						event.stopPropagation()
// 					})
// 				}
// 			})

// 		if (this._isTouchEnabled()) {
// 			this._container.addEventListener('touchstart', () => {
// 				this._touchStartTime = Date.now() // Record the time when the touch event starts
// 				clearTimeout(this._touchTimeout) // Clear any existing timeout

// 				this._touchTimeout = setTimeout(() => {
// 					this._stopAutoPlay() // Pause autoplay if the touch duration exceeds 300ms
// 				}, 300) // Set a timeout to pause the story after 300ms of continuous touch
// 			})

// 			this._container.addEventListener('touchend', () => {
// 				clearTimeout(this._touchTimeout) // Clear the timeout when the touch ends
// 				const touchDuration = Date.now() - this._touchStartTime // Calculate the duration of the touch
// 				if (touchDuration < 300) {
// 					// If touch duration is less than 300ms, it's considered a tap
// 					this._autoplayStart() // Resume autoplay

// 					// Logic to advance to the next slide

// 					const newIndex = this._activeIndex + 1 >= this._items.length ? 0 : this._activeIndex + 1
// 					this._removeActiveIndex(this._activeIndex)
// 					this._setActive(newIndex)
// 				}
// 			})

// 			this._container.addEventListener('touchcancel', () => {
// 				clearTimeout(this._touchTimeout) // Clear the timeout when the touch ends
// 				this._autoplayStart()
// 			})
// 		}
// 	}

// 	_isTouchEnabled() {
// 		return (
// 			'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
// 		)
// 	}

// 	_setTriggerOnIndex() {
// 		this._triggerOnIndexCallback(this._activeIndex)
// 	}

// 	_removeActiveIndex(index) {
// 		const currentActiveElement = Number.isInteger(index) ? this._items[index] : null
// 		// remove styles to not active
// 		if (currentActiveElement) {
// 			currentActiveElement.style.opacity = 0
// 			if (this._activeItemClass && this._hasIndexes) {
// 				this._paginationItems[index].classList.remove(this._activeItemClass)
// 			}
// 		}
// 	}

// 	_setActive(newIndex) {
// 		clearTimeout(this._timeoutId)
// 		this._activeIndex = newIndex
// 		this._triggerOnIndexCallback && this._setTriggerOnIndex()

// 		// add styles to new active
// 		const newActiveElement = this._items[newIndex]

// 		newActiveElement.style.opacity = 1

// 		if (this._activeItemClass && this._hasIndexes) {
// 			this._paginationItems[newIndex].classList.add(this._activeItemClass)
// 		}
// 	}

// 	_stopAutoPlay() {
// 		if (this._autoplay) {
// 			clearInterval(this._intervalId)
// 			this._isPlaying = false
// 			this._triggerOnAutoPlayToggle && this._triggerOnAutoPlayToggle(this._isPlaying)
// 		}
// 	}

// 	_autoplayStart() {
// 		if (this._autoplay) {
// 			this._isPlaying = true
// 			this._triggerOnAutoPlayToggle && this._triggerOnAutoPlayToggle(this._isPlaying)

// 			clearInterval(this._intervalId) // Clear any existing interval

// 			this._intervalId = setInterval(() => {
// 				this._removeActiveIndex(this._activeIndex)
// 				if (this._items.length - 1 > this._activeIndex) {
// 					this._activeIndex += 1
// 				} else {
// 					this._activeIndex = 0
// 				}
// 				this._setActive(this._activeIndex)
// 			}, this._delay)
// 		}
// 	}
// }
