<template>
    <div class="space-y-6">
        <!-- Header Card -->
        <div class="p-6 bg-white rounded-lg shadow">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">{{ title }}</h1>
                <RouterLink :to="newItemRoute"
                    class="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2">
                    <span class="text-xl">+</span>
                    Incluir
                </RouterLink>
            </div>
        </div>

        <!-- Content Card -->
        <div class="p-6 bg-white rounded-lg shadow">
            <!-- Search -->
            <div class="relative">
                <input type="text" v-model="searchQuery" :placeholder="searchPlaceholder"
                    class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500" />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <font-awesome-icon icon="search" class="w-4 h-4" />
                </span>
            </div>

            <!-- Table -->
            <div class="mt-6 overflow-hidden rounded-lg border">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-primary-600">
                        <tr>
                            <th v-for="column in columns" :key="column.key"
                                class="px-6 py-4 text-left text-sm font-medium text-white cursor-pointer"
                                @click="setSort(column.key)">
                                {{ column.label }}
                                <font-awesome-icon v-if="sortBy === column.key"
                                    :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" class="ml-1" />
                            </th>
                            <th class="px-6 py-4 text-right text-sm font-medium text-white">Ações</th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="item in items" :key="item.id">
                            <td v-for="column in columns" :key="column.key" class="px-6 py-4">
                                <slot :name="`column-${column.key}`" :item="item">
                                    {{ item[column.key] }}
                                </slot>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center justify-end gap-4">
                                    <RouterLink :to="`/${routeBase}/${item.id}`"
                                        class="text-gray-600 hover:text-primary-600">
                                        <font-awesome-icon icon="edit" />
                                    </RouterLink>
                                    <button class="text-red-600 hover:text-red-700" @click="onDelete(item.id)">
                                        <font-awesome-icon icon="trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="items.length === 0 && !loading">
                            <td :colspan="columns.length + 1" class="px-6 py-4 text-center text-gray-500">
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between pt-4">
                <div class="flex items-center gap-2">
                    <select v-model="itemsPerPage" @change="handleItemsPerPageChange"
                        class="border rounded px-2 py-1 focus:outline-none focus:border-primary-500">
                        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                    <span class="text-sm text-gray-600">Itens por página</span>
                </div>

                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">
                        Página {{ pagination.current_page }} de {{ pagination.last_page }},
                        {{ pagination.per_page }} até {{ pagination.total }} registros
                    </span>

                    <div class="flex gap-1">
                        <button @click="handlePageChange(1)" :disabled="pagination.current_page === 1"
                            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
                            «
                        </button>
                        <button @click="handlePageChange(pagination.current_page - 1)"
                            :disabled="pagination.current_page === 1"
                            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
                            ‹
                        </button>

                        <template v-for="page in getPageNumbers" :key="page">
                            <button v-if="typeof page === 'number'" @click="handlePageChange(page)" :class="[
                                'px-3 py-1 border rounded hover:bg-gray-100',
                                pagination.current_page === page ? 'bg-primary-600 text-white' : ''
                            ]">
                                {{ page }}
                            </button>
                            <span v-else class="px-3 py-1 text-gray-600">...</span>
                        </template>

                        <button @click="handlePageChange(pagination.current_page + 1)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
                            ›
                        </button>
                        <button @click="handlePageChange(pagination.last_page)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
        <!-- <div v-if="loading" class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
            <div class="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { useBaseList } from '@/composables/useBaseList';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

// Definição das props
const props = defineProps<{
    title: string;
    newItemRoute: string;
    apiEndpoint: string;
    columns: Array<{ key: string; label: string }>;
    searchPlaceholder?: string;
    itemsPerPageOptions?: number[];
    routeBase: string;
    filterParam?: string;
    minSearchLength?: number;
}>();

// Valores padrão para algumas props
const searchPlaceholder = computed(() => props.searchPlaceholder || 'Pesquisa');
const itemsPerPageOptions = computed(() => props.itemsPerPageOptions || [25, 50, 75, 100]);

// Destructurando todas as propriedades retornadas pelo composable
const {
    searchQuery,
    items,
    pagination,
    itemsPerPage,
    loading,
    sortBy,
    sortOrder,
    setSort,
    handlePageChange,
    handleItemsPerPageChange,
    getPageNumbers,
    onDelete
} = useBaseList(props.apiEndpoint, {
    filterParam: props.filterParam,
    minSearchLength: props.minSearchLength
});
</script>