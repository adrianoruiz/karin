import { AbstractHttp } from '@/services/api';

export class CampaignReportRepository extends AbstractHttp {
  
  async getCampaignTracking(params?: {
    page?: number;
    perPage?: number;
    filters?: {
      petshop_id?: string;
      client_name?: string;
      phone_number?: string;
      start_date?: string;
      end_date?: string;
    };
  }) {
    return this.get<CampaignTrackingData>("campaign-tracking", {
      params: {
        page: params?.page,
        per_page: params?.perPage,
        ...params?.filters,
      },
    });
  }
   loadStatuses = async () => {
    try {
      const response = this.get("/api/kanban/order-statuses");
      return (await response).data;
    } catch (error) {
      console.error("Erro ao carregar status:", error);
    }
  };

}

export interface CampaignTrackingData {
  campaigns: PaginatedResponse<CampaignTracking>;
  petshops: Petshop[];
  totalMessagesSent: number;
  totalLinkClicks: number;
  totalPurchases: number;
}

export interface CampaignTracking {
  id: number;
  petshop_id: number;
  client_id: number;
  phone_number: string;
  contact_area: string;
  messages_sent: number;
  link_clicks: number;
  purchases: number;
  created_at: string;
  updated_at: string;
  petshop: Petshop;
  client: Client;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Petshop {
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

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  per_page: number;
  total: number;
  last_page: number;
}