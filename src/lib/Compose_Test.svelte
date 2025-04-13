<script>
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import * as Tone from "tone";
	import { onMount } from "svelte";
	import Compose_Test_Keyboard from "$lib/Compose_Test_Keyboard.svelte";
	import ButtonTooltip from "$lib/ButtonTooltip.svelte";
	import { preventDefault } from "svelte/legacy";

	let { piece } = $props();
	let displayText = $state("");
	let buffers = $state({
		loaded: 0,
		total: 0,
		disableButton: true,
		buffers: {},
	});
	let characterArray = $state([]);
	let audioStarted = $state(false);
	let light = $state(null);
	let characterCounter = $state(0);
	let acceptKeyPress = $state(false);
	let cursor = $state({
		start: false,
		visible: false,
	});
	let filter = $state();

	function generateCharacterArray() {
		let counter = 0;

		for (const [i, word] of Object.entries(piece.separation)) {
			for (const [j, character] of Object.entries(word.characters)) {
				characterArray.push({
					character: character.character,
					timing: generateTiming(counter),
					sound: character.sound,
				});
				counter++;
			}

			characterArray.push({
				character: " ",
				timing: generateTiming(counter),
			});
			counter++;
		}

		function generateTiming(index = 0) {
			const totalCharacters = piece.text.split("").length;

			for (const breakpoint of piece.config.breakpoints) {
				if (
					index >= totalCharacters * breakpoint.start &&
					index <= totalCharacters * breakpoint.end
				) {
					const timing = linearScale(
						index,
						totalCharacters * breakpoint.start,
						totalCharacters * breakpoint.end,
						breakpoint.to,
						breakpoint.from
					);
					return timing;
				}
			}

			function linearScale(x, in_min, in_max, out_min, out_max) {
				return (
					((x - in_min) * (out_max - out_min)) / (in_max - in_min) +
					out_min
				);
			}
		}
	}

	function makeBuffers() {
		if (piece.config.ambience) {
			buffers.buffers.ambience = new Tone.ToneAudioBuffer(
				`sounds/${piece.path}/${piece.config.ambience}.mp3`,
				() => {
					buffers.loaded++;
				}
			);
			buffers.total++;
		}

		for (const character of characterArray) {
			if (character.sound && !buffers.buffers[character.sound]) {
				buffers.buffers[character.sound] = new Tone.ToneAudioBuffer(
					`sounds/${piece.path}/${character.sound}.mp3`,
					() => {
						buffers.loaded++;
					}
				);
				buffers.total++;
			}
		}
	}

	async function test() {
		if (!audioStarted) {
			await Tone.start();
			audioStarted = true;
		}

		if (buffers.buffers.ambience) {
			const ambience = new Tone.Player(
				buffers.buffers.ambience
			).toDestination();
			ambience.fadeIn = 2;
			ambience.loop = true;
			ambience.start();
		}

		filter = new Tone.Filter(800, "lowpass").toDestination();

		cursorBlink();
		lightUp();
	}

	$effect(() => {
		if (buffers.loaded === buffers.total && buffers.total > 0) {
			buffers.disableButton = false;
		}
	});

	function cursorBlink() {
		cursor.start = true;
		setInterval(() => {
			cursor.visible = !cursor.visible;
		}, 530);
	}

	function lightUp() {
		if (!acceptKeyPress) {
			const character = characterArray[characterCounter];
			setTimeout(() => {
				acceptKeyPress = true;
				light = true;
			}, character.timing);
		}
	}

	function typing(e) {
		if (acceptKeyPress) {
			const character = characterArray[characterCounter];
			acceptKeyPress = false;
			light = null;
			characterCounter += 1;
			displayText += character.character;

			if (character.sound) {
				const player = new Tone.Player(
					buffers.buffers[character.sound]
				);
				player.fadeOut = 0.01;
				player.connect(filter).start();
			}

			lightUp();
		}
	}

	onMount(() => {
		generateCharacterArray();
		makeBuffers();
	});
</script>

<svelte:window on:keydown={typing} />
<div class="mb-3 min-vh-100">
	<div class="d-flex flex-column align-items-center gap-3 mb-5">
		<div>
			<h3
				class="text-center"
				style="color: {accent()}; font-family: {font()};">
				Test your audio
			</h3>
			<div class="d-flex justify-content-center gap-2 w-100">
				<ButtonTooltip
					func={test}
					content="Test"
					description="Simulate a performance of the piece so far"
					disabled={buffers.disableButton} />
			</div>
		</div>
		<Compose_Test_Keyboard {light} />
	</div>
	<p class="fs-2" style="color: {text()}; font-family: {font()};">
		{`${displayText}${cursor.visible ? "|" : ""}`}
	</p>
</div>
