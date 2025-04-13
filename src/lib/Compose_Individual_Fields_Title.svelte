<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { content } = $props();
</script>

<h5 class="mb-3" style="font-family: {font()}; color: {text()};">
	{content}
</h5>
