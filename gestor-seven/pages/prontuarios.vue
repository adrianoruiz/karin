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
        <div v-if="!selectedPatient && !isCreatingNew" class="bg-white rounded-lg shadow p-6">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-medium text-gray-800 mb-2">Selecione um paciente</h2>
              <p class="text-gray-600">
                Selecione um paciente para visualizar ou criar um novo prontuário
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
                <Search size="20" class="absolute left-3 top-3.5 text-gray-400" />
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
                    {{ patient.age }} anos • {{ patient.gender === 'F' ? 'Feminino' : 'Masculino' }}
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
              <h3 class="text-lg font-medium text-gray-700 mb-1">Nenhum paciente encontrado</h3>
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
                    {{ isCreatingNew ? 'Novo Prontuário' : 'Prontuário' }}
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
              <div v-if="selectedPatient" class="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div class="flex items-center">
                  <img
                    :src="selectedPatient.avatar || 'https://via.placeholder.com/100'"
                    :alt="selectedPatient.name"
                    class="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ selectedPatient.name }}</h3>
                    <div class="text-sm text-gray-600 mt-1">
                      {{ selectedPatient.age }} anos • 
                      {{ selectedPatient.gender === 'F' ? 'Feminino' : 'Masculino' }} • 
                      {{ selectedPatient.phone }}
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ selectedPatient.healthInsurance || 'Particular' }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Seleção de paciente (apenas para novo prontuário) -->
              <div v-if="isCreatingNew && !selectedPatient" class="mb-8">
                <label class="block text-sm font-medium text-gray-700 mb-2">Selecione o Paciente</label>
                <div class="relative">
                  <select
                    v-model="selectedPatientId"
                    @change="handlePatientSelection"
                    class="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Selecione um paciente</option>
                    <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                      {{ patient.name }} ({{ patient.age }} anos)
                    </option>
                  </select>
                  <ChevronDown size="20" class="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <!-- Campos do prontuário -->
              <div class="space-y-8">
                <!-- Data e tipo de atendimento -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Data do Atendimento</label>
                    <input
                      type="date"
                      v-model="recordData.date"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Atendimento</label>
                    <select
                      v-model="recordData.type"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="primeira_consulta">Primeira Consulta</option>
                      <option value="retorno">Retorno</option>
                      <option value="emergencia">Emergência</option>
                      <option value="exame">Exame</option>
                      <option value="procedimento">Procedimento</option>
                    </select>
                  </div>
                </div>

                <!-- Queixa principal -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Queixa Principal</label>
                  <textarea
                    v-model="recordData.complaint"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a queixa principal do paciente..."
                  ></textarea>
                </div>

                <!-- História da doença atual -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">História da Doença Atual</label>
                  <textarea
                    v-model="recordData.history"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a história da doença atual..."
                  ></textarea>
                </div>

                <!-- Exame físico -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Exame Físico</label>
                  <textarea
                    v-model="recordData.physicalExam"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva os achados do exame físico..."
                  ></textarea>
                </div>

                <!-- Sinais vitais -->
                <div>
                  <h3 class="text-md font-medium text-gray-800 mb-4">Sinais Vitais</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Pressão Arterial (mmHg)</label>
                      <input
                        type="text"
                        v-model="recordData.vitalSigns.bloodPressure"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 120/80"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Frequência Cardíaca (bpm)</label>
                      <input
                        type="number"
                        v-model="recordData.vitalSigns.heartRate"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 72"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Temperatura (°C)</label>
                      <input
                        type="number"
                        step="0.1"
                        v-model="recordData.vitalSigns.temperature"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 36.5"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Saturação O₂ (%)</label>
                      <input
                        type="number"
                        v-model="recordData.vitalSigns.oxygenSaturation"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 98"
                      />
                    </div>
                  </div>
                </div>

                <!-- Diagnóstico -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                  <textarea
                    v-model="recordData.diagnosis"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva o diagnóstico..."
                  ></textarea>
                </div>

                <!-- Conduta -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Conduta</label>
                  <textarea
                    v-model="recordData.treatment"
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva a conduta adotada..."
                  ></textarea>
                </div>

                <!-- Prescrição -->
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-md font-medium text-gray-800">Prescrição</h3>
                    <button
                      @click="addPrescriptionItem"
                      class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium flex items-center"
                    >
                      <Plus size="16" class="mr-1" />
                      Adicionar Medicamento
                    </button>
                  </div>

                  <div
                    v-for="(item, index) in recordData.prescription"
                    :key="index"
                    class="p-4 border border-gray-200 rounded-lg mb-4"
                  >
                    <div class="flex justify-between items-start mb-4">
                      <h4 class="font-medium text-gray-800">Medicamento {{ index + 1 }}</h4>
                      <button
                        @click="removePrescriptionItem(index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        <Trash size="16" />
                      </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Medicamento</label>
                        <input
                          type="text"
                          v-model="item.medication"
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: Dipirona"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Dosagem</label>
                        <input
                          type="text"
                          v-model="item.dosage"
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: 500mg"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Instruções</label>
                      <textarea
                        v-model="item.instructions"
                        rows="2"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: Tomar 1 comprimido a cada 6 horas em caso de dor"
                      ></textarea>
                    </div>
                  </div>

                  <div
                    v-if="recordData.prescription.length === 0"
                    class="p-6 border border-dashed border-gray-300 rounded-lg text-center text-gray-500"
                  >
                    Nenhum medicamento adicionado
                  </div>
                </div>

                <!-- Observações -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                  <textarea
                    v-model="recordData.notes"
                    rows="3"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Observações adicionais..."
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
  Plus,
  Search,
  Trash,
  UserX,
} from "lucide-vue-next";
import { ref, computed } from "vue";
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
  history: "",
  physicalExam: "",
  vitalSigns: {
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    oxygenSaturation: "",
  },
  diagnosis: "",
  treatment: "",
  prescription: [],
  notes: "",
});

// Dados fictícios de pacientes
const patients = ref([
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    const patient = patients.value.find((p) => p.id === parseInt(selectedPatientId.value));
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
    history: "",
    physicalExam: "",
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      oxygenSaturation: "",
    },
    diagnosis: "",
    treatment: "",
    prescription: [],
    notes: "",
  };
};

const addPrescriptionItem = () => {
  recordData.value.prescription.push({
    medication: "",
    dosage: "",
    instructions: "",
  });
};

const removePrescriptionItem = (index) => {
  recordData.value.prescription.splice(index, 1);
};
</script>
