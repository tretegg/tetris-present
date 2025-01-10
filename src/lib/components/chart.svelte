<script lang="ts">
    interface PieData {
      label: string;
      value: number;
      color: string;
    }
  
    export let data: PieData[] = [];
  
    // Compute total value of the data
    const total = data.reduce((sum, d) => sum + d.value, 0);
  
    // Hover state for displaying the label
    let hoveredLabel: string | null = null;
  
    // Generate pie slices based on the data
    const pieSlices = (() => {
      let cumulativePercentage = 0;
  
      return data.map((d) => {
        const startAngle = cumulativePercentage * 360;
        cumulativePercentage += d.value / total;
        const endAngle = cumulativePercentage * 360;
  
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  
        // Convert polar coordinates to cartesian coordinates
        const polarToCartesian = (angle: number) => ({
          x: Math.cos((angle - 90) * (Math.PI / 180)),
          y: Math.sin((angle - 90) * (Math.PI / 180)),
        });
  
        const start = polarToCartesian(startAngle);
        const end = polarToCartesian(endAngle);
  
        const path = `
          M 0 0
          L ${start.x} ${start.y}
          A 1 1 0 ${largeArcFlag} 1 ${end.x} ${end.y}
          Z
        `;
  
        return { path, color: d.color, label: d.label };
      });
    })();
  </script>
  
  <div class="chart-container">
    <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg);" class="overflow-visible">
      {#each pieSlices as { path, color, label }}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <path
          d={path}
          fill={color}
          on:mouseenter={() => (hoveredLabel = label)}
          on:mouseleave={() => (hoveredLabel = null)}
        ></path>
      {/each}
    </svg>
    {#if hoveredLabel}
        <div class="hover-label">{hoveredLabel}</div>
    {/if}
  </div>
  
  <style>
    .chart-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%; /* Adjust based on parent container height */
      width: 100%;
      position: relative;
    }
  
    svg {
      max-width: 200px;
      max-height: 200px;
    }
  
    path {
      transition: transform 0.2s ease;
    }
  
    path:hover {
      transform: scale(1.05);
    }
  
    .hover-label {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
      pointer-events: none;
      z-index: 100;
    }
  </style>
  