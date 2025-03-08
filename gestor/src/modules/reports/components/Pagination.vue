<!-- src/modules/orders_kanban/components/Pagination.vue -->
<script setup lang="ts">
import { computed, toRefs } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();
const { currentPage, totalPages } = toRefs(props);

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

// Computa as páginas a serem exibidas, adicionando reticências quando necessário
const displayedPages = computed<(number | string)[]>(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: (number | string)[] = [];

  // Se poucas páginas, mostra todas
  if (total <= 10) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Sempre exibe a primeira página
  pages.push(1);

  let left = current - 2;
  let right = current + 2;

  // Ajusta para páginas iniciais
  if (left <= 2) {
    left = 2;
    right = 5;
  }

  // Ajusta para páginas finais
  if (right >= total - 1) {
    right = total - 1;
    left = total - 4;
  }

  // Adiciona reticências se necessário
  if (left > 2) {
    pages.push("...");
  }

  // Adiciona as páginas do intervalo central
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) {
    pages.push("...");
  }

  // Sempre exibe a última página
  pages.push(total);

  return pages;
});
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <!-- Botão "Anterior" -->
    <button
      class="px-3 py-1 rounded border"
      :disabled="currentPage === 1"
      :class="
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      "
      @click="emit('page-change', currentPage - 1)"
    >
      Anterior
    </button>

    <!-- Botões de página -->
    <template v-for="(page, index) in displayedPages" :key="index">
      <button
        v-if="typeof page === 'number'"
        class="px-3 py-1 rounded border"
        :class="
          page === currentPage
            ? 'bg-info text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        "
        @click="emit('page-change', page)"
      >
        {{ page }}
      </button>
      <span v-else class="px-3 py-1 rounded border bg-gray-100 text-gray-400">
        {{ page }}
      </span>
    </template>

    <!-- Botão "Próximo" -->
    <button
      class="px-3 py-1 rounded border"
      :disabled="currentPage === totalPages"
      :class="
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      "
      @click="emit('page-change', currentPage + 1)"
    >
      Próximo
    </button>
  </div>
</template>
