<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { value = $bindable() } = $props();
	let hovered = $state(false);
</script>

<div>
	<label
		for="startTime"
		class="form-label"
		style="font-family: {font()}; color: {accent()};">
		{hovered ? "Typing will begin after this delay (in ms)" : "Start time"}
	</label>
	<div
		class="input-group"
		role="group"
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}>
		<input
			type="number"
			class="form-control"
			placeholder="File name"
			id="startTime"
			bind:value />
	</div>
</div>
