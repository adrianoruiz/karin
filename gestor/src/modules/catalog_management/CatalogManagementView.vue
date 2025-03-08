<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Abrindo o Gerenciamento de Catálogo...</h1>
    <p>Uma nova aba será aberta em instantes. Se não abrir automaticamente, <a href="https://app.petfy.app" target="_blank" class="text-primary hover:underline">clique aqui</a>.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Abre em uma nova aba
  window.open('https://app.petfy.app', '_blank')
  
  // Volta para a página anterior após abrir a nova aba
  router.back()
})
</script>
