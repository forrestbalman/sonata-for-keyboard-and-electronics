export const theme = $state({
	colorways: {
		Ocean: {
			darkest: "#1d3557",
			dark: "#457b9d",
			light: "#a8dadc",
			lightest: "#f1faee",
		},
		Forest: {
			darkest: "#40513B",
			dark: "#609966",
			light: "#9DC08B",
			lightest: "#EDF1D6",
		},
		Volcano: {
			darkest: "#800000",
			dark: "#982B1C",
			light: "#DAD4B5",
			lightest: "#F2E8C6",
		},
		Space: {
			darkest: "#1A0000",
			dark: "#58287F",
			light: "#89C4E1",
			lightest: "#F1E9DB",
		},
	},
	fonts: ["Arvo", "Caveat", "Noto Serif", "Poppins", "Roboto Mono"],
	config: {
		colorway: "Ocean",
		font: "Noto Serif",
	},
});

export function darkest() {
	return theme.colorways[theme.config.colorway].darkest;
}

export function dark() {
	return theme.colorways[theme.config.colorway].dark;
}

export function light() {
	return theme.colorways[theme.config.colorway].light;
}

export function lightest() {
	return theme.colorways[theme.config.colorway].lightest;
}

export function font() {
	return theme.config.font;
}
