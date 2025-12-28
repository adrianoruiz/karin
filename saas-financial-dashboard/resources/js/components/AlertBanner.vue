<template>
  <div
    v-if="alerts.length > 0"
    class="mb-6"
  >
    <div
      v-for="(alert, index) in alerts"
      :key="index"
      class="mb-2 p-4 rounded-lg flex items-start"
      :class="alertClass(alert.type)"
    >
      <div class="flex-shrink-0">
        <svg
          v-if="alert.type === 'danger'"
          class="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <svg
          v-else
          class="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 class="text-sm font-medium" :class="textClass(alert.type)">
          {{ alert.message }}
        </h3>
        <p class="mt-1 text-sm" :class="subtextClass(alert.type)">
          {{ alert.action }}
        </p>
      </div>
      <button
        @click="dismiss(index)"
        class="ml-4 flex-shrink-0"
      >
        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  alerts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['dismiss'])

const localAlerts = ref([...props.alerts])

watch(() => props.alerts, (newAlerts) => {
  localAlerts.value = [...newAlerts]
})

const alertClass = (type) => {
  switch (type) {
    case 'danger': return 'bg-red-50 border border-red-200'
    case 'warning': return 'bg-yellow-50 border border-yellow-200'
    default: return 'bg-blue-50 border border-blue-200'
  }
}

const textClass = (type) => {
  switch (type) {
    case 'danger': return 'text-red-800'
    case 'warning': return 'text-yellow-800'
    default: return 'text-blue-800'
  }
}

const subtextClass = (type) => {
  switch (type) {
    case 'danger': return 'text-red-700'
    case 'warning': return 'text-yellow-700'
    default: return 'text-blue-700'
  }
}

const dismiss = (index) => {
  emit('dismiss', index)
}
</script>
