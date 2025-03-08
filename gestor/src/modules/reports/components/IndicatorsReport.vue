<!-- src/modules/orders_kanban/components/IndicatorsReport.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center"
    >
      <p class="mt-2 text-2xl font-semibold text-gray-900">
        {{ indicators.totalOrders }}
      </p>
      <h3 class="text-sm font-medium text-gray-500">Número de pedidos</h3>
    </div>

    <div
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center"
    >
      <p class="mt-2 text-2xl font-semibold text-gray-900">
        {{ formatCurrency(indicators.totalRevenue) }}
      </p>
      <h3 class="text-sm font-medium text-gray-500">Total movimentado</h3>
    </div>

    <div
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center"
    >
      <p class="mt-2 text-2xl font-semibold text-gray-900">
        {{ formatCurrency(indicators.averageOrderValue) }}
      </p>
      <h3 class="text-sm font-medium text-gray-500">Ticket médio</h3>
    </div>

    <div
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center"
    >
      <p class="mt-2 text-2xl font-semibold text-gray-900">
        {{ indicators.pendingOrders }}
      </p>
      <h3 class="text-sm font-medium text-gray-500">Pedidos cancelados</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderIndicators } from "../types/types";

interface Props {
  indicators: OrderIndicators;
}
defineProps<Props>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
</script>
