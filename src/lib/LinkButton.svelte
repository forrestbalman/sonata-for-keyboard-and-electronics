<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	
	let { href, content } = $props();
</script>

<a
	{href}
	class="btn"
	style="background: {accent()}; font-family: {font()}; color: {bg()};"
	>{content}</a>
