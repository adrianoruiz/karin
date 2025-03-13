<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Prontuários"
        subtitle="Gerencie os prontuários dos pacientes"
        search-placeholder="Buscar prontuário por paciente..."
        :notification-count="0"
        action-button-text="Novo Prontuário"
        :action-button-icon="FilePlus"
        @search="handleSearch"
        @action-click="startNewRecord"
      />

      <!-- Main content -->
      <main class="p-6">
        <!-- Seleção de paciente ou visualização de prontuário -->
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
                Selecione um paciente para visualizar ou criar um novo
                prontuário
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
                    v-if="patient.recordCount > 0"
                    class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {{ patient.recordCount }} prontuários
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

        <!-- Formulário de prontuário -->
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
                    {{ isCreatingNew ? "Novo Prontuário" : "Prontuário" }}
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
                  @click="saveRecord"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Prontuário
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
              </div>

              <!-- Seleção de paciente (apenas para novo prontuário) -->
              <div v-if="isCreatingNew && !selectedPatient" class="mb-8">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Selecione o Paciente</label
                >
                <div class="relative">
                  <select
                    v-model="selectedPatientId"
                    @change="handlePatientSelection"
                    class="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Selecione um paciente</option>
                    <option
                      v-for="patient in patients"
                      :key="patient.id"
                      :value="patient.id"
                    >
                      {{ patient.name }} ({{ patient.age }} anos)
                    </option>
                  </select>
                  <ChevronDown
                    size="20"
                    class="absolute right-3 top-3 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <!-- Campos do prontuário -->
              <div class="space-y-8">
                <!-- Data e tipo de atendimento -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Data do Atendimento</label
                    >
                    <input
                      type="date"
                      v-model="recordData.date"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Tipo de Atendimento</label
                    >
                    <select
                      v-model="recordData.type"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="primeira_consulta">
                        Primeira Consulta
                      </option>
                      <option value="retorno">Retorno</option>
                      <option value="emergencia">Emergência</option>
                      <option value="exame">Exame</option>
                      <option value="procedimento">Procedimento</option>
                    </select>
                  </div>
                </div>

                <!-- Queixa principal -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Queixa Principal</label
                  >
                  <textarea
                    v-model="recordData.complaint"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a queixa principal do paciente..."
                  ></textarea>
                </div>

                <!-- História da doença atual -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >História Patológica Atual</label
                  >
                  <textarea
                    v-model="recordData.currentPathologicalHistory"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a história patológica atual..."
                  ></textarea>
                </div>

                <!-- História patológica pregressa -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >História Patológica Pregressa</label
                  >
                  <textarea
                    v-model="recordData.pastPathologicalHistory"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a história patológica pregressa..."
                  ></textarea>
                </div>

                <!-- História familiar -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >História Familiar</label
                  >
                  <textarea
                    v-model="recordData.familyHistory"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a história familiar..."
                  ></textarea>
                </div>

                <!-- História social -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >História Social</label
                  >
                  <textarea
                    v-model="recordData.socialHistory"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a história social..."
                  ></textarea>
                </div>

                <!-- Exame físico -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Exames Físicos</label
                  >
                  <textarea
                    v-model="recordData.physicalExam"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva os achados do exame físico..."
                  ></textarea>
                </div>

                <!-- Exames complementares -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Exames Complementares</label
                  >
                  <textarea
                    v-model="recordData.complementaryExams"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva os exames complementares..."
                  ></textarea>
                </div>

                <!-- Hipótese diagnóstica -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Hipótese Diagnóstica</label
                  >
                  <textarea
                    v-model="recordData.diagnosis"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a hipótese diagnóstica..."
                  ></textarea>
                </div>

                <!-- Observações -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Observação</label
                  >
                  <textarea
                    v-model="recordData.notes"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Observações adicionais..."
                  ></textarea>
                  <div class="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id="rememberComplaint"
                      v-model="recordData.rememberComplaint"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      for="rememberComplaint"
                      class="ml-2 block text-sm text-gray-700"
                    >
                      Lembrar-me disso
                    </label>
                  </div>
                </div>

                <!-- Conduta -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Conduta</label
                  >
                  <textarea
                    v-model="recordData.treatment"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a conduta adotada..."
                  ></textarea>
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
              @click="saveRecord"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Prontuário
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FilePlus,
  Search,
  UserX,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import PageHeader from "~/components/page_header.vue";

