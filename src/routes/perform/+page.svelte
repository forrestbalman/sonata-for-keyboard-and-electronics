<script>
	import Navbar from "$lib/Navbar.svelte";
	import Perform_Select_Button from "$lib/Perform_Select_Button.svelte";
	import { theme, bg, text, accent, font } from "$lib/theme.svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";
	import * as pieces from "$lib/pieces.svelte";
	import * as Tone from "tone";

	// show - controls visibility of elements on the page, as well as timeout values for the performance in the "timeouts" object
	// change "base" in the timeouts object to change inter-onset times for the start sequence
	let show = $state({
		navbar: true,
		select: false,
		perform: false,
		title: false,
		score: false,
		loadingBuffers: false,
		line: false,
		timeouts: {
			base: 2000, // base value for timeouts
		},
	});
	// piece - stores a local copy of the piece associated with the button that was clicked
	let piece = $state();
	// displayText - character by character display of the piece's text as the user "types" it out
	let displayText = $state("");
	// characterCounter - count of the current word's characters. Resets when the next word is introduced. Includes the space between words.
	let characterCounter = $state(0);
	// totalCharacters - introduced to help keep track of sentences, since the piece is being paced by sentences rather than words like it was originally.
	let totalCharacters = $state({
		count: 0,
		currentSentenceCount: 0,
		index: 0,
		width: 0,
	});
	// wordCounter - keeps track of the number of words that have been "typed" so far.
	let wordCounter = $state(0);
	// currentWord - stores the current word that the user is "typing" out.
	let currentWord = $state();
	// sentences - an array of the indices of the final periods in the piece's text. Used to pace the performance by sentences rather than words.
	let sentences = $state([]);
	// acceptInput - boolean that determines whether or not the user can input characters. Sets to false to create a brief pause between sentences.
	let acceptInput = $state(false);
	// started - boolean that determines whether or not the performance has started. For starting and ending the piece.
	let started = $state(false);
	// speed - a multiplier for the timeouts to speed up the performance for debugging purposes. Set to 1 for normal performance.
	let speed = 1;
	// sentenceDelayRange - an object with a min and max value for the delay between sentences.
	let sentenceDelayRange = $state({
		min: 1750,
		max: 3000,
	});
	// buffers - an object that stores the loaded audio buffers for the piece. Keeps track of the total number of unique audio files and how many have been loaded so far to prevent the performance from starting before all buffers are loaded.
	let buffers = $state({
		loaded: 0,
		total: 0,
		buffers: {},
	});
	let effects = $state([]);
	let gain = $state();
	let textBox = $state();

	// startPiece - function that initializes the performance
	async function startPiece(info) {
		// Initialize Tone.js
		await Tone.start();

		// put a lowpass filter on the output for the ambience? uncomment to use
		// filter = new Tone.Filter(800, "lowpass").toDestination();

		// make a local copy of the piece that's passed from the button
		piece = info;

		// for testing purposes
		// totalCharacters.count = piece.text.length - 10;

		// hide the navbar and select button
		// show a loading screen while buffers are loading
		// scroll to the piece
		show.navbar = false;
		show.select = false;
		show.loadingBuffers = true;
		goto("#piece");

		// load a separate buffer for the ambience since it won't load in the loop that's done for the characters
		if (piece.config.ambience) {
			buffers.buffers.ambience = new Tone.ToneAudioBuffer(
				`sounds/${piece.path}/${piece.config.ambience}.mp3`,
				() => {
					buffers.loaded++;
				}
			);
			buffers.total++;
		}

		// finds final periods in the piece's text
		const otherPunctuation = [".", ",", ";", "!", "?"];
		for (let i = 0; i < piece.text.length; i++) {
			if (piece.text[i] === "." && piece.text[i - 1] !== ".") {
				sentences.push(i);
			} else if (otherPunctuation.includes(piece.text[i])) {
				sentences.push(i);
			}
		}

		// looping through each of the piece's words to create unique audio buffers
		// for each word of an array created from "piece.separation" (an object that separates the piece's text into words and characters)
		for (const word of Object.entries(piece.separation)) {
			// looping through each word's individual characters from an array created from "word[1].characters" (an object that stores information for each character in the word)
			for (const character of Object.entries(word[1].characters)) {
				// if the character has a sound associated with it (character[1] exists), then...
				if (character[1])
					if (
						character[1].sound &&
						!buffers.buffers[character[1].sound]
					) {
						// if there's a sound associated with the character, and it doesn't currently exist in the buffers object, create and audio buffer and add to the total
						buffers.buffers[character[1].sound] =
							new Tone.ToneAudioBuffer(
								`sounds/${piece.path}/${character[1].sound}.mp3`,
								() => {
									buffers.loaded++;
								}
							);
						buffers.total++;
					}
			}
		}

		createEffects();
	}

	function createEffects() {
		gain = new Tone.Gain(1).toDestination();

		if (piece.config.effects) {
			for (const effect of Object.entries(piece.config.effects)) {
				const e = effect[1];

				if (e.type === "filter") {
					effects.push(new Tone.Filter(e.frequency));
				}
			}

			// Chain all effects to the destination
			if (effects.length > 0) {
				// Connect the first effect to the destination if there's only one
				if (effects.length === 1) {
					effects[0].connect(gain);
				} else {
					// Chain all effects together
					for (let i = 0; i < effects.length - 1; i++) {
						effects[i].connect(effects[i + 1]);
					}
					// Connect the last effect to the destination
					effects[effects.length - 1].connect(gain);
				}
			}
		}
	}

	// startSequence - when the player selects a piece to perform, this starts the sequence that visualizes the piece being loaded
	function startSequence() {
		// on click - fade new theme in, initialize values
		theme.config.colorway = piece.colorway;
		theme.config.font = piece.font;

		// show title
		setTimeout(() => {
			show.perform = true;
			show.title = true;
		}, show.timeouts.showTitle * speed);

		// hide title - about 2 seconds after title is shown
		setTimeout(() => {
			show.title = false;
		}, show.timeouts.hideTitle * speed);

		// start ambience (if there is one, it should be an audio file that loops seamlessly on it's own) - about 2 seconds after title is hidden
		setTimeout(() => {
			started = true;
			currentWord = piece.separation[characterCounter];

			if (piece.config.ambience) {
				ambienceLoop();
			}
		}, show.timeouts.ambience * speed);

		// show score - user defined start time. Starts counting down after ambience begins.
		setTimeout(() => {
			show.score = true;
		}, show.timeouts.score * speed);

		// acceptInput - about 2 seconds after the score is shown
		setTimeout(() => {
			acceptInput = true;
			show.line = true;
		}, show.timeouts.inputs * speed);
	}

	function ambienceLoop() {
		const ambience = new Tone.Player(buffers.buffers.ambience).connect(
			gain
		);
		ambience.fadeIn = 2;
		ambience.fadeOut = 2;
		ambience.start();
		console.log("looping");
		setTimeout(
			() => {
				ambienceLoop();
			},
			ambience.buffer.duration * 1000 * 0.9
		); // 0.95 to account for any slight delay in starting the next loop
	}

	// type - this function is called when the user presses a key on the keyboard
	function type(event) {
		// this array determines which keys are invalid for input. If the key pressed is in this array, then it won't be accepted as input.
		const invalidKeys = [
			"Control",
			"Shift",
			"Alt",
			"Meta",
			"Enter",
			"Backspace",
			"Tab",
			"Escape",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
		];

		// if input is currently being accepted, and the key is a valid key, then...
		if (acceptInput && !invalidKeys.includes(event.key)) {
			// if the character counter is the length of the current word, add a space to the display text
			// otherwise, the display text would be one long spaceless string
			if (characterCounter === currentWord.word.length) {
				displayText += " ";
				// otherwise, add the next expected character to the display text
			} else {
				displayText +=
					currentWord.characters[characterCounter].character;

				// and, if there's a sound associated with a character, play that sound
				if (currentWord.characters[characterCounter].sound) {
					const sound = new Tone.Player(
						buffers.buffers[
							currentWord.characters[characterCounter].sound
						]
					).connect(effects[0] ? effects[0] : gain);
					sound.start();
				}
			}

			// for all characters, increment the character counter, total character count, and current sentence count
			characterCounter++;
			totalCharacters.count++;
			totalCharacters.currentSentenceCount++;

			textBox.scrollTop = textBox.scrollHeight;
		}
	}

	// howFast - console logs the current speed multiplier if it's not set to 1.
	function howFast() {
		if (speed !== 1) {
			const rate = (1 / speed).toFixed(2);
			console.log(
				`Speed is ${rate} times faster than normal. Remember to set it back to 1 for performance.`
			);
		}
	}

	// calculateTimeouts - creates timeout values for the performance's start sequence.
	function calculateTimeouts() {
		show.timeouts.showTitle = show.timeouts.base;
		show.timeouts.hideTitle = show.timeouts.showTitle * 2;
		show.timeouts.ambience = show.timeouts.hideTitle + show.timeouts.base;
		show.timeouts.score = show.timeouts.ambience + piece.config.startTime;
		show.timeouts.inputs = show.timeouts.score + show.timeouts.base;
	}

	// transitionBetweenSentences - this function creates a delay between sentences to allow the user to catch up with the performance. It resets the character counter and total character count for the next sentence.
	function transitionBetweenSentences(mod) {
		const delay =
			Math.floor(
				Math.random() *
					(sentenceDelayRange.max - sentenceDelayRange.min)
			) + sentenceDelayRange.min;
		acceptInput = false;
		setTimeout(() => {
			totalCharacters.index++;
			totalCharacters.currentSentenceCount = 0;
			acceptInput = true;
		}, delay / mod);
	}

	function updateProgressBarWidth() {
		// for sentences beyond the first, the width of the progress bar is the distance from the previous sentence to the current one
		// example - first sentence ends at character 10, second at 20, so the width of the progress bar is 20 - 10 = 10
		if (totalCharacters.index > 0) {
			totalCharacters.width =
				sentences[totalCharacters.index] -
				sentences[totalCharacters.index - 1];
			// for the first sentence, the width is simply the index of the first sentence, since the first character is 0
		} else {
			totalCharacters.width = sentences[totalCharacters.index];
		}
	}

	// effect - creates timeouts when piece is assigned
	$effect(() => {
		if (piece) {
			calculateTimeouts();
		}
	});

	// effect - checks if all buffers are loaded before starting the performance sequence, then runs the "startSequence" function
	// run this locally if download time is going to be an issue.
	$effect(() => {
		// if the total number of buffers isn't it's default value of 0, and the number of loaded buffers matches the expected number of buffers, then...
		if (buffers.total > 0 && buffers.loaded === buffers.total) {
			// hide the loading screen
			show.loadingBuffers = false;

			// start the performance sequence
			setTimeout(startSequence, 1000);
		}
	});

	// effect - once the performance starts, this keeps current word updated and checks if the player reaches the end of a sentence
	// changing "delay" will impact the range of times between sentences
	$effect(() => {
		// if the performance is started, then...
		if (started) {
			// if the character counter is the same as the current word's length + 1 (+ 1 to account for the space between words), then...
			if (
				currentWord &&
				characterCounter === currentWord.word.length + 1
			) {
				// update the word counter, reset the character counter, and update the current word to the next word in the piece's text
				wordCounter++;
				characterCounter = 0;
				currentWord = piece.separation[wordCounter];
			}

			// if the player reaches the end of a sentence (the total number of characters typed is equal to the index of the sentence + 1), then transition between sentences
			if (
				totalCharacters.count ===
				sentences[totalCharacters.index] + 1
			) {
				if (sentences[totalCharacters.index + 1] === ".") {
					transitionBetweenSentences(1);
				} else {
					transitionBetweenSentences(3);
				}
			}
		}
	});

	// effect - calculates the progress bar's relative width based on the current sentence
	$effect(updateProgressBarWidth);

	// fading out the piece when the final text is typed
	$effect(() => {
		if (piece && totalCharacters.count >= piece.text.length) {
			acceptInput = false;
			gain.gain.rampTo(0, 10);

			setTimeout(() => {
				show.score = false;
				setTimeout(() => {
					show.title = true;

					setTimeout(() => {
						show.title = false;

						setTimeout(() => {
							window.location.reload();
						});
					}, 4000);
				}, 4000);
			}, 10000);
		}
	});

	// set select to true to create fade in effect
	onMount(() => {
		howFast();
		setTimeout(() => {
			show.select = true;
		}, 1000);
	});
