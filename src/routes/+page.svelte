<script lang="ts">
	import PieChart from "$lib/components/chart.svelte";

	// Chart data types and interface
	interface ChartData {
		label: string;
		value: number;
		color: string;
	}

	// Sample data for our pie chart
	let chartData: ChartData[] = $state([
		{ label: "Sales", value: 35, color: "#FF6384" },
		{ label: "Marketing", value: 25, color: "#36A2EB" },
		{ label: "Development", value: 40, color: "#4BC0C0" },
	]);
</script>

<div class="w-full min-h-screen bg-background text-foreground p-4 md:p-8">
	<div class="max-w-3xl mx-auto">
				<div class="w-full aspect-square max-w-md mx-auto">
					<PieChart {chartData} />
				</div>
	</div>
</div>
