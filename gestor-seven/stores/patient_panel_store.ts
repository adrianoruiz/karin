import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePatientPanelStore = defineStore('patientPanel', () => {
  const isOpen = ref(false);
  const patientId = ref<string | null>(null);

  function openPanel(id: string) {
    patientId.value = id;
    isOpen.value = true;
  }

  function closePanel() {
    isOpen.value = false;
  }

  return {
    isOpen,
    patientId,
    openPanel,
    closePanel
  };
});