</script>

<svelte:window onkeydown={type} />
<Navbar show={show.navbar} />
<main class="min-vh-100" style="background: {bg()};">
	<div id="piece" class="container">
		{#if show.select}
			<div transition:fade={{ duration: 500 }}>
				<h1
					class="text-center mb-5"
					style="color: {accent()}; font-family: {font()};">
					Select a piece
				</h1>
				<div class="d-flex justify-content-center flex-wrap gap-3">
					{#each Object.entries(pieces) as [k, info]}
						<Perform_Select_Button
							{info}
							update={() => startPiece(info)} />
					{/each}
				</div>
			</div>
		{:else if show.perform}
			<div
				class="min-vh-100 w-100 position-relative d-flex flex-column"
				transition:fade={{ duration: 500 }}>
				{#if show.title}
					<h1
						class="text-center position-absolute top-50 start-50 translate-middle w-100"
						style="color: {text()}; font-family: {font()};"
						transition:fade={{ duration: 500 }}>
						{piece.title}
					</h1>
				{:else if show.loadingBuffers}
					<div
						class="position-absolute top-50 start-50 translate-middle"
						transition:fade={{ duration: 500 }}>
						<h1
							class="text-center"
							style="color: {text()}; font-family: {font()};">
							Loading buffers...
						</h1>
						<div
							class="w-100"
							style="height: 20px; border: 2px solid {accent()};">
							<div
								class="h-100"
								style="width: {(buffers.loaded /
									buffers.total) *
									100}%; background: {accent()};">
							</div>
						</div>
					</div>
				{/if}
				{#if show.score}
					{#if show.line}
						<div
							class="score w-100 align-self-center rounded-1 mb-5 mt-3 overflow-hidden"
							style="height: 10px; border: 2px solid {accent()}; opacity: {acceptInput
								? 1
								: 0}; transition: opacity 0.5s ease-in-out;"
							transition:fade={{ duration: 500 }}>
							<div
								class="h-100 d-flex align-items-center"
								style="width: {(totalCharacters.currentSentenceCount /
									totalCharacters.width) *
									100}%; background: {accent()};">
							</div>
						</div>
					{/if}
					<div
						class="overflow-y-scroll"
						style="height: 80vh"
						bind:this={textBox}
						transition:fade={{ duration: 500 }}>
						<p
							class="user-select-none fs-2"
							style="color: {text()}; font-family: {font()};">
							{displayText}
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</main>
