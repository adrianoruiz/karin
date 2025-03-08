<template>
  <div v-if="isPickup" class="flex items-center">
    <img src="@/assets/svg/pickup-icon.svg" class="w-6 h-6 mr-2" alt="Pickup" />
    <span class="text-[#4753A6] text-sm font-bold">Retirar na Loja</span>
  </div>
  <div v-else class="flex items-center">
    <img
      src="@/assets/svg/delivery-icon.svg"
      class="w-8 h-8 mr-2"
      alt="Delivery"
    />
    <span class="text-[#4A855E] text-base font-bold">Entregar</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  isPickup: boolean;
}>();
</script>
