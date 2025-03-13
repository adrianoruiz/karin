<template>
  <div class="bg-white shadow-xl h-full overflow-auto w-full">
    <div class="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div class="flex items-center justify-between">
        <button
          @click="closePanel"
          class="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <X size="18" />
        </button>
        <!-- Menu de navegação com âncoras -->
        <div class="border-b border-gray-100 sticky top-16 bg-white z-10">
          <div class="overflow-x-auto hide-scrollbar">
            <div class="flex space-x-1 p-2 min-w-max">
              <!-- Seções do prontuário -->
              <button
                @click="scrollToSection('info-basicas')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'info-basicas'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <User size="14" class="inline mr-1" />
                Informações Básicas
              </button>

              <button
                @click="scrollToSection('queixa-principal')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'queixa-principal'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <AlertCircle size="14" class="inline mr-1" />
                Queixa Principal
              </button>

              <button
                @click="scrollToSection('historia-doenca')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'historia-doenca'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <FileText size="14" class="inline mr-1" />
                História da Doença
              </button>

              <button
                @click="scrollToSection('exame-fisico')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'exame-fisico'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <Activity size="14" class="inline mr-1" />
                Exame Físico
              </button>

              <button
                @click="scrollToSection('diagnostico')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'diagnostico'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <Clipboard size="14" class="inline mr-1" />
                Diagnóstico
              </button>

              <button
                @click="scrollToSection('prescricao')"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeSection === 'prescricao'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <FilePlus size="14" class="inline mr-1" />
                Prescrição
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 space-y-6">
      <!-- Informações do paciente -->
      <div class="bg-blue-50 rounded-lg border border-blue-100 p-4">
        <div class="flex items-center">
          <img
            :src="patient.avatar || 'https://via.placeholder.com/100'"
            :alt="patient.name"
            class="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 class="text-lg font-medium text-gray-900">
              {{ patient.name }}
            </h3>
            <div class="text-sm text-gray-600 mt-1">
              {{ patient.age }} anos •
              {{ patient.gender === "F" ? "Feminino" : "Masculino" }}
              • {{ patient.phone }}
            </div>
            <div class="text-sm text-gray-600">
              {{ patient.healthInsurance || "Particular" }}
            </div>
          </div>
        </div>
      </div>

      <!-- Componentes do prontuário -->
      <div id="info-basicas" ref="infoBasicas" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">Informações Básicas</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Data da Consulta</div>
            <div class="font-medium">{{ medicalRecord.date }}</div>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-sm text-gray-500">Tipo de Atendimento</div>
            <div class="font-medium">{{ medicalRecord.appointmentType }}</div>
          </div>
        </div>
      </div>

      <div id="queixa-principal" ref="queixaPrincipal" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">Queixa Principal</h2>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">
            {{ medicalRecord.mainComplaint }}
          </p>
        </div>
      </div>

      <div id="historia-doenca" ref="historiaDoenca" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">
            História da Doença Atual
          </h2>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">
            {{ medicalRecord.diseaseHistory }}
          </p>
        </div>
      </div>

      <div id="exame-fisico" ref="exameFisico" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">Exame Físico</h2>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">
            {{ medicalRecord.physicalExam }}
          </p>
        </div>
      </div>

      <div id="diagnostico" ref="diagnostico" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">Diagnóstico</h2>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-700 whitespace-pre-line">
            {{ medicalRecord.diagnosis }}
          </p>
        </div>
      </div>

      <div id="prescricao" ref="prescricao" class="space-y-4">
        <div class="border-b border-gray-200 pb-2">
          <h2 class="text-lg font-medium text-gray-800">Prescrição</h2>
        </div>
        <div class="space-y-3">
          <div
            v-if="
              medicalRecord.medications && medicalRecord.medications.length > 0
            "
          >
            <div
              v-for="(medication, index) in medicalRecord.medications"
              :key="index"
              class="bg-gray-50 p-4 rounded-lg mb-3"
            >
              <div class="font-medium text-gray-800 mb-1">
                {{ medication.name }}
              </div>
              <div class="text-sm text-gray-600 mb-1">
                <span class="font-medium">Dosagem:</span>
                {{ medication.dosage }}
              </div>
              <div class="text-sm text-gray-600 mb-1">
                <span class="font-medium">Frequência:</span>
                {{ medication.frequency }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-medium">Duração:</span>
                {{ medication.duration }}
              </div>
            </div>
          </div>
          <div v-else class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500 italic">Nenhuma medicação prescrita</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Activity,
  AlertCircle,
  Clipboard,
  FilePlus,
  FileText,
  User,
  X,
} from "lucide-vue-next";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useMedicalRecordStore } from "../stores/medical_record_store";

export default defineComponent({
  name: "MedicalRecordPanel",
  components: {
    AlertCircle,
    Activity,
    Clipboard,
    FileText,
    FilePlus,
    User,
    X,
  },
  setup() {
    // Usar a store
    const store = useMedicalRecordStore();

    // Referências para as seções
    const infoBasicas = ref(null);
    const queixaPrincipal = ref(null);
    const historiaDoenca = ref(null);
    const exameFisico = ref(null);
    const diagnostico = ref(null);
    const prescricao = ref(null);

    // Seção ativa
    const activeSection = ref("info-basicas");

    // Fechar o painel
    const closePanel = () => {
      console.log("MedicalRecordPanel: Closing panel");
      store.closePanel();
    };

    // Computed para o paciente e prontuário
    const patient = computed(() => store.patient);
    const medicalRecord = computed(() => store.medicalRecord);

    // Função para rolar até a seção
    const scrollToSection = (sectionId) => {
      activeSection.value = sectionId;

      // Usar setTimeout para garantir que o DOM foi atualizado
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    };

    // Observar interseções para destacar a seção ativa durante a rolagem
    onMounted(() => {
      const sections = [
        { id: "info-basicas", ref: infoBasicas },
        { id: "queixa-principal", ref: queixaPrincipal },
        { id: "historia-doenca", ref: historiaDoenca },
        { id: "exame-fisico", ref: exameFisico },
        { id: "diagnostico", ref: diagnostico },
        { id: "prescricao", ref: prescricao },
      ];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = entry.target.id;
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => {
        if (section.ref.value) {
          observer.observe(section.ref.value);
        }
      });

      return () => {
        sections.forEach((section) => {
          if (section.ref.value) {
            observer.unobserve(section.ref.value);
          }
        });
      };
    });

    return {
      patient,
      medicalRecord,
      activeSection,
      closePanel,
      scrollToSection,
      infoBasicas,
      queixaPrincipal,
      historiaDoenca,
      exameFisico,
      diagnostico,
      prescricao,
    };
  },
});
</script>

<style scoped>
/* Esconder a barra de rolagem mantendo a funcionalidade */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
