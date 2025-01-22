<script lang="ts">
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import { fade, slide } from "svelte/transition";
	import CursorGlow from "$lib/components/cursorGlow.svelte";
	import ShowImage from "$lib/components/showImage.svelte";

	let pageLoaded = false;

	onMount(() => {
		setTimeout(() => {
			pageLoaded = true
		} , 1000)
	});

</script>

<!-- Game Discription -->
{#if pageLoaded}
	<div>
		<p in:fade={{duration: 1000}} class="inter-bold text-3xl text-center mt-2 text-white">Tetris-Svelte</p>
		<p in:fade={{duration: 2000}} class="inter text-center text-white">A Tetris clone made with <a href="https://svelte.dev/" class="text-blue-500 inter-bold">Sveltekit</a>, <a href="https://tailwindcss.com/" class="text-blue-500 inter-bold">TailwindCSS</a>, Typescript and <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io</a></p>
		<p in:fade={{duration: 3000}} class="inter text-center text-white">Heavily inspired by <a href="https://tetr.io/" class="text-blue-500 inter-bold">tetr.io</a></p>
	</div>
{/if}

<br>
<br>
<br>



<!-- Process -->
{#if pageLoaded}
	<div class="inter text-left text-white ml-5">
		<p transition:slide={{duration:1000, axis:"y"}} class="inter-bold text-3xl text-left mt-2 text-white">The process</p>
		<p>We began by creating the base of the game, moving the pieces, collisions,</p>
		<p>line clearing, scoring and the leveling system.</p>
		<br>
		<p class="inter-bold text-2xl text-left mt-2 text-white">Canvas</p>
			<p class="inter-bold">We began by creating a canvas to render the game on.</p>
			<p>The canvas element is bound to the canvas variable using Svelte's bind:this directive.</p>
			<p>This allows us to easily manipulate the canvas within our code.</p>
			<ShowImage src="canvas.png" alt="canvas"/>

			<p class="inter-bold">We then render each piece via the draw function.</p>
			<p>The draw function iterates through all pieces and renders them on the canvas.</p>
			<p>Each piece is represented as a Piece object with properties like x, y, shape, and color.</p>
			<ShowImage src="draw.png" alt="draw"/>
			
			<p class="inter-bold">The grid is then updated to reflect the positions of all grounded pieces.</p>
			<p>The updateGrid function iterates through all pieces and updates the grid:</p>
			<ShowImage src="updateGrid.png" alt="updateGrid"/>

		<p class="inter-bold text-2xl text-left mt-2 text-white">Movement</p>
			<p>Movement was fairly simple to implement, if you press a certain key,</p>
			<p>it will manipulate the position of the piece.</p>

		<p class="inter-bold text-2xl text-left mt-2 text-white">Collisions</p>
			<p>Collisions were not nearly as simple to implement</p>
			<p>and they became a mess of loops, but it works as intended.</p>
			<p>The function is much longer, but this is the important part.</p>
			<ShowImage src="collisions.png" alt="collisions"/>

		<p class="inter-bold text-2xl text-left mt-2 text-white">Line clearing</p>
			<p>Line clearing also had its fair share of issues, the main issue was when creating a new piece</p>
			<p>it would not make a proper copy of the shape, but after some debugging, it works as intended.</p>
			<ShowImage src="clearLines.png" alt="clearLines"/>

		<p class="inter-bold text-2xl text-left mt-2 text-white">Scoring</p>
			<p>Scoring was fairly simple to implement, we just added a score variable</p>
			<p>and added a certain amount of points for each line cleared</p>
			<ShowImage src="updateScore.png" alt="updateScore"/>

		<p class="inter-bold text-2xl text-left mt-2 text-white">Hold Piece and Next Piece</p>
			<p>Hold Piece and Next Piece were both fairly simple to implement.</p>
			<p>Properly displaying each piece was the hard part, the code is a little jank but it works.</p>
			<p>You can view the code for these in the "src/lib/components" folder on the <a class="text-blue-500 inter-bold" href="https://github.com/tretegg/tetris-svelte" target="_blank">Github</a> if you're interested.</p>

		<br>
			<p class="inter-bold text-3xl text-left mt-2 text-white">Multiplayer</p>
	</div>
{/if}

<CursorGlow />