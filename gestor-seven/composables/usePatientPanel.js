import { ref, reactive } from 'vue'

// Estado compartilhado entre componentes
const isOpen = ref(false)
const patientId = ref(null)

// Funções para manipular o estado
export function usePatientPanel() {
  // Abrir o painel com o ID do paciente
  function openPanel(id) {
    patientId.value = id
    isOpen.value = true
  }

  // Fechar o painel
  function closePanel() {
    isOpen.value = false
  }

  return {
    isOpen,
    patientId,
    openPanel,
    closePanel
  }
}
