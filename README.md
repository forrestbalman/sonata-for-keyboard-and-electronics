# Sonata for keyboard and electronics

Download or clone this repository to run your own local copy of the engine. This repository will stay updated with any of my compositions; however, you'll need your own copy to perform/edit/compose.

## Overview

This is a piece generator for mechanical keyboard, electronics, and (optional) projection. I've graded this piece 5/5 accessible, meaning theres no prior music experience
needed in order to perform. You can learn more about accessibility grades here:

The concept behind the piece is inspired by a few things:

-   My curiosity surrounding the mechanical keyboard community and their fascination with sound, especially how timbres are classified: https://www.youtube.com/watch?v=AjJT1Un2pIg.
-   Typing tests and learn-to-type education as a primer for the notation.
-   Looking at the keyboard as an "everyday instrument" that isn't contextualized musically in its regular use.

Performing this piece requires no prior experience.
Performance materials include:

-   Mechanical keyboard
-   Microphone
-   Speakers
-   Screen/Projector

The user sits and "types" out the body of text following the on-screen prompt that progresses through the chosen body of text. As the user works their way through the prompt, your
provided sounds play.

## Running the engine

Make sure to have NodeJS and the Node Package Manager installed on the machine you plan to perform/compose on

1. Grab a copy of the engine by either downloading the code or cloning it to your machine
2. Open up the directory containing the engine in terminal of your choice
3. Type `npm i` to install all libraries
4. Type `npm run dev` to start the engine. If you have web development experience, you might look into creating a build of the engine, but because it's running locally, I didn't see a point in creating a build. A localhost address (usually @ port 5173) will pop up at the bottom of the terminal

## Composing

Before composing, you're going to need a few things:

-   A text editor that you can readily use to update the `pieces.svelte.js` file, which is located in `src > lib > pieces.svelte.js`
-   A body of text to type through
-   (optional for now) a few sounds to test that the local copy of the engine is working

To compose, navigate to the localhost link and click the `compose` button. Once the page is open, navigate to the `pieces.svelte.js` file and create a new piece. Then create a new variable using the syntax of the other 3 pieces in the file as a guide: `export let titleOfThePiece = $state({})`. You can follow the comments at the top of the page, or use the steps below as a guide. Inside the curly braces...

1. Define a colorway from the list of available colorways in theme.svelte.js which is located in `src > lib`
2. Define a font from the list of available fonts in theme.svelte.js
3. Define a title: this is the text that will be displayed in the various headers around the site.
4. Define a path: this is the name of the folder that contains all of the audio files for this piece. I recommend using a hyphen separated name for the path.
    - After this, navigate to `static > sounds` and create a new folder with the same name as the path.
5. Define a description: this is the text that will pop up as a tooltip when the user hovers over buttons that link to this piece.
6. Define a text: this is the body of text that will be used for the piece.
7. Define a config object: this object contains:
    - ambience: the name of the ambience file that will play in the background. It should be a looping sound.
    - startTime: the time in milliseconds that the typing portion of the piece kicks in at.
    - effects: an array of effects to apply to the audio. Each effect is an object with a type and parameters. The type can be "filter", "reverb", "delay", etc. For example, { type: "filter", frequency: 800 } applies a low-pass filter at 800Hz. You can add multiple effects to create a richer soundscape.
8. Define a separation object: consists of metadata related to each character in the piece without spaces. To add a separation object for the first time:
    - go to compose
    - open up dev tools
    - copy the object from the console
    - paste it here

Once your template 'piece' is created, you can use the engine to assign sounds to individual characters.

1. Click the piece you'd like to modify. You can even modify my pieces if you'd like.
2. Click on the word in the left hand panel to see it's sound files. Characters with a sound file associated with them will be highlighted.
3. Enter the name of the sound file in the field for the character you'd like to trigger it.
    - The file must be placed in the folder you created earlier in `static > sounds`.
    - The file must be in mp3 format
    - The name you type into the field shouldn't include `.mp3`
    - If you did these correctly, the play button will play the sound referenced in the field
4. Before reloading the page, click the `Export` button to copy all of the changes to your clipboard. This doesn't automatically save your changes!
    - Navigate to `pieces.svelte.js`
    - Highlight all content in between the curly braces, including the curly braces themselves.
    - Paste the contents of your clipboard and save.
