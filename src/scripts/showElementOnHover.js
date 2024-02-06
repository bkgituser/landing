//  display element on mouse enter to index element
//  fade element on mouse leave to index element

export default class ShowOnHover {
	constructor(containerSelector, config = { activeClass }) {
		const {
			speed = 500,
			timing = 'ease',
			activeClass = '',
			autoplay = false,
			delay = 3000,
			triggerOnIndexCallback = null
		} = config
		this._container = document?.querySelector(containerSelector)
		this._items = this._container?.querySelectorAll('[data-display-element]')
		this._paginationItems = this._container?.querySelectorAll('[data-index-element]')
		this._activeIndex = 0
		this._speed = speed
		this._timing = timing
		this._activeItemClass = activeClass
		this._autoplay = autoplay
		this._intervalId = null
		this._timeoutId = null
		this._delay = delay
		this._triggerOnIndexCallback = triggerOnIndexCallback
		this._initialize()
	}

	_initialize() {
		this._initialState()
		// this._removeActiveIndex(this._activeIndex)
		this._setActive(this._activeIndex)
		setTimeout(() => {
			this._container.style.opacity = 1
		}, this._speed)

		if (this._autoplay) {
			this._autoplayStart()
		}
	}

	_initialState() {
		this._container.style.position = 'relative'
		this._container.style.opacity = 0
		this._items.forEach((elem) => {
			elem.style.opacity = 0
			elem.style.transitionDuration = `${this._speed}ms`
			elem.style.transitionTimingFunction = this._timing
			elem.style.transitionProperty = 'all'
		})

		this._paginationItems.forEach((item, index) => {
			item.addEventListener('mouseenter', () => {
				if (this._autoplay) {
					clearInterval(this._intervalId)
				}
				this._removeActiveIndex(this._activeIndex)
				this._setActive(index)
				this._activeIndex = index
			})

			item.addEventListener('mouseleave', () => {
				if (this._autoplay) {
					this._autoplayStart()
				}
			})
		})
	}

	_setTriggerOnIndex() {
		this._triggerOnIndexCallback(this._activeIndex)
	}

	_removeActiveIndex(index) {
		const currentActiveElement = Number.isInteger(index) ? this._items[index] : null
		// remove styles to not active
		if (currentActiveElement) {
			currentActiveElement.style.opacity = 0
			if (this._activeItemClass) {
				this._paginationItems[index].classList.remove(this._activeItemClass)
			}
		}
	}

	_setActive(newIndex) {
		clearTimeout(this._timeoutId)
		this._activeIndex = newIndex
		this._triggerOnIndexCallback && this._setTriggerOnIndex()

		// add styles to new active
		const newActiveElement = this._items[newIndex]

		newActiveElement.style.opacity = 1

		if (this._activeItemClass) {
			this._paginationItems[newIndex].classList.add(this._activeItemClass)
		}
	}

	_autoplayStart() {
		clearInterval(this._intervalId) // Clear any existing interval
		this._intervalId = setInterval(() => {
			this._removeActiveIndex(this._activeIndex)
			if (this._items.length - 1 > this._activeIndex) {
				this._activeIndex += 1
			} else {
				this._activeIndex = 0
			}
			this._setActive(this._activeIndex)
		}, this._delay)
	}
}
