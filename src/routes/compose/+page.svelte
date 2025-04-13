<script>
	import Navbar from "$lib/Navbar.svelte";
	import Compose from "$lib/Compose.svelte";
	import LinkButton from "$lib/LinkButton.svelte";
	import ButtonTooltip from "$lib/ButtonTooltip.svelte";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import * as pieces from "$lib/pieces.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	let piece = $state();
	let separation = $state({});

	function selectPiece(value) {
		piece = value;

		const textArray = piece.text.split(" ");

		for (let i = 0; i < textArray.length; i++) {
			const word = textArray[i];
			const characters = {};

			for (let j = 0; j < word.length; j++) {
				const character = word[j];

				characters[j] = {
					character: character,
					timing: 0,
					sound: null,
				};
			}

			separation[i] = {
				word: word,
				characters: characters,
				duration: 0,
				delay: 0,
			};
		}

		if (!piece.separation) {
			console.log(separation);
		}
	}
</script>

<main class="d-flex flex-column min-vh-100" style="background: {bg()};">
	<Navbar show={true} />
	<section class="container mb-5">
		<h2
			class="text-center mb-2"
			style="font-family: {font()}; color: {accent()}">
			Select a piece
		</h2>
		<div class="d-flex flex-wrap gap-2 justify-content-center">
			{#each Object.entries(pieces) as [key, value]}
				<ButtonTooltip
					func={() => selectPiece(value)}
					content={value.title}
					description={value.description} />
			{/each}
		</div>
	</section>
	{#if piece && piece.separation}
		<Compose {piece} />
	{/if}
</main>
