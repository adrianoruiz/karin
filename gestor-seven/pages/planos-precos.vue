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
        @action-click="openModal"
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
        v-if="loading"
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
          @click="fetchPlans"
          class="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Lista de planos -->
      <div 
        v-if="!loading && !plansStore.error && filteredPlans.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        <!-- Card para cada plano -->
        <div
          v-for="plan in filteredPlans"
          :key="plan.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Cabeçalho do card -->
          <div class="p-5 border-b border-gray-100">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ plan.name }}</h3>
                <Badge 
                  :color="plan.modality === 'online' ? 'blue' : 'green'"
                  class="mb-2"
                >
                  {{ plan.modality === 'online' ? 'Online' : 'Presencial' }}
                </Badge>
                <Badge 
                  :color="plan.type === 'consulta_avulsa' ? 'purple' : 'orange'"
                  class="ml-2 mb-2"
                >
                  {{ plan.type === 'consulta_avulsa' ? 'Consulta Avulsa' : 'Pacote' }}
                </Badge>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editPlan(plan)"
                  class="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                >
                  <Edit size="18" />
                </button>
                <button
                  @click="confirmDelete(plan)"
                  class="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                >
                  <Trash size="18" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Corpo do card -->
          <div class="p-5">
            <!-- Preço -->
            <div class="flex items-baseline mb-4">
              <span class="text-2xl font-bold text-blue-600">R$ {{ plan.price.toFixed(2).replace('.', ',') }}</span>
              <span class="text-gray-500 ml-2 text-sm">
                {{ plan.type === 'pacote' ? `${plan.installments}x de R$ ${(plan.price / plan.installments).toFixed(2).replace('.', ',')}` : '' }}
              </span>
            </div>
            
            <!-- Detalhes do plano -->
            <div class="space-y-3">
              <!-- Número de consultas (se for pacote) -->
              <div v-if="plan.type === 'pacote'" class="flex items-center text-gray-600">
                <CalendarClock size="18" class="mr-2 text-gray-400" />
                <span>{{ plan.consultations }} consultas</span>
              </div>
              
              <!-- Parcelamento -->
              <div v-if="plan.type === 'pacote'" class="flex items-center text-gray-600">
                <CreditCard size="18" class="mr-2 text-gray-400" />
                <span>Parcelamento em {{ plan.installments }}x</span>
              </div>
              
              <!-- Data de criação -->
              <div class="flex items-center text-gray-500 text-sm">
                <Clock size="14" class="mr-2 text-gray-400" />
                <span>Criado em {{ new Date(plan.created_at).toLocaleDateString('pt-BR') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card para adicionar novo plano -->
        <div
          @click="openModal"
          class="bg-white rounded-lg shadow-sm p-5 border border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 cursor-pointer min-h-[180px]"
        >
          <Plus size="24" />
          <span class="mt-2 font-medium">Adicionar Plano</span>
        </div>
      </div>

      <!-- Mensagem quando não há planos -->
      <div
        v-if="!loading && !plansStore.error && filteredPlans.length === 0"
        class="bg-white rounded-lg shadow-sm p-8 mt-6 text-center"
      >
        <div class="flex flex-col items-center justify-center">
          <CalendarX size="48" class="text-gray-300 mb-4" />
          <h3 class="text-lg font-medium text-gray-700 mb-2">Nenhum plano encontrado</h3>
          <p class="text-gray-500 mb-4">
            Você ainda não cadastrou nenhum plano {{ activeTab === 'online' ? 'online' : 'presencial' }}.
          </p>
          <button
            @click="openModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
          >
            <Plus size="18" class="mr-1" />
            Adicionar Plano
          </button>
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
                :disabled="saving"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                <span
                  v-if="saving"
                  class="mr-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                ></span>
                {{ isEditing ? "Atualizar" : "Salvar" }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Confirmar exclusão de plano -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          @click.stop
        >
          <button
            @click="showDeleteConfirm = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size="20" />
          </button>

          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            Confirmar Exclusão
          </h2>

          <p class="text-gray-600 mb-6">
            Tem certeza que deseja excluir o plano "{{ planToDelete.name }}"?
          </p>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showDeleteConfirm = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="deletePlan"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              <span
                v-if="deleting"
                class="mr-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              ></span>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Calendar,
  CalendarClock,
  CalendarX,
  Clock,
  CreditCard,
  DollarSign,
  Edit,
  ExternalLink,
  Plus,
  Trash,
  X,
} from "lucide-vue-next";
import { ref, computed, onMounted } from "vue";
import { usePlansStore } from "~/stores/plans_store";
import { useAuthStore } from "~/stores/auth";
import SidebarMenu from "~/components/sidebar_menu.vue";
import Badge from "~/components/ui/Badge.vue";

// Stores
const plansStore = usePlansStore();
const authStore = useAuthStore();

// Estado
const activeTab = ref('online');
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const planToDelete = ref(null);
const saving = ref(false);
const deleting = ref(false);
const isEditing = ref(false);

// Definição das tabs
const tabs = [
  { label: "Online", value: "online" },
  { label: "Presencial", value: "presencial" }
];

// Computed
const filteredPlans = computed(() => {
  return activeTab.value === 'online'
    ? plansStore.onlinePlans
    : plansStore.presencialPlans;
});

const loading = computed(() => plansStore.loading);
const currentPlan = computed(() => plansStore.currentPlan);

// Métodos
const fetchPlans = async () => {
  try {
    await plansStore.fetchPlans();
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    // Implementar notificação de erro
  }
};

const openModal = () => {
  isEditing.value = false;
  plansStore.resetCurrentPlan();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const editPlan = (plan) => {
  isEditing.value = true;
  plansStore.setCurrentPlan(plan);
  showModal.value = true;
};

// Salvar plano (novo ou editado)
async function savePlan() {
  saving.value = true;
  
  try {
    console.log('Enviando plano para salvar:', plansStore.currentPlan);
    
    const result = await plansStore.savePlan(plansStore.currentPlan);
    
    if (result.success) {
      closeModal();
      // Implementar notificação de sucesso
    } else {
      // Implementar notificação de erro
      console.error('Erro ao salvar plano:', result.error);
    }
  } catch (error) {
    console.error('Erro ao salvar plano:', error);
    // Implementar notificação de erro
  } finally {
    saving.value = false;
  }
}

const confirmDelete = (plan) => {
  planToDelete.value = plan;
  showDeleteConfirm.value = true;
};

const deletePlan = async () => {
  if (!planToDelete.value || !planToDelete.value.id) return;
  
  deleting.value = true;
  
  try {
    const result = await plansStore.deletePlan(planToDelete.value.id);
    
    if (result.success) {
      showDeleteConfirm.value = false;
      // Implementar notificação de sucesso
    } else {
      // Implementar notificação de erro
      console.error('Erro ao excluir plano:', result.error);
    }
  } catch (error) {
    console.error('Erro ao excluir plano:', error);
    // Implementar notificação de erro
  } finally {
    deleting.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchPlans();
});
</script>
