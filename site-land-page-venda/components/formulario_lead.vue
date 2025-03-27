<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Agende uma demonstração gratuita</h3>
    <form class="space-y-4">
      <div>
        <label for="nome" class="sr-only">Nome</label>
        <input
          id="nome"
          type="text"
          placeholder="Nome completo"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <div>
        <label for="especialidade" class="sr-only">Especialidade</label>
        <select
          id="especialidade"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="" disabled selected>Selecione sua especialidade</option>
          <option value="clinica_geral">Clínica Geral</option>
          <option value="dermatologia">Dermatologia</option>
          <option value="ginecologia">Ginecologia</option>
          <option value="ortopedia">Ortopedia</option>
          <option value="pediatria">Pediatria</option>
          <option value="psiquiatria">Psiquiatria</option>
          <option value="outra">Outra especialidade</option>
        </select>
      </div>
      <div>
        <label for="whatsapp" class="sr-only">WhatsApp</label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="WhatsApp com DDD"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <div>
        <label for="email" class="sr-only">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="E-mail profissional"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Agendar demonstração
      </button>
    </form>
    <p class="mt-3 text-sm text-gray-500 text-center">
      Demonstração personalizada para sua especialidade
    </p>
    <div class="mt-4 flex items-center justify-center">
      <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
      <span class="ml-2 text-xs text-gray-500">100% seguro e em conformidade com LGPD</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente de formulário de lead
</script>
