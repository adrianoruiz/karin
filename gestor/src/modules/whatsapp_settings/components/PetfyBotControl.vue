<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold">Robô Petfy</h2>
        <p class="text-gray-600">Controle o envio automático de mensagens</p>
      </div>

      <div class="flex items-center">
        <span class="mr-3 text-sm">{{ isActive ? "Ativo" : "Inativo" }}</span>
        <SwitchRoot
          v-model:checked="isActive"
          class="mr-3 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          :class="{ 'bg-primary': isActive, 'bg-gray-200': !isActive }"
        >
          <SwitchThumb
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="{
              'translate-x-6': isActive,
              'translate-x-1': !isActive,
            }"
          />
        </SwitchRoot>
        <!-- <div v-if="store.loading" class="flex justify-center items-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          ></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePetshopStore } from "@/stores/petshop";
import { SwitchRoot, SwitchThumb } from "radix-vue";
import { computed } from "vue";
import { useWhatsAppSettingsStore } from "../store/whatsapp_settings.store";

const store = useWhatsAppSettingsStore();
const petshopStore = usePetshopStore();

const isActive = computed({
  get: () => store.settings?.botActive ?? false,
  set: async (value) => {
    if (!petshopStore.petshop?.id) return;

    try {
      await store.updateBotStatus(petshopStore.petshop.id, value);
    } catch (error) {
      console.error("Erro ao atualizar status do bot:", error);
    }
  },
});
</script>
