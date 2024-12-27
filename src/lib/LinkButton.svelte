<script>
	import { darkest, dark, light, lightest, font } from "$lib/theme.svelte";
	let { href, text } = $props();
</script>

<a
	{href}
	class="btn"
	style="background: {dark()}; font-family: {font()}; color: {lightest()};"
	>{text}</a>
