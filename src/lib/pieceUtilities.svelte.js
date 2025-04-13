// returns initial separation object for piece
export function separateText(text) {
	const separation = {};

	// split incoming text into words
	text.split(" ").forEach((w, i) => {
		// initialize object
		separation[i] = {
			word: w,
			characters: {},
			duration: 0,
			delay: 0,
		};

		// assign metadata to each character
		w.split("").forEach((c, j) => {
			separation[i].characters[j] = {
				character: c,
				timing: 0,
				sound: null,
			};
		});
	});

	return separation;
}
