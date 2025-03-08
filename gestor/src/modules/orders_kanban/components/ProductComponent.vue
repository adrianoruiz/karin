<template>
  <div class="flex items-center p-4 border-t bg-white">
    <img
      :src="imageUrl"
      alt="Product Image"
      class="w-14 h-14 object-cover rounded"
    />
    <div class="ml-4">
      <p class="text-sm font-medium text-gray-900">{{ productName }}</p>
      <p class="text-xs text-gray-600">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_CONFIG } from '@/config/constants'
import { CartItemType } from '@/types/cartItemType'
import { computed } from 'vue'

const props = defineProps<{ cartItem: CartItemType }>()

const imageUrl = computed(
  () => props.cartItem.image_url || `${API_CONFIG.URL_BASE}uploads/no-image.png`
)
const productName = computed(() => {
  return props.cartItem.name
    ? `${props.cartItem.name} ${
        props.cartItem.bulk_weight && props.cartItem.bulk_weight !== 0
          ? props.cartItem.bulk_weight + ' Kg'
          : ''
      }`
    : ''
})

const subtitle = computed(() => {
  const product = props.cartItem.product
  return `
    ${
      product?.weight_unity
        ? `Tamanho: ${product.weight || '0'} ${product.weight_unity}, `
        : ''
    }
    Quant.: ${props.cartItem.quantity ?? '0'}
  `
})
</script>
