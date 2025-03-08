<template>
  <div class="whatsapp-status mt-4">
    <h3 class="text-lg font-semibold mb-2">Conexão</h3>

    <p v-if="store.settings?.connected" class="text-gray-600 mb-4">
      Gerencie a conexão do WhatsApp, escaneie o QR Code ou desconecte a
      instância.
    </p>
    <div
      v-if="store.settings?.connected"
      class="bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-green-500"></div>
        <span class="text-green-700">Status da Conexão: Conectado</span>
      </div>
      <button
        @click="handleDisconnect"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Desconectar
      </button>
    </div>
    <div v-else class="warning-message">
      Por favor, escaneie o QR Code abaixo para conectar o WhatsApp.
      <div v-if="store.qrCode" class="mt-4 flex justify-center">
        <QrCodeWithProgress
          :qr-code="store.qrCode"
          :on-refresh="refreshQrCode"
          :on-reconnect="handleReconnect"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePetshopStore } from "@/stores/petshop";
import { useWhatsAppSettingsStore } from "../store/whatsapp_settings.store";
import QrCodeWithProgress from "./QrCodeWithProgress.vue";

const store = useWhatsAppSettingsStore();
const petshopStore = usePetshopStore();

const refreshQrCode = async () => {
  if (petshopStore.petshop?.id && store.settings && !store.settings.connected) {
    await store.getQrCode(petshopStore.petshop.id);
  }
};

const handleDisconnect = async () => {
  if (!petshopStore.petshop?.id) return;
  await store.disconnectWhatsApp(petshopStore.petshop.id);
  await store.getQrCode(petshopStore.petshop.id);
};

const handleReconnect = async () => {
  if (!petshopStore.petshop?.id) return;
  await store.connectWhatsApp(petshopStore.petshop.id);
  await store.getQrCode(petshopStore.petshop.id);
};
</script>

<style scoped>
.whatsapp-status {
  margin: 20px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.warning-message {
  color: #f57c00;
  font-weight: bold;
  padding: 10px;
  background-color: #fff3e0;
  border-radius: 4px;
}
</style>
