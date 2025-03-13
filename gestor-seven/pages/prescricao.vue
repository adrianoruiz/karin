<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Prescrição"
        subtitle="Crie prescrições médicas para seus pacientes"
        search-placeholder="Buscar prescrição por paciente..."
        :notification-count="0"
        action-button-text="Nova Prescrição"
        :action-button-icon="FilePlus"
        @search="handleSearch"
        @action-click="startNewPrescription"
      />

      <!-- Main content -->
      <main class="p-6">
        <!-- Seleção de paciente ou visualização de prescrição -->
        <div
          v-if="!selectedPatient && !isCreatingNew"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-medium text-gray-800 mb-2">
                Selecione um paciente
              </h2>
              <p class="text-gray-600">
                Selecione um paciente para criar uma nova prescrição médica
              </p>
            </div>

            <!-- Busca de pacientes -->
            <div class="mb-6">
              <div class="relative">
                <input
                  type="text"
                  v-model="patientSearchQuery"
                  placeholder="Buscar paciente por nome..."
                  class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  size="20"
                  class="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <!-- Lista de pacientes -->
            <div class="space-y-3 mb-6">
              <div
                v-for="patient in filteredPatients"
                :key="patient.id"
                @click="selectPatient(patient)"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
              >
                <div class="flex-shrink-0 mr-4">
                  <img
                    :src="patient.avatar || 'https://via.placeholder.com/100'"
                    :alt="patient.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ patient.name }}</h3>
                  <div class="text-sm text-gray-500">
                    {{ patient.age }} anos •
                    {{ patient.gender === "F" ? "Feminino" : "Masculino" }}
                    <span v-if="patient.healthInsurance">
                      • {{ patient.healthInsurance }}
                    </span>
                  </div>
                </div>
                <div class="ml-auto flex items-center">
                  <span
                    v-if="patient.prescriptionCount > 0"
                    class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {{ patient.prescriptionCount }} prescrições
                  </span>
                  <ChevronRight size="18" class="text-gray-400 ml-2" />
                </div>
              </div>
            </div>

            <!-- Mensagem quando não há resultados -->
            <div
              v-if="filteredPatients.length === 0"
              class="text-center py-10 border border-gray-200 rounded-lg"
            >
              <UserX size="48" class="mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-700 mb-1">
                Nenhum paciente encontrado
              </h3>
              <p class="text-gray-500">Tente buscar com outro termo</p>
            </div>
          </div>
        </div>

        <!-- Formulário de prescrição -->
        <div
          v-if="selectedPatient || isCreatingNew"
          class="bg-white rounded-lg shadow"
        >
          <!-- Cabeçalho do formulário -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <button
                  @click="cancelForm"
                  class="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size="20" class="text-gray-600" />
                </button>
                <div>
                  <h2 class="text-xl font-medium text-gray-800">
                    {{ isCreatingNew ? "Nova Prescrição" : "Prescrição" }}
                  </h2>
                  <p v-if="selectedPatient" class="text-gray-600">
                    Paciente: {{ selectedPatient.name }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <button
                  @click="cancelForm"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="savePrescription"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Prescrição
                </button>
              </div>
            </div>
          </div>

          <!-- Corpo do formulário -->
          <div class="p-6">
            <div class="max-w-4xl mx-auto">
              <!-- Informações do paciente -->
              <div
                v-if="selectedPatient"
                class="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      :src="
                        selectedPatient.avatar ||
                        'https://via.placeholder.com/100'
                      "
                      :alt="selectedPatient.name"
                      class="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {{ selectedPatient.name }}
                      </h3>
                      <div class="text-sm text-gray-600 mt-1">
                        {{ selectedPatient.age }} anos •
                        {{
                          selectedPatient.gender === "F"
                            ? "Feminino"
                            : "Masculino"
                        }}
                        •
                        {{ selectedPatient.phone }}
                      </div>
                      <div class="text-sm text-gray-600">
                        {{ selectedPatient.healthInsurance || "Particular" }}
                      </div>
                    </div>
                  </div>
                  <button
                    @click="openTriagePanel(selectedPatient.id)"
                    class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center hover:bg-blue-200 transition-colors"
                  >
                    <Stethoscope size="18" class="mr-2" />
                    Ver Triagem
                  </button>
                </div>
              </div>

              <!-- Seleção de paciente (apenas para nova prescrição) -->
              <div v-if="isCreatingNew && !selectedPatient" class="mb-8">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Selecione o Paciente</label
                >
                <div class="relative">
                  <select
                    v-model="selectedPatientId"
                    @change="handlePatientSelection"
                    class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="" disabled selected>
                      Selecione um paciente
                    </option>
                    <option
                      v-for="patient in patients"
                      :key="patient.id"
                      :value="patient.id"
                    >
                      {{ patient.name }}
                    </option>
                  </select>
                  <ChevronDown
                    size="20"
                    class="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <!-- Formulário de prescrição -->
              <div class="space-y-8">
                <!-- Data e tipo de atendimento -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Data da Prescrição</label
                    >
                    <div class="relative">
                      <input
                        type="date"
                        v-model="prescriptionData.date"
                        class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Calendar
                        size="20"
                        class="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Validade (dias)</label
                    >
                    <input
                      type="number"
                      v-model="prescriptionData.validity"
                      min="1"
                      class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <!-- Medicamentos -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Medicamentos</label
                    >
                    <div class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-600">Modo:</span>
                        <div class="relative inline-block w-36">
                          <select
                            v-model="prescriptionMode"
                            class="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          >
                            <option value="simple">Simples</option>
                            <option value="advanced">Avançado</option>
                          </select>
                          <ChevronDown
                            size="16"
                            class="absolute right-3 top-2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                      <button
                        v-if="prescriptionMode === 'advanced'"
                        @click="addMedication"
                        class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Plus size="16" class="mr-1" />
                        Adicionar Medicamento
                      </button>
                    </div>
                  </div>

                  <!-- Modo Simples -->
                  <div v-if="prescriptionMode === 'simple'" class="mb-4">
                    <textarea
                      v-model="prescriptionData.simplePrescription"
                      rows="10"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite a prescrição completa aqui... 
Ex:
1. Fluoxetina 20mg - Tomar 1 comprimido ao dia pela manhã
2. Clonazepam 2mg - Tomar 1 comprimido à noite antes de dormir"
                    ></textarea>
                  </div>

                  <!-- Modo Avançado -->
                  <div v-else>
                    <div
                      v-for="(
                        medication, index
                      ) in prescriptionData.medications"
                      :key="index"
                      class="p-4 border border-gray-200 rounded-lg mb-4"
                    >
                      <div class="flex justify-between items-start mb-4">
                        <h4 class="font-medium text-gray-900">
                          Medicamento {{ index + 1 }}
                        </h4>
                        <button
                          @click="removeMedication(index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size="18" />
                        </button>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Nome do Medicamento</label
                          >
                          <input
                            type="text"
                            v-model="medication.name"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Fluoxetina"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Dosagem</label
                          >
                          <input
                            type="text"
                            v-model="medication.dosage"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: 20mg"
                          />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Forma Farmacêutica</label
                          >
                          <select
                            v-model="medication.form"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="comprimido">Comprimido</option>
                            <option value="capsula">Cápsula</option>
                            <option value="solucao">Solução Oral</option>
                            <option value="gotas">Gotas</option>
                            <option value="xarope">Xarope</option>
                            <option value="pomada">Pomada</option>
                            <option value="injetavel">Injetável</option>
                          </select>
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Quantidade</label
                          >
                          <input
                            type="text"
                            v-model="medication.quantity"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: 30 comprimidos"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-2"
                          >Posologia</label
                        >
                        <textarea
                          v-model="medication.instructions"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: Tomar 1 comprimido ao dia, pela manhã"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Mensagem quando não há medicamentos -->
                    <div
                      v-if="prescriptionData.medications.length === 0"
                      class="text-center py-8 border border-gray-200 rounded-lg"
                    >
                      <Pill size="48" class="mx-auto text-gray-300 mb-4" />
                      <h3 class="text-lg font-medium text-gray-700 mb-1">
                        Nenhum medicamento adicionado
                      </h3>
                      <p class="text-gray-500 mb-4">
                        Adicione medicamentos à prescrição
                      </p>
                      <button
                        @click="addMedication"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size="18" class="inline-block mr-1" />
                        Adicionar Medicamento
                      </button>
                    </div>
                  </div>

                  <!-- Observações -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Observações</label
                    >
                    <textarea
                      v-model="prescriptionData.notes"
                      rows="3"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Observações adicionais para o paciente"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rodapé do formulário -->
          <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              @click="cancelForm"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="savePrescription"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Prescrição
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Painel lateral de triagem -->
  <Teleport to="body" v-if="triagePanelStore.isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <triage-data-panel />
    </div>
  </Teleport>
