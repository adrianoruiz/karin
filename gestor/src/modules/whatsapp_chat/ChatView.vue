<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { usePetshopStore } from "../../stores/petshop";
import ChatWindow from "./components/ChatWindow.vue";
import Sidebar from "./components/Sidebar.vue";
import { useChatStore } from "./stores/chat";

const route = useRoute();
const chatStore = useChatStore();
const petshopStore = usePetshopStore();

onMounted(() => {
  const chatId = route.params.id?.toString();
  if (chatId && petshopStore.petshop) {
    chatStore.setActiveChat(petshopStore.petshop.id.toString(), chatId);
    console.log(chatId);
  }
});
</script>

<template>
  <!-- Aviso -->
  <div
    class="max-w-md mx-auto p-4 mt-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm"
  >
    <div class="flex items-center justify-center">
      <svg
        class="w-5 h-5 text-yellow-500 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span class="text-center text-gray-600 font-medium">
        Recurso ainda não disponível
      </span>
    </div>
  </div>
  <!-- Conteúdo do chat -->
  <div class="flex justify-center items-center h-full w-full p-4">
    <div
      class="flex h-[88vh] w-full rounded-xl overflow-hidden bg-whatsapp-dark chat-container"
    >
      <Sidebar class="w-[400px] border-r border-gray-700" />
      <ChatWindow class="flex-1" />
    </div>
  </div>
</template>

<style scoped>
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}

/* Estilo da scrollbar apenas para o container do chat */
.chat-container ::-webkit-scrollbar {
  width: 8px;
}

.chat-container ::-webkit-scrollbar-track {
  background: #111b21;
}

.chat-container ::-webkit-scrollbar-thumb {
  background: #585a5c;
  border-radius: 3px;
}

.chat-container ::-webkit-scrollbar-thumb:hover {
  background: #445055;
}
</style>
