<script>
	import Navbar from "$lib/Navbar.svelte";
	import LinkButton from "$lib/LinkButton.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { snippets } from "$lib/snippets.svelte";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	const title = {
		show: false,
	};
	const example = {
		body: "",
		show: false,
		cursor: false,
	};

	function pickSnippet() {
		setTimeout(() => {
			const snippet =
				snippets[Math.floor(Math.random() * snippets.length)];
			let time = 250;
			let counter = 0;

			example.show = true;

			function type() {
				if (counter <= snippet.length) {
					example.body = snippet.substring(0, counter);

					if (snippet[counter - 1] === " ") {
						time =
							Math.floor(Math.random() * (400 - 200) + 1) + 200;
					} else {
						time =
							Math.floor(Math.random() * (200 - 100) + 1) + 100;
					}

					counter++;

					setTimeout(type, time);
				} else {
					setTimeout(() => {
						example.show = false;
					}, 2000);

					setTimeout(pickSnippet, 3000);
				}
			}

			type();
		}, 2000);
	}

	function blinkCursor() {
		example.cursor === "" ? (example.cursor = "|") : (example.cursor = "");
		setTimeout(blinkCursor, 250);
	}

	onMount(() => {
		title.show = true;
		pickSnippet();
		blinkCursor();
	});
</script>

<Navbar show={true} />
<main class="min-vh-100" style="background: {bg()};">
	<div class="container text-center">
		{#if title.show}
			<div
				class="title d-flex flex-column justify-content-end mb-3"
				transition:fade={{ delay: 1000 }}
				style="min-height: 50vh;">
				<h1
					class="display-1"
					style=" color: {accent()}; font-family: {font()};">
					Sonata
				</h1>
				<h2
					class="fw-light"
					style="color: {accent()}; font-family: {font()};">
					for Mechanical Keyboard + Electronics
				</h2>
			</div>
			<div
				class="d-flex justify-content-center gap-3 mb-3"
				transition:fade={{ delay: 1000 }}>
				<LinkButton href="/perform" content="Perform" />
				<LinkButton href="/compose" content="Compose" />
				<LinkButton href="/about" content="About" />
			</div>
			{#if example.show}
				<p
					class="snippet text-start m-0"
					transition:fade
					style="color: {text()}; font-family: {font()};">
					{example.body}{example.cursor}
				</p>
			{/if}
		{/if}
	</div>
</main>

<style>
	.container {
		max-width: 800px;
	}
</style>