</template>

<script setup>
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  FilePlus,
  Pill,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  UserX,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useTriagePanelStore } from "~/stores/triage_panel_store";

// Stores
const triagePanelStore = useTriagePanelStore();

// Estado do componente
const isCreatingNew = ref(false);
const selectedPatient = ref(null);
const selectedPatientId = ref("");
const patientSearchQuery = ref("");

// Dados de prescrição
const prescriptionData = ref({
  date: new Date().toISOString().split("T")[0], // Data atual formatada como YYYY-MM-DD
  validity: 30, // Validade padrão de 30 dias
  medications: [],
  simplePrescription: "",
  notes: "",
});

// Modo de prescrição (simples ou avançado)
const prescriptionMode = ref("simple");

// Dados fictícios de pacientes
const patients = ref([
  {
    id: 1,
    name: "Maria Silva",
    age: 35,
    gender: "F",
    phone: "(47) 99999-8888",
    healthInsurance: "Unimed",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    prescriptionCount: 3,
  },
  {
    id: 2,
    name: "João Santos",
    age: 42,
    gender: "M",
    phone: "(47) 98888-7777",
    healthInsurance: "Particular",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    prescriptionCount: 1,
  },
  {
    id: 3,
    name: "Ana Oliveira",
    age: 28,
    gender: "F",
    phone: "(47) 97777-6666",
    healthInsurance: "Amil",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    prescriptionCount: 0,
  },
  {
    id: 4,
    name: "Carlos Ferreira",
    age: 55,
    gender: "M",
    phone: "(47) 96666-5555",
    healthInsurance: "Bradesco Saúde",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    prescriptionCount: 2,
  },
  {
    id: 5,
    name: "Juliana Costa",
    age: 31,
    gender: "F",
    phone: "(47) 95555-4444",
    healthInsurance: "Particular",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    prescriptionCount: 0,
  },
]);

