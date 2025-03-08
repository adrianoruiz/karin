<template>
  <div class="flex items-center">
    <img :src="getPaymentIcon" class="w-5 h-5 mr-1" :alt="getPaymentText" />
    <span class="text-gray-600 text-xs">{{
      order &&
      parseFloat(order.change_money ?? '0') > 0 &&
      props.paymentConditionId == 5 &&
      seeChangeMoney
        ? 'Troco p/: '
        : getPaymentText
    }}</span>
    <span
      class="text-orange text-xs font-bold pl-2"
      v-if="
        order &&
        order.change_money != null &&
        parseFloat(order.change_money) != 0 &&
        seeChangeMoney
      "
    >
      {{ formatMoney(parseFloat(order?.change_money ?? '0')) }} ({{
        formatMoney(
          parseFloat(order?.change_money ?? '0') -
            parseFloat(order?.price ?? '0')
        )
      }})
    </span>
  </div>
</template>

<script setup lang="ts">
import { OrderType } from '@/types/orderType'
import { formatMoney } from '@/utils/format'
import { computed } from 'vue'

const props = defineProps<{
  paymentConditionId: number
  order?: OrderType
  seeChangeMoney?: boolean
}>()

const seeChangeMoney = props.seeChangeMoney ?? false

const getPaymentIcon = computed(() => {
  switch (props.paymentConditionId) {
    case 1:
      return new URL('@/assets/svg/pix.svg', import.meta.url).href
    case 5:
      return new URL('@/assets/svg/money-icon.svg', import.meta.url).href
    default:
      return new URL('@/assets/svg/card.svg', import.meta.url).href
  }
})

const getPaymentText = computed(() => {
  switch (props.paymentConditionId) {
    case 1:
      return 'Pix'
    case 5:
      return 'Dinheiro'
    default:
      return 'Cartão'
  }
})
</script>
