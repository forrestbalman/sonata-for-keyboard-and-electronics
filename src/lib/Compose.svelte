<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import { fade } from "svelte/transition";
	import ButtonTooltip from "$lib/ButtonTooltip.svelte";

	let { piece } = $props();
	let wordsAndCharacters = $state(separateText(piece.text));
	let fullTextHeight = $state(400);
	let textData = $state({});

	function separateText(text) {
		const data = {};

		text.split(" ").forEach((word, i) => {
			data[i] = {
				word: word,
				duration: 0,
				characters: {},
			};

			word.split("").forEach((character, j) => {
				data[i].characters[j] = {
					character: character,
					timing: null,
					sound: null,
				};
			});
		});

		return data;
	}

	function randomizeTimings() {
		Object.entries(wordsAndCharacters).forEach(([i, word]) => {
			Object.entries(word.characters).forEach(([j, character]) => {
				const timing = Math.floor(
					Math.random() * (750 - 300 + 1) + 300
				);
				character.timing = timing;
			});
		});
	}

	function evenTimings() {
		Object.entries(wordsAndCharacters).forEach(([i, word]) => {
			Object.entries(word.characters).forEach(([j, character]) => {
				character.timing = 350;
			});
		});
	}

	$effect(() => {
		Object.entries(wordsAndCharacters).forEach(([i, word]) => {
			let counter = 0;

			Object.entries(word.characters).forEach(([j, character]) => {
				if (character.timing) {
					counter += character.timing;
				}
			});

			word.duration = counter;
		});
	});
</script>

<section transition:fade>
	<h3
		class="text-center mb-3"
		style="font-family: {font()}; color: {accent()};">
		{piece.title}
	</h3>
	<div class="container">
		<div class="row mb-5">
			<div class="col-12 col-lg-6 px-5">
				<h3
					class="text-center"
					style="font-family: {font()}; color: {accent()};">
					Full text - {piece.text.split(" ").length} words
				</h3>
				<p
					class="overflow-y-scroll"
					style="font-family: {font()}; color: {text()}; max-height: {fullTextHeight}px;">
					{#each Object.entries(wordsAndCharacters) as [i, word]}
						<a
							href="#{i}"
							class="text-decoration-none"
							style="color: {text()};">{word.word}</a>
						{" "}
					{/each}
				</p>
			</div>
			<div class="col-12 col-lg-6 px-5">
				<h3
					class="text-center"
					style="font-family: {font()}; color: {accent()};">
					Individual words + characters
				</h3>
				<div
					class="overflow-y-scroll mb-3"
					style="max-height: {fullTextHeight}px;">
					{#each Object.entries(wordsAndCharacters) as [i, word]}
						<div class="mb-3">
							<h5
								id={i}
								style="font-family: {font()}; color: {text()};">
								{i} - {word.word} - {word.duration > 0
									? word.duration + "ms"
									: "N/A"}
							</h5>
							{#each Object.entries(word.characters) as [j, character]}
								{#if i == 0 && j == 0}
									<div class="container mb-1">
										<div class="row">
											<div class="col-1"></div>
											<div class="col-3">
												<p
													class="mb-2"
													style="font-family: {font()}; color: {accent()};">
													Timing
												</p>
											</div>
											<div class="col">
												<p
													class="mb-2"
													style="font-family: {font()}; color: {accent()};">
													File name
												</p>
											</div>
										</div>
									</div>
								{/if}
								<div class="container mb-1">
									<div class="row align-items-center">
										<div class="col-1">
											<p
												class="m-0"
												style="font-family: {font()}; color: {text()};">
												{character.character}
											</p>
										</div>
										<div class="col-3">
											<div class="input-group">
												<input
													type="number"
													class="form-control"
													placeholder=""
													bind:value={character.timing} />
											</div>
										</div>
										<div class="col">
											<div class="input-group">
												<input
													type="text"
													class="form-control"
													placeholder=""
													bind:value={character.sound} />
											</div>
										</div>
									</div>
								</div>
							{/each}
							<hr
								class="me-5 mt-3 mb-0"
								style="color: {accent()};" />
						</div>
					{/each}
				</div>
				<div>
					<div class="mb-3">
						<h5
							class="text-center"
							style="font-family: {font()}; color: {accent()};">
							Utilities
						</h5>
						<div
							class="d-flex flex-wrap gap-2 justify-content-center">
							<ButtonTooltip
								func={randomizeTimings}
								content="Randomize timings"
								description="Sets timings to a random number between 300 and 750ms" />
							<ButtonTooltip
								func={evenTimings}
								content="Even timings"
								description="Sets all timings to 350ms" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
