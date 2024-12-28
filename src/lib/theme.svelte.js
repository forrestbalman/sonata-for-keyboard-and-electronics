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
	},
	fonts: ["Arvo", "Caveat", "Noto Serif", "Poppins", "Roboto Mono"],
	config: {
		colorway: "Ethereal",
		font: "Noto Serif",
	},
});

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
