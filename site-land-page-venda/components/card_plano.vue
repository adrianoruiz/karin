<template>
  <div 
    class="bg-white rounded-lg shadow-lg overflow-hidden"
    :class="{ 'border-2 border-primary-500': destaque }"
  >
    <div class="px-6 py-8">
      <h3 class="text-2xl font-bold text-gray-900">{{ nome }}</h3>
      <div class="mt-4">
        <span class="text-4xl font-extrabold">{{ preco }}</span>
        <span class="text-base font-medium text-gray-500">/mês</span>
        <p class="text-sm text-gray-500">por profissional de saúde</p>
      </div>
      <ul class="mt-6 space-y-4">
        <li v-for="(recurso, index) in recursos" :key="index" class="flex items-center">
          <svg
            class="h-5 w-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="ml-2">{{ recurso }}</span>
        </li>
      </ul>
      <button
        class="mt-8 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
      >
        Começar Agora
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CardPlano',
  props: {
    nome: {
      type: String,
      required: true
    },
    preco: {
      type: String,
      required: true
    },
    destaque: {
      type: Boolean,
      default: false
    },
    recursos: {
      type: Array as () => string[],
      required: true
    }
  }
}
</script>
