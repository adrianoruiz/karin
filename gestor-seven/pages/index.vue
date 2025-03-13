<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header 
        :title="formattedDate" 
        subtitle="Bem-vinda de volta, Dra. Karin"
        :capitalize-title="true"
        search-placeholder="Buscar paciente, consulta..."
        :notification-count="3"
        action-button-text="Nova Consulta"
        :action-button-icon="Plus"
        @action-click="createNewAppointment"
      />

      <!-- Dashboard content -->
      <main class="p-6">
        <!-- Stats cards -->
        <div class="grid grid-cols-4 gap-6 mb-6">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-white rounded-lg shadow p-4 flex items-center"
          >
            <div class="p-3 rounded-lg bg-gray-50">
              <component :is="stat.icon" :size="24" :class="stat.iconClass" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">{{ stat.label }}</p>
              <p class="text-xl font-semibold">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <!-- Main grid -->
        <div class="grid grid-cols-3 gap-6">
          <!-- Left column -->
          <div class="col-span-2 space-y-6">
            <!-- Today's appointments -->
            <div class="bg-white rounded-lg shadow">
              <div
                class="p-4 border-b border-gray-100 flex justify-between items-center"
              >
                <h2 class="font-medium text-lg">Consultas de Hoje</h2>
                <div class="flex gap-2">
                  <button
                    class="px-3 py-1 rounded bg-blue-50 text-blue-600 text-sm font-medium"
                  >
                    Todos
                  </button>
                  <button
                    class="px-3 py-1 rounded text-gray-500 text-sm font-medium"
                  >
                    Aguardando
                  </button>
                  <button
                    class="px-3 py-1 rounded text-gray-500 text-sm font-medium"
                  >
                    Atendidos
                  </button>
                </div>
              </div>

              <div class="divide-y divide-gray-100">
                <div
                  v-for="apt in appointments"
                  :key="apt.id"
                  class="p-4 flex items-center"
                >
                  <div class="flex-shrink-0 mr-4">
                    <div
                      class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                    >
                      <User size="24" class="text-gray-400" />
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between">
                      <div>
                        <h3 class="font-medium">{{ apt.patient }}</h3>
                        <div
                          class="flex items-center text-sm text-gray-500 mt-1"
                        >
                          <span
                            :class="`w-2 h-2 rounded-full mr-2 ${
                              apt.type.includes('online')
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }`"
                          ></span>
                          <span>{{ apt.type }}</span>
                          <span class="mx-2">•</span>
                          <Clock size="14" class="mr-1" />
                          <span>{{ apt.time }}</span>
                          <template v-if="apt.isNew">
                            <span class="mx-2">•</span>
                            <span
                              class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                              >Novo Paciente</span
                            >
                          </template>
                        </div>
                      </div>

                      <div class="text-right">
                        <p class="font-medium">{{ apt.value }}</p>
                        <p class="text-sm text-gray-500">{{ apt.payment }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="ml-4 flex space-x-2">
                    <button
                      class="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                    >
                      <MessageCircle size="18" />
                    </button>
                    <button
                      @click="openPatientPanel(apt.id)"
                      class="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                    >
                      <FileText size="18" />
                    </button>
                    <button class="p-2 rounded-lg bg-blue-600 text-white">
                      <CheckCircle size="18" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-gray-100 text-center">
                <button class="text-blue-600 text-sm font-medium">
                  Ver todos os agendamentos
                </button>
              </div>
            </div>

            <!-- AI Assistant Suggestions -->
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center mb-4">
                <div
                  class="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3"
                >
                  <span class="text-white font-bold">IA</span>
                </div>
                <h2 class="font-medium">Sugestões do Assistente IA</h2>
              </div>

              <div class="space-y-3">
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p class="text-sm text-gray-700">
                    <span class="font-medium"
                      >Receita para Maria Ferrari:</span
                    >
                    Com base nos sintomas apresentados, sugiro considerar
                    Loratadina 10mg, 1 comprimido ao dia por 7 dias.
                  </p>
                  <div class="mt-2 flex gap-2">
                    <button
                      class="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Usar sugestão
                    </button>
                    <button
                      class="text-xs text-gray-500 px-3 py-1 rounded border border-gray-200"
                    >
                      Ignorar
                    </button>
                  </div>
                </div>

                <div class="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p class="text-sm text-gray-700">
                    <span class="font-medium"
                      >Lembrete para Paulo Andrade:</span
                    >
                    Exames de sangue completos estão pendentes desde a última
                    consulta.
                  </p>
                  <div class="mt-2 flex gap-2">
                    <button
                      class="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Criar lembrete
                    </button>
                    <button
                      class="text-xs text-gray-500 px-3 py-1 rounded border border-gray-200"
                    >
                      Ignorar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="space-y-6">
            <!-- Waiting patients -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Sala de Espera</h2>
              </div>

              <div class="divide-y divide-gray-100">
                <div
                  v-for="(patient, index) in waitingPatients"
                  :key="index"
                  class="p-4 flex items-center"
                >
                  <div class="flex-shrink-0 mr-4">
                    <div
                      class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                    >
                      <User size="20" class="text-gray-400" />
                    </div>
                  </div>

                  <div class="flex-1">
                    <h3 class="font-medium">{{ patient.name }}</h3>
                    <div class="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size="14" class="mr-1" />
                      <span>{{ patient.time }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ patient.waitTime }}</span>
                    </div>
                  </div>

                  <div class="ml-4">
                    <button
                      class="p-2 rounded-lg bg-blue-600 text-white flex items-center"
                    >
                      <ArrowRight size="18" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-gray-100 text-center">
                <button class="text-blue-600 text-sm font-medium">
                  Ver todos os pacientes
                </button>
              </div>
            </div>

            <!-- Upcoming appointments -->
            <div class="bg-white rounded-lg shadow">
              <div class="p-4 border-b border-gray-100">
                <h2 class="font-medium text-lg">Próximas Consultas</h2>
              </div>

              <div class="divide-y divide-gray-100">
                <div
                  v-for="(apt, index) in upcomingAppointments"
                  :key="index"
                  class="p-4"
                >
                  <div class="flex items-center">
                    <div
                      class="w-2 h-2 rounded-full mr-2"
                      :class="apt.type === 'Online' ? 'bg-blue-500' : 'bg-green-500'"
                    ></div>
                    <span class="text-sm text-gray-500">{{ apt.type }}</span>
                  </div>
                  <h3 class="font-medium mt-1">{{ apt.patient }}</h3>
                  <div class="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size="14" class="mr-1" />
                    <span>{{ apt.date }}</span>
                    <span class="mx-2">•</span>
                    <Clock size="14" class="mr-1" />
                    <span>{{ apt.time }}</span>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-gray-100 text-center">
                <button class="text-blue-600 text-sm font-medium">
                  Ver agenda completa
                </button>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="font-medium text-lg mb-3">Ações Rápidas</h2>

              <div class="grid grid-cols-2 gap-3">
                <button
                  class="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-gray-700 hover:bg-gray-50"
                >
                  <Calendar size="24" class="mb-2 text-blue-600" />
                  <span class="text-sm">Agendar</span>
                </button>
                <button
                  class="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-gray-700 hover:bg-gray-50"
                >
                  <FileText size="24" class="mb-2 text-blue-600" />
                  <span class="text-sm">Receita</span>
                </button>
                <button
                  class="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-gray-700 hover:bg-gray-50"
                >
                  <FileCheck size="24" class="mb-2 text-blue-600" />
                  <span class="text-sm">Atestado</span>
                </button>
                <button
                  class="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-gray-700 hover:bg-gray-50"
                >
                  <MessageCircle size="24" class="mb-2 text-blue-600" />
                  <span class="text-sm">Mensagem</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  MessageCircle,
  Plus,
  Search,
  User,
  Users,
} from "lucide-vue-next";
import { ref, computed } from "vue";
import { usePatientPanelStore } from "~/stores/patient_panel_store";
import PageHeader from "~/components/page_header.vue";

const patientPanelStore = usePatientPanelStore();

// Formatar data atual
const formattedDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Função para criar nova consulta
const createNewAppointment = () => {
  console.log("Criando nova consulta");
  // Aqui você pode adicionar a lógica para criar uma nova consulta
};

// Estatísticas para o dashboard
const stats = [
  {
    label: "Consultas Hoje",
    value: "8",
    icon: Calendar,
    iconClass: "text-blue-600",
  },
  {
    label: "Total de Pacientes",
    value: "1.248",
    icon: Users,
    iconClass: "text-green-600",
  },
  {
    label: "Receita Mensal",
    value: "R$ 24.500",
    icon: CreditCard,
    iconClass: "text-purple-600",
  },
  {
    label: "Consultas Pendentes",
    value: "12",
    icon: Clock,
    iconClass: "text-orange-600",
  },
];

// Consultas do dia
const appointments = [
  {
    id: 1,
    patient: "Maria Ferrari",
    type: "Consulta online",
    time: "09:00 - 09:30",
    value: "R$ 350,00",
    payment: "Pago via PIX",
    isNew: false,
  },
  {
    id: 2,
    patient: "João Silva",
    type: "Consulta presencial",
    time: "10:00 - 10:30",
    value: "R$ 350,00",
    payment: "Pendente",
    isNew: true,
  },
  {
    id: 3,
    patient: "Ana Oliveira",
    type: "Consulta online",
    time: "11:00 - 11:30",
    value: "R$ 350,00",
    payment: "Pago via cartão",
    isNew: false,
  },
];

// Pacientes na sala de espera
const waitingPatients = [
  {
    name: "Maria Ferrari",
    time: "09:00",
    waitTime: "Aguardando há 5 min",
  },
  {
    name: "João Silva",
    time: "10:00",
    waitTime: "Chegou agora",
  },
];

// Próximas consultas
const upcomingAppointments = [
  {
    patient: "Paulo Andrade",
    type: "Presencial",
    date: "Amanhã",
    time: "09:00",
  },
  {
    patient: "Carla Mendes",
    type: "Online",
    date: "Amanhã",
    time: "14:30",
  },
  {
    patient: "Roberto Alves",
    type: "Presencial",
    date: "15/03/2025",
    time: "11:00",
  },
];

// Abrir painel de paciente
const openPatientPanel = (patientId) => {
  console.log("Opening patient panel for ID:", patientId);
  patientPanelStore.openPanel(patientId);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
