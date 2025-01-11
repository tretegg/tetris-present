<script lang="ts">
	import { onMount } from 'svelte';
  
	// Define a type for chart data
	type PieData = {
	  label: string;
	  value: number;
	  color: string;
	};
  
	// Props for the component
	export let data: PieData[] = [];
	export let size: number = 200;
  
	// Calculate total value of all slices
	let total = 0;
	$: total = data.reduce((sum, { value }) => sum + value, 0);
  
	// Generate SVG path data for each slice
	const calculateSlices = (data: PieData[]) => {
	  let cumulativePercent = 0;
  
	  return data.map(({ value, color }) => {
		const percentage = value / total;
		const [startX, startY] = [
		  Math.cos(2 * Math.PI * cumulativePercent),
		  Math.sin(2 * Math.PI * cumulativePercent),
		];
		cumulativePercent += percentage;
		const [endX, endY] = [
		  Math.cos(2 * Math.PI * cumulativePercent),
		  Math.sin(2 * Math.PI * cumulativePercent),
		];
		const largeArcFlag = percentage > 0.5 ? 1 : 0;
  
		return {
		  d: `M 0 0 L ${startX * size / 2} ${startY * size / 2} A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${endX * size / 2} ${endY * size / 2} Z`,
		  fill: color,
		};
	  });
	};
  
	let slices = [];
	$: slices = calculateSlices(data);
  </script>
  
  <style>
	svg {
	  transform: rotate(-90deg);
	}
  </style>
  
  <div class="flex flex-col items-center overflow-hidden">
	<svg
	  xmlns="http://www.w3.org/2000/svg"
	  viewBox={`-100 -100 200 200`}
	  class="w-full h-auto"
	>
	  {#each slices as { d, fill }}
		<path d={d} fill={fill} />
	  {/each}
	</svg>
  </div>