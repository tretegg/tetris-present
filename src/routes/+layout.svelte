<script lang="ts">
	import '../app.css';
	let { children } = $props();
	let title = "Tetris-Svelte";
	let links = [
		{ name: "Home", href: "/" },
		{ name: "Play", href: "/play" },
		{ name: "Github", href: "https://github.com/tretegg/tetris-svelte", target: "_blank" },
	];
</script>

<header class="header fixed top-0 left-0 w-full flex justify-between items-center
		p-4 border-b-2 border-gray-200 backdrop-blur bg-black z-50">
	<div class="logo inter-bold text-2xl text-white">
		<h1>{title}</h1>
	</div>
	<nav class="nav">
		{#each links as link}
			<a href={link.href} target={link.target} class="p-4 inter-bold hover:text-xl text-white transition-all duration-200">{link.name}</a>
		{/each}
	</nav>
</header>

<div class="content pt-16">
	{@render children()}
</div>

<style>

</style>
