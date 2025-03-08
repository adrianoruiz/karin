<!-- src/modules/orders_kanban/components/OrdersTable.vue -->

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-t-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th
            v-for="(header, index) in [
              'Nº Pedido',
              'Cliente',
              'Origem',
              'Data',
              'Entregas',
              'Pagamento',
              'Valor (R$)',
            ]"
            :key="header"
            class="px-2 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
            :class="{
              'rounded-tl-lg': index === 0,
            }"
          >
            {{ header }}
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tr-lg"
          >
            <select
              v-model="store.selectedStatus"
              class="w-full bg-transparent border-none text-xs font-bold text-gray-500 uppercase focus:outline-none focus:ring-0"
              @change="onStatusChange"
            >
              <option
                v-for="status in store.listStatuses"
                :key="status.slug"
                :value="status.slug"
              >
                {{ status.name }}
              </option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="order in props.orders"
          :key="order.id"
          class="hover:bg-gray-50"
        >
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            #{{ order.id }}
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            {{ order.cart?.user?.name ?? "" }}
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            WhatsApp
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            {{ formatDate(order.created_at) }}
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            <PickupComponent
              :is-pickup="order.delivery?.in_store_pickup ?? false"
            />
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200"
          >
            <PaymentMethod
              :payment-condition-id="order?.payment_condition_id ?? 1"
              :order="order"
            />
          </td>
          <td
            class="px-1 py-1 whitespace-nowrap text-sm text-gray-900 font-medium border border-gray-200 text-right"
          >
            {{ formatMoney(parseFloat(order.price), "") }}
          </td>
          <td
            class="whitespace-nowrap border border-gray-200"
            :class="[getStatusClass(order.status)]"
          >
            {{ getOrderStatusTranslate(order.status) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import PaymentMethod from "@/modules/orders_kanban/components/PaymentMethod.vue";
import PickupComponent from "@/modules/orders_kanban/components/PickupComponent.vue";
import { OrderType } from "@/types/orderType";
import { formatMoney } from "@/utils/format";
import { onMounted } from "vue";
import { useOrderReportStore } from "../store/orderReportStore";

interface Props {
  orders: OrderType[];
  sortBy: string;
  sortDesc: boolean;
}

const store = useOrderReportStore();
const props = defineProps<Props>();
defineEmits<{
  (e: "sort", column: string): void;
  (e: "statusChange", status: string): void;
  (e: "deliver", order: OrderType): void;
}>();

const onStatusChange = () => {
  store.setSelectedStatus(store.selectedStatus);
};

onMounted(() => {
  store.loadStatuses();
});

const formatDate = (date: string) => {
  const d = new Date(date);
  return (
    d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " - " +
    d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
};

const getOrderStatusTranslate = (status: string | undefined) => {
  const translations: Record<string, string> = {
    created: "Em análise",
    pick_up_in_store: "Retirar na loja",
    waiting_for_delivery: "Entregar",
    on_the_way: "A caminho",
    in_separation: "Em separação",
    finished: "Entregue",
    canceled: "Cancelado",
    updated: "Editado",
  };
  return translations[status || ""] || status || "";
};

const getStatusClass = (status: string | undefined) => {
  const classes: Record<string, string> = {
    created: "bg-orange",
    updated: "bg-orange",
    in_separation: "bg-orange",
    waiting_for_delivery: "bg-roxo-azul",
    pick_up_in_store: "bg-roxo-azul",
    on_the_way: "bg-odonto-green",
    finished: "bg-odonto-green",
    canceled: "bg-red-500",
  };
  return `${classes[status || ""]} text-white px-4 py-3 text-center text-sm`;
};
</script>
