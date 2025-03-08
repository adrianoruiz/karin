<template>
  <BaseList title="Fabricantes" newItemRoute="/manufacturers/new" apiEndpoint="/brands" routeBase="manufacturers"
    :columns="columns" :filter-param="'filter_by_name'" :min-search-length="3">

    <!-- Slot para a coluna 'Imagem' -->
    <template #column-cover="{ item }">
      <img :src="item.cover" :alt="item.name" class="h-12 w-12 object-contain" />
    </template>

    <!-- Slot para a coluna 'Status' -->
    <template #column-status="{ item }">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" :checked="item.status === 1" class="sr-only peer" disabled>
        <div
          class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all">
        </div>
      </label>
    </template>
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from '@/components/BaseList.vue';
import { default as columns } from './data/manufacturerTableColums';

</script>
