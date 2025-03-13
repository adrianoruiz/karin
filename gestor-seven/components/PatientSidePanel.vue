<template>
  <div class="bg-white shadow-xl h-full overflow-auto w-full">
    <div class="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div class="flex items-center justify-between">
        <!-- menu -->
        <!-- Menu de navegação com âncoras -->
        <div class="border-b border-gray-100 sticky top-16 bg-white z-10">
          <div class="overflow-x-auto hide-scrollbar">
            <div class="flex space-x-1 p-2 min-w-max">
              <!-- Seção 1: Itens principais com links de âncora -->
              <button
                @click="scrollToSection('anamnese')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'anamnese'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <FileText size="14" class="inline mr-1" />
                Anamnese
              </button>

              <button
                @click="scrollToSection('prescricoes')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'prescricoes'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <Clipboard size="14" class="inline mr-1" />
                Prescrições
              </button>

              <button
                @click="scrollToSection('anotacoes')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'anotacoes'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <Edit3 size="14" class="inline mr-1" />
                Anotações Rápidas
              </button>

              <!-- Botão de Triagem -->
              <button
                @click="scrollToSection('triagem')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'triagem'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <Stethoscope size="14" class="inline mr-1" />
                Triagem
              </button>

              <!-- Separador vertical -->
              <div class="h-8 border-l border-gray-200 self-center mx-1"></div>

              <!-- Seção 2: Documentos (sem links por enquanto) -->
              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Exames
              </button>
              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Atestado
              </button>

              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Laudo
              </button>

              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Relatório Médico
              </button>

              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Declaração
              </button>

              <button
                class="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100"
              >
                <FileText size="14" class="inline mr-1" />
                Encaminhamento
              </button>
            </div>
          </div>
        </div>
        <!-- fim menu -->
        <!-- <h2 class="font-medium text-lg">Visão Rápida do Paciente</h2> -->
        <button
          @click="closePanel"
          class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <X size="18" />
        </button>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <!-- Componentes integrados com IDs para âncoras -->
      <div id="anamnese" ref="anamnese">
        <PatientSummary :patient-id="patientId" />
        <MedicalHistory :patient-id="patientId" />
      </div>

      <div id="prescricoes" ref="prescricoes">
        <Prescriptions :patient-id="patientId" />
      </div>

      <div id="anotacoes" ref="anotacoes">
        <QuickNotes :patient-id="patientId" />
      </div>

      <div id="triagem" ref="triagem">
        <PatientTriage :patient-id="patientId" @view-triage="openTriagePanel" />
      </div>
    </div>
  </div>
</template>

<script>
import { Clipboard, Edit3, FileText, Stethoscope, X } from "lucide-vue-next";
import { computed, defineComponent, ref } from "vue";
import { usePatientPanelStore } from "../stores/patient_panel_store";
import { useTriagePanelStore } from "../stores/triage_panel_store";
import MedicalHistory from "./MedicalHistory.vue";
import PatientSummary from "./PatientSummary.vue";
import PatientTriage from "./PatientTriage.vue";
import Prescriptions from "./Prescriptions.vue";
import QuickNotes from "./QuickNotes.vue";

export default defineComponent({
  name: "PatientSidePanel",
  components: {
    X,
    FileText,
    Clipboard,
    Edit3,
    Stethoscope,
    PatientSummary,
    MedicalHistory,
    Prescriptions,
    QuickNotes,
    PatientTriage,
  },
  setup() {
    // Usar diretamente a store
    const store = usePatientPanelStore();
    const triageStore = useTriagePanelStore();

    // Referências para as seções
    const anamnese = ref(null);
    const prescricoes = ref(null);
    const anotacoes = ref(null);
    const triagem = ref(null);

    // Seção ativa
    const activeSection = ref("anamnese");

    // Fechar o painel
    const closePanel = () => {
      console.log("PatientSidePanel: Closing panel");
      store.closePanel();
    };

    // Computed para o ID do paciente
    const patientId = computed(() => store.patientId);

    // Função para rolar até a seção
    const scrollToSection = (sectionId) => {
      activeSection.value = sectionId;

      // Usar setTimeout para garantir que o DOM foi atualizado
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    };

    // Função para abrir o painel de triagem
    const openTriagePanel = () => {
      triageStore.openPanel(patientId.value);
    };

    return {
      patientId,
      closePanel,
      scrollToSection,
      activeSection,
      anamnese,
      prescricoes,
      anotacoes,
      triagem,
      openTriagePanel,
    };
  },
});
</script>

<style scoped>
/* Esconder a barra de rolagem mantendo a funcionalidade */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari e Opera */
}
</style>
