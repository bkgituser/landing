/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,css}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
			xxl: '1700px'
		},
		extend: {
			fontFamily: {
				neoSans: ['NeoSans', 'sans-serif']
			},
			fontSize: {
				mid: '1.75rem',
				plusMid: '2.375rem'
			},
			colors: {
				grey: '#7B7B7B',
				darkGrey: '#222',
				lightGrey: '#D9D9D9',
				greyOpaque: '#C4C4C4'
			}
		}
	},
	plugins: []
}
