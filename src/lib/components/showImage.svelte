<script lang="ts">
	import { slide } from "svelte/transition";

    export let src: string;
    export let alt: string;

    let imageVisible = false;

    function toggleImage() {
        imageVisible = !imageVisible;
    }

</script>

<button on:click={toggleImage} class="inter-bold text-md text-center mt-2 text-white border-2 rounded-lg border-white px-2 hover:scale-105 transition-all duration-200 mb-2">
    View Code
</button>

{#if imageVisible}
    <img src={src} alt={alt} class="w-[600px] my-2" transition:slide={{duration: 1000, axis:"y"}} />
{/if}