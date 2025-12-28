<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Caixa e Projeção</h3>
        <p class="text-sm text-gray-500">Histórico + projeção de 6 meses</p>
      </div>
      <div
        class="px-3 py-1 rounded-full text-sm font-medium"
        :class="runwayClass"
      >
        Runway: {{ runway >= 999 ? '∞' : `${runway} meses` }}
      </div>
    </div>

    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
      <div class="text-center">
        <p class="text-sm text-gray-500">Caixa Atual</p>
        <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(currentCash) }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">Burn Mensal</p>
        <p
          class="text-lg font-semibold"
          :class="burnRate > 0 ? 'text-red-600' : 'text-green-600'"
        >
          {{ burnRate > 0 ? '-' : '+' }}{{ formatCurrency(Math.abs(burnRate)) }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">Projeção 6M</p>
        <p
          class="text-lg font-semibold"
          :class="projectedCash > 0 ? 'text-gray-900' : 'text-red-600'"
        >
          {{ formatCurrency(projectedCash) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  history: {
    type: Array,
    default: () => []
  },
  projection: {
    type: Array,
    default: () => []
  },
  burnRate: {
    type: Number,
    default: 0
  },
  runway: {
    type: Number,
    default: 0
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const currentCash = computed(() => {
  if (props.history.length === 0) return 0
  return props.history[props.history.length - 1]?.cash || 0
})

const projectedCash = computed(() => {
  if (props.projection.length === 0) return currentCash.value
  return props.projection[props.projection.length - 1]?.projected_cash || 0
})

const runwayClass = computed(() => {
  if (props.runway >= 12) return 'bg-green-100 text-green-800'
  if (props.runway >= 6) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
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

  // Combina histórico + projeção
  const historyLabels = props.history.map(d => d.date)
  const historyValues = props.history.map(d => d.cash)

  const projectionLabels = props.projection.map(d => d.month)
  const projectionValues = props.projection.map(d => d.projected_cash)

  // Conecta os dois datasets
  const allLabels = [...historyLabels, ...projectionLabels]

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allLabels,
      datasets: [
        {
          label: 'Histórico',
          data: [...historyValues, ...Array(projectionLabels.length).fill(null)],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
        },
        {
          label: 'Projeção',
          data: [
            ...Array(historyLabels.length - 1).fill(null),
            historyValues[historyValues.length - 1], // Conecta com último ponto
            ...projectionValues
          ],
          borderColor: '#6366f1',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#6366f1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              if (context.raw === null) return null
              return `${context.dataset.label}: ${formatCurrency(context.raw)}`
            }
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

watch([() => props.history, () => props.projection], () => {
  createChart()
})
</script>
