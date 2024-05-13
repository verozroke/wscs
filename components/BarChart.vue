<template>
  <Bar
    id="my-chart-id"
    :options="{ ...chartOptions }"
    :data="chartData"
    type="scatter"
  />
</template>

<script
  lang="ts"
  setup
>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement, LineElement, LineController, ScatterController } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement, LineElement, LineController, ScatterController)

type DataProp = {
  wellName: string
  data: number
}

const props = defineProps<{
  data: DataProp[]
  label: string
  xAxisTitle: string
}>()


const chartData = ref({
  labels: props.data.map((item) => item.wellName),
  datasets: [{
    label: props.label,
    data: props.data.map((item, index) => ({ y: index + 1, x: parseFloat(item.data.toFixed(2)), label: item.wellName })),
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 4
  }]
})
const chartOptions = ref({
  responsive: true,
  showLine: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          return `Well Name:  ${ctx.raw.label}
                    \n x: ${ctx.raw.x}, y: ${ctx.raw.y}`
        }
      }
    }
  },
  scales: {
    y: {
      reverse: true,
      ticks: {
        maxTicksLimit: props.data.length + 1.
      },
      title: {
        display: true,
        text: 'Well Rank, №'
      }
    },
    x: {
      beginAtZero: true,
      min: 0,
      max: (() => {
        console.log(parseFloat(props.data[0].data.toFixed(2)) + 1)
        return parseFloat(props.data[0].data.toFixed(2)) + 1
      })(),
      title: {
        display: true,
        text: props.xAxisTitle
      }
    }
  }
})
</script>
