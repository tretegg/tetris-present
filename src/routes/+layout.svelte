<script lang="ts">
	import '../app.css';
	import CursorGlow from "$lib/components/cursorGlow.svelte";

	let { children } = $props();
	let title = "Schmunktris";
	let links = [
		{ name: "Home", href: "/" },
		{ name: "Github", href: "https://github.com/tretegg/tetris-svelte", target: "_blank" },
	];
</script>


<header class="header top-0 left-0 w-full h-[5rem] absolute flex justify-between items-center p-4 border-b-2 border-gray-200 backdrop-blur z-50">
	<div class="logo inter-bold text-2xl text-white">
		<h1>{title}</h1>
	</div>
	<nav class="nav">
		{#each links as link}
			<a href={link.href} target={link.target} class="p-4 inter-bold hover:text-xl text-white transition-all duration-200">{link.name}</a>
		{/each}
	</nav>
</header>

<CursorGlow/>

<div class="w-full h-[100%]">
	{@render children()}
</div>