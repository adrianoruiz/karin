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
                @click="confirmDelete(plan)"
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
          @click="openModal"
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
