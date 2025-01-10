<script lang="ts">
    import PieChart from '$lib/components/chart.svelte';

    interface PieData {
      label: string;
      value: number;
      color: string;
    }
  
    const chartData: PieData[] = [
      { label: 'Svelte', value: 74.5, color: '#ff3e00' },
      { label: 'Typescript', value: 12.3, color: '#3178c6' },
      { label: 'Javascript', value: 11.7, color: '#f1e05a' },
      { label: 'Other', value: 1.5, color: '#ededed' },
    ];
  </script>
  
  <PieChart data={chartData} />
  