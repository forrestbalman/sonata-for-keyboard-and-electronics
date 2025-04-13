<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	let { light } = $props();
</script>

<div class="d-flex flex-column gap-1">
	<div
		class="keyboard rounded-1"
		style="width: 200px; height: 100px; border: 2px solid {accent()}; background: {light
			? accent()
			: bg()}">
	</div>
	<div
		class="spacebar rounded-1"
		style="width: 200px; height: 30px; border: 2px solid {accent()}; background: {light
			? accent()
			: bg()}">
	</div>
</div>

<style>
	* {
		transition: background 0.1s ease-in-out;
	}
</style>
