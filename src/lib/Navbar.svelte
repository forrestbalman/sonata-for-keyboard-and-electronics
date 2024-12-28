<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { c, f, show } = $props();
	let changeTheme = $state(false);
</script>

<nav
	class="w-100 d-flex p-3 {show ? 'justify-content-between' : ''}"
	style="background: {bg(c)};">
	<a
		class="text-decoration-none fs-4"
		href="https://forrestbalman.com"
		style="font-family: {font(f)}; color: {accent(c)};">
		Forrest</a>
	{#if show}
		{#if changeTheme}
			<div class="d-flex gap-2 align-items-center">
				<a
					href="/"
					class="text-decoration-none me-2"
					style="color: {text(c)}; font-family: {font(f)};">Home</a>
				<select
					class="form-select"
					bind:value={theme.config.colorway}>
					{#each Object.entries(theme.colorways) as [key, item]}
						<option value={key} style={font()}>{key}</option>
					{/each}
				</select>
				<select
					class="form-select flex-grow-1"
					bind:value={theme.config.font}>
					{#each theme.fonts as item}
						<option value={item} style="font-family: {item};"
							>{item}</option>
					{/each}
				</select>
				<button
					class="btn"
					style="background: {text()}; color: {bg()};"
					onclick={() => (changeTheme = null)}
					aria-label="Close">
					<i class="bi bi-x-lg"></i>
				</button>
			</div>
		{:else}
			<button
				class="btn"
				style="background: {accent()}; color: {bg()}; font-family: {font()};"
				onclick={() => (changeTheme = true)}
				aria-label="Change theme">Change theme</button>
		{/if}
	{/if}
</nav>
