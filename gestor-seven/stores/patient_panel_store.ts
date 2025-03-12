import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePatientPanelStore = defineStore('patientPanel', () => {
  const isOpen = ref(false);
  const patientId = ref<string | null>(null);

  function openPanel(id: string) {
    console.log('Store: Setting patientId to', id);
    patientId.value = id;
    console.log('Store: Setting isOpen to true');
    isOpen.value = true;
    console.log('Store after opening:', { isOpen: isOpen.value, patientId: patientId.value });
  }

  function closePanel() {
    console.log('Store: Setting isOpen to false');
    isOpen.value = false;
    console.log('Store: Setting patientId to null');
    patientId.value = null;
    console.log('Store after closing:', { isOpen: isOpen.value, patientId: patientId.value });
  }

  return {
    isOpen,
    patientId,
    openPanel,
    closePanel
  };
});
