<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import { fade } from "svelte/transition";
	import * as pieceUtilities from "$lib/pieceUtilities.svelte";
	import ButtonTooltip from "$lib/ButtonTooltip.svelte";
	import Compose_FullText_Title from "$lib/Compose_FullText_Title.svelte";
	import Compose_FullText_Body from "$lib/Compose_FullText_Body.svelte";
	import Compose_Individual_Title from "$lib/Compose_Individual_Title.svelte";
	import Compose_Individual_Fields from "$lib/Compose_Individual_Fields.svelte";
	import Compose_HowToUseSounds from "$lib/Compose_HowToUseSounds.svelte";
	import Compose_Config from "$lib/Compose_Config.svelte";
	import Compose_Export from "$lib/Compose_Export.svelte";
	import Compose_Test from "$lib/Compose_Test.svelte";

	let { piece } = $props();
	let fullTextHeight = $state(400);
	let wordIndex = $state(0);
	let soundsUsed = {};

	$effect(() => {
		if (piece.separation) {
			Object.entries(piece.separation).forEach((w) => {
				const word = w[1];
				Object.entries(word.characters).forEach((c) => {
					const character = c[1];
					if (character.sound && character.sound.length > 0) {
						if (soundsUsed[character.sound]) {
							soundsUsed[character.sound]++;
						} else {
							soundsUsed[character.sound] = 1;
						}
					}
				});
			});
		}
	});
</script>

<section transition:fade>
	<div class="container px-5">
		<div class="mb-5">
			<h2
				class="text-center mb-3"
				style="font-family: {font()}; color: {accent()};">
				{piece.title}
			</h2>
			<Compose_HowToUseSounds />
		</div>
		<div class="row mb-3">
			<div class="col-12 col-lg-6">
				<!-- Full Text -->
				<Compose_FullText_Title {piece} />
				<Compose_FullText_Body
					{piece}
					{fullTextHeight}
					bind:value={wordIndex} />
			</div>
			<!-- Individual words + characters -->
			<div class="col-12 col-lg-6">
				<Compose_Individual_Title />
				<Compose_Individual_Fields
					word={piece.separation[wordIndex]}
					path={piece.path}
					{fullTextHeight} />
			</div>
		</div>
		<div class="row mb-5">
			<div class="col-12 col-lg-6">
				<!-- Configuration -->
				<Compose_Config {piece} />
			</div>
			<div class="col-12 col-lg-6">
				<!-- Export -->
				<Compose_Export {piece} />
			</div>
		</div>
	</div>
</section>
