<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { id, content, value = $bindable() } = $props();
	let hovered = $state(false);

	function handleClick() {
		value = Number(id);
	}
</script>

<button
	class="btn p-1"
	style="background: {hovered ? text() : bg()}; color: {hovered
		? bg()
		: text()};"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onclick={handleClick}>
	{#each Object.entries(content.characters) as [key, c]}
		<span
			style="background: {c.sound || hovered
				? text()
				: bg()}; color: {c.sound || hovered ? bg() : text()};"
			>{c.character}</span>
	{/each}
</button>
{" "}
