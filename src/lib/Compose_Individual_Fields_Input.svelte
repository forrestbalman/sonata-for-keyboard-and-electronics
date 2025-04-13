<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { path, value = $bindable() } = $props();
	let playing = $state(false);
	let audio = $state();

	function playSound() {
		event.preventDefault();

		audio = new Audio(`/sounds/${path}/${value}.mp3`);
		audio.onerror = () => {
			alert("The file doesn't exist or cannot be played.");
		};
		audio.oncanplaythrough = () => {
			playing = true;
			audio.play();
		};
		audio.onended = () => {
			playing = false;
		};
	}

	function stopSound() {
		playing = false;
		audio.pause();
	}
</script>

<div class="col">
	<div class="input-group">
		<input
			type="text"
			class="form-control"
			placeholder="File name"
			disabled={playing}
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
