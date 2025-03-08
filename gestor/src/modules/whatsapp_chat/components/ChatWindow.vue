<script setup lang="ts">
import "emoji-picker-element";
import { nextTick, onMounted, ref, watch } from "vue";
import { usePetshopStore } from "../../../stores/petshop";
import { useChatStore } from "../stores/chat";

const petshopStore = usePetshopStore();
const petshopId = petshopStore.petshop?.id.toString() ?? "";
const chatStore = useChatStore();
const newMessage = ref("");
const showEmojiPicker = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const messageInput = ref<HTMLInputElement | null>(null);
const messagesContainer = ref<HTMLDivElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Observa mudanças nas mensagens para fazer scroll
watch(
  () => chatStore.activeChat?.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// Observa mudanças no chat ativo para fazer scroll
watch(
  () => chatStore.activeChat,
  () => {
    scrollToBottom();
  }
);

const sendMessage = async () => {
  if (newMessage.value.trim() && chatStore.activeChat) {
    try {
      await chatStore.sendMessage(
        petshopId,
        chatStore.activeChat.id,
        newMessage.value
      );
      newMessage.value = "";
      // Dar foco no input após enviar
      messageInput.value?.focus();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      // TODO: Mostrar notificação de erro
    }
  }
};

const onEmojiSelect = (e: CustomEvent) => {
  newMessage.value += e.detail.unicode;
  showEmojiPicker.value = false;
};

const setupEmojiPicker = () => {
  nextTick(() => {
    const picker = document.querySelector("emoji-picker");
    if (picker) {
      picker.addEventListener("emoji-click", onEmojiSelect as EventListener);
    }
  });
};

watch(showEmojiPicker, (newValue) => {
  if (newValue) {
    setupEmojiPicker();
  }
});

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0] && chatStore.activeChat) {
    const file = input.files[0];
    try {
      await chatStore.sendMessage(petshopId, chatStore.activeChat.id, "", file);
      input.value = "";
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      // TODO: Mostrar notificação de erro
    }
  }
};

const formatMessageTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div v-if="chatStore.activeChat" class="flex flex-col h-full">
    <!-- Chat Header -->
    <div
      class="flex items-center justify-between p-3 bg-whatsapp-dark border-b border-gray-700"
    >
      <div class="flex items-center">
        <img
          class="w-10 h-10 rounded-full mr-3"
          :src="
            chatStore.activeChat.profilePicUrl ||
            'https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg'
          "
          alt="Contact"
        />
        <div>
          <h2 class="text-gray-200 font-medium">
            {{ chatStore.activeChat.name }}
          </h2>
          <p class="text-gray-400 text-sm">online</p>
        </div>
      </div>
      <div class="flex gap-4 text-gray-400">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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

    <!-- Messages -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto bg-[#000] bg-[url('/whatsapp-bg.png')] bg-repeat"
    >
      <!-- Container com padding para as mensagens -->
      <div class="messages-container min-h-full">
        <!-- Lista de mensagens -->
        <div
          v-for="message in chatStore.activeChat.messages"
          :key="message.id"
          class="flex w-full mb-[2px]"
          :class="[message.fromMe ? 'justify-end' : 'justify-start']"
        >
          <div
            class="message-container"
            :class="[message.fromMe ? 'sent' : 'received']"
          >
            <div class="message-content">
              <p
                class="text-[#E9EDEF] text-[14.2px] leading-[19px] break-words"
              >
                {{ message.body }}
              </p>
              <div class="message-meta">
                <span class="message-time">
                  {{ formatMessageTime(message.timestamp) }}
                </span>
                <svg
                  v-if="message.fromMe"
                  xmlns="http://www.w3.org/2000/svg"
                  class="check-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-3 bg-whatsapp-dark">
      <div class="flex items-center gap-2">
        <div class="relative flex items-center">
          <button
            class="text-gray-400 flex items-center justify-center"
            @click="showEmojiPicker = !showEmojiPicker"
            :disabled="chatStore.isSending"
          >
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <emoji-picker
            v-if="showEmojiPicker"
            class="light absolute bottom-full left-0 mb-2 z-50"
          ></emoji-picker>
        </div>
        <input
          type="file"
          ref="fileInput"
          accept="image/*,video/*,application/*"
          class="hidden"
          @change="handleFileUpload"
          :disabled="chatStore.isSending"
        />
        <button
          class="text-gray-400"
          @click="fileInput?.click()"
          :disabled="chatStore.isSending"
        >
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
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          ref="messageInput"
          v-model="newMessage"
          type="text"
          placeholder="Mensagem"
          class="flex-1 px-4 py-2 bg-whatsapp-secondary text-gray-200 rounded-lg focus:outline-none"
          @keyup.enter="sendMessage"
          :disabled="chatStore.isSending"
        />
        <button
          class="text-gray-400"
          @click="sendMessage"
          :disabled="chatStore.isSending"
        >
          <div
            v-if="chatStore.isSending"
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"
          ></div>
          <svg
            v-else
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full text-gray-400">
    Selecione um chat para começar
  </div>
</template>

<style scoped>
.messages-container {
  padding: 30px;
}

.message-container {
  max-width: 65%;
  position: relative;
  margin: 1px 0;
}

.message-container.sent {
  margin-left: auto;
}

@media (max-width: 768px) {
  .message-container {
    max-width: 85%;
  }
}

.message-container.sent .message-content {
  background-color: #005c4b;
  border-radius: 8px;
  margin-right: 0;
}

.message-container.received .message-content {
  background-color: #202c33;
  border-radius: 8px;
  margin-left: 0;
}

.message-content {
  position: relative;
  padding: 6px 7px 20px 9px;
  min-height: 32px;
  min-width: 120px;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 2px;
  position: absolute;
  right: 7px;
  bottom: 4px;
}

.message-time {
  font-size: 11px;
  line-height: 15px;
  color: #ffffff99;
  min-width: 80px;
  text-align: right;
}

.check-icon {
  width: 15px;
  height: 15px;
  color: #53bdeb;
  position: relative;
  top: 1px;
}

emoji-picker {
  --background: #202c33;
  --border-color: #2a3942;
  --category-emoji-padding: 0.5rem;
  width: 352px;
  height: 425px;
}
</style>
