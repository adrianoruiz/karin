<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePetshopStore } from "../../../stores/petshop";
import { useChatStore } from "../stores/chat";
import ChatItem from "./ChatItem.vue";
import { Chat } from "../types/chat";
import { ChatRepository } from "../repository/chat_repository";

const router = useRouter();
const chatStore = useChatStore();
const petshopStore = usePetshopStore();
const chats = ref<Chat[]>([]);
const petshopId = petshopStore.petshop?.id.toString() ?? '';
const searchQuery = ref("");
const chatRepository = new ChatRepository();

const filteredChats = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return chats.value;

  return chats.value.filter(
    (chat) =>
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage?.body.toLowerCase().includes(query)
  );
});

const fetchChats = async () => {
  if (!petshopStore.petshop) return;
  
  const result = await chatRepository.fetchChats(petshopId);
  if (result.success) {
    chats.value = result.data;
  } else {
    console.error("Erro ao buscar conversas:", result.error);
  }
};

async function selectChat(chatId: string) {
  if (!petshopStore.petshop) return;
  
  await chatStore.setActiveChat(petshopId, chatId);
  router.push(`/whatsapp-chat/${chatId}`);
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  if (petshopStore.petshop) {
    fetchChats();
  }
});
</script>

<template>
  <div class="w-96 h-full flex flex-col bg-[#111B21] border-r border-[#222D34]">
    <!-- Header -->
    <div class="flex items-center justify-between p-3 bg-[#202C33]">
      <h1 class="text-[#E9EDEF] font-medium">Conversas</h1>
      <div class="flex gap-4 text-[#AEBAC1]">
        <!-- <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button> -->
      </div>
    </div>

    <!-- Search -->
    <div class="p-2 bg-[#111B21]">
      <div class="relative">
        <span
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-[#AEBAC1]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar ou começar uma nova conversa"
          class="w-full px-4 py-[9px] pl-12 bg-[#202C33] text-[#E9EDEF] placeholder-[#8696A0] rounded-lg focus:outline-none"
        />
      </div>
    </div>

    <!-- Chat List -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden bg-[#111B21]">
      <ChatItem
        v-for="chat in filteredChats"
        :key="chat.id"
        :name="chat.name"
        :last-message="chat.lastMessage?.body || ''"
        :time="formatTime(chat.timestamp)"
        :avatar="
          chat.profilePicUrl ||
          'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg'
        "
        :unread-count="chat.unreadCount"
        @click="selectChat(chat.id)"
        class="px-3 py-3 cursor-pointer transition-colors hover:bg-[#202C33] active:bg-[#222D34]"
        :class="{ 'bg-[#2A3942]': chatStore.activeChat?.id === chat.id }"
      />
    </div>
  </div>
</template>

<style scoped>
/* Estilização da scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #374045;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #444c52;
}
</style>
