<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
</script>

<h5 style="font-family: {font()}; color: {accent()};">
	How to use your own sound files
</h5>
<ol>
	<li style="font-family: {font()}; color: {accent()};">
		Place your sound file(s) in the <code style="color: {text()};"
			>static</code>
		folder.
		<span class="fw-bold">The file must be in <code>.mp3</code> format</span
		>.
	</li>
	<li style="font-family: {font()}; color: {accent()};">
		Type the name of the file into the field next to the character you'd
		like the sound to play when pressed. For example,
		<code style="color: {text()};">my_sound_file</code>.
	</li>
	<li style="font-family: {font()}; color: {accent()};">
		Valid sound files should playback when you press the <span>
			<i class="bi bi-play-fill" style="color: {text()};"></i></span> button
		for the character you've assigned the sound to.
	</li>
</ol>
