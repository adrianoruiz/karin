<template>
  <div class="min-h-screen bg-sand-soft flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center bg-white rounded-2xl shadow-sm p-10">
      <h1 class="text-7xl font-serif text-primary mb-2">
        {{ error?.statusCode || 500 }}
      </h1>
      <h2 class="text-2xl font-semibold text-ink mb-3">{{ title }}</h2>
      <p class="text-ink-muted mb-6">{{ description }}</p>
      <button class="px-6 py-3 rounded-full bg-primary text-white hover:bg-brown-700 transition" @click="handleError">
        Voltar ao início
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = computed(() => {
  if (props.error?.statusCode === 404) return 'Página não encontrada'
  if (props.error?.statusCode === 403) return 'Acesso negado'
  return 'Algo deu errado'
})

const description = computed(() => {
  if (props.error?.statusCode === 404) return 'A página que você procura não existe ou foi movida.'
  if (props.error?.statusCode === 403) return 'Você não tem permissão para acessar este recurso.'
  return 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
})

const handleError = () => clearError({ redirect: '/' })
</script>
