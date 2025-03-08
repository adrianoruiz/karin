<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Cabeçalho com nome e tempo -->
    <div class="flex items-center justify-between px-3 pt-2 pb-1 border-b">
      <div class="flex items-center gap-2">
        <img 
        :src="order.cart.user.avatar_url ?? '/images/no-avatar.png'"
        class="w-10 h-10 bg-gray-200 rounded-full"></img>
        <div>
          <h3 class="text-sm font-bold">{{ order.cart?.user?.name ?? '' }}</h3>

          <div style="margin-top: 0px;" class="text-orange text-xs">{{  formatHourDifference(Date(), order.created_at,{ isNotification: false, durationReturn: false, hourFormat: true }

 ) }}</div>
        </div>
      </div>
      <div class="text-lg font-bold text-gray-700">#{{ order.id }}</div>
    </div>

    <!-- Lista de Itens -->
    <div class="p-3 space-y-1.5">
      <div
        v-for="item in order.cart?.items"
        :key="item.name"
        class="flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <span
            class="flex items-center justify-center w-6 h-6 bg-blue-50 rounded-full text-base font-medium text-gray-600"
          >
            {{ item.quantity }}
          </span>
          <span class="text-sm">{{ item.name }}</span>
        </div>
        <span class="text-sm">
          {{ formatMoney(item.price * item.quantity) }}
        </span>
      </div>

      <!-- Total e Forma de Pagamento -->
      <div
        class="flex justify-between items-center border-t mt-3 text-gray-700"
      >
        <div class="flex items-center gap-1.5 text-orange-500 font-bold text-sm text-orange pt-2">
          <span>Itens: {{ order.cart?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}}</span>
          <span>Total: {{ formatMoney(parseFloat(order.price ?? '0')) }}</span>
          
        </div>
      </div>

      <!-- Ícone de Entrega e Observações -->
      <div
        class="flex justify-between items-center border-t text-gray-700"
      >
        <div 
        @click = "$emit('OnModalOpened')"

        class="flex flex-col items-start  text-emerald-700 ">
          <button
            class="flex  items-center  hover:text-emerald-800"
          >
            <PickupComponent
            
              :isPickup="order.delivery?.in_store_pickup ?? false"
            />
          </button>
          <span v-if="order.observations!=null" class="text-gray-600 text-xs">{{ order.observations }}</span>
        </div>
        <div>
          <PaymentMethod
            :payment-condition-id="order.payment_condition_id ?? 1"
            :order = "order"
            :see-change-money="true"
          />
        </div>
      </div>
    </div>

    <!-- Rodapé com Botões -->
    <div class="flex justify-between items-center px-3  bg-gray-50 rounded-b-lg">
      <button
        @click="$emit('onButtonClick', order)"
        class="text-white bg-[#0071BC] hover:bg-[#0071BC]/90 px-3 py-1.5 rounded-lg transition-colors text-sm"
      >
        {{ buttonText }}
      </button>
      <div class="flex gap-1.5">
        <button
        @click="$emit('onEditTap')"
          class="text-primary hover:bg-blue-50 p-2 rounded-lg transition-colors"
        >
          <font-awesome-icon :icon="['fas', 'pen']" />
        </button>
        <button
        @click="$emit('onDeleteTap')"
          class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
        >
          <img src="@/assets/svg/trash.svg" 
/>
        </button>
      </div>
    </div>
  </div>
  

</template>

<script lang="ts" setup>

import { OrderType } from '@/types/orderType'
import { formatHourDifference, formatMoney } from '@/utils/format'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import PaymentMethod from './PaymentMethod.vue'
import PickupComponent from './PickupComponent.vue'


const emit = defineEmits(['onButtonClick', 'onEditTap', 'onDeleteTap','OnModalOpened'])
defineProps<{
  buttonText: string
  order: OrderType
}>()


</script>
