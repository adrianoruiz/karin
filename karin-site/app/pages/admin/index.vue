<template>
  <div>
    <header class="mb-8">
      <p class="text-eyebrow uppercase text-clay">Painel</p>
      <h1 class="font-serif text-4xl text-ink">Bem-vinda, {{ userName }}</h1>
      <p class="text-ink-muted mt-2">Gerencie agendamentos e conteúdo do site.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-2xl border border-brown-200 opacity-60">
        <h2 class="font-serif text-xl text-ink">Agendamentos</h2>
        <p class="text-ink-muted text-sm mt-1">Em breve.</p>
      </div>
      <div class="p-6 bg-white rounded-2xl border border-brown-200 opacity-60">
        <h2 class="font-serif text-xl text-ink">Pacientes</h2>
        <p class="text-ink-muted text-sm mt-1">Em breve.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { useSession } = useAuth()
const session = useSession()
const userName = computed(() => session.value?.data?.user?.name || session.value?.data?.user?.email || 'admin')

useSeoMeta({ title: 'Admin — Dra. Karin', robots: 'noindex' })
</script>
