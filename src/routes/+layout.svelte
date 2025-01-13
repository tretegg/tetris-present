<script lang="ts">
	import '../app.css';
	let { children } = $props();
	let title = "Tetris";
	let links = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];
</script>

<header class="header fixed top-0 left-0 w-full flex justify-between items-center
		p-4 border-b-2 border-gray-200 backdrop-blur bg-white/70 z-50">
	<div class="logo pixel">
		<h1>{title}</h1>
	</div>
	<nav class="nav">
		{#each links as link}
			<a href={link.href} class="p-4 pixel">{link.name}</a>
		{/each}
	</nav>
</header>

<div class="content pt-16">
	{@render children()}
</div>

<style>

</style>
