<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Funil de Clientes</h3>
      <span class="text-sm text-gray-500">Últimos 30 dias</span>
    </div>

    <!-- Funil Visual -->
    <div class="space-y-3">
      <div
        v-for="(stage, index) in stages"
        :key="stage.name"
        class="relative"
      >
        <div
          class="h-16 rounded-lg flex items-center justify-between px-4 transition-all"
          :class="stage.bgClass"
          :style="{ width: getWidth(stage.value, index) }"
        >
          <div class="flex items-center">
            <component :is="stage.icon" class="w-5 h-5 mr-3" :class="stage.iconClass" />
            <div>
              <span class="font-medium" :class="stage.textClass">{{ stage.name }}</span>
            </div>
          </div>
          <span class="text-2xl font-bold" :class="stage.textClass">{{ stage.value }}</span>
        </div>

        <!-- Seta de conversão -->
        <div
          v-if="index < stages.length - 1"
          class="flex items-center justify-center py-1"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span class="ml-2 text-sm text-gray-500">
            {{ getConversionRate(index) }}% conversão
          </span>
        </div>
      </div>
    </div>

    <!-- Métricas de Churn -->
    <div class="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-red-800">Churn este mês</p>
          <p class="text-xs text-red-600 mt-1">{{ churnReason || 'Motivo mais comum: Não informado' }}</p>
        </div>
        <div class="text-right">
          <span class="text-2xl font-bold text-red-700">{{ churned }}</span>
          <span class="text-sm text-red-600 ml-1">clientes</span>
        </div>
      </div>
    </div>

    <!-- Taxa de Retenção -->
    <div class="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span class="text-sm text-gray-600">Taxa de Retenção</span>
      <span
        class="text-lg font-semibold"
        :class="retentionRate >= 95 ? 'text-green-600' : retentionRate >= 90 ? 'text-yellow-600' : 'text-red-600'"
      >
        {{ retentionRate }}%
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  trial: {
    type: Number,
    default: 0
  },
  active: {
    type: Number,
    default: 0
  },
  churned: {
    type: Number,
    default: 0
  },
  churnRate: {
    type: Number,
    default: 0
  },
  churnReason: {
    type: String,
    default: null
  }
})

const retentionRate = computed(() => {
  return Math.round(100 - props.churnRate)
})

const stages = computed(() => [
  {
    name: 'Em Trial',
    value: props.trial,
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    iconClass: 'text-blue-600',
    icon: 'UserIcon',
  },
  {
    name: 'Pagantes',
    value: props.active,
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    iconClass: 'text-green-600',
    icon: 'CheckCircleIcon',
  },
  {
    name: 'Retidos (90d+)',
    value: Math.round(props.active * 0.7), // Estimativa
    bgClass: 'bg-indigo-100',
    textClass: 'text-indigo-800',
    iconClass: 'text-indigo-600',
    icon: 'StarIcon',
  },
])

const getWidth = (value, index) => {
  const maxValue = Math.max(...stages.value.map(s => s.value))
  if (maxValue === 0) return '100%'

  const minWidth = 60
  const percentage = (value / maxValue) * 100
  return `${Math.max(minWidth, percentage)}%`
}

const getConversionRate = (index) => {
  const current = stages.value[index].value
  const next = stages.value[index + 1]?.value || 0

  if (current === 0) return 0
  return Math.round((next / current) * 100)
}

// Placeholder icons (substituir por ícones reais)
const UserIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
}

const CheckCircleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
}

const StarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`
}
</script>
