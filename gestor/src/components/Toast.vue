<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  show: boolean
}>()

const emit = defineEmits(['close'])

const icons = {
  success: 'check-circle',
  error: 'circle-xmark',
  warning: 'triangle-exclamation',
  info: 'circle-info'
}

const colors = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue'
}

const textColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-700',
  info: 'text-blue-500'
}

const isVisible = ref(false)

onMounted(() => {
  if (props.show) {
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
      emit('close')
    }, 3000)
  }
})
</script>

<template>
  <div v-if="show" class="fixed top-4 right-4 flex items-center w-full
     max-w-xs p-4 mb-4 bg-white rounded-lg shadow overflow-all" role="alert">
    <div
      :class="`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${colors[type]}-500 bg-${colors[type]}-100 rounded-lg`">
      <font-awesome-icon :icon="icons[type]" class="w-5 h-5" />
    </div>
    <div class="ml-3 text-sm font-normal" :class="textColors[type]">{{ message }}</div>
    <button @click="emit('close')"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
      <font-awesome-icon icon="xmark" class="w-3 h-3" />
    </button>
  </div>
</template>

<style>
.overflow-all {
  position: absolute;
  z-index: 200;
}
</style>