<script>
	import {
		theme,
		darkest,
		dark,
		light,
		lightest,
		font,
	} from "$lib/theme.svelte";
</script>

<nav
	class="w-100 d-flex justify-content-between p-3"
	style="background: {darkest()};">
	<a
		class="text-decoration-none fs-4"
		href="https://forrestbalman.com"
		style="font-family: {font()}; color: {light()};">
		Forrest</a>
	<div class="d-flex gap-2">
		<select class="form-select" bind:value={theme.config.colorway}>
			{#each Object.entries(theme.colorways) as [key, item]}
				<option value={key} style={font()}>{key}</option>
			{/each}
		</select>
		<select class="form-select flex-grow-1" bind:value={theme.config.font}>
			{#each theme.fonts as item}
				<option value={item} style="font-family: {item};"
					>{item}</option>
			{/each}
		</select>
	</div>
</nav>
