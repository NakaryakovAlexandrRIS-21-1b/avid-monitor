<template>
  <div style="height: 100vh">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement } from 'chart.js'
//import { socket } from '@/socket';

ChartJS.register(Title, Tooltip, Legend, LineController, CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, zoomPlugin)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(128, 128, 128, 0.1)'
            },
            scalelabel: {
              lineHeight: 3
            },
            //type: 'logarithmic'
          },
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(128, 128, 128, 0.1)'
            },
            //type: 'logarithmic'
          }
        },
        // chartData:{
        //   labels: ['1','2','3'],
        //   datasets:[

        //   ]
      },
      plugins: {
        legend: {
          display: false
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x'
          }
        }
      }
    }
  },
  methods: {
    getChart() {
      socket.emit('loadStat')
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.$store.state.loadStat.labels,
        datasets: [
          {
            label: "cpu",
            data: this.$store.state.loadStat.cpu,
            borderColor: 'rgb(75, 192, 75)',
            tension: 0.1
          },
          {
            label: "ram",
            data: this.$store.state.loadStat.ram,
            borderColor: 'rgb(192, 75, 192)',
            tension: 0.1
          },
          {
            label: "nodes",
            data: this.$store.state.loadStat.nodes,
            borderColor: 'rgb(192, 192, 75)',
            tension: 0.1
          },
          {
            label: "jobs",
            data: this.$store.state.loadStat.jobs,
            borderColor: 'rgb(192, 75, 75)',
            tension: 0.1
          },
          {
            label: "wait",
            data: this.$store.state.loadStat.wait,
            borderColor: 'rgb(75, 75, 192)',
            tension: 0.1
          },
        ]
      }
    }
  },
  watch: {

  },
  mounted() {
    //socket.emit('loadStat')
  }
}
</script>

<style scoped></style>
