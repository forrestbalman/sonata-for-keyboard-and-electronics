<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import Compose_FullText_Body_Link from "$lib/Compose_FullText_Body_Link.svelte";
	import Compose from "./Compose.svelte";

	let { piece, fullTextHeight, value = $bindable() } = $props();
</script>

<p
	class="overflow-y-scroll user-select-none"
	style="font-family: {font()}; color: {text()}; height: {fullTextHeight}px;">
	{#each Object.entries(piece.separation) as [i, word ]}
		<Compose_FullText_Body_Link id={i} content={word} bind:value />
	{/each}
</p>
