<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface ToastProps {
  title?: string;
  description: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
}

const props = withDefaults(defineProps<ToastProps>(), {
  title: '',
  type: 'info',
  duration: 5000,
  onClose: () => {}
});

const visible = ref(true);
let timer: number | null = null;

onMounted(() => {
  // Inicia o timer para fechar o toast automaticamente
  timer = window.setTimeout(() => {
    close();
  }, props.duration);
});

onBeforeUnmount(() => {
  // Limpa o timer quando o componente for desmontado
  if (timer) {
    clearTimeout(timer);
  }
});

const close = () => {
  visible.value = false;
  props.onClose();
};

const getTypeClasses = () => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 border-green-500 text-green-700';
    case 'warning':
      return 'bg-yellow-100 border-yellow-500 text-yellow-700';
    case 'error':
      return 'bg-red-100 border-red-500 text-red-700';
    default:
      return 'bg-blue-100 border-blue-500 text-blue-700';
  }
};
</script>

<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      :class="['fixed bottom-4 right-4 border-l-4 p-4 rounded shadow-md max-w-sm z-[9999]', getTypeClasses()]"
    >
      <div class="flex items-start">
        <div class="ml-3">
          <p v-if="title" class="font-medium">
            {{ title }}
          </p>
          <p class="text-sm">
            {{ description }}
          </p>
        </div>
        <button 
          @click="close"
          class="ml-auto -mx-1.5 -my-1.5 p-1.5 hover:bg-gray-200 rounded-md"
        >
          <span class="sr-only">Fechar</span>
          <svg
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
