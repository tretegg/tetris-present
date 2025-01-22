<script lang="ts">
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import { fade, scale } from "svelte/transition";
	import ShowImage from "$lib/components/showImage.svelte";
	import { CodeBlock, storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import typescript from 'highlight.js/lib/languages/typescript';
	import * as CODE from "$lib/components/constants/codeBlocks"

	import 'highlight.js/styles/github-dark.css';
	import CursorGlow from "$lib/components/cursorGlow.svelte";

	let pageLoaded = false;

	onMount(() => {
		hljs.registerLanguage('typescript', typescript);

		storeHighlightJs.set(hljs);

		setTimeout(() => {
			pageLoaded = true
		} , 500)
	});

</script>

<div class="w-full h-full overflow-auto pt-[5.5%]">

	<!-- Game Discription -->
	{#if pageLoaded}
		<div class=" w-full h-[20%] flex flex-col items-center justify-center">
			<p in:fade={{duration: 2000}} class="inter-bold text-3xl text-center mt-2 text-white">Schmunktris</p>
			<p in:fade={{duration: 2500}} class="inter text-center text-white">A Tetris clone made with <a href="https://svelte.dev/" class="text-blue-500 inter-bold">Sveltekit</a>, <a href="https://tailwindcss.com/" class="text-blue-500 inter-bold">TailwindCSS</a>, Typescript and <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io</a></p>
			<p in:fade={{duration: 2600}} class="inter text-center text-white">Heavily inspired by <a href="https://tetr.io/" class="text-blue-500 inter-bold">tetr.io</a></p>
		</div>
	{/if}

	{#if pageLoaded}
		
	{/if}

	<!-- Process -->
	{#if pageLoaded}
		<div class="w-full h-fit flex flex-col items-center z-49">
			<div class="inter text-left text-white ml-5 w-[80%]">
				<p transition:scale={{duration:1000}} class="inter-bold text-3xl text-left mt-2 text-white">The process</p>
				<p>We began by creating the base of the game, moving the pieces, collisions,</p>
				<p>line clearing, scoring and the leveling system.</p>
				<br>
				<p class="inter-bold text-2xl text-left mt-2 text-white">Canvas</p>
					<p class="inter-bold">We began by creating a canvas to render the game on.</p>
					<p>The canvas element is bound to the canvas variable using Svelte's bind:this directive.</p>
					<p>This allows us to easily manipulate the canvas within our code.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.CANVAS}/>
	
					<p class="inter-bold">We then render each piece via the draw function.</p>
					<p>The draw function iterates through all pieces and renders them on the canvas.</p>
					<p>Each piece is represented as a Piece object with properties like x, y, shape, and color.</p>

					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.RENDER}/>

					<p class="inter-bold">The drawGhost function is used to render the ghost piece, a transparent piece at the bottom that shows where the piece will be placed.</p>
					<p>We pass through the only piece that is not grounded, which is the piece being controlled by the player.</p>
					<p>The function creates a duplicate of the piece and moves it as far down as it can before hitting the ground.</p>
					<p>It is important to note that the isGhost property is set to true, this will ensure that the other pieces will not collide with it.</p>
					<p>It is then drawn the same way as the other pieces, except that it is now grey and transparent.</p>
	
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.GHOST}/>
	
					<p class="inter-bold">The grid is then updated to reflect the positions of all grounded pieces.</p>
					<p>The updateGrid function iterates through all pieces and updates the grid.</p>
					<p>The grid is used to detect cleared lines.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.UPDATE}/>
	
	
				<p class="inter-bold text-2xl text-left mt-2 text-white">Movement</p>
					<p class="inter-bold">Movement was fairly simple to implement, if you press a certain key,</p>
					<p>it will manipulate the position of the piece after checking wether or not the move is valid.</p>
					<p>This is done via the collision function.</p>
	
				<p class="inter-bold text-2xl text-left mt-2 text-white">Collisions</p>
					<p class="inter-bold">Collisions were not nearly as simple to implement and they became a mess of loops, but it works as intended.</p>
					<p>We first create a deep copy of the piece, and manipulate the position depending on the direction.</p>
					<p>This is then used to check if the piece will overlap with another, or will be out of bounds.</p>
					<p>The function returns either true or false depending on if it makes a collision.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.COLLISION}/>
	
				<p class="inter-bold text-2xl text-left mt-2 text-white">Line clearing</p>
					<p class="inter-bold">Line clearing also had its fair share of issues, the main issue was when creating a new piece</p>
					<p>it would not make a proper copy of the shape, but after some debugging, it works as intended.</p>
					<p>We start by declaring an array of numbers which will be the indexes of the cleared lines.</p>
					<p>We then iterate through the grid and check if a row is full, if it is, we add it to the clearedLines array.</p>
					<p>We then use splice and unshift to remove the cleared lines from the grid, whilst maintaining the size of the grid.</p>
					<p>After that, we iterate through each piece and change the shape to match the grid, removing the cleared lines.</p>
					<p>Finally, we update the score and the grid.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.CLEAR_LINES}/>
	
				<p class="inter-bold text-2xl text-left mt-2 text-white">Scoring</p>
					<p class="inter-bold">Scoring was fairly simple to implement, we just added a score variable</p>
					<p>and added a certain amount of points for each line cleared, times the current level.</p>
					<p>If the score was changed, (a line was cleared) we call the announceScore function, which shows a popup</p>
					<p>showing how much score you gained. We also update the level because it depends on the amount of lines cleared.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.UPDATE_SCORE}/>
	
				<p class="inter-bold text-2xl text-left mt-2 text-white">Hold Piece and Next Piece</p>
					<p class="inter-bold">Hold Piece and Next Piece were both fairly simple to implement.</p>
					<p>Properly displaying each piece was the hard part, the code is a little jank but it works.</p>
					<p>You can view the code for these in the "src/lib" folder on the <a class="text-blue-500 inter-bold" href="https://github.com/tretegg/tetris-svelte" target="_blank">Github</a> if you're interested.</p>
	
				<br>
					<p class="inter-bold text-3xl text-left mt-2 text-white">Multiplayer</p>
					<p>The entire process of writing the multiplayer server for the game was a daunting task.</p>
					<p>Sveltekit doesn't support websockets out of the box, so the only way to actually get real-time communication</p>
					<p>from client to client was to write a custom server that utilized <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io.</a></p> 

					<br>
					<p>Since getting Typescript working in the vite custom server enviroment was a thing we weren't even sure was possible</p>
					<p>we decided it would be best to just write the entire thing in plain ol' javascript. And if that isn't the worst idea</p>
					<p>we've probably had ever possibly. Plain javascript sucks we missed Typescript the ENTIRE time we were writing it.</p>

			</div>
		</div>
	{/if}

	<CursorGlow/>
</div>