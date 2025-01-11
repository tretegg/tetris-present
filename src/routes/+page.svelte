<script>
	import PieChart from '$lib/components/chart.svelte';
  
	const data = [
	  { label: 'Red', value: 30, color: '#f87171' },
	  { label: 'Green', value: 40, color: '#34d399' },
	  { label: 'Blue', value: 20, color: '#60a5fa' },
	  { label: 'Yellow', value: 10, color: '#facc15' },
	];
  </script>
  
  <PieChart {data} size={50} />