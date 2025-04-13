// Add themes in the colorways object: ensure they have bg, text, and accent properties
// Add fonts in the fonts array: make sure to import them in app.css
export const theme = $state({
	colorways: {
		Ember: {
			bg: "#ffc848",
			text: "#231e20",
			accent: "#ed2256",
		},
		Forge: {
			bg: "#0a3136",
			text: "#f2f2f2",
			accent: "#d02906",
		},
		Tide: {
			bg: "#82d4dd",
			text: "#1a1f34",
			accent: "#d69da6",
		},
		Auric: {
			bg: "#212932",
			text: "#fffeff",
			accent: "#a48e4b",
		},
		Valor: {
			bg: "#fefefd",
			text: "#2a1e81",
			accent: "#dd040b",
		},
		Ethereal: {
			bg: "#181918",
			text: "#dfb5d5",
			accent: "#a3a19f",
		},
		Verdant: {
			bg: "#020802",
			text: "#9aeb8b",
			accent: "#60e4f7",
		},
	},
	fonts: ["Arvo", "Caveat", "Noto Serif", "Poppins", "Roboto Mono"],
	config: {
		colorway: "Ethereal",
		font: "Noto Serif",
	},
});

// All below functions are for returning values from the theme object because of $state and limitations of JavaScript. You can mix and match by assigning override of a different colorway or font to the functions.
export function bg(override = null) {
	return override
		? theme.colorways[override].bg
		: theme.colorways[theme.config.colorway].bg;
}

export function text(override = null) {
	return override
		? theme.colorways[override].text
		: theme.colorways[theme.config.colorway].text;
}

export function accent(override = null) {
	return override
		? theme.colorways[override].accent
		: theme.colorways[theme.config.colorway].accent;
}

export function font(override = null) {
	return override ? override : theme.config.font;
}
