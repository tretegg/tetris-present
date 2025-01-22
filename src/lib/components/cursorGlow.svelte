<script lang="ts">
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	// Create smooth transitions for x and y coordinates
	const glowX = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	const glowY = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	// Track mouse movement
	const onMouseMove = (event: MouseEvent) => {
		glowX.set(event.clientX);
		glowY.set(event.clientY);
	};

	// Derived values for the glow position
	const x = $derived($glowX);
	const y = $derived($glowY);
</script>

<svelte:window onmousemove={onMouseMove} />

<!-- Glow effect -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div 
	class="pointer-events-none fixed inset-0 -z-10" 
	style:background="radial-gradient(350px circle at {x}px {y}px, rgba(255,255,255,0.05), transparent 40%)" 
/>