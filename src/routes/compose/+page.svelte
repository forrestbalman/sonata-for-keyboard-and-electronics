<script>
	import Navbar from "$lib/Navbar.svelte";
	import Compose from "$lib/Compose.svelte";
	import LinkButton from "$lib/LinkButton.svelte";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import * as pieces from "$lib/pieces.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	let piece = $state();
</script>

<Navbar show={true} />
<main class="d-flex flex-column min-vh-100" style="background: {bg()};">
	<section class="container mb-5">
		<h2
			class="text-center mb-2"
			style="font-family: {font()}; color: {accent()}">
			Select a piece
		</h2>
		<div class="d-flex flex-wrap gap-2 justify-content-center">
			{#each Object.entries(pieces) as [key, value]}
				<button
					class="btn"
					style="background: {accent()}; color: {bg()}; font-family: {font()};"
					onclick={() => (piece = value)}>
					"{value.title}"
				</button>
			{/each}
			<LinkButton href="/custom-compose" content="Write your own" />
		</div>
	</section>
	{#if piece}
		<Compose {piece} />
	{/if}
</main>
