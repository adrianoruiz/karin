import { usePetshopStore } from '@/stores/petshop';
import { defineStore } from 'pinia';
import { CampaignReportRepository, CampaignTrackingData } from '../repository/campaign-report.repository';

export const useCampaignReportStore = defineStore('campaignReport', {
  state: () => ({
    data: null as CampaignTrackingData | null,
    loading: false,
    error: null as Error | null,
    currentFilters: null as any,
    petshopStore: usePetshopStore(),
  }),

  actions: {
    async loadCampaignTracking(params?: { page?: number; perPage?: number; filters?: any }) {
      this.loading = true;
      this.error = null;

      try {
        const repository = new CampaignReportRepository();
        const filters = params?.filters || this.currentFilters;
        const perPage = Math.min(params?.perPage || 30, 999); // Limita em 999 itens
        
        const { data } = await repository.getCampaignTracking({ 
          ...params, 
          filters,
          perPage
        });
        this.data = data;
        if (params?.filters) {
          this.currentFilters = params.filters;
        }
      } catch (error) {
        this.error = error as Error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async applyFilters(filters: any) {
      await this.loadCampaignTracking({ page: 1, filters });
    },
  },

  getters: {
    campaigns: (state) => state.data?.campaigns.data || [],
    petshops: (state) => state.petshopStore.petshopList || [],
    totals: (state) => ({
      messages: state.data?.totalMessagesSent || 0,
      clicks: state.data?.totalLinkClicks || 0,
      purchases: state.data?.totalPurchases || 0,
    }),
    pagination: (state) => ({
      currentPage: state.data?.campaigns.current_page || 1,
      totalItems: state.data?.campaigns.total || 0,
      perPage: state.data?.campaigns.per_page || 15,
    }),
  },
});
