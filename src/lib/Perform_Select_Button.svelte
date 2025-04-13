<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";

	let { info, update } = $props();
	let hovered = $state(false);
	let infoTheme = {
		bg: theme.colorways[info.colorway].bg,
		text: theme.colorways[info.colorway].text,
		accent: theme.colorways[info.colorway].accent,
		font: theme.fonts[theme.fonts.indexOf(info.font)],
	};
</script>

<button
	class="btn text-start p-3 rounded-2 d-flex flex-column"
	style="max-width: 400px; background: {hovered
		? infoTheme.bg
		: bg()}; border: 2px solid {hovered ? infoTheme.accent : accent()};"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onclick={update}>
	<div class="d-flex flex-column">
		<h4
			style="color: {hovered
				? infoTheme.accent
				: accent()}; font-family: {infoTheme.font};">
			{info.title}
		</h4>
		<hr
			class="w-100"
			style="height: 3px; background: {hovered
				? infoTheme.accent
				: accent()};" />
	</div>
	<p
		class="m-0"
		style="color: {hovered
			? infoTheme.accent
			: accent()}; font-family: {infoTheme.font}">
		{info.description}
	</p>
</button>
