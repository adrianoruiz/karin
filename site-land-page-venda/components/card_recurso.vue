<template>
  <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ titulo }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ descricao }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  }
})
</script>
