<script>
	import Compose_Export_Title from "$lib/Compose_Export_Title.svelte";
	import Compose_Export_Button from "$lib/Compose_Export_Button.svelte";
	import Compose from "./Compose.svelte";

	let { piece } = $props();
</script>

<Compose_Export_Title />
<Compose_Export_Button {piece} />
