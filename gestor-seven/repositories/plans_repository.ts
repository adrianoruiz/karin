import { AbstractHttp } from '~/services/api';

// Definição da interface para o tipo Plan
export interface Plan {
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

// Interface para a resposta da API
interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

/**
 * Repositório para gerenciamento de planos
 * Implementa o padrão Repository para isolar a lógica de acesso a dados
 */
export class PlansRepository extends AbstractHttp {
  /**
   * Busca todos os planos do médico
   * @param doctorId ID do médico
   * @returns Lista de planos
   */
  async getPlans(doctorId: number): Promise<Plan[]> {
    try {
      console.log('Chamando API para buscar planos do médico:', doctorId);
      const response = await this.get(`plans?doctor_id=${doctorId}`);
      console.log('Resposta da API recebida');
      
      // Verificar se é uma resposta paginada do Laravel (com current_page, data, etc.)
      if (response && typeof response === 'object' && 'data' in response && Array.isArray(response.data)) {
        console.log(`Resposta é um objeto paginado do Laravel com ${response.data.length} planos`);
        return response.data;
      }
      
      // Verificar se é um array direto
      if (Array.isArray(response)) {
        console.log(`Resposta é um array direto com ${response.length} planos`);
        return response;
      }
      
      console.warn('Formato de resposta não reconhecido');
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar planos:', error);
      throw new Error(error.response?.data?.error || 'Falha ao carregar planos');
    }
  }

  /**
   * Cria um novo plano
   * @param plan Dados do plano
   * @returns Plano criado
   */
  async createPlan(plan: Plan): Promise<Plan> {
    try {
      const response = await this.post<ApiResponse<Plan>>('plans', plan);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar plano:', error);
      throw new Error(error.response?.data?.error || 'Falha ao criar plano');
    }
  }

  /**
   * Atualiza um plano existente
   * @param plan Dados do plano
   * @returns Plano atualizado
   */
  async updatePlan(plan: Plan): Promise<Plan> {
    if (!plan.id) {
      throw new Error('ID do plano é obrigatório para atualização');
    }

    try {
      const response = await this.put<ApiResponse<Plan>>(`plans/${plan.id}`, plan);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar plano:', error);
      throw new Error(error.response?.data?.error || 'Falha ao atualizar plano');
    }
  }

  /**
   * Exclui um plano
   * @param planId ID do plano
   * @param doctorId ID do médico
   * @returns Resultado da operação
   */
  async deletePlan(planId: number, doctorId: number): Promise<boolean> {
    try {
      await this.delete<ApiResponse<null>>(`plans/${planId}?doctor_id=${doctorId}`);
      return true;
    } catch (error: any) {
      console.error('Erro ao excluir plano:', error);
      throw new Error(error.response?.data?.error || 'Falha ao excluir plano');
    }
  }
}

// Exporta uma instância única do repositório para uso em toda a aplicação
export const plansRepository = new PlansRepository();
