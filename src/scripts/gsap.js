import {
	incrementCounter,
	setSizeOfBinds,
	incrementCounterInInterval,
	numberWithCommas
} from './utils'

class App {
	constructor() {
		this.ourVisionLines = [...document.querySelectorAll('.ourvision-line')]
		this.body = document.querySelector('body')
		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		this._initialize()
		this._render()
		ScrollTrigger.normalizeScroll()
	}

	_initialize() {
		this._setInitialState()
		this._createLenis()
		this._logoAnimation()
		this._scrollHeaderAnimation()
		this._headerAnimation()
		this._bgSmartUse()
		this._smartUseAnimation()
		this._benefitsSkew()
		this._highlightsAnimation()
		this._productsLineup()
		this._repairabilityAnimation()
		this._stats1Animation()
		this._accesories()
		this._stats2Animation()
		this._bgOurVision()
		this._ourVisionAnimation()
		this._aboutUs()
	}

	_updateWindowsSize() {
		window.addEventListener('resize', () => {
			ScrollTrigger.refresh()
			this.windowWidth = window.innerWidth
			this.windowHeight = window.innerHeight
		})
	}

	_isMobile() {
		return this.windowWidth < 480 || window.innerHeight < 480
	}

	_setInitialState() {
		gsap.set(
			'.smart-title-box, .index-container, highlight-title, .repairability-title, .repairability-description',
			{
				opacity: 0,
				scale: 0.9,
				y: 64,
				skewX: '-4deg',
				skewY: '0deg'
			}
		)

		gsap.set('.benefits-description', {
			scale: 0.9,
			y: 64,
			skewX: '-4deg',
			skewY: '0deg'
		})

		gsap.set('.bind-zoom1, .bind-zoom2', {
			scaleX: 0,
			scaleY: 0
		})

		gsap.set('.feature-smart-1, .feature-smart-2, .zoom1, zoom2', {
			autoAlpha: 0
		})

		gsap.set('.column-highlight', {
			opacity: 0,
			y: -32
		})

		gsap.set('.ourvision-line', {
			opacity: 0,
			y: 32
		})

		gsap.set('.repairability-arrow', {
			opacity: 0,
			x: -32
		})
	}

	_createLenis() {
		this.lenis = new Lenis({
			lerp: 0.1,
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		})

		this.lenis.on('scroll', ScrollTrigger.update)
	}

