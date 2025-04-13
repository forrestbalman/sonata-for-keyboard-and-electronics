<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import { fade } from "svelte/transition";

	let { func, content, description, disabled = false } = $props();
	let hovered = $state(false);
	// width of the tooltip
	let width = $state(200);
</script>

<div
	class="position-relative"
	role="button"
	tabindex="0"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}>
	<button
		class="btn"
		style="background: {accent()}; color: {bg()}; font-family: {font()};"
		onclick={func}
		bind:clientWidth={width}>
		{content}
	</button>
	{#if hovered}
		<div
			class="position-absolute top-100 start-0 p-2 mt-1 rounded z-1"
			style="background: {text()}; text: {bg()}; width: {width}px; min-width: 125px; font-family: {font()};"
			transition:fade={{ duration: 100 }}>
			<p class="m-0">{description}</p>
		</div>
	{/if}
</div>
