<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { piece } = $props();

	function copyText(event) {
		event.preventDefault();
		navigator.clipboard
			.writeText(JSON.stringify(piece))
			.then(() => {
				alert("Copied to clipboard");
			})
			.catch((error) => {
				alert("Copy failed: " + error);
			});
	}
</script>

<button
	class="btn btn-lg w-100"
	style="background: {text()}; color: {bg()}; font-family: {font()}"
	onclick={copyText}>
	Export
</button>
