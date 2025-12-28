<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Custos e Eficiência</h3>

    <!-- Indicadores principais -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-500">Margem Operacional</p>
        <p
          class="text-2xl font-bold"
          :class="operatingMargin >= 50 ? 'text-green-600' : operatingMargin >= 30 ? 'text-yellow-600' : 'text-red-600'"
        >
          {{ operatingMargin }}%
        </p>
      </div>
      <div class="p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-500">Custo/Receita</p>
        <p
          class="text-2xl font-bold"
          :class="costRevenueRatio <= 40 ? 'text-green-600' : costRevenueRatio <= 60 ? 'text-yellow-600' : 'text-red-600'"
        >
          {{ costRevenueRatio }}%
        </p>
      </div>
    </div>

    <!-- Breakdown Fixo vs Variável -->
    <div class="mb-6">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-600">Custos Fixos</span>
        <span class="font-medium">{{ formatCurrency(fixed) }}</span>
      </div>
      <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-red-500 rounded-full"
          :style="{ width: fixedPercentage + '%' }"
        ></div>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-600">Custos Variáveis</span>
        <span class="font-medium">{{ formatCurrency(variable) }}</span>
      </div>
      <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-yellow-500 rounded-full"
          :style="{ width: variablePercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Breakdown por categoria -->
    <div class="border-t border-gray-100 pt-4">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Por Categoria</h4>
      <div class="space-y-2">
        <div
          v-for="category in sortedCategories"
          :key="category.category"
          class="flex items-center justify-between py-2"
        >
          <div class="flex items-center">
            <div
              class="w-2 h-2 rounded-full mr-2"
              :style="{ backgroundColor: getCategoryColor(category.category) }"
            ></div>
            <span class="text-sm text-gray-600">{{ category.label }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-900">{{ formatCurrency(category.total) }}</span>
            <span class="text-xs text-gray-500 ml-2">({{ getCategoryPercentage(category.total) }}%)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Regra Brutal -->
    <div
      class="mt-4 p-3 rounded-lg border"
      :class="costRevenueRatio <= 40 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
    >
      <p class="text-sm" :class="costRevenueRatio <= 40 ? 'text-green-700' : 'text-red-700'">
        <span class="font-medium">Regra Brutal:</span>
        {{ costRevenueRatio <= 40
          ? '✓ Custo fixo dentro do limite de 40% da receita'
          : '⚠️ Custo fixo acima de 40% da receita. Revisar estrutura!'
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fixed: {
    type: Number,
    default: 0
  },
  variable: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  categories: {
    type: Array,
    default: () => []
  },
  operatingMargin: {
    type: Number,
    default: 0
  },
  costRevenueRatio: {
    type: Number,
    default: 0
  }
})

const categoryColors = {
  infra: '#3b82f6',
  people: '#8b5cf6',
  tools: '#10b981',
  marketing: '#f59e0b',
  other: '#6b7280',
}

const getCategoryColor = (category) => {
  return categoryColors[category] || '#6b7280'
}

const sortedCategories = computed(() => {
  return [...props.categories].sort((a, b) => b.total - a.total)
})

const fixedPercentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.fixed / props.total) * 100)
})

const variablePercentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.variable / props.total) * 100)
})

const getCategoryPercentage = (value) => {
  if (props.total === 0) return 0
  return Math.round((value / props.total) * 100)
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
</script>
