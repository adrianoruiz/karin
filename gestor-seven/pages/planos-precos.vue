<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto p-6">
      <PageHeader
        title="Planos e Preços"
        subtitle="Gerencie os planos e preços oferecidos aos seus pacientes"
        :capitalize-title="true"
        :show-search="false"
        action-button-text="Novo Plano"
        action-button-icon="Plus"
        @action-click="openNewPlanModal"
      />

      <!-- Tabs para filtrar os planos -->
      <div class="flex space-x-2 mb-6 mt-4">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === tab.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Carregando -->
      <div
        v-if="plansStore.loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Mensagem de erro -->
      <div
        v-else-if="plansStore.error"
        class="bg-red-50 text-red-600 p-4 rounded-lg mb-4"
      >
        <p>{{ plansStore.error }}</p>
        <button
          @click="plansStore.fetchPlans()"
          class="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Lista de planos -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(plan, index) in filteredPlans"
          :key="index"
          class="bg-white rounded-lg shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-gray-800">{{ plan.name }}</h3>
            <div class="flex space-x-2">
              <button
                @click="editPlan(plan)"
                class="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Edit size="18" />
              </button>
              <button
                @click="confirmDeletePlan(plan.id)"
                class="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash size="18" />
              </button>
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center">
              <Badge
                :class="`mr-2 ${
                  plan.modality === 'online'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`"
              >
                {{ plan.modality === "online" ? "Online" : "Presencial" }}
              </Badge>
              <Badge
                :class="`${
                  plan.type === 'pacote'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`"
              >
                {{ plan.type === "pacote" ? "Pacote" : "Consulta Avulsa" }}
              </Badge>
            </div>

            <div class="flex items-center">
              <DollarSign size="16" class="mr-1" />
              <span class="font-medium text-gray-800">
                R$ {{ formatCurrency(plan.price) }}
              </span>
              <span v-if="plan.installments > 1" class="ml-1">
                em até {{ plan.installments }}x
              </span>
            </div>

            <div v-if="plan.type === 'pacote'" class="flex items-center">
              <Calendar size="16" class="mr-1" />
              <span>{{ plan.consultations }} consultas</span>
            </div>

            <div v-if="plan.link" class="flex items-center mt-2">
              <a
                :href="plan.link"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <ExternalLink size="16" class="mr-1" />
                Link de pagamento
              </a>
            </div>
          </div>
        </div>

        <!-- Card para adicionar novo plano -->
        <div
          @click="openNewPlanModal"
          class="bg-white rounded-lg shadow-sm p-5 border border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 cursor-pointer min-h-[180px]"
        >
          <Plus size="24" />
          <span class="mt-2 font-medium">Adicionar Plano</span>
        </div>
      </div>

      <!-- Modal para adicionar/editar plano -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          @click.stop
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size="20" />
          </button>

          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            {{ isEditing ? "Editar Plano" : "Novo Plano" }}
          </h2>

          <form @submit.prevent="savePlan" class="space-y-4">
            <!-- Campo oculto para doctor_id -->
            <input type="hidden" v-model="plansStore.currentPlan.doctor_id" />
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nome do Plano</label
              >
              <input
                v-model="plansStore.currentPlan.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Modalidade</label
                >
                <select
                  v-model="plansStore.currentPlan.modality"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="online">Online</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Tipo</label
                >
                <select
                  v-model="plansStore.currentPlan.type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="consulta_avulsa">Consulta Avulsa</option>
                  <option value="pacote">Pacote</option>
                </select>
              </div>
            </div>

            <div v-if="plansStore.currentPlan.type === 'pacote'">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Número de Consultas</label
              >
              <input
                v-model.number="plansStore.currentPlan.consultations"
                type="number"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Preço (R$)</label
                >
                <input
                  v-model.number="plansStore.currentPlan.price"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Parcelas</label
                >
                <input
                  v-model.number="plansStore.currentPlan.installments"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Link de Pagamento (opcional)</label
              >
              <input
                v-model="plansStore.currentPlan.link"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="plansStore.loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                <span
                  v-if="plansStore.loading"
                  class="mr-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                ></span>
                {{ isEditing ? "Atualizar" : "Salvar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Calendar,
  DollarSign,
  Edit,
  ExternalLink,
  Plus,
  Trash,
  X,
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "~/components/page_header.vue";
import Badge from "~/components/ui/Badge.vue";
import SidebarMenu from "~/components/sidebar_menu.vue";
import { useAuthStore } from "~/stores/auth";
import { usePlansStore } from "~/stores/plans_store";

const router = useRouter();
const auth = useAuthStore();
const plansStore = usePlansStore();

// Estado
const showModal = ref(false);
const activeTab = ref("all");
const isEditing = ref(false);

// Tabs para filtrar os planos
const tabs = [
  { label: "Todos", value: "all" },
  { label: "Online", value: "online" },
  { label: "Presencial", value: "presencial" },
  { label: "Consultas Avulsas", value: "consulta_avulsa" },
  { label: "Pacotes", value: "pacote" },
];

// Planos filtrados com base na tab ativa
const filteredPlans = computed(() => {
  if (activeTab.value === "all") {
    return plansStore.plans;
  } else if (activeTab.value === "online") {
    return plansStore.onlinePlans;
  } else if (activeTab.value === "presencial") {
    return plansStore.presencialPlans;
  } else if (activeTab.value === "consulta_avulsa") {
    return plansStore.avulsaPlans;
  } else {
    return plansStore.pacotePlans;
  }
});

// Carregar planos ao montar o componente
onMounted(async () => {
  if (auth.isAuthenticated()) {
    await plansStore.fetchPlans();
  } else {
    router.push("/login");
  }
});

// Abrir modal para novo plano
function openNewPlanModal() {
  isEditing.value = false;
  plansStore.resetCurrentPlan();
  
  // Garantir que o doctor_id seja definido
  if (!plansStore.currentPlan.doctor_id && auth.user) {
    plansStore.currentPlan.doctor_id = auth.user.id;
    console.log('Doctor ID definido ao abrir modal:', plansStore.currentPlan.doctor_id);
  }
  
  showModal.value = true;
}

// Fechar modal
function closeModal() {
  showModal.value = false;
}

// Editar plano existente
function editPlan(plan) {
  isEditing.value = true;
  plansStore.setCurrentPlan(plan);
  
  // Garantir que o doctor_id seja definido
  if (!plansStore.currentPlan.doctor_id && auth.user) {
    plansStore.currentPlan.doctor_id = auth.user.id;
    console.log('Doctor ID definido ao editar:', plansStore.currentPlan.doctor_id);
  }
  
  showModal.value = true;
}

// Salvar plano (novo ou editado)
async function savePlan() {
  // Garantir que o doctor_id seja definido
  if (!plansStore.currentPlan.doctor_id && auth.user) {
    plansStore.currentPlan.doctor_id = auth.user.id;
  }
  
  console.log('Enviando plano com doctor_id:', plansStore.currentPlan.doctor_id);
  
  const result = await plansStore.savePlan(plansStore.currentPlan);
  if (result.success) {
    showModal.value = false;
  }
}

// Confirmar exclusão de plano
function confirmDeletePlan(planId) {
  if (confirm("Tem certeza que deseja excluir este plano?")) {
    plansStore.deletePlan(planId);
  }
}

// Formatar valor monetário
function formatCurrency(value) {
  return value.toFixed(2).replace(".", ",");
}
</script>
