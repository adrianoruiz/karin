<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Evolução do MRR</h3>
      <div class="flex space-x-2">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="selectedPeriod = period.value"
          class="px-3 py-1 text-sm rounded-lg transition-colors"
          :class="selectedPeriod === period.value
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:bg-gray-100'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
      <div class="text-center">
        <p class="text-sm text-gray-500">MRR Atual</p>
        <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(currentMrr) }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">Crescimento</p>
        <p
          class="text-lg font-semibold"
          :class="growth >= 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ growth >= 0 ? '+' : '' }}{{ growth }}%
        </p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">ARR Projetado</p>
        <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(currentMrr * 12) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  growth: {
    type: Number,
    default: 0
  }
})

const chartCanvas = ref(null)
const selectedPeriod = ref(6)
let chartInstance = null

const periods = [
  { label: '3M', value: 3 },
  { label: '6M', value: 6 },
  { label: '12M', value: 12 },
]

const currentMrr = computed(() => {
  if (props.data.length === 0) return 0
  return props.data[props.data.length - 1]?.mrr || 0
})

const filteredData = computed(() => {
  return props.data.slice(-selectedPeriod.value)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  const labels = filteredData.value.map(d => d.date)
  const values = filteredData.value.map(d => d.mrr)

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'MRR',
        data: values,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6366f1',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => formatCurrency(context.raw)
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatCurrency(value)
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch([filteredData, selectedPeriod], () => {
  createChart()
})
</script>
