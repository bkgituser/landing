module.exports = {
	// ...
	extends: [
		// ...
		'plugin:astro/recommended'
	],
	'eslint.validate': ['javascript', 'javascriptreact', 'astro', 'typescript', 'typescriptreact'],
	'prettier.documentSelectors': ['**/*.astro', '**/*.jsx'],
	'[astro]': {
		'editor.defaultFormatter': 'esbenp.prettier-vscode'
	},
	// ...
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Allows Astro components to be parsed.
			parser: 'astro-eslint-parser',
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			}
		}
		// ...
	]
}
