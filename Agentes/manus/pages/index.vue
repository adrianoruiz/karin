<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Conteúdo principal (67% da largura) -->
    <div class="w-2/3">
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
                <h2 class="text-xl font-bold">Sexta-feira</h2>
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

    <!-- Barra lateral de chat (33% da largura) -->
    <div class="w-1/3 bg-white border-l border-gray-200 flex flex-col h-screen">
      <div class="bg-gray-800 text-white p-4 flex items-center">
        <div class="p-2 rounded-full bg-purple-500 mr-3">
          <span class="text-white font-bold">IA</span>
        </div>
        <h2 class="text-xl font-bold">Chat com IA</h2>
      </div>

      <!-- Área de mensagens -->
      <div ref="chatMessagesRef" class="flex-1 p-4 overflow-y-auto">
        <div class="space-y-4">
          <!-- Mensagem de boas-vindas da IA -->
          <div class="flex items-start mb-4">
            <div class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0">IA</div>
            <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p>Olá! Sou sua assistente IA. Como posso ajudar você hoje?</p>
            </div>
          </div>

          <!-- Mensagens do chat -->
          <div v-for="(message, index) in chatMessages" :key="index" class="flex items-start mb-4"
            :class="message.sender === 'user' ? 'justify-end' : ''">
            <template v-if="message.sender === 'ai'">
              <div class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0">IA</div>
              <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <p>{{ message.text }}</p>
              </div>
            </template>
            <template v-else>
              <div class="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                <p>{{ message.text }}</p>
              </div>
              <div class="p-2 rounded-full bg-blue-600 text-white ml-2 flex-shrink-0">EU</div>
            </template>
          </div>

          <!-- Indicador de digitação (quando a IA está "pensando") -->
          <div v-if="isAiTyping" class="flex items-start">
            <div class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0">IA</div>
            <div class="bg-gray-100 rounded-lg p-3">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s" />
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulário de entrada -->
      <div class="p-4 border-t border-gray-200">
        <form class="flex items-center" @submit.prevent="sendMessage">
          <input v-model="userInput" type="text" placeholder="Digite sua mensagem..."
            class="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
            :disabled="isAiTyping">
          <button type="submit"
            class="bg-purple-500 text-white p-2 rounded-r hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            :disabled="isAiTyping || !userInput.trim()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

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

// Estado do chat
const chatMessages = ref([])
const userInput = ref('')
const isAiTyping = ref(false)
const chatMessagesRef = ref(null)

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

// Rolar para o final das mensagens quando uma nova mensagem é adicionada
watch(chatMessages, () => {
  scrollToBottom()
}, { deep: true })

function scrollToBottom() {
  nextTick(() => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
    }
  })
}

// Enviar mensagem para a IA
async function sendMessage() {
  if (!userInput.value.trim() || isAiTyping.value) return

  // Adicionar mensagem do usuário
  const userMessage = {
    sender: 'user',
    text: userInput.value
  }
  chatMessages.value.push(userMessage)

  // Limpar input e mostrar indicador de digitação
  const message = userInput.value
  userInput.value = ''
  isAiTyping.value = true

  try {
    // Enviar mensagem para o endpoint de chat
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })

    if (response.ok) {
      const data = await response.json()

      // Adicionar resposta da IA
      chatMessages.value.push({
        sender: 'ai',
        text: data.response
      })
    } else {
      // Em caso de erro, mostrar mensagem genérica
      chatMessages.value.push({
        sender: 'ai',
        text: 'Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.'
      })
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    chatMessages.value.push({
      sender: 'ai',
      text: 'Ocorreu um erro de comunicação. Por favor, tente novamente mais tarde.'
    })
  } finally {
    isAiTyping.value = false
  }
}
</script>