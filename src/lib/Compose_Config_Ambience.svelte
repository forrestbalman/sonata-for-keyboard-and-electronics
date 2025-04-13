<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { path, value = $bindable() } = $props();
	let playing = $state(false);
	let hovered = $state(false);
	let audio = $state()

	function playSound() {
		event.preventDefault();

		audio = new Audio(`/sounds/${path}/${value}.mp3`);
		audio.onerror = () => {
			alert("The file doesn't exist or cannot be played.");
		};
		audio.oncanplaythrough = () => {
			audio.play();
			playing = true;
		};
	}

	function stopSound() {
		playing = false;
		audio.pause();
	}
</script>

<div>
	<label
		for="ambience"
		class="form-label"
		style="font-family: {font()}; color: {accent()};">
		{hovered ? "A loop to play the entire length of the piece" : "Ambience"}
	</label>
	<div
		class="input-group"
		role="group"
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}>
		<input
			type="text"
			class="form-control"
			placeholder="File name"
			id="ambience"
			bind:value />
		{#if playing}
			<button
				class="btn"
				style="background: {text()}; color: {bg()};"
				aria-label="Stop sound"
				onclick={stopSound}>
				<i class="bi bi-stop-fill"></i>
			</button>
		{:else}
			<button
				class="btn"
				style="background: {text()}; color: {bg()};"
				aria-label="Play sound"
				onclick={playSound}>
				<i class="bi bi-play-fill"></i>
			</button>
		{/if}
	</div>
</div>