// Estado
const patientSearchQuery = ref("");
const selectedPatient = ref(null);
const selectedPatientId = ref("");
const isCreatingNew = ref(false);

// Dados do prontuário
const recordData = ref({
  date: new Date().toISOString().split("T")[0], // Data atual formatada como YYYY-MM-DD
  type: "primeira_consulta",
  complaint: "",
  rememberComplaint: false,
  currentPathologicalHistory: "",
  pastPathologicalHistory: "",
  familyHistory: "",
  socialHistory: "",
  physicalExam: "",
  complementaryExams: "",
  vitalSigns: {
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    oxygenSaturation: "",
  },
  diagnosis: "",
  cid10: "",
  treatment: "",
  notes: "",
  rememberNotes: false,
  surgicalPrescription: "nao",
  rememberSurgical: false,
});

// Dados fictícios de pacientes
const patients = ref([
  {
    id: 1,
    name: "Dandara Dos Santos Da Silva Baptiste",
    age: 30,
    gender: "F",
    phone: "(11) 98765-4321",
    email: "dandara.silva@email.com",
    cpf: "01781072205",
    birthdate: "15/04/1993",
    healthInsurance: "Amil Premium",
    recordCount: 0,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    age: 42,
    gender: "F",
    phone: "(11) 98765-4321",
    email: "maria.oliveira@email.com",
    healthInsurance: "Amil Premium",
    recordCount: 3,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "João Silva",
    age: 35,
    gender: "M",
    phone: "(11) 91234-5678",
    email: "joao.silva@email.com",
    healthInsurance: "Unimed",
    recordCount: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Ana Santos",
    age: 28,
    gender: "F",
    phone: "(11) 99876-5432",
    email: "ana.santos@email.com",
    healthInsurance: null,
    recordCount: 0,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Carlos Mendes",
    age: 52,
    gender: "M",
    phone: "(11) 97654-3210",
    email: "carlos.mendes@email.com",
    healthInsurance: "SulAmérica",
    recordCount: 2,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    age: 31,
    gender: "F",
    phone: "(11) 95432-1098",
    email: "fernanda.lima@email.com",
    healthInsurance: "Bradesco Saúde",
    recordCount: 1,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
]);

// Filtragem de pacientes
const filteredPatients = computed(() => {
  if (!patientSearchQuery.value) return patients.value;

  const query = patientSearchQuery.value.toLowerCase();
  return patients.value.filter((patient) =>
    patient.name.toLowerCase().includes(query)
  );
});

// Funções
const handleSearch = (query) => {
  // Implementar busca de prontuários
  console.log("Buscando prontuários:", query);
};

const startNewRecord = () => {
  isCreatingNew.value = true;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetRecordData();
};

const selectPatient = (patient) => {
  selectedPatient.value = patient;
  isCreatingNew.value = true;
  resetRecordData();
};

const handlePatientSelection = () => {
  if (selectedPatientId.value) {
    const patient = patients.value.find(
      (p) => p.id === parseInt(selectedPatientId.value)
    );
    if (patient) {
      selectedPatient.value = patient;
    }
  } else {
    selectedPatient.value = null;
  }
};

const cancelForm = () => {
  isCreatingNew.value = false;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetRecordData();
};

const saveRecord = () => {
  // Aqui seria implementada a lógica para salvar o prontuário
  console.log("Salvando prontuário:", {
    patient: selectedPatient.value,
    data: recordData.value,
  });

  alert("Prontuário salvo com sucesso!");
  cancelForm();
};

const resetRecordData = () => {
  recordData.value = {
    date: new Date().toISOString().split("T")[0],
    type: "primeira_consulta",
    complaint: "",
    rememberComplaint: false,
    currentPathologicalHistory: "",
    pastPathologicalHistory: "",
    familyHistory: "",
    socialHistory: "",
    physicalExam: "",
    complementaryExams: "",
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      oxygenSaturation: "",
    },
    diagnosis: "",
    cid10: "",
    treatment: "",
    notes: "",
    rememberNotes: false,
    surgicalPrescription: "nao",
    rememberSurgical: false,
  };
};
</script>