// Filtragem de pacientes com base na busca
const filteredPatients = computed(() => {
  if (!patientSearchQuery.value) return patients.value;
  const query = patientSearchQuery.value.toLowerCase();
  return patients.value.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(query) ||
      (patient.healthInsurance &&
        patient.healthInsurance.toLowerCase().includes(query))
    );
  });
});

// Função para abrir o painel de triagem
const openTriagePanel = (patientId) => {
  triagePanelStore.openPanel(patientId);
};

// Funções
const handleSearch = (query) => {
  patientSearchQuery.value = query;
};

const startNewPrescription = () => {
  isCreatingNew.value = true;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetPrescriptionData();
};

const selectPatient = (patient) => {
  selectedPatient.value = patient;
  resetPrescriptionData();
};

const handlePatientSelection = () => {
  if (selectedPatientId.value) {
    const patient = patients.value.find(
      (p) => p.id === parseInt(selectedPatientId.value)
    );
    if (patient) {
      selectedPatient.value = patient;
    }
  }
};

const cancelForm = () => {
  isCreatingNew.value = false;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetPrescriptionData();
};

const savePrescription = () => {
  // Validação básica
  if (
    prescriptionMode.value === "simple" &&
    !prescriptionData.value.simplePrescription
  ) {
    alert("Por favor, preencha a prescrição.");
    return;
  }

  if (
    prescriptionMode.value === "advanced" &&
    prescriptionData.value.medications.length === 0
  ) {
    alert("Por favor, adicione pelo menos um medicamento.");
    return;
  }

  // Aqui seria implementada a lógica para salvar a prescrição
  // Por enquanto, apenas simulamos o salvamento
  alert("Prescrição salva com sucesso!");
  isCreatingNew.value = false;
  selectedPatient.value = null;
  resetPrescriptionData();
};

const resetPrescriptionData = () => {
  prescriptionData.value = {
    date: new Date().toISOString().split("T")[0],
    validity: 30,
    medications: [],
    simplePrescription: "",
    notes: "",
  };
};

const addMedication = () => {
  prescriptionData.value.medications.push({
    name: "",
    dosage: "",
    form: "comprimido",
    quantity: "",
    instructions: "",
  });
};

const removeMedication = (index) => {
  prescriptionData.value.medications.splice(index, 1);
};
</script>
