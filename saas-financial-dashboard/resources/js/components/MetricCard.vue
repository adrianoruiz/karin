<template>
  <div
    class="bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md"
    :class="borderColorClass"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {{ title }}
        </p>
        <p class="mt-2 text-3xl font-bold" :class="textColorClass">
          {{ formattedValue }}
        </p>
        <p v-if="subtitle" class="mt-1 text-sm text-gray-500">
          {{ subtitle }}
        </p>
      </div>
      <div
        class="p-3 rounded-full"
        :class="iconBgClass"
      >
        <component :is="icon" class="w-6 h-6" :class="iconColorClass" />
      </div>
    </div>

    <!-- Trend indicator -->
    <div v-if="trend !== null" class="mt-4 flex items-center">
      <span
        class="text-sm font-medium flex items-center"
        :class="trend >= 0 ? 'text-green-600' : 'text-red-600'"
      >
        <svg
          v-if="trend >= 0"
          class="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <svg
          v-else
          class="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        {{ Math.abs(trend) }}%
      </span>
      <span class="ml-2 text-sm text-gray-500">vs mês anterior</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  format: {
    type: String,
    default: 'number', // number, currency, percentage, months
  },
  subtitle: {
    type: String,
    default: null
  },
  trend: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    default: 'neutral', // green, yellow, red, neutral
  },
  icon: {
    type: [Object, String],
    default: null
  }
})

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined) return '-'

  switch (props.format) {
    case 'currency':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(props.value)
    case 'percentage':
      return `${props.value}%`
    case 'months':
      return props.value >= 999 ? '∞' : `${props.value} meses`
    default:
      return new Intl.NumberFormat('pt-BR').format(props.value)
  }
})

const borderColorClass = computed(() => {
  switch (props.status) {
    case 'green': return 'border-l-4 border-l-green-500'
    case 'yellow': return 'border-l-4 border-l-yellow-500'
    case 'red': return 'border-l-4 border-l-red-500'
    default: return 'border-gray-200'
  }
})

const textColorClass = computed(() => {
  switch (props.status) {
    case 'green': return 'text-green-600'
    case 'yellow': return 'text-yellow-600'
    case 'red': return 'text-red-600'
    default: return 'text-gray-900'
  }
})

const iconBgClass = computed(() => {
  switch (props.status) {
    case 'green': return 'bg-green-100'
    case 'yellow': return 'bg-yellow-100'
    case 'red': return 'bg-red-100'
    default: return 'bg-gray-100'
  }
})

const iconColorClass = computed(() => {
  switch (props.status) {
    case 'green': return 'text-green-600'
    case 'yellow': return 'text-yellow-600'
    case 'red': return 'text-red-600'
    default: return 'text-gray-600'
  }
})
</script>
