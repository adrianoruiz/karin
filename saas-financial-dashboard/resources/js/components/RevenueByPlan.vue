<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Receita por Plano</h3>

    <div class="h-48">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <div class="mt-6 space-y-3">
      <div
        v-for="plan in sortedPlans"
        :key="plan.plan"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center">
          <div
            class="w-3 h-3 rounded-full mr-3"
            :style="{ backgroundColor: getColor(plan.plan) }"
          ></div>
          <div>
            <span class="font-medium text-gray-900 capitalize">{{ plan.plan }}</span>
            <span class="text-sm text-gray-500 ml-2">({{ plan.customers }} clientes)</span>
          </div>
        </div>
        <div class="text-right">
          <span class="font-semibold text-gray-900">{{ formatCurrency(plan.mrr) }}</span>
          <span class="text-sm text-gray-500 ml-1">/mês</span>
        </div>
      </div>
    </div>

    <!-- Insight -->
    <div v-if="insight" class="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
      <p class="text-sm text-indigo-700">
        <span class="font-medium">💡 Insight:</span> {{ insight }}
      </p>
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
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const colors = {
  starter: '#10b981',
  pro: '#6366f1',
  enterprise: '#f59e0b',
  basic: '#3b82f6',
  premium: '#8b5cf6',
}

const getColor = (plan) => {
  return colors[plan.toLowerCase()] || '#6b7280'
}

const sortedPlans = computed(() => {
  return [...props.data].sort((a, b) => b.mrr - a.mrr)
})

const totalMrr = computed(() => {
  return props.data.reduce((sum, plan) => sum + plan.mrr, 0)
})

const insight = computed(() => {
  if (props.data.length < 2) return null

  const sorted = sortedPlans.value
  const topPlan = sorted[0]
  const bottomPlan = sorted[sorted.length - 1]

  if (topPlan && bottomPlan && topPlan.mrr > bottomPlan.mrr * 3) {
    return `O plano "${topPlan.plan}" representa ${Math.round((topPlan.mrr / totalMrr.value) * 100)}% da receita. Considere descontinuar "${bottomPlan.plan}".`
  }

  return null
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

  const labels = props.data.map(d => d.plan)
  const values = props.data.map(d => d.mrr)
  const backgroundColors = props.data.map(d => getColor(d.plan))

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'MRR',
        data: values,
        backgroundColor: backgroundColors,
        borderRadius: 8,
        barThickness: 40,
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
  if (props.data.length > 0) {
    createChart()
  }
})

watch(() => props.data, () => {
  if (props.data.length > 0) {
    createChart()
  }
})
</script>
