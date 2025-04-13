<script>
	import "bootstrap/dist/css/bootstrap.min.css";
	import "bootstrap-icons/font/bootstrap-icons.css";
	import "../app.css";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { children } = $props();
</script>

{@render children()}
