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

      <!-- Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Mensagens Hoje</h3>
          <p class="text-3xl font-bold text-pink-500">{{ stats.messagesCount }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Próxima Data Especial</h3>
          <p class="text-lg font-bold text-purple-500">{{ nextSpecialDate.name || "Nenhuma" }}</p>
          <p class="text-sm text-gray-600">{{ nextSpecialDate.date ? formatDate(nextSpecialDate.date) : "" }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="font-bold text-lg mb-2">Eficácia</h3>
          <p class="text-3xl font-bold text-green-500">{{ stats.avgEffectiveness }}/5</p>
        </div>
      </div>

      <!-- Enviar mensagem -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Enviar Mensagem</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Categoria</label>
            <select v-model="newMessage.category" class="w-full border rounded py-2 px-3">
              <option value="carinhosa">Carinhosa</option>
              <option value="motivacional">Motivacional</option>
              <option value="pnl">PNL</option>
              <option value="intima">Íntima</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Subcategoria</label>
            <select v-model="newMessage.sub_category" class="w-full border rounded py-2 px-3">
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
              <option value="geral">Geral</option>
            </select>
          </div>
        </div>

        <button :disabled="sendingMessage" class="mt-4 bg-pink-500 text-white py-2 px-4 rounded" @click="sendMessage">
          {{ sendingMessage ? 'Enviando...' : 'Gerar e Enviar' }}
        </button>
      </div>

      <!-- Mensagens recentes -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Mensagens Recentes</h2>

        <div v-if="recentMessages.length === 0" class="text-gray-500 text-center py-4">
          Nenhuma mensagem enviada recentemente
        </div>

        <div v-else class="space-y-4">
          <div v-for="message in recentMessages" :key="message.id" class="p-4 rounded-lg"
            :class="getMessageBackground(message.category)">
            <p class="font-medium">"{{ message.content }}"</p>
            <div class="flex justify-between mt-2 text-sm">
              <div>
                <span class="bg-pink-200 text-pink-800 px-2 py-1 rounded">{{ message.category }}</span>
                <span class="text-gray-600 ml-2">{{ formatDate(message.sent_at || message.created_at) }}</span>
              </div>
              <div class="flex space-x-1">
                <button v-for="n in 5" :key="n"
                  :class="(message.effectiveness || 0) >= n ? 'text-yellow-500' : 'text-gray-300'"
                  @click="rateMessage(message.id, n)">★</button>
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

const stats = ref({
  messagesCount: 0,
  upcomingDates: 0,
  lastCategory: '-',
  avgEffectiveness: 0
})

const nextSpecialDate = ref({})
const recentMessages = ref([])
const sendingMessage = ref(false)
const newMessage = ref({
  category: 'carinhosa',
  sub_category: 'geral'
})

// Carregar dados
onMounted(async () => {
  await Promise.all([
    loadStats(),
    loadNextSpecialDate(),
    loadRecentMessages()
  ])
})

async function loadStats() {
  try {
    const res = await fetch('/api/amanda/stats')
    if (res.ok) {
      stats.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
}

async function loadNextSpecialDate() {
  try {
    const res = await fetch('/api/amanda/dates/next')
    if (res.ok) {
      nextSpecialDate.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar próxima data especial:', error)
  }
}

async function loadRecentMessages() {
  try {
    const res = await fetch('/api/amanda/messages?limit=5')
    if (res.ok) {
      recentMessages.value = await res.json()
    }
  } catch (error) {
    console.error('Erro ao carregar mensagens recentes:', error)
  }
}

async function sendMessage() {
  sendingMessage.value = true
  try {
    const res = await fetch('/api/amanda/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newMessage.value,
        target_number: process.env.WHATSAPP_NUMBER
      })
    })

    if (res.ok) {
      // Recarregar dados
      await Promise.all([loadStats(), loadRecentMessages()])
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
  } finally {
    sendingMessage.value = false
  }
}

async function rateMessage(id, rating) {
  try {
    const res = await fetch(`/api/amanda/messages/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ effectiveness: rating })
    })

    if (res.ok) {
      // Atualizar mensagem localmente
      const index = recentMessages.value.findIndex(m => m.id === id)
      if (index !== -1) {
        recentMessages.value[index].effectiveness = rating
      }

      // Recarregar estatísticas
      await loadStats()
    }
  } catch (error) {
    console.error('Erro ao avaliar mensagem:', error)
  }
}

function getMessageBackground(category) {
  const backgrounds = {
    'carinhosa': 'bg-pink-50',
    'motivacional': 'bg-purple-50',
    'pnl': 'bg-blue-50',
    'intima': 'bg-red-50',
  }

  return backgrounds[category] || 'bg-gray-50'
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString()
}
</script>