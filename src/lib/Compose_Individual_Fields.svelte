<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import Compose_Individual_Fields_Title from "$lib/Compose_Individual_Fields_Title.svelte";
	import Compose_Individual_Fields_Label from "$lib/Compose_Individual_Fields_Label.svelte";
	import Compose_Individual_Fields_Input from "$lib/Compose_Individual_Fields_Input.svelte";
	import Compose from "./Compose.svelte";

	let { word, fullTextHeight, path } = $props();

	function playSound(sound) {
		let audio;
	}
</script>

<div class="mb-3">
	<Compose_Individual_Fields_Title content={word.word} />
	<div class="overflow-y-scroll" style="height: {fullTextHeight}px;">
		{#each Object.entries(word.characters) as [j, character]}
			<div class="container mb-1">
				<div class="row align-items-center">
					<div class="col-1">
						<Compose_Individual_Fields_Label
							content={character.character} />
					</div>
					<div class="col">
						<Compose_Individual_Fields_Input
							{path}
							bind:value={character.sound} />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