	_headerAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#smart-use',
				start: 'top-=100px top',
				end: 'top-=100px top',
				scrub: true
			}
		})

		tl.to('header', {
			background: 'rgba(0,0,0,0.2)'
		})
	}

	_scrollHeaderAnimation() {
		const showAnim = gsap
			.from('header', {
				yPercent: -145,
				paused: true,
				duration: 0.25
			})
			.progress(1)
		let firstProgress = null
		let lastProgress = null
		let valueBetween = null
		ScrollTrigger.create({
			trigger: '#smart-use',
			start: 'top-=400px top',
			end: 'max',
			delay: 1,
			onUpdate: (self) => {
				// work around to delay effect when scrolling top
				// on mobile devices
				if (self.direction === -1) {
					if (firstProgress === null) {
						firstProgress = self.progress
					} else {
						lastProgress = self.progress
					}
				}

				if (firstProgress !== null && lastProgress !== null) {
					valueBetween = lastProgress - firstProgress

					// Reset first and last progress when needed
					if (self.direction === 1) {
						valueBetween = null
						firstProgress = null
						lastProgress = null
					}
				}

				const delayEffect = valueBetween < -0.02

				if (!document?.querySelector('#floating-menu.visible')) {
					if (self.scroller.innerWidth < 480 || self.scroller.innerHeight < 480) {
						self.direction === -1 && delayEffect ? showAnim.play() : showAnim.reverse()
					} else {
						self.direction === -1 ? showAnim.play() : showAnim.reverse()
					}
				}
			}
		})
	}

	_logoAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#hero',
				start: 'top top',
				end: '200px top',
				scrub: true
			}
		})

		tl.to('header img', {
			width: !this._isMobile() ? '114px' : '107px',
			height: !this._isMobile() ? '85px' : '80px',
			duration: 1,
			ease: 'expo.in'
		})
	}

	_bgSmartUse() {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#smart-use',
				scrub: true,
				pin: false
			}
		})

		tl.from('#smart-use-bg', {
			transformOrigin: '50% 50%',
			yPercent: -50,
			ease: 'none'
		}).to('#smart-use-bg', {
			transformOrigin: '50% 50%',
			yPercent: 0,
			ease: 'none'
		})
	}

	_smartUseAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#smart-use',
				start: 'top top',
				end: 'bottom top',
				pin: true,
				scrub: false
			},
			onStart: () => {
				setSizeOfBinds()
			}
		})

		tl.to('.smart-title-box', {
			scale: 1,
			y: 0,
			opacity: 1,
			skewX: '0deg',
			skewY: '0deg'
		})
			.to(
				'.feature-smart-1',
				{
					autoAlpha: 1
				},
				1
			)
			.to(
				'.feature-smart-2',
				{
					autoAlpha: 1
				},
				1
			)
			.to(
				'.zoom1',
				{
					autoAlpha: 1
				},
				1.5
			)
			.to(
				'.zoom2',
				{
					autoAlpha: 1
				},
				1.5
			)
			.to(
				'.bind-zoom1',
				{
					scaleX: 1,
					transformOrigin: 'right bottom',
					duration: 0.7,
					ease: 'expoScale(0.5,7,none)'
				},
				0.5
			)
			.to('.bind-zoom1', { scaleY: 1, duration: 0.7, delay: 1, ease: 'expoScale(0.5,7,none)' }, 0.8)
			.to(
				'.bind-zoom2',
				{
					scaleX: 1,
					transformOrigin: 'top left',
					duration: 0.7,
					ease: 'expoScale(0.5,7,none)'
				},
				0.5
			)
			.to('.bind-zoom2', { scaleY: 1, duration: 0.7, delay: 1, ease: 'expoScale(0.5,7,none)' }, 0.8)
	}

	_benefitsSkew() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#benefits',
				start: 'top top',
				end: 'center top',
				scrub: false,
				pin: true,
				delay: 0
			}
		})
		tl.to('.benefits-description', {
			scale: 1,
			y: 0,
			skewX: '0deg',
			skewY: '0deg'
		}).to(
			'.index-container',
			{
				scale: 1,
				y: 0,
				opacity: 1,
				skewX: '0deg',
				skewY: '0deg'
			},
			0.5
		)
	}

	_highlightsAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#highlights',
				start: 'top top',
				end: 'top+=30% top',
				pin: true
			}
		})

		tl.to('.highlight-title', {
			scale: 1,
			y: 0,
			opacity: 1,
			skewX: '0deg',
			skewY: '0deg'
		})

		tl.to(
			'.column-highlight',
			{
				ease: 'power3.out',
				stagger: 0.1,
				opacity: 1,
				y: 0,
				duration: 0.5
			},
			0
		)
	}

	_productsLineup() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#products-line-up',
				start: 'top top',
				end: 'center top',
				pin: true
			}
		})
	}

	_repairabilityAnimation() {
		const tl = gsap.timeline({
			id: 'repairability-tl',
			scrollTrigger: {
				trigger: '#repairability',
				start: 'top top',
				end: 'top+=200 top',
				pin: true,
				scrub: false,
				id: 'repairability-anim'
			}
		})
		tl.to('.repairability-title', {
			scale: 1,
			y: 0,
			opacity: 1,
			skewX: '0deg',
			skewY: '0deg'
		})
			.to(
				'.repairability-description',
				{
					scale: 1,
					y: 0,
					opacity: 1,
					skewX: '0deg',
					skewY: '0deg'
				},
				0.3
			)
			.to(
				'.repairability-arrow',
				{
					x: 0,
					opacity: 1
				},
				0.6
			)
	}

	_stats1Animation() {
		const items = document.querySelectorAll('.kpi-stat1')

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#stats',
				start: `top-=${this._isMobile() ? '20%' : '50%'} top`,
				end: 'top top',
				scrub: false
			}
		})

		tl.from(items, {
			textContent: 0,
			duration: 4,
			ease: 'power1.in',
			y: 0,
			snap: { textContent: 1 },
			stagger: {
				each: 0.4,
				onUpdate: function () {
					this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent))
				}
			},
			onComplete: () => {
				setInterval(() => {
					incrementCounterInInterval('1-kpi-stat', 10)
				}, 2500)
			}
		})
	}

	_accesories() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#accesories',
				start: 'top top',
				end: 'center top',
				pin: true
			}
		})
	}

	_stats2Animation() {
		const items = document.querySelectorAll('.kpi-stat2')

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#stats2',
				start: `top-=${this._isMobile() ? '20%' : '50%'} top`,
				end: 'top top',
				scrub: false
			}
		})

		tl.from(items, {
			textContent: 0,
			duration: 4,
			ease: 'power1.in',
			y: 0,
			snap: { textContent: 1 },
			stagger: {
				each: 0.4,
				onUpdate: function () {
					this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent))
				}
			},
			onComplete: () => {
				setInterval(() => {
					incrementCounterInInterval('0-kpi-stat2', 10)
				}, 2500)
			}
		})
	}

	_bgOurVision() {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#our-vision',
				scrub: true,
				pin: false
			}
		})
		tl.from('#video-poster', {
			transformOrigin: '50% 50%',
			yPercent: -50,
			ease: 'none'
		}).to('#video-poster', {
			transformOrigin: '50% 50%',
			yPercent: 0,
			ease: 'none'
		})
	}

	_ourVisionAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#our-vision',
				start: 'top top',
				end: 'center+=10% top',
				pin: true,
				scrub: false
			}
		})
		tl.to('.ourvision-line', {
			ease: 'power3.out',
			stagger: 0.15,
			opacity: 1,
			y: 0,
			duration: 0.8
		})
	}

	_aboutUs() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#about-us-pie',
				start: 'top top',
				end: 'center top',
				pin: true
			}
		})
	}

	_render(time) {
		this.lenis.raf(time)
		ScrollTrigger.update()
		requestAnimationFrame(this._render.bind(this))
	}
}

new App()
