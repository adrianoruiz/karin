<template>
  <div class="bg-white shadow-xl h-full overflow-auto w-full">
    <div class="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div class="flex items-center justify-between">
        <h2 class="font-medium text-lg">Visão Rápida do Paciente</h2>
        <button 
          @click="closePanel" 
          class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <X size="18" />
        </button>
      </div>
    </div>
    
    <div class="p-4 space-y-4">
      <!-- Componentes integrados -->
      <PatientSummary :patient-id="patientId" />
      <MedicalHistory :patient-id="patientId" />
      <Prescriptions :patient-id="patientId" />
      <QuickNotes :patient-id="patientId" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { X } from 'lucide-vue-next';
import PatientSummary from './PatientSummary.vue';
import MedicalHistory from './MedicalHistory.vue';
import Prescriptions from './Prescriptions.vue';
import QuickNotes from './QuickNotes.vue';
import { usePatientPanelStore } from '../stores/patient_panel_store';

export default defineComponent({
  name: 'PatientSidePanel',
  components: {
    X,
    PatientSummary,
    MedicalHistory,
    Prescriptions,
    QuickNotes
  },
  setup() {
    // Usar diretamente a store
    const store = usePatientPanelStore();
    
    // Fechar o painel
    const closePanel = () => {
      console.log('PatientSidePanel: Closing panel');
      store.closePanel();
    };

    // Computed para o ID do paciente
    const patientId = computed(() => store.patientId);
    
    return {
      patientId,
      closePanel
    };
  }
});
</script>
