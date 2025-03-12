import { ref, reactive, onMounted } from 'vue'
import { usePatientPanelStore } from '~/stores/patient_panel_store'

// Funções para manipular o estado
export function usePatientPanel() {
  // Usar a store Pinia para garantir estado consistente
  const patientPanelStore = usePatientPanelStore()

  // Garantir que o painel começa fechado
  onMounted(() => {
    patientPanelStore.closePanel()
  })

  // Abrir o painel com o ID do paciente
  function openPanel(id) {
    console.log('Opening panel with ID:', id)
    patientPanelStore.openPanel(id)
  }

  // Fechar o painel
  function closePanel() {
    patientPanelStore.closePanel()
  }

  return {
    // Use computed ou ref diretamente da store para reatividade
    isOpen: patientPanelStore.isOpen,
    patientId: patientPanelStore.patientId,
    openPanel,
    closePanel
  }
}
