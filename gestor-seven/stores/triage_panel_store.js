import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTriagePanelStore = defineStore('triagePanel', () => {
  // Estado
  const isOpen = ref(false);
  const patientId = ref(null);
  const triageData = ref({
    date: '',
    time: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: ''
    },
    anthropometry: {
      weight: '',
      height: '',
    },
    observations: '',
    nurse: 'Ana Silva'
  });

  // Ações
  function openPanel(id, data) {
    patientId.value = id;
    
    // Se tiver dados de triagem, preencher
    if (data) {
      triageData.value = data;
    } else {
      // Dados fictícios para demonstração
      // Em um ambiente real, esses dados viriam do backend
      triageData.value = {
        date: '12/03/2025',
        time: '14:30',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: '72',
          temperature: '36.5',
          oxygenSaturation: '98'
        },
        anthropometry: {
          weight: '65',
          height: '165',
        },
        observations: 'Paciente sem queixas durante a triagem. Sinais vitais estáveis.',
        nurse: 'Ana Silva'
      };
    }
    
    isOpen.value = true;
  }

  function closePanel() {
    isOpen.value = false;
    patientId.value = null;
  }

  // Retornar estado e ações
  return {
    isOpen,
    patientId,
    triageData,
    openPanel,
    closePanel
  };
});
