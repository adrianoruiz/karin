<template>
  <div>
    <div v-if="!props.storePickup" class="flex justify-between items-center">
      <p class="text-gray-700">Frete:</p>
      <strong>{{ formatMoney(props.freight) }}</strong>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-gray-700">Subtotal:</p>
      <strong>{{ formatMoney(props.totalValue - props.freight) }}</strong>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-lg font-semibold">Valor total:</p>
      <strong>{{ formatMoney(props.totalValue) }}</strong>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formatMoney } from '@/utils/format'
import { defineProps } from 'vue'

const props = defineProps<{
  totalValue: number
  storePickup: boolean
  freight: number
}>()
</script>
