<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto" />
    <div class="flex gap-6">
      <div class="flex-1">
        <header class="bg-white shadow p-4">
          <h1 class="text-2xl font-bold">Dashboard de Agentes IA</h1>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <!-- Card do Oliver -->
          <div
            class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
          >
            <div class="flex items-center mb-4">
              <img
                src="/img/oliver-avatar.svg"
                alt="Oliver"
                class="w-12 h-12 rounded-full mr-4"
              >
              <div>
                <h2 class="text-xl font-bold">Oliver</h2>
                <p class="text-gray-600">Assistente Operacional</p>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="font-medium mb-2">Resumo</h3>
              <div class="flex justify-between text-sm">
                <div>
                  <p>
                    Tarefas Hoje:
                    <span class="font-bold">{{ oliverStats.tasksToday }}</span>
                  </p>
                  <p>
                    Progresso:
                    <span class="font-bold">{{ oliverStats.progress }}%</span>
                  </p>
                </div>
                <div>
                  <p>
                    Pendências:
                    <span class="font-bold">{{ oliverStats.pending }}</span>
                  </p>
                  <p>
                    Concluídas:
                    <span class="font-bold">{{ oliverStats.completed }}</span>
                  </p>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/oliver"
              class="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            >
              Acessar Oliver
            </NuxtLink>
          </div>

          <!-- Card da Amanda -->
          <div
            class="bg-white rounded-lg shadow p-6 border-l-4 border-pink-500"
          >
            <div class="flex items-center mb-4">
              <img
                src="/img/amanda-avatar.svg"
                alt="Amanda"
                class="w-12 h-12 rounded-full mr-4"
              >
              <div>
                <h2 class="text-xl font-bold">Amanda</h2>
                <p class="text-gray-600">Assistente Emocional</p>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="font-medium mb-2">Resumo</h3>
              <div class="flex justify-between text-sm">
                <div>
                  <p>
                    Mensagens Hoje:
                    <span class="font-bold">{{
                      amandaStats.messagesCount
                    }}</span>
                  </p>
                  <p>
                    Datas Próximas:
                    <span class="font-bold">{{
                      amandaStats.upcomingDates
                    }}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Última Categoria:
                    <span class="font-bold">{{
                      amandaStats.lastCategory
                    }}</span>
                  </p>
                  <p>
                    Média Feedback:
                    <span class="font-bold"
                      >{{ amandaStats.avgEffectiveness }}/5</span
                    >
                  </p>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/amanda"
              class="block text-center bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition"
            >
              Acessar Amanda
            </NuxtLink>
          </div>
        </div>

        <!-- Atividade Recente -->
        <RecentActivity
          :activities="recentActivity"
          :format-date="formatDate"
        />
      </div>
      <ChatSidebar
        :chat-messages="chatMessages"
        :is-ai-typing="isAiTyping"
        :chat-messages-ref="chatMessagesRef"
        @send="handleUserMessage"
      />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import ChatSidebar from "~/components/dashboard/ChatSidebar.vue";
import RecentActivity from "~/components/dashboard/RecentActivity.vue";

// State para dados dos agentes
const oliverStats = ref({
  tasksToday: 0,
  progress: 0,
  pending: 0,
  completed: 0,
});

const amandaStats = ref({
  messagesCount: 0,
  upcomingDates: 0,
  lastCategory: "-",
  avgEffectiveness: 0,
});

const recentActivity = ref([]);

// Estado do chat
const chatMessages = ref([]);
const isAiTyping = ref(false);
const chatMessagesRef = ref(null);

// Carregar dados ao montar o componente
onMounted(async () => {
  try {
    // Buscar estatísticas do Oliver
    const oliverRes = await fetch("/api/oliver/stats");
    if (oliverRes.ok) {
      oliverStats.value = await oliverRes.json();
    }

    // Buscar estatísticas da Amanda
    const amandaRes = await fetch("/api/amanda/stats");
    if (amandaRes.ok) {
      amandaStats.value = await amandaRes.json();
    }

    // Buscar atividade recente
    const activityRes = await fetch("/api/activity");
    if (activityRes.ok) {
      recentActivity.value = await activityRes.json();
    }
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  }
});

// Formatar data
function formatDate(date) {
  return new Date(date).toLocaleString();
}

// Rolar para o final das mensagens quando uma nova mensagem é adicionada
watch(
  chatMessages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

function scrollToBottom() {
  nextTick(() => {
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
    }
  });
}

// Enviar mensagem para a IA
async function handleUserMessage(message) {
  if (!message.trim() || isAiTyping.value) return;

  // Adicionar mensagem do usuário
  const userMessage = {
    sender: "user",
    text: message,
  };
  chatMessages.value.push(userMessage);

  // Mostrar indicador de digitação
  isAiTyping.value = true;

  try {
    // Enviar mensagem para o endpoint de chat
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();

      // Adicionar resposta da IA
      chatMessages.value.push({
        sender: "ai",
        text: data.response,
      });
    } else {
      // Em caso de erro, mostrar mensagem genérica
      chatMessages.value.push({
        sender: "ai",
        text: "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.",
      });
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    chatMessages.value.push({
      sender: "ai",
      text: "Ocorreu um erro de comunicação. Por favor, tente novamente mais tarde.",
    });
  } finally {
    isAiTyping.value = false;
  }
}
</script>
