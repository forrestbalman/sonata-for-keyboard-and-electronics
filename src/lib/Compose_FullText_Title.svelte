<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { piece } = $props();
</script>

<h3 class="text-center" style="font-family: {font()}; color: {accent()};">
	Full text <span class="fs-5"
		>{piece.text.split(" ").length} words - {piece.text.length} characters</span>
</h3>
<h5 class="text-center" style="font-family: {font()}; color: {accent()};">
	Click on a word to edit its character properties.
</h5>
