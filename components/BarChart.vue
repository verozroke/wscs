<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    type="line"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      chartOptions: {
        responsive: true,
      }
    }
  }
}
</script>
