import { incrementCounter, setSizeOfBinds, incrementCounterInInterval } from './utils'

class App {
	constructor() {
		this.ourVisionLines = [...document.querySelectorAll('.ourvision-line')]
		this.body = document.querySelector('body')
		this._initialize()
		this._render()

		window.removeEventListener('orientationchange', async () => {
			scrollTriggers = ScrollTrigger.getAll()
			scrollTriggers.refresh()
		})
	}

	_initialize() {
		this._setInitialState()
		this._createLenis()
		this._logoAnimation()
		this._scrollHeaderAnimation()
		this._headerAnimation()
		this._smartUseAnimation()
		this._benefitsSkew()
		this._highlightsAnimation()
		this._productsLineup()
		this._repairabilityAnimation()
		this._stats1Animation()
		this._accesories()
		this._stats2Animation()
		this._ourVisionAnimation()
		this._aboutUs()
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

		gsap.set('.column-highlight, .table-cell-stat1, .table-cell-stat2', {
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
			// direction: 'vertical', // vertical, horizontal
			// gestureDirection: 'vertical', // vertical, horizontal, both
			// smooth: true,
			// mouseMultiplier: 1,
			// smoothTouch: false,
			// touchMultiplier: 2,
			// infinite: false,
		})

		this.lenis.on('scroll', ScrollTrigger.update)

		gsap.ticker.add((time) => {
			this.lenis.raf(time * 1000)
		})

		gsap.ticker.lagSmoothing(0)
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
		const mm = gsap.matchMedia()
		mm.add(
			{
				isMobile: '(max-width: 480px)',
				isNotMobile: '(min-width: 481px)',
				reduceMotion: '(prefers-reduce-motion: no-preference)'
			},
			(context) => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: '#hero',
						start: 'top top',
						end: '200px top',
						scrub: true
					}
				})

				tl.to('header img', {
					width: !context.conditions.isMobile ? '114px' : '107px',
					height: !context.conditions.isMobile ? '85px' : '80px',
					duration: 1,
					ease: 'expo.in'
				})
			}
		)
	}

	_smartUseAnimation() {
		const mm = gsap.matchMedia()
		mm.add(
			{
				isMobile: '(max-width: 480px)',
				isNotMObile: '(min-width: 481px)',
				reduceMotion: '(prefers-reduce-motion: no-preference)'
			},
			(context) => {
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
					.to(
						'.bind-zoom1',
						{ scaleY: 1, duration: 0.7, delay: 1, ease: 'expoScale(0.5,7,none)' },
						0.8
					)
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
					.to(
						'.bind-zoom2',
						{ scaleY: 1, duration: 0.7, delay: 1, ease: 'expoScale(0.5,7,none)' },
						0.8
					)
			}
		)
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
		const mm = gsap.matchMedia()
		mm.add(
			{
				isMobile: '(max-width: 480px)',
				isNotMobile: '(min-width: 481px)',
				reduceMotion: '(prefers-reduce-motion: no-preference)'
			},
			(context) => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: '#highlights',
						start: 'top top',
						end: 'center top',
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
			scrollTrigger: {
				trigger: '#repairability',
				start: 'top top',
				end: 'top+=300 top',
				pin: true,
				scrub: false
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
		// table-cell-stat1

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#stats',
				start: 'top-=80% top',
				end: 'top top',
				scrub: false
			},
			onStart: () => {
				const kpis = document.querySelectorAll('.kpi-stat1')
				kpis.forEach((element) => {
					incrementCounter(element)
				})
			},
			onComplete: () => {
				setInterval(() => {
					incrementCounterInInterval('1-kpi-stat', 10)
				}, 2000)
			}
		})
		tl.to('.table-cell-stat1', {
			ease: 'power3.out',
			stagger: 0.1,
			opacity: 1,
			y: 0,
			duration: 0.5
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
		// table-cell-stat1

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#stats2',
				start: 'top-=80% top',
				end: 'top top',
				scrub: false
			},
			onStart: () => {
				const kpis = document.querySelectorAll('.kpi-stat2')

				kpis.forEach((element) => {
					incrementCounter(element)
				})
			},
			onComplete: () => {
				setInterval(() => {
					incrementCounterInInterval('0-kpi-stat2', 10)
				}, 2000)
			}
		})
		tl.to('.table-cell-stat2', {
			ease: 'power3.out',
			stagger: 0.1,
			opacity: 1,
			y: 0,
			duration: 0.5
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
		requestAnimationFrame(this._render.bind(this))
	}
}

new App()
