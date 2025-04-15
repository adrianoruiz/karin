<template>
  <div class="w-1/3 bg-white border-l border-gray-200 flex flex-col h-screen">
    <div class="bg-gray-800 text-white p-4 flex items-center">
      <div class="p-2 rounded-full bg-purple-500 mr-3" />
      <h2 class="text-xl font-bold">Chat com IA</h2>
    </div>
    <!-- Área de mensagens -->
    <div ref="chatMessagesRef" class="flex-1 p-4 overflow-y-auto">
      <div class="space-y-4">
        <!-- Mensagem de boas-vindas da IA -->
        <div class="flex items-start mb-4">
          <div
            class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0"
          >
            IA
          </div>
          <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p>Olá! Sou sua assistente IA. Como posso ajudar você hoje?</p>
          </div>
        </div>
        <!-- Mensagens do chat -->
        <div
          v-for="(message, index) in chatMessages"
          :key="index"
          class="flex items-start mb-4"
          :class="message.sender === 'user' ? 'justify-end' : ''"
        >
          <template v-if="message.sender === 'ai'">
            <div
              class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0"
            >
              IA
            </div>
            <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p>{{ message.text }}</p>
            </div>
          </template>
          <template v-else>
            <div class="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
              <p>{{ message.text }}</p>
            </div>
            <div
              class="p-2 rounded-full bg-blue-600 text-white ml-2 flex-shrink-0"
            >
              EU
            </div>
          </template>
        </div>
        <!-- Indicador de digitação (quando a IA está "pensando") -->
        <div v-if="isAiTyping" class="flex items-start">
          <div
            class="p-2 rounded-full bg-purple-500 text-white mr-2 flex-shrink-0"
          >
            IA
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <div
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              />
              <div
                class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style="animation-delay: 0.4s"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Formulário de entrada -->
    <div class="p-4 border-t border-gray-200">
      <form class="flex items-center" @submit.prevent="handleSendMessage">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Digite sua mensagem..."
          class="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
          :disabled="isAiTyping"
          @keyup.enter="handleSendMessage"
        />
        <button
          type="submit"
          class="bg-purple-500 text-white p-2 rounded-r hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          :disabled="isAiTyping || !inputValue.trim()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, nextTick, ref, toRefs, watch } from "vue";

const props = defineProps<{
  chatMessages: Array<{ sender: string; text: string }>;
  isAiTyping: boolean;
  chatMessagesRef: HTMLDivElement | null;
}>();

const emit = defineEmits(["send"]);

// Criar ref local para o input
const inputValue = ref("");

// Função para enviar mensagem
function handleSendMessage() {
  if (!inputValue.value.trim() || props.isAiTyping) return;

  // Emitir evento com a mensagem
  emit("send", inputValue.value);

  // Limpar o input após enviar
  inputValue.value = "";
}

const { chatMessages, isAiTyping, chatMessagesRef } = toRefs(props);

// Rolar para o fim das mensagens ao adicionar nova
watch(
  chatMessages.value,
  () => {
    nextTick(() => {
      if (
        chatMessagesRef.value &&
        chatMessagesRef.value.scrollTop !== undefined
      ) {
        chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
      }
    });
  },
  { deep: true }
);
</script>
