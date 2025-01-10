<script lang="ts">
	// Props type for chart data
	interface ChartData {
		label: string;
		value: number;
		color: string;
	}

	// Component props using $props
	let { chartData }: { chartData: ChartData[] } = $props();

	// State for tracking hover state
	let hoveredIndex: number = $state(-1);

	// Calculate total for percentages
	const total = $derived(chartData.reduce((acc, item) => acc + item.value, 0));

	// Calculate the SVG coordinates and paths for pie slices
	const calculateSlice = (value: number, total: number, startAngle: number) => {
		const percentage = value / total;
		const angle = percentage * 360;
		const endAngle = startAngle + angle;

		// Convert angles to radians
		const startRad = ((startAngle - 90) * Math.PI) / 180;
		const endRad = ((endAngle - 90) * Math.PI) / 180;

		// Calculate coordinates
		const x1 = 100 + 100 * Math.cos(startRad);
		const y1 = 100 + 100 * Math.sin(startRad);
		const x2 = 100 + 100 * Math.cos(endRad);
		const y2 = 100 + 100 * Math.sin(endRad);

		// Calculate center point of the slice for label positioning
		const midAngle = (startAngle + endAngle) / 2;
		const midRad = ((midAngle - 90) * Math.PI) / 180;
		const labelX = 100 + 70 * Math.cos(midRad);
		const labelY = 100 + 70 * Math.sin(midRad);

		// Determine if the slice is larger than 180 degrees
		const largeArc = angle > 180 ? 1 : 0;

		return {
			path: `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`,
			percentage: (percentage * 100).toFixed(1),
			labelX,
			labelY,
		};
	};

	// Generate SVG paths
	let startAngle = 0;
	const slices = $derived(
		chartData.map((item) => {
			const slice = calculateSlice(item.value, total, startAngle);
			startAngle += (item.value / total) * 360;
			return { ...item, ...slice };
		})
	);
</script>

<div class="relative w-full h-full">
	<!-- SVG Pie Chart -->
	<svg viewBox="0 0 200 200" class="w-full h-full">
		{#each slices as slice, i}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<path d={slice.path} fill={slice.color} stroke="white" stroke-width="2" onmouseenter={() => (hoveredIndex = i)} onmouseleave={() => (hoveredIndex = -1)} class="transition-all duration-200 hover:opacity-90 cursor-pointer" />
			{#if hoveredIndex === i}
				<g>
					<!-- White background for better readability -->
					<rect x={slice.labelX - 30} y={slice.labelY - 15} width="60" height="20" fill="white" opacity="0.9" rx="4" />
					<!-- Label text -->
					<text x={slice.labelX} y={slice.labelY} text-anchor="middle" dominant-baseline="middle" class="text-[8px] font-medium fill-foreground">
						{slice.label} ({slice.percentage}%)
					</text>
				</g>
			{/if}
		{/each}
	</svg>

	<!-- Legend -->
	<div class="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-4 p-4">
		{#each slices as slice}
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 rounded" style="background-color: {slice.color}"></div>
				<span class="text-sm font-medium">
					{slice.label} ({slice.percentage}%)
				</span>
			</div>
		{/each}
	</div>
</div>
