<template>
  <div class="bg-gray-50 rounded-lg p-6">
    <div class="flex items-center">
      <div class="ml-4">
        <h3 class="text-lg font-medium text-gray-900">
          {{ nome }}
        </h3>
        <p class="text-gray-500">{{ especialidade }}</p>
      </div>
    </div>
    <p class="mt-4 text-gray-600">
      {{ texto }}
    </p>
    <p class="mt-2 text-primary-600">
      {{ resultado }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CardDepoimento',
  props: {
    nome: {
      type: String,
      required: true
    },
    especialidade: {
      type: String,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
    resultado: {
      type: String,
      required: true
    }
  }
}
</script>
