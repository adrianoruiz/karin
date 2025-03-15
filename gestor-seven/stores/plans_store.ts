import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { API_CONFIG } from '~/config/constants';
import { useAuthStore } from './auth';

// Definição da interface para o tipo Plan
interface Plan {
  id?: number;
  user_id?: number;
  doctor_id?: number;
  name: string;
  modality: 'online' | 'presencial';
  type: 'consulta_avulsa' | 'pacote';
  consultations: number | null;
  price: number;
  installments: number;
  link: string | null;
}

export const usePlansStore = defineStore('plans', () => {
  // Estado
  const plans = ref<Plan[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPlan = ref<Plan>({
    name: '',
    modality: 'online',
    type: 'consulta_avulsa',
    consultations: null,
    price: 0,
    installments: 1,
    link: null,
  });

  // Getters
  const onlinePlans = computed(() => plans.value.filter(plan => plan.modality === 'online'));
  const presencialPlans = computed(() => plans.value.filter(plan => plan.modality === 'presencial'));
  const avulsaPlans = computed(() => plans.value.filter(plan => plan.type === 'consulta_avulsa'));
  const pacotePlans = computed(() => plans.value.filter(plan => plan.type === 'pacote'));

  // Actions
  async function fetchPlans() {
    const auth = useAuthStore();
    
    try {
      loading.value = true;
      error.value = null;
      
      // Adicionar doctor_id como parâmetro de consulta
      const doctorId = auth.user?.id;
      const url = `${API_CONFIG.BASE_URL}plans?doctor_id=${doctorId}`;
      
      console.log('Buscando planos com URL:', url);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao buscar planos:', errorData);
        throw new Error(errorData.error || 'Falha ao carregar planos');
      }

      const data = await response.json();
      plans.value = data.data || [];
      console.log('Planos carregados:', plans.value);
    } catch (err: any) {
      console.error('Erro ao buscar planos:', err);
      error.value = err.message || 'Erro ao buscar planos';
    } finally {
      loading.value = false;
    }
  }

  async function savePlan(plan: Plan) {
    const auth = useAuthStore();
    const isEditing = !!plan.id;
    
    try {
      loading.value = true;
      error.value = null;
      
      // Garantir que o doctor_id seja incluído
      const planData = { 
        ...plan,
        doctor_id: plan.doctor_id || auth.user?.id
      };
      
      console.log('Enviando plano:', planData);
      
      const url = isEditing 
        ? `${API_CONFIG.BASE_URL}plans/${plan.id}` 
        : `${API_CONFIG.BASE_URL}plans`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error(errorData.error || (isEditing ? 'Falha ao atualizar plano' : 'Falha ao criar plano'));
      }

      // Atualizar a lista de planos
      await fetchPlans();
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao salvar plano:', err);
      error.value = err.message || 'Erro ao salvar plano';
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  }

  async function deletePlan(planId: number) {
    const auth = useAuthStore();
    
    try {
      loading.value = true;
      error.value = null;
      
      // Adicionar doctor_id como parâmetro de consulta
      const doctorId = auth.user?.id;
      const url = `${API_CONFIG.BASE_URL}plans/${planId}?doctor_id=${doctorId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao excluir plano:', errorData);
        throw new Error(errorData.error || 'Falha ao excluir plano');
      }

      // Atualizar a lista de planos
      await fetchPlans();
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao excluir plano:', err);
      error.value = err.message || 'Erro ao excluir plano';
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  }

  function resetCurrentPlan() {
    const auth = useAuthStore();
    currentPlan.value = {
      name: '',
      modality: 'online',
      type: 'consulta_avulsa',
      consultations: null,
      price: 0,
      installments: 1,
      link: null,
      doctor_id: auth.user?.id
    };
  }

  function setCurrentPlan(plan: Plan) {
    const auth = useAuthStore();
    currentPlan.value = { 
      ...plan,
      doctor_id: plan.doctor_id || auth.user?.id
    };
  }

  return {
    // Estado
    plans,
    loading,
    error,
    currentPlan,
    
    // Getters
    onlinePlans,
    presencialPlans,
    avulsaPlans,
    pacotePlans,
    
    // Actions
    fetchPlans,
    savePlan,
    deletePlan,
    resetCurrentPlan,
    setCurrentPlan,
  };
});
