import { AbstractHttp } from '@/services/api';

export interface Petshop {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: number;
  avatar: string;
  logo: string;
  user_data?: {
    id: number;
    user_id: number;
    fantasy: string;
    cpf: string;
    cnpj: string;
    corporate_name: string;
    birthday: string;
    segment_types: string | null;
  };
}

export interface UserBehaviorTotals {
  saudacao_count: number;
  click_link_novo_count: number;
  click_link_count: number;
  compra_nova_count: number;
  compra_recorrente_count: number;
  nao_clicaram_count: number;
  clicked_but_not_purchased_count: number;
  pesquisa_count: number;
  click_produto_count: number;
  carrinho_count: number;
  endereco_recorrente_count: number;
  endereco_retirar_count: number;
  pagamento_not_purchased_count: number;
  pagamento_purchased_count: number;
}

export interface UserBehaviorLog {
  id: number;
  store_id: number;
  action: string;
  complement?: string;
  created_at: string;
  store: {
    id: number;
    name: string;
    user_data?: {
      fantasy: string;
    };
  };
  client?: {
    name: string;
  };
}

export interface UserBehaviorResponse {
  logs: {
    current_page: number;
    data: UserBehaviorLog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  metrics: {
    total_logs: number;
    actions_count: Record<string, number>;
  };
  indicadores: UserBehaviorTotals;
}

export class UserBehaviorRepository extends AbstractHttp {
  async getLogs(params?: {
    page?: number;
    perPage?: number;
    filters?: {
      petshop_id?: number;
      start_date?: string;
      end_date?: string;
      action?: string;
    };
  }) {
    const response = await this.post<UserBehaviorResponse>('/user-behavior-log/details', {
      petshop_id: params?.filters?.petshop_id,
      start_date: params?.filters?.start_date,
      end_date: params?.filters?.end_date,
      action: params?.filters?.action,
      per_page: params?.perPage || 50,
      page: params?.page || 1
    });
    return response.data;
  }
}
