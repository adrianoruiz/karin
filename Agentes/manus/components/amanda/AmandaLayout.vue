<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold">Amanda</h1>
          <p class="text-gray-600">Assistente Emocional e Motivacional</p>
        </div>
      </div>
    </header>

    <div class="container mx-auto py-6 px-4">
      <!-- Menu de navegação -->
      <div class="mb-6 flex space-x-2">
        <NuxtLink to="/amanda" class="px-4 py-2 bg-pink-500 text-white rounded">Dashboard</NuxtLink>
        <NuxtLink to="/amanda/messages" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Mensagens</NuxtLink>
        <NuxtLink to="/amanda/dates" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Datas Especiais</NuxtLink>
      </div>
      <slot />
    </div>

    <footer class="bg-white shadow p-4 mt-8 text-center text-gray-500">
      &copy; {{ new Date().getFullYear() }} Amanda - Todos os direitos reservados.
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout sem lógica específica
</script>
