<script lang="ts">
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import { fade } from "svelte/transition";

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
