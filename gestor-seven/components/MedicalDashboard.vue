<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4">
      <div class="flex items-center mb-8">
        <div
          class="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl"
        >
          SD
        </div>
        <div class="ml-3">
          <h3 class="font-medium text-lg">Seven Doctor</h3>
          <p class="text-sm text-blue-200">Versão Premium</p>
        </div>
      </div>

      <nav>
        <button
          @click="activeTab = 'home'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'home' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <Home size="20" class="mr-3" />
          <span>Início</span>
        </button>

        <button
          @click="activeTab = 'appointments'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'appointments' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <Calendar size="20" class="mr-3" />
          <span>Agenda</span>
          <span
            class="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >8</span
          >
        </button>

        <button
          @click="activeTab = 'patients'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'patients' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <Users size="20" class="mr-3" />
          <span>Pacientes</span>
        </button>

        <button
          @click="activeTab = 'prescriptions'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'prescriptions' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <FileText size="20" class="mr-3" />
          <span>Prontuários e Receitas</span>
        </button>

        <button
          @click="activeTab = 'reports'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'reports' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <BarChart2 size="20" class="mr-3" />
          <span>Relatórios</span>
        </button>

        <button
          @click="activeTab = 'settings'"
          :class="`flex items-center w-full p-3 rounded-lg mb-1 transition-colors ${
            activeTab === 'settings' ? 'bg-white/10' : 'hover:bg-white/5'
          }`"
        >
          <Settings size="20" class="mr-3" />
          <span>Configurações</span>
        </button>
      </nav>

      <div class="mt-auto pt-6">
        <div class="flex items-center p-3">
          <div
            class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
          >
            <User size="24" class="text-gray-600" />
          </div>
          <div class="ml-3">
            <p class="font-medium">Dra. Karin Boldorini</p>
            <p class="text-sm text-blue-200">Dermatologista</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white shadow-sm p-4 flex items-center justify-between">
        <div>
          <h1 class="text-lg font-medium text-gray-800 capitalize">
            {{ formattedDate }}
          </h1>
          <p class="text-sm text-gray-500">Bem-vinda de volta, Dra. Karin</p>
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Buscar paciente, consulta..."
              class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <Search size="18" class="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button class="relative">
            <Bell size="22" class="text-gray-600" />
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >3</span
            >
          </button>

          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size="18" class="mr-2" />
            Nova Consulta
          </button>
        </div>
      </header>

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
                    <span class="font-medium">Receita para Maria Ferrari:</span>
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
                    <span class="font-medium">Lembrete:</span> Maria Ferrari não
                    realizou o exame de sangue solicitado na última consulta.
                    Deseja enviar um lembrete via WhatsApp?
                  </p>
                  <div class="mt-2 flex gap-2">
                    <button
                      class="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Enviar lembrete
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

              <template v-if="waitingPatients.length > 0">
                <div class="divide-y divide-gray-100">
                  <div
                    v-for="(patient, index) in waitingPatients"
                    :key="index"
                    class="p-4 flex items-center"
                  >
                    <div
                      class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3"
                    >
                      <User size="20" class="text-gray-400" />
                    </div>

                    <div class="flex-1">
                      <h3 class="font-medium">{{ patient.name }}</h3>
                      <div class="flex items-center text-sm text-gray-500">
                        <Clock size="14" class="mr-1" />
                        <span>Agendado: {{ patient.scheduled }}</span>
                        <span class="mx-1">•</span>
                        <span class="text-orange-500"
                          >Espera: {{ patient.waiting }}</span
                        >
                      </div>
                    </div>

                    <button class="p-2 rounded-lg bg-green-600 text-white">
                      <CheckCircle size="18" />
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="p-8 text-center text-gray-500">
                  <Clock size="32" class="mx-auto mb-2 text-gray-300" />
                  <p>Nenhum paciente na sala de espera</p>
                </div>
              </template>
            </div>

            <!-- Notifications -->
            <div class="bg-white rounded-lg shadow">
              <div
                class="p-4 border-b border-gray-100 flex justify-between items-center"
              >
                <h2 class="font-medium text-lg">Notificações</h2>
                <button class="text-sm text-blue-600">
                  Marcar todas como lidas
                </button>
              </div>

              <div class="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                <div
                  v-for="(alert, index) in alerts"
                  :key="index"
                  class="p-4 flex"
                >
                  <div
                    :class="`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                      alert.type === 'exame'
                        ? 'bg-green-100 text-green-600'
                        : alert.type === 'agenda'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-orange-100 text-orange-600'
                    }`"
                  >
                    <FileText v-if="alert.type === 'exame'" size="16" />
                    <Calendar v-else-if="alert.type === 'agenda'" size="16" />
                    <BarChart2 v-else size="16" />
                  </div>

                  <div class="flex-1">
                    <p class="text-sm text-gray-700">{{ alert.message }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ alert.time }}</p>
                  </div>

                  <button class="text-gray-400 hover:text-gray-600">
                    <X size="16" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick actions -->
            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="font-medium text-lg mb-3">Ações Rápidas</h2>

              <div class="grid grid-cols-2 gap-3">
                <button
                  class="bg-blue-50 text-blue-700 p-3 rounded-lg flex flex-col items-center"
                >
                  <FileText size="20" class="mb-1" />
                  <span class="text-sm">Nova Receita</span>
                </button>

                <button
                  class="bg-green-50 text-green-700 p-3 rounded-lg flex flex-col items-center"
                >
                  <User size="20" class="mb-1" />
                  <span class="text-sm">Novo Paciente</span>
                </button>

                <button
                  class="bg-purple-50 text-purple-700 p-3 rounded-lg flex flex-col items-center"
                >
                  <MessageCircle size="20" class="mb-1" />
                  <span class="text-sm">Enviar Mensagem</span>
                </button>

                <button
                  class="bg-orange-50 text-orange-700 p-3 rounded-lg flex flex-col items-center"
                >
                  <BarChart2 size="20" class="mb-1" />
                  <span class="text-sm">Relatórios</span>
                </button>
              </div>
            </div>

            <!-- Patient satisfaction -->
            <div class="bg-white rounded-lg shadow p-4">
              <h2 class="font-medium text-lg mb-3">Satisfação dos Pacientes</h2>

              <div class="flex items-center justify-center space-x-1 mb-2">
                <Star
                  v-for="star in 5"
                  :key="star"
                  size="28"
                  class="text-yellow-400 fill-current"
                />
              </div>

              <p class="text-center text-lg font-medium">4.9 / 5.0</p>
              <p class="text-center text-sm text-gray-500 mb-3">
                Baseado em 142 avaliações
              </p>

              <div
                class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-4"
              >
                <div
                  class="bg-blue-600 h-full rounded-full"
                  style="width: 90%"
                ></div>
              </div>

              <button class="w-full text-sm text-blue-600 font-medium">
                Ver todas as avaliações
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Patient Side Panel (Visão Rápida) -->
    <Transition name="slide">
      <div
        v-if="showPatientPanel"
        class="fixed top-0 right-0 h-screen w-96 shadow-xl z-50"
      >
        <PatientSidePanel
          :patient-id="selectedPatientId"
          @close="showPatientPanel = false"
        />
      </div>
    </Transition>
  </div>
</template>

<script>
import {
  Activity,
  BarChart2,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Home,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Star,
  User,
  Users,
  X,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import PatientSidePanel from "./PatientSidePanel.vue";

export default {
  name: "MedicalDashboard",
  components: {
    Calendar,
    Clock,
    Users,
    FileText,
    Settings,
    Home,
    Activity,
    Bell,
    BarChart2,
    Search,
    Plus,
    User,
    MessageCircle,
    CheckCircle,
    X,
    Star,
    PatientSidePanel,
  },
  setup() {
    const activeTab = ref("home");
    const today = ref(new Date());
    const showPatientPanel = ref(false);
    const selectedPatientId = ref(null);

    // Formato da data em português
    const formattedDate = computed(() => {
      return today.value.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    });

    // Data de amostra para o dashboard
    const appointments = ref([
      {
        id: "23472",
        patient: "Maria Ferrari",
        type: "Consulta online",
        time: "14:00",
        date: "20/03/2025",
        status: "agendado",
        value: "R$ 300,00",
        payment: "Cartão",
        isNew: true,
        notes: "Primeira consulta",
      },
      {
        id: "23473",
        patient: "Carlos Eduardo",
        type: "Consulta presencial",
        time: "15:30",
        date: "20/03/2025",
        status: "confirmado",
        value: "R$ 350,00",
        payment: "Plano de saúde",
        isNew: false,
        notes: "Retorno - Exames",
      },
      {
        id: "23474",
        patient: "Ana Beatriz",
        type: "Consulta online",
        time: "16:45",
        date: "20/03/2025",
        status: "agendado",
        value: "R$ 300,00",
        payment: "Pix",
        isNew: false,
        notes: "Retorno - Medicação",
      },
    ]);

    const stats = ref([
      {
        label: "Consultas hoje",
        value: 8,
        icon: Calendar,
        iconClass: "text-blue-600",
      },
      {
        label: "Novos pacientes",
        value: 3,
        icon: Users,
        iconClass: "text-green-600",
      },
      {
        label: "Taxa de ocupação",
        value: "87%",
        icon: Activity,
        iconClass: "text-purple-600",
      },
      {
        label: "Faturamento hoje",
        value: "R$ 2.400",
        icon: BarChart2,
        iconClass: "text-orange-600",
      },
    ]);

    // Próximos pacientes (fila de espera)
    const waitingPatients = ref([
      {
        name: "João Silva",
        arrived: "13:45",
        scheduled: "14:00",
        waiting: "5 min",
      },
      {
        name: "Mariana Costa",
        arrived: "14:10",
        scheduled: "14:15",
        waiting: "Na hora",
      },
    ]);

    // Lembretes e alertas
    const alerts = ref([
      {
        type: "exame",
        message: "Resultados de Carlos Eduardo disponíveis",
        time: "30 min atrás",
      },
      {
        type: "agenda",
        message: "Consulta de Gabriel Torres remarcada para amanhã",
        time: "1h atrás",
      },
      {
        type: "faturamento",
        message: "3 recibos pendentes de emissão",
        time: "2h atrás",
      },
    ]);

    // Funções
    const openPatientPanel = (patientId) => {
      selectedPatientId.value = patientId;
      showPatientPanel.value = true;
    };

    return {
      activeTab,
      formattedDate,
      appointments,
      stats,
      waitingPatients,
      alerts,
      showPatientPanel,
      selectedPatientId,
      openPatientPanel,
    };
  },
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
