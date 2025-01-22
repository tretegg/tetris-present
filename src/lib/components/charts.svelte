<script lang="ts">
    import { Chart } from 'flowbite-svelte';
    import { InfoCircleSolid, ChevronDownOutline, ChevronRightOutline, PenSolid, DownloadSolid, ShareNodesSolid, TrashBinSolid, DotsHorizontalOutline } from 'flowbite-svelte-icons';

    const options: any = {
        series: [66.6, 18.4, 14.3, 0.7],
        colors: ['#ff3e00', '#f1e05a', '#3178c6', '#dadadb'],
        chart: {
            height: "90%",
            type: 'pie'
        },
        stroke: {
            colors: ['white'],
            lineCap: ''
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true
                },
                size: '100%',
                dataLabels: {
                    offset: -25
                }
            }
        },
        labels: ['Svelte', 'JavaScript', 'TypeScript', 'Other'],
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: 'Inter, sans-serif',
                color: "white"
            }
        },
        legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif',
            color: "white"
        },
        yaxis: {
            labels: {
                formatter: function (value: string) {
                    return value + '%';
            }
            }
        },
        xaxis: {
            labels: {
                formatter: function (value: string) {
                    return value + '%';
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        }
    };
</script>

<div class="w-full h-[40%] border-y flex items-center justify-center text-white">
    <div class='w-[30%] h-full'>
        <Chart {options} class="py-6" />
    </div>
    <div class='w-[30%] h-full pl-6 pt-4 flex flex-col items-start justify-center'>
        <h2 class="font-bold text-2xl text-left w-full">
            Code Percentages
        </h2>
        <p class="w-[50%] text-left">
            Our framework of choice for this project was Sveltekit, which means we'd have to use Svelte for most of our writing. The other half would be the server, written in just regular old Javascript, hence the ~30% of the codebase that consists of Javascript. 
        </p>
    </div>
</div>

<style lang="ts">
    :global(.apexcharts-legend-text) {
        @apply !text-white ml-4;
    }
</style>