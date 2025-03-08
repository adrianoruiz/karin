<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <template v-for="(group, groupName) in groupedItems" :key="groupName">
          <tr
            class="bg-gray-50 cursor-pointer hover:bg-gray-100"
            @click="toggleGroup(groupName)"
          >
            <td colspan="6" class="px-6 py-2 font-medium">
              <div class="flex items-center">
                <span
                  class="transform transition-transform"
                  :class="{ 'rotate-90': expandedGroups[groupName] }"
                  >▶</span
                >
                <span class="ml-2"
                  >{{ groupName }} ({{ group.length }} ações)</span
                >
                <span
                  class="ml-2 text-gray-400"
                  v-html="getActionSummary(group)"
                ></span>
              </div>
            </td>
          </tr>
          <template v-if="expandedGroups[groupName]">
            <tr v-for="item in group" :key="item.id" class="hover:bg-gray-50">
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                v-html="getValue(item, column)"
              ></td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <div v-if="pagination" class="p-4 border-t">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="text-sm">{{ pagination.totalItems }} resultados</span>
          <div class="flex items-center gap-2">
            <span class="text-sm">Itens por página:</span>
            <select
              class="border rounded px-2 py-1 text-sm"
              :value="pagination.perPage"
              @change="(e) => $emit('per-page-change', Number((e.target as HTMLSelectElement).value))"
            >
              <option v-for="size in perPageOptions" :key="size" :value="size">
                {{ size === 999 ? "Todos" : size }}
              </option>
            </select>
          </div>
        </div>
        <div class="space-x-2 flex items-center">
          <button
            @click="$emit('page-change', pagination.currentPage - 1)"
            :disabled="pagination.currentPage <= 1"
            class="px-3 py-1 border rounded"
          >
            Anterior
          </button>
          <template v-for="page in pageNumbers" :key="page">
            <button
              @click="$emit('page-change', page)"
              :class="[
                'px-3 py-1 border rounded',
                pagination.currentPage === page ? 'bg-blue-500 text-white' : '',
              ]"
            >
              {{ page }}
            </button>
          </template>
          <button
            @click="$emit('page-change', pagination.currentPage + 1)"
            :disabled="
              pagination.currentPage >=
              Math.ceil(pagination.totalItems / pagination.perPage)
            "
            class="px-3 py-1 border rounded"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from "vue";

interface Column {
  key: string;
  label: string;
  formatter?: (value: any) => string;
}

interface Pagination {
  totalItems: number;
  currentPage: number;
  perPage: number;
}

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
  },
  actionMap: {
    type: Object as PropType<{ [key: string]: string }>,
    required: true,
  },
});

const getValue = (item: any, column: Column) => {
  const value = column.key.split(".").reduce((o, i) => o?.[i], item);
  return column.formatter ? column.formatter(item) : value;
};

const getActionSummary = (group: any[]) => {
  // Conta a frequência de cada ação
  const actionCount = group.reduce((acc: { [key: string]: number }, item) => {
    const action = item.action;
    acc[action] = (acc[action] || 0) + 1;
    return acc;
  }, {});

  // Formata cada ação com sua contagem
  return Object.entries(actionCount)
    .map(([action, count]) => {
      const actionName = props.actionMap[action] || action;
      const text =
        count > 1 ? `${actionName}(${count.toString()})` : actionName;

      // Se a ação for 'compra', adiciona a classe de cor verde e o emoji
      if (action === "compra") {
        return `<span class="text-green-500">${text}</span>`;
      }
      return text;
    })
    .join(", ");
};

const groupedItems = computed(() => {
  if (!props.items) return {};

  return props.items.reduce((groups: { [key: string]: any[] }, item) => {
    const clientName = item.client?.name || "Sem Nome";
    if (!groups[clientName]) {
      groups[clientName] = [];
    }
    groups[clientName].push(item);
    return groups;
  }, {});
});

const pageNumbers = computed(() => {
  if (!props.pagination) return [];

  const totalPages = Math.ceil(
    props.pagination.totalItems / props.pagination.perPage
  );
  const currentPage = props.pagination.currentPage;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const perPageOptions = [20, 30, 50, 100, 200, 999];

const expandedGroups = ref<{ [key: string]: boolean }>({});

const toggleGroup = (groupName: string) => {
  expandedGroups.value[groupName] = !expandedGroups.value[groupName];
};

defineEmits(["page-change", "per-page-change"]);
</script>
