<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <h1 class="text-2xl font-bold">Dashboard de Agentes IA</h1>
    </header>

    <div class="container mx-auto py-6 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card do Oliver -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div class="flex items-center mb-4">
            <img src="/img/oliver-avatar.svg" alt="Oliver" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h2 class="text-xl font-bold">Oliver</h2>
              <p class="text-gray-600">Assistente Operacional</p>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="font-medium mb-2">Resumo</h3>
            <div class="flex justify-between text-sm">
              <div>
                <p>Tarefas Hoje: <span class="font-bold">{{ oliverStats.tasksToday }}</span></p>
                <p>Progresso: <span class="font-bold">{{ oliverStats.progress }}%</span></p>
              </div>
              <div>
                <p>Pendências: <span class="font-bold">{{ oliverStats.pending }}</span></p>
                <p>Concluídas: <span class="font-bold">{{ oliverStats.completed }}</span></p>
              </div>
            </div>
          </div>

          <NuxtLink to="/oliver"
            class="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition">
            Acessar Oliver
          </NuxtLink>
        </div>

        <!-- Card da Amanda -->
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-pink-500">
          <div class="flex items-center mb-4">
            <img src="/img/amanda-avatar.svg" alt="Amanda" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h2 class="text-xl font-bold">Amanda</h2>
              <p class="text-gray-600">Assistente Emocional</p>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="font-medium mb-2">Resumo</h3>
            <div class="flex justify-between text-sm">
              <div>
                <p>Mensagens Hoje: <span class="font-bold">{{ amandaStats.messagesCount }}</span></p>
                <p>Datas Próximas: <span class="font-bold">{{ amandaStats.upcomingDates }}</span></p>
              </div>
              <div>
                <p>Última Categoria: <span class="font-bold">{{ amandaStats.lastCategory }}</span></p>
                <p>Média Feedback: <span class="font-bold">{{ amandaStats.avgEffectiveness }}/5</span></p>
              </div>
            </div>
          </div>

          <NuxtLink to="/amanda"
            class="block text-center bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition">
            Acessar Amanda
          </NuxtLink>
        </div>
      </div>

      <!-- Atividade Recente -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>

        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="p-3 rounded-lg"
            :class="activity.agent === 'Oliver' ? 'bg-blue-50' : 'bg-pink-50'">
            <div class="flex items-center">
              <div :class="activity.agent === 'Oliver' ? 'bg-blue-100' : 'bg-pink-100'" class="p-2 rounded-full mr-3">
                <span v-if="activity.agent === 'Oliver'" class="text-blue-500">O</span>
                <span v-else class="text-pink-500">A</span>
              </div>
              <div>
                <p class="font-medium">{{ activity.text }}</p>
                <p class="text-gray-500 text-sm">{{ formatDate(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// State para dados dos agentes
const oliverStats = ref({
  tasksToday: 0,
  progress: 0,
  pending: 0,
  completed: 0
})

const amandaStats = ref({
  messagesCount: 0,
  upcomingDates: 0,
  lastCategory: '-',
  avgEffectiveness: 0
})

const recentActivity = ref([])

// Carregar dados ao montar o componente
onMounted(async () => {
  try {
    // Buscar estatísticas do Oliver
    const oliverRes = await fetch('/api/oliver/stats')
    if (oliverRes.ok) {
      oliverStats.value = await oliverRes.json()
    }

    // Buscar estatísticas da Amanda
    const amandaRes = await fetch('/api/amanda/stats')
    if (amandaRes.ok) {
      amandaStats.value = await amandaRes.json()
    }

    // Buscar atividade recente
    const activityRes = await fetch('/api/activity')
    if (activityRes.ok) {
      recentActivity.value = await activityRes.json()
    }
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  }
})

// Formatar data
function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>