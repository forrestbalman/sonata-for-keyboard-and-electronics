<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
</script>

<h3 class="text-center" style="font-family: {font()}; color: {accent()};">
	Save progress
</h3>
<ol>
	<li style="font-family: {font()}; color: {accent()};">
		Clicking the <code style="color: {text()};">export</code> button beneath
		these instructions will copy all of the changes you've made to the piece
		to your clipboard.
	</li>
	<li style="font-family: {font()}; color: {accent()};">
		Navigate to <code style="color: {text()};"
			>src/lib/pieces.svelte.js</code> and locate the piece you're modifying.
	</li>
	<li style="font-family: {font()}; color: {accent()};">
		Replace everything between the curly braces inside of <code
			style="color: {text()};">$state()</code> with the text copied to your
		clipboard to make permanent changes.
	</li>
</ol>
