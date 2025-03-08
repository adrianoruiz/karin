<!-- src/modules/orders_kanban/components/TableOrder.vue -->
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { onMounted, watch } from "vue";
import { useOrderReportStore } from "../store/orderReportStore";
import IndicatorsReport from "./IndicatorsReport.vue";
import OrdersTable from "./OrdersTable.vue";
import Pagination from "./Pagination.vue";

const store = useOrderReportStore();

onMounted(() => {
  store.fetchAllOrders();
});

// Watch para mudanças no dateRange
watch(
  () => store.dateRange,
  () => {
    store.fetchAllOrders();
  },
  { deep: true }
);

const handleSort = (sortBy: string) => {
  if (store.sortBy === sortBy && store.sortOrder === "DESC") {
    store.sortOrder = "ASC";
  } else {
    store.sortOrder = "DESC";
  }
  store.sortBy = sortBy;
  store.fetchAllOrders();
};
</script>

<template>
  <div class="h-full flex flex-col">
    <header class="p-2">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Relatório de Pedidos</h2>
        <button
          @click="store.exportToExcel"
          class="flex items-center bg-info text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <font-awesome-icon :icon="['fas', 'file-export']" class="mr-2" />
          Exportar CSV
        </button>
      </div>
    </header>

    <div class="flex-1 p-2">
      <div v-if="store.isLoading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-info"
        ></div>
      </div>

      <template v-else>
        <IndicatorsReport :indicators="store.indicators" />

        <div class="my-2 flex justify-end">
          <VueDatePicker
            v-model="store.dateRange"
            range
            :enable-time-picker="false"
            locale="pt-BR"
            format="dd/MM/yyyy"
            auto-apply
            class="w-full max-w-xs"
          />
        </div>

        <OrdersTable
          :orders="store.orders"
          :sort-by="store.sortBy"
          :sort-desc="store.sortOrder === 'DESC'"
          @sort="handleSort"
        />

        <Pagination
          :current-page="store.currentPage"
          :total-pages="store.totalPages"
          @page-change="store.setPage"
        />

        <div class="mt-6 text-gray-600">
          Total de {{ store.totalOrders }} registros
        </div>
      </template>
    </div>
  </div>
</template>
