<script lang="ts">
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import { fade, slide } from "svelte/transition";
	import ShowImage from "$lib/components/showImage.svelte";
	import { CodeBlock, storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import typescript from 'highlight.js/lib/languages/typescript';
	import * as CODE from "$lib/components/constants/codeBlocks"

	import 'highlight.js/styles/github-dark.css';
	import CursorGlow from "$lib/components/cursorGlow.svelte";
	import Charts from "$lib/components/charts.svelte";

	let pageLoaded = $state(false);

	onMount(() => {
		hljs.registerLanguage('typescript', typescript);

		storeHighlightJs.set(hljs);	
		
		setTimeout(() => {
			pageLoaded = true
		} , 500)
	});
</script>

<svelte:head>
	<title>Schmunktris</title>
</svelte:head>

<div class="w-full h-full overflow-auto pt-[5rem]">

	{#if !pageLoaded}
		<div transition:fade class="w-full h-full top-0 left-0 absolute flex flex-col items-center justify-center">
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div class="w-24 h-24 rounded-full animate-spin border-8 border-white border-r-black"/>
			<p class="text-white font-mono mt-6 text-xl">
				Loading...
			</p>
		</div>
	{/if}

	<!-- Game Discription -->
	{#if pageLoaded}
		<div class=" w-full h-[20%] flex flex-col items-center justify-center">
			<p in:fade={{duration: 2000}} class="inter-bold text-3xl text-center mt-2 text-white">Schmunktris</p>
			<p in:fade={{duration: 2000}} class="text-neutral-400 text-sm">(the code for this site is available <a href="https://github.com/tretegg/tetris-present" class="text-blue-500 inter-bold">here</a>)</p>
			<p in:fade={{duration: 2500}} class="inter text-center text-white">A multiplayer Tetris clone made with <a href="https://svelte.dev/" class="text-blue-500 inter-bold">Sveltekit</a>, <a href="https://tailwindcss.com/" class="text-blue-500 inter-bold">TailwindCSS</a>, <a href="https://www.typescriptlang.org" class="text-blue-500 inter-bold">Typescript</a> and <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io</a></p>
			<p in:fade={{duration: 2600}} class="inter text-center text-white">Heavily inspired by <a href="https://tetr.io/" class="text-blue-500 inter-bold">tetr.io</a></p>
		</div>
	{/if}

	{#if pageLoaded}
		<Charts/>
	{/if}

	<!-- Process -->
	{#if pageLoaded}
		<div class="w-full h-fit flex flex-col items-center z-49 pt-6">
			<div class="inter text-left text-white ml-5 w-[80%]">
				<p transition:slide={{duration:1000, axis:"x"}} class="inter-bold text-3xl text-left mt-2 text-white">The Process</p>
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
					<p class="inter-bold">The entire process of writing the multiplayer server for the game was a daunting task.</p>
					<p>Sveltekit doesn't support websockets out of the box, so the only way to actually get real-time communication</p>
					<p>from client to client was to write a custom server that utilized <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io.</a></p> 

					<br>
					<p>Since getting Typescript working in the vite custom server enviroment was a thing we weren't even sure was possible</p>
					<p>we decided it would be best to just write the entire thing in plain ol' javascript. And if that isn't the worst idea</p>
					<p>we've possibly ever had. Plain javascript sucks in comparaison to Typescript. I (Liam) missed it the ENTIRE time we were writing it.</p>


					<p class="inter-bold text-2xl text-left mt-8 text-white">Initial Socket Setup</p>
					<p class="inter-bold">Using <a href="https://socket.io/" class="text-blue-500 inter-bold">Socket.io.</a> we make an initial connection to the server.</p>
					<p>After this the client sends a `CLIENT_INIT` message to the server that creates the player on the server.</p>
					<p class="text-neutral-400 text-sm my-2">(instance in this case is the TetrisServer class instance that the server creates when its started)</p>
					<CodeBlock class="mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.CLIENT_INIT}/>

					<p class="inter-bold text-2xl text-left mt-8 text-white">Room Browser</p>
					<p class="inter-bold">After the client is fully connected to the server. It starts receving information on the rooms that exist on the server.</p>
					<p>The client then displays these rooms on its Room Browser.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.UPDATE_BROWSING}/>

					<p class="inter-bold text-2xl text-left mt-8 text-white">Joining</p>
					<p class="inter-bold">The player annouces a `JOIN_ROOM` event to the server and the server dispatches the relevant information to the player joining and other players in the room.</p>
					<p>The server will also update the people who are currently in the room browser since a person joining a room will cause the rooms amount of current players to increase.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.JOINING}/>

					<p class="inter-bold text-2xl text-left mt-8 text-white">Server & Client Room Handling</p>
					<p class="inter-bold">Both the server and client have different classes defined for easier gameplay programming for gamemodes.</p>
					<p>The server will create a new class with a specified class mapped in the `GAMEMODE_HANDLER_MAP` depending on the gamemode of the room.</p>
					<p>The client will do the same with a class used to manage all of the client side jobs of the current gamemode.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.ROOM_HANDLING}/>

					<p class="inter-bold text-2xl text-left mt-8 text-white">During The Game</p>
					<p class="inter-bold">When the client and server are both synced and the client is in a game, the client will start syncing every time the canvas updates.</p>
					<p>These updates usually contain the entire grid that the client currently has processed.</p>
					<p>There is not anti-cheat due to that being out of the scope of this project.</p>
					<CodeBlock class="mt-2 mb-8" rounded={"rounded-md"} button={"btn btn-sm !font-mono variant-soft !text-white"} lineNumbers={true} language="typescript" code={CODE.DURING_GAME}/>
			
					<p class="inter-bold text-3xl text-left mt-12 text-white">Overall</p>
					<p class="inter-bold">Doing this project, we learned several things</p>
					<p>• Writing a custom server to make using websockets possible in Sveltekit.</p>
					<p>• Developing a fully fledged game in the Sveltekit context.</p>
					<p>• Using several internal & external (npm) svelte libraries that we likely wouldn't have if not for this project.</p>
					<p class="mb-12">• How to use more complex Svelte animations.</p>
				</div>
		</div>
	{/if}
</div>