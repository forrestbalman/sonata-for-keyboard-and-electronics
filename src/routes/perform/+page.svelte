<script>
	import Navbar from "$lib/Navbar.svelte";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import * as pieces from "$lib/pieces.svelte";
</script>

<main class="min-vh-100" style="background: {bg()};">
	<div
		class="container d-flex justify-content-center align-items-center flex-grow-1">
		<h1
			class="display-4 text-center"
			style="color: {accent()}; font-family: {font()};">
			Title
		</h1>
	</div>
</main>
