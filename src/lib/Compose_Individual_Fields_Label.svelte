<script>
    import { theme, bg, text, accent, font } from "$lib/theme.svelte";

    let { content } = $props();
</script>

<p class="m-0" style="font-family: {font()}; color: {text()};">
	{content}
</p>
