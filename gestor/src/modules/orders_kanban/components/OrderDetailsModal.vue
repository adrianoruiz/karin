<template>
  <Transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Overlay escuro -->
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>

      <!-- Modal -->
      <div
        class="absolute top-0 right-0 w-[500px] h-screen bg-white shadow-xl flex flex-col"
      >
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Entregar</h2>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <!-- Conteúdo com scroll -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- Tutor -->
            <div class="flex flex-col items-center justify-center">
              <div class="flex items-center justify-center gap-4 mb-6">
                <img
                  :src="orderStore.order?.cart.user.avatar_url"
                  class="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                  <h3 class="text-lg font-semibold">
                    {{ orderStore.order?.cart.user.name }}
                  </h3>
                  <!-- <p class="text-gray-600">{{ orderData.tutor.role }}</p> -->
                  <a
                    :href="
                      'https://wa.me/55' + orderStore.order?.cart.user.phone
                    "
                    target="_blank"
                    class="text-green-500 hover:text-green-600"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'whatsapp']"
                      class="mr-1"
                    />
                    WhatsApp
                  </a>
                </div>
              </div>

              <!-- Observações -->
              <div class="mb-6">
                <h4 class="font-semibold mb-2">Observações sobre a retirada</h4>
                <p class="text-gray-600">
                  {{ orderStore.order?.observations ?? 'Nenhuma observação' }}
                </p>
              </div>

              <!-- Local de Retirada -->
              <div class="mb-6 flex flex-col items-center">
                <PickupComponent
                  :isPickup="orderStore.order!.delivery!.in_store_pickup!"
                />
                <p class="text-gray-600 text-center max-w-[80%] text-sm">
                  {{
                    formatAddress(
                      // orderStore.order?.delivery?.in_store_pickup
                      //   ? petshopStore.petshop!.addresses![0]
                      //   :
                      orderStore.order!.delivery?.address
                    )
                  }}
                </p>

                <!-- <p class="text-gray-600">{{ orderData.address.street }}</p>
              <p class="text-gray-600">
                {{ orderData.address.complement }}, CEP:
                {{ orderData.address.cep }},
                {{ orderData.address.city }}
              </p> -->
              </div>

              <!-- Data do Pedido -->
              <div class="mb-6">
                <h4 class="font-semibold mb-2">
                  <font-awesome-icon :icon="['fas', 'calendar']" class="mr-2" />
                  Data do pedido:
                  {{ formatDatePTBR(orderStore.order!.created_at) }}
                </h4>
              </div>
            </div>
            <!-- Itens do Pedido -->
            <div class="mb-6">
              <h4 class="font-semibold mb-4">Itens do pedido</h4>
              <div class="space-y-4">
                <div
                  v-for="cartitem in orderStore.order!.cart!.items"
                  class="mt-2"
                >
                  <ProductComponent :cart-item="cartitem" />
                </div>

                <!-- <div
                  v-for="item in orderData.items"
                  :key="item.id"
                  class="flex gap-4 pb-4"
                >
                  <img
                    :src="item.image"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div class="flex-1">
                    <h5 class="font-medium">{{ item.name }}</h5>
                    <p class="text-sm text-gray-600">
                      Quant. {{ item.quantity }}
                    </p>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Footer com Pagamento (fixo na base) -->
        <div class="border-t p-4 bg-white">
          <div class="flex items-center gap-2 mb-2">
            <PaymentMethod
              :payment-condition-id="orderStore.order!.payment_condition_id!"
              :order="orderStore.order!"
              :see-change-money="true"
            />
            <!-- <font-awesome-icon :icon="['fab', 'pix']" class="w-6 h-6" />
            <span class="font-medium">Pagamento:</span>
            <span>{{ orderData.payment.method }}</span> -->
          </div>
          <CalculateValueComponent
            :totalValue="parseFloat(orderStore.order?.price ?? '00')"
            :storePickup="orderStore.order!.delivery!.in_store_pickup! "
            :freight="
              orderStore.order?.delivery?.in_store_pickup ?? false
                ? 0.0
                : parseFloat(
                    orderStore.order?.delivery?.delivery_fee_applied ?? '00'
                  )
            "
          />

          <!-- <div class="flex justify-between items-center">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{ orderData.payment.subtotal }}</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="font-bold">Valor total:</span>
            <span class="font-bold">{{ orderStore.order?.price }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { AddressType } from '@/types/addressType'
import { formatDatePTBR } from '@/utils/format'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useOrderStore } from '../store/order_store'
import CalculateValueComponent from './CalculateValueComponent.vue'
import PaymentMethod from './PaymentMethod.vue'
import PickupComponent from './PickupComponent.vue'
import ProductComponent from './ProductComponent.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
const orderStore = useOrderStore()

const formatAddress = (address?: AddressType) => {
  const neighborhood = address?.neighborhood || ''
  const city = address?.city?.name || ''
  const province = address?.city?.province?.initials || ''
  const zip = address?.zip || ''

  if (address?.street && address?.number) {
    return `${address?.street}, ${address?.number} - ${neighborhood}, ${city} - ${province}, ${zip}
`
  }
  return address?.street || ''
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
