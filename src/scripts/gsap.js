import { incrementCounter, incrementCounterInInterval } from './utils'

class App {
	constructor() {
		this.ourVisionLines = [...document.querySelectorAll('.ourvision-line')]
		this._initialize()
		this._render()
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
		this._repairabilityAnimation()
		this._stats1Animation()
		this._stats2Animation()
		this._ourVisionAnimation()
	}

	_setInitialState() {
		gsap.set(
			'.smart-title-box, .benefits-description, .benefits-index, highlight-title, .repairability-title, .repairability-description',
			{
				opacity: 0,
				scale: 0.9,
				y: 64,
				skewX: '-4deg',
				skewY: '0deg'
			}
		)

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
			lerp: 0.1
		})
	}

	_headerAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#hero',
				start: 'bottom top',
				end: 'bottom bottom',
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
				yPercent: -125,
				paused: true,
				duration: 0.2
			})
			.progress(1)

		ScrollTrigger.create({
			trigger: '#smart-use',
			start: 'top top',
			end: 'max',
			onUpdate: (self) => {
				// if mobile overlay is not visible
				if (!document?.querySelector('#floating-menu.visible')) {
					self.direction === -1 ? showAnim.play() : showAnim.reverse()
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
					width: !context.queries.isMobile ? '114px' : '96px',
					height: !context.queries.isMobile ? '85px' : '64px',
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
							maxHeight: 500,
							maxWidth: 500
						},
						2.5
					)
					.to(
						'.bind-zoom2',
						{
							maxHeight: 500,
							maxWidth: 500
						},
						2.5
					)
			}
		)
	}

	_benefitsSkew() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#benefits',
				start: 'top-=30% top',
				end: 'top top',
				scrub: false,
				delay: 0
			}
		})
		tl.to('.benefits-index', {
			scale: 1,
			y: 0,
			opacity: 1,
			skewX: '0deg',
			skewY: '0deg'
		}).to(
			'.benefits-description',
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
				start: 'top-=450px top',
				end: 'top top'
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

	_repairabilityAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#repairability',
				start: 'top-=300 top',
				end: 'top top',
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
				incrementCounter('0-kpi-stat', 100, 150, 5000)
				incrementCounter('1-kpi-stat', 5999900, 6000000, 200000000)
				incrementCounter('2-kpi-stat', 0, 20, 1500)
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
				incrementCounter('0-kpi-stat2', 5999700, 6000000, 30000000)
				incrementCounter('1-kpi-stat2', 65000, 66000, 4000)
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
				start: 'top-=300 top',
				end: 'top top',
				scrub: false
			}
		})
		tl.to('.ourvision-line', {
			ease: 'power3.out',
			stagger: 0.3,
			opacity: 1,
			y: 0,
			duration: 1
		})
	}

	_render(time) {
		this.lenis.raf(time)
		requestAnimationFrame(this._render.bind(this))
	}
}

new App()
