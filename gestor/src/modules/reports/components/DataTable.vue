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
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            v-html="getValue(item, column)"
          ></td>
        </tr>
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
import { PropType, computed } from "vue";

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
});

const getValue = (item: any, column: Column) => {
  const value = column.key.split(".").reduce((o, i) => o?.[i], item);
  return column.formatter ? column.formatter(item) : value;
};

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

defineEmits(["page-change", "per-page-change"]);
</script>
