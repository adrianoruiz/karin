<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Pacientes"
        subtitle="Gerencie seus pacientes"
        search-placeholder="Buscar por nome, CPF ou convênio..."
        :notification-count="0"
        action-button-text="Novo Paciente"
        :action-button-icon="UserPlus"
        @search="handleSearch"
        @action-click="openNewPatientModal"
      />

      <!-- Main content -->
      <main class="p-6">
        <div class="bg-white rounded-lg shadow">
          <!-- Filtros -->
          <div class="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-2">
              <button
                v-for="filter in filters"
                :key="filter.value"
                @click="activeFilter = filter.value"
                :class="`px-3 py-1.5 text-sm rounded-md ${
                  activeFilter === filter.value
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`"
              >
                {{ filter.label }}
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <select
                v-model="sortBy"
                class="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="recent">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
              </select>

              <button
                @click="viewMode = 'grid'"
                :class="`p-1.5 rounded-md ${
                  viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`"
              >
                <Grid size="18" />
              </button>
              <button
                @click="viewMode = 'list'"
                :class="`p-1.5 rounded-md ${
                  viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`"
              >
                <List size="18" />
              </button>
            </div>
          </div>

          <!-- Lista de pacientes -->
          <div class="p-6">
            <div v-if="filteredPatients.length === 0" class="text-center py-10">
              <UserX size="48" class="mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-700 mb-1">Nenhum paciente encontrado</h3>
              <p class="text-gray-500">Tente ajustar seus filtros ou adicionar novos pacientes</p>
            </div>

            <!-- Visualização em grade -->
            <div
              v-else-if="viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="patient in filteredPatients"
                :key="patient.id"
                class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div class="p-4 border-b border-gray-100 flex items-center space-x-4">
                  <div class="relative">
                    <img
                      :src="patient.avatar || 'https://via.placeholder.com/100'"
                      :alt="patient.name"
                      class="w-14 h-14 rounded-full object-cover"
                    />
                    <div
                      v-if="patient.status === 'active'"
                      class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-medium text-gray-900 truncate">{{ patient.name }}</h3>
                    <div class="flex items-center text-sm text-gray-500">
                      <Calendar size="14" class="mr-1" />
                      <span>{{ patient.age }} anos</span>
                    </div>
                  </div>
                  <button class="text-gray-400 hover:text-gray-600">
                    <MoreVertical size="18" />
                  </button>
                </div>

                <div class="p-4 space-y-3">
                  <div class="flex items-start">
                    <Phone size="16" class="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-900 truncate">{{ patient.phone }}</div>
                      <div class="text-xs text-gray-500">Telefone</div>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <Mail size="16" class="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-900 truncate">{{ patient.email }}</div>
                      <div class="text-xs text-gray-500">Email</div>
                    </div>
                  </div>

                  <div v-if="patient.healthInsurance" class="flex items-start">
                    <CreditCard size="16" class="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-900 truncate">{{ patient.healthInsurance }}</div>
                      <div class="text-xs text-gray-500">Convênio</div>
                    </div>
                  </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                  <button
                    class="text-blue-600 text-sm font-medium flex items-center"
                    @click="openPatientDetails(patient)"
                  >
                    <User size="16" class="mr-1" />
                    Ver perfil
                  </button>
                  <button
                    class="text-blue-600 text-sm font-medium flex items-center"
                    @click="openMedicalRecord(patient)"
                  >
                    <FileText size="16" class="mr-1" />
                    Prontuário
                  </button>
                </div>
              </div>
            </div>

            <!-- Visualização em lista -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paciente
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contato
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Convênio
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Última Consulta
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="patient in filteredPatients" :key="patient.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 relative">
                          <img
                            :src="patient.avatar || 'https://via.placeholder.com/100'"
                            :alt="patient.name"
                            class="h-10 w-10 rounded-full object-cover"
                          />
                          <div
                            v-if="patient.status === 'active'"
                            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                          ></div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                          <div class="text-sm text-gray-500">
                            {{ patient.age }} anos • {{ patient.gender === 'F' ? 'Feminino' : 'Masculino' }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ patient.phone }}</div>
                      <div class="text-sm text-gray-500">{{ patient.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ patient.healthInsurance || 'Particular' }}
                      </div>
                      <div v-if="patient.healthInsurance" class="text-sm text-gray-500">
                        {{ patient.healthInsuranceNumber }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ patient.lastAppointment }}</div>
                      <div class="text-sm text-gray-500">{{ patient.lastAppointmentType }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`"
                      >
                        {{ patient.status === 'active' ? 'Ativo' : 'Inativo' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        @click="openPatientDetails(patient)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Ver perfil
                      </button>
                      <button
                        @click="openMedicalRecord(patient)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Prontuário
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Paginação -->
          <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Mostrando <span class="font-medium">1</span> a
              <span class="font-medium">{{ filteredPatients.length }}</span> de
              <span class="font-medium">{{ patients.length }}</span> pacientes
            </div>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Anterior
              </button>
              <button
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Calendar,
  CreditCard,
  FileText,
  Grid,
  List,
  Mail,
  MoreVertical,
  Phone,
  User,
  UserPlus,
  UserX,
} from "lucide-vue-next";
import { ref, computed } from "vue";
import PageHeader from "~/components/page_header.vue";

// Filtros
const filters = [
  { label: "Todos", value: "all" },
  { label: "Ativos", value: "active" },
  { label: "Inativos", value: "inactive" },
  { label: "Convênio", value: "insurance" },
  { label: "Particulares", value: "private" },
];

// Estado
const activeFilter = ref("all");
const sortBy = ref("name");
const viewMode = ref("grid");
const searchQuery = ref("");

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
    healthInsuranceNumber: "12345678",
    lastAppointment: "10/03/2025",
    lastAppointmentType: "Consulta de rotina",
    status: "active",
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
    healthInsuranceNumber: "87654321",
    lastAppointment: "05/03/2025",
    lastAppointmentType: "Retorno",
    status: "active",
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
    healthInsuranceNumber: null,
    lastAppointment: "28/02/2025",
    lastAppointmentType: "Primeira consulta",
    status: "active",
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
    healthInsuranceNumber: "56781234",
    lastAppointment: "15/02/2025",
    lastAppointmentType: "Consulta de emergência",
    status: "inactive",
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
    healthInsuranceNumber: "43218765",
    lastAppointment: "20/02/2025",
    lastAppointmentType: "Retorno",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 6,
    name: "Ricardo Alves",
    age: 45,
    gender: "M",
    phone: "(11) 93210-9876",
    email: "ricardo.alves@email.com",
    healthInsurance: null,
    healthInsuranceNumber: null,
    lastAppointment: "01/03/2025",
    lastAppointmentType: "Consulta de rotina",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 7,
    name: "Juliana Costa",
    age: 38,
    gender: "F",
    phone: "(11) 98901-2345",
    email: "juliana.costa@email.com",
    healthInsurance: "Porto Seguro",
    healthInsuranceNumber: "90123456",
    lastAppointment: "25/02/2025",
    lastAppointmentType: "Consulta de rotina",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 8,
    name: "Marcelo Souza",
    age: 50,
    gender: "M",
    phone: "(11) 96789-0123",
    email: "marcelo.souza@email.com",
    healthInsurance: "Amil",
    healthInsuranceNumber: "67890123",
    lastAppointment: "18/02/2025",
    lastAppointmentType: "Retorno",
    status: "inactive",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
]);

// Filtragem de pacientes
const filteredPatients = computed(() => {
  let result = [...patients.value];

  // Aplicar filtro ativo
  if (activeFilter.value === "active") {
    result = result.filter((patient) => patient.status === "active");
  } else if (activeFilter.value === "inactive") {
    result = result.filter((patient) => patient.status === "inactive");
  } else if (activeFilter.value === "insurance") {
    result = result.filter((patient) => patient.healthInsurance !== null);
  } else if (activeFilter.value === "private") {
    result = result.filter((patient) => patient.healthInsurance === null);
  }

  // Aplicar busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        (patient.healthInsurance && patient.healthInsurance.toLowerCase().includes(query)) ||
        patient.email.toLowerCase().includes(query)
    );
  }

  // Aplicar ordenação
  if (sortBy.value === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === "name-desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy.value === "recent") {
    // Aqui estamos simulando a ordenação por data de última consulta
    // Em um cenário real, você converteria as strings de data para objetos Date
    result.sort((a, b) => b.id - a.id);
  } else if (sortBy.value === "oldest") {
    result.sort((a, b) => a.id - b.id);
  }

  return result;
});

// Funções de ação
const handleSearch = (query) => {
  searchQuery.value = query;
};

const openNewPatientModal = () => {
  alert("Funcionalidade de adicionar novo paciente será implementada em breve!");
};

const openPatientDetails = (patient) => {
  alert(`Visualizando perfil de ${patient.name}`);
};

const openMedicalRecord = (patient) => {
  alert(`Visualizando prontuário de ${patient.name}`);
};
</script>
