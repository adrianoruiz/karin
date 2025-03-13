<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Triagem"
        subtitle="Preencha os dados vitais do paciente"
        search-placeholder="Buscar paciente para triagem..."
        :show-search="true"
        :notification-count="0"
        action-button-text="Nova Triagem"
        :action-button-icon="UserPlus"
        @search="handleSearch"
        @action-click="startNewTriage"
      />

      <!-- Main content -->
      <main class="p-6">
        <!-- Seleção de paciente ou visualização de triagem -->
        <div v-if="!selectedPatient && !isCreatingNew" class="bg-white rounded-lg shadow p-6">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-medium text-gray-800 mb-2">Selecione um paciente</h2>
              <p class="text-gray-600">
                Selecione um paciente para realizar a triagem
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
                    v-if="patient.hasRecentTriage"
                    class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    Triagem recente
                  </span>
                  <span
                    v-else-if="patient.hasOldTriage"
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    Triagem desatualizada
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

        <!-- Formulário de triagem -->
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
                    {{ isCreatingNew ? 'Nova Triagem' : 'Triagem' }}
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
                  @click="saveTriage"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Triagem
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

              <!-- Seleção de paciente (apenas para nova triagem) -->
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

              <!-- Data e hora da triagem -->
              <div class="mb-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Data da Triagem</label>
                    <input
                      type="date"
                      v-model="triageData.date"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Hora da Triagem</label>
                    <input
                      type="time"
                      v-model="triageData.time"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <!-- Sinais vitais -->
              <div class="bg-white p-6 border border-gray-200 rounded-lg mb-8">
                <h3 class="text-lg font-medium text-gray-800 mb-6">Sinais Vitais</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pressão Arterial (mmHg)</label>
                    <input
                      type="text"
                      v-model="triageData.vitalSigns.bloodPressure"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 120/80"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Frequência Cardíaca (bpm)</label>
                    <input
                      type="number"
                      v-model="triageData.vitalSigns.heartRate"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 72"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Temperatura (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      v-model="triageData.vitalSigns.temperature"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 36.5"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Saturação O₂ (%)</label>
                    <input
                      type="number"
                      v-model="triageData.vitalSigns.oxygenSaturation"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 98"
                    />
                  </div>
                </div>
              </div>

              <!-- Medidas antropométricas -->
              <div class="bg-white p-6 border border-gray-200 rounded-lg mb-8">
                <h3 class="text-lg font-medium text-gray-800 mb-6">Medidas Antropométricas</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      v-model="triageData.anthropometry.weight"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 70.5"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      v-model="triageData.anthropometry.height"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 170"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">IMC</label>
                    <input
                      type="text"
                      :value="calculateBMI"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                      readonly
                    />
                  </div>
                </div>
              </div>

              <!-- Observações -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  v-model="triageData.notes"
                  rows="3"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações adicionais sobre o estado do paciente..."
                ></textarea>
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
              @click="saveTriage"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Triagem
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
  Search,
  UserPlus,
  UserX,
} from "lucide-vue-next";
import { ref, computed } from "vue";
import PageHeader from "~/components/page_header.vue";

// Estado
const patientSearchQuery = ref("");
const selectedPatient = ref(null);
const selectedPatientId = ref("");
const isCreatingNew = ref(false);

// Dados da triagem
const triageData = ref({
  date: new Date().toISOString().split("T")[0], // Data atual formatada como YYYY-MM-DD
  time: new Date().toTimeString().slice(0, 5), // Hora atual formatada como HH:MM
  vitalSigns: {
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    oxygenSaturation: "",
  },
  anthropometry: {
    weight: "",
    height: "",
  },
  notes: "",
});

// Cálculo do IMC
const calculateBMI = computed(() => {
  const weight = parseFloat(triageData.value.anthropometry.weight);
  const height = parseFloat(triageData.value.anthropometry.height);
  
  if (!weight || !height) return "-";
  
  // IMC = peso (kg) / altura² (m)
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  return bmi.toFixed(1);
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
    hasRecentTriage: false,
    hasOldTriage: false,
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
    hasRecentTriage: true,
    hasOldTriage: false,
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
    hasRecentTriage: false,
    hasOldTriage: true,
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
    hasRecentTriage: false,
    hasOldTriage: false,
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
    hasRecentTriage: false,
    hasOldTriage: false,
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
    hasRecentTriage: false,
    hasOldTriage: false,
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
  // Implementar busca de pacientes
  console.log("Buscando pacientes:", query);
};

const startNewTriage = () => {
  isCreatingNew.value = true;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetTriageData();
};

const selectPatient = (patient) => {
  selectedPatient.value = patient;
  isCreatingNew.value = true;
  resetTriageData();
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
  resetTriageData();
};

const saveTriage = () => {
  // Aqui seria implementada a lógica para salvar a triagem
  console.log("Salvando triagem:", {
    patient: selectedPatient.value,
    data: triageData.value,
  });

  // Atualizar status de triagem do paciente
  if (selectedPatient.value) {
    const patientIndex = patients.value.findIndex(p => p.id === selectedPatient.value.id);
    if (patientIndex !== -1) {
      patients.value[patientIndex].hasRecentTriage = true;
      patients.value[patientIndex].hasOldTriage = false;
    }
  }

  alert("Triagem salva com sucesso!");
  cancelForm();
};

const resetTriageData = () => {
  triageData.value = {
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      oxygenSaturation: "",
    },
    anthropometry: {
      weight: "",
      height: "",
    },
    notes: "",
  };
};
</script>
