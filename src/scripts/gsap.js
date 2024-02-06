class App {
	constructor() {
		this._initialize()
		this._render()
	}

	_initialize() {
		this._setInitialState()
		this._createLenis()
		this._logoAnimation()
		this._headerAnimation()
		this._smartUseAnimation()
		this._benefitsSkew()
		this._highlightsAnimation()
	}

	_setInitialState() {
		gsap.set(
			'.smart-title-box, .feature-smart-1, .feature-smart-2, .benefits-description, .benefits-index, highlight-title',
			{
				opacity: 0,
				scale: 0.9,
				y: 64,
				skewX: '-4deg',
				skewY: '0deg'
			}
		)

		gsap.set('.zoom1, zoom2', {
			scale: 0.5
		})

		gsap.set('.column-highlight', {
			opacity: 0,
			y: 32
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
			width: '114px',
			height: '85px',
			duration: 1,
			ease: 'expo.in'
		})
	}

	_smartUseAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#smart-use',
				start: 'top top',
				end: 'bottom+=1000 top',
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
					scale: 1,
					y: 0,
					opacity: 1,
					skewX: '0deg',
					skewY: '0deg'
				},
				1
			)
			.to(
				'.feature-smart-2',
				{
					scale: 1,
					y: 0,
					opacity: 1,
					skewX: '0deg',
					skewY: '0deg'
				},
				1
			)
			.to(
				'.zoom1',
				{
					opacity: 1,
					scale: 1
				},
				1.5
			)
			.to(
				'.zoom2',
				{
					opacity: 1,
					scale: 1
				},
				1.5
			)
			.to(
				'.bind-zoom1',
				{
					maxHeight: 500,
					maxWidth: 500
				},
				2
			)
			.to(
				'.bind-zoom2',
				{
					maxHeight: 500,
					maxWidth: 500
				},
				2
			)
	}

	_benefitsSkew() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#benefits',
				start: 'top top',
				end: 'top+=100px top',
				pin: true,
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
				start: 'top-=450 top',
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
				stagger: 0.06,
				opacity: 1,
				y: 0,
				duration: 0.5
			},
			'+=0.5'
		)
	}

	_render(time) {
		this.lenis.raf(time)
		requestAnimationFrame(this._render.bind(this))
	}
}

new App()
