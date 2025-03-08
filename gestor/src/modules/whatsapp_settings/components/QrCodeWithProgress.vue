<template>
  <div class="qr-code-container">
    <template v-if="!hasExceededAttempts">
      <img :src="qrCode" alt="WhatsApp QR Code" class="qr-code-image" />

      <div class="mt-4">
        <!-- Barra de progresso discreta -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }" />
        </div>

        <!-- Contador -->
        <div class="mt-2 text-sm text-gray-600">
          Atualizando QR Code em {{ timeLeft }}s
        </div>

        <!-- Contador de tentativas -->
        <div class="mt-2 text-sm text-gray-600">
          Tentativa {{ attempts }} de {{ maxAttempts }}
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col items-center">
        <p class="text-red-600 mb-4">Número máximo de tentativas excedido.</p>
        <button
          @click="handleReconnect"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Tentar escanear novamente
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useQrCodeAttempts } from "../composables/use_qr_code_attempts";
import { useQrCodeTimer } from "../composables/use_qrcode_timer";

interface Props {
  qrCode: string;
  onRefresh: () => Promise<void>;
  onReconnect: () => Promise<void>;
}

const props = defineProps<Props>();
const maxAttempts = 10;

const { timeLeft, progress, startTimer, stopTimer } = useQrCodeTimer(() => {
  incrementAttempt();
  props.onRefresh();
});

const { attempts, hasExceededAttempts, incrementAttempt, resetAttempts } =
  useQrCodeAttempts(maxAttempts);

const handleReconnect = async () => {
  resetAttempts();
  stopTimer();
  await props.onReconnect();
  startTimer();
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.qr-code-container {
  display: inline-block;
  padding: 1rem;
  text-align: center;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.qr-code-image {
  width: 256px;
  height: 256px;
  object-fit: contain;
}

.progress-container {
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4f46e5;
  transition: width 0.3s ease;
}
</style>
