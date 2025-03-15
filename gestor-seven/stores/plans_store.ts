import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from './auth';
import { plansRepository, type Plan } from '~/repositories/plans_repository';

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
      
      // Obter o ID do médico logado
      const doctorId = auth.user?.id;
      
      if (!doctorId) {
        throw new Error('Usuário não autenticado');
      }
      
      console.log('Buscando planos para o médico:', doctorId);
      
      // Usar o repositório para buscar os planos
      plans.value = await plansRepository.getPlans(doctorId);
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
      
      // Usar o repositório para salvar o plano
      if (isEditing) {
        await plansRepository.updatePlan(planData);
      } else {
        await plansRepository.createPlan(planData);
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
      
      // Obter o ID do médico logado
      const doctorId = auth.user?.id;
      
      if (!doctorId) {
        throw new Error('Usuário não autenticado');
      }
      
      // Usar o repositório para excluir o plano
      await plansRepository.deletePlan(planId, doctorId);

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
