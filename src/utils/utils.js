function MultilineTranslation({ text }) {
	const items = text.split('\n')
	return (
		<>
			{items.map((item) => (
				<p>{item}</p>
			))}
		</>
	)
}
