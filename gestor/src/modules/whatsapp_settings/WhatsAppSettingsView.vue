<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Configurações do WhatsApp</h1>

    <div class="space-y-6">
      <!-- Mensagem de erro -->
      <div
        v-if="store.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{{ store.error }}</span>
      </div>
      <!-- Status do Bot -->
      <PetfyBotControl />

      <!-- Conexão -->
      <WhatsAppConnection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePetshopStore } from "@/stores/petshop";
import { onMounted } from "vue";
import PetfyBotControl from "./components/PetfyBotControl.vue";
import WhatsAppConnection from "./components/WhatsAppConnection.vue";
import { useWhatsAppSettingsStore } from "./store/whatsapp_settings.store";

const petshopStore = usePetshopStore();
const store = useWhatsAppSettingsStore();

onMounted(async () => {
  console.log("onMounted - iniciando carregamento");

  // Primeiro, garante que a lista de petshops está carregada
  if (petshopStore.petshopList.length === 0) {
    console.log("Carregando lista de petshops");
    await petshopStore.listPetshops();
  }

  const petshopId = petshopStore.petshop?.id;
  console.log("onMounted - petshop id:", petshopId);

  if (!petshopId) {
    console.log("petshop id não encontrado mesmo após carregar lista");
    return;
  }

  await store.fetchBotStatus(petshopId);
  await store.fetchConnectionStatus(petshopId).then(() => {
    if (!store.settings?.connected) {
      store.getQrCode(petshopId);
    }
  });

  console.log("fetchBotStatus concluído - settings:", store.settings);
});
</script>
