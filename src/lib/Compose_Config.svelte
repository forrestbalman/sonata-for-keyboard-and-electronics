<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import Compose_Config_Title from "$lib/Compose_Config_Title.svelte";
	import Compose_Config_Ambience from "$lib/Compose_Config_Ambience.svelte";
	import Compose_Config_StartTime from "$lib/Compose_Config_StartTime.svelte";

	let { piece } = $props();
</script>

<Compose_Config_Title />
<div class="d-flex flex-column gap-1">
	<Compose_Config_StartTime bind:value={piece.config.startTime} />
	<Compose_Config_Ambience
		path={piece.path}
		bind:value={piece.config.ambience} />
</div>
