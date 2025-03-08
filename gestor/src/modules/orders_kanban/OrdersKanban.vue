<template>
  <OrderDetailsModal
    :is-open="showDetailsModal"
    @close="showDetailsModal = false"
  />
  <AlertDialogComponent
    :open="dialogOpened"
    title="Excluir pedido"
    description="Tem certeza que deseja excluir este pedido?"
    confirmText="Excluir"
    cancelText="Cancelar"
    @confirmAction="handleDelete"
    @close="dialogOpened = false"
  />

  <div class="flex space-x-4 min-h-screen">
    <!-- Coluna Em Análise -->
    <div class="flex-1 bg-[#E67E5E] p-4 rounded-lg overflow-y-auto">
      <h2 class="text-xl font-bold mb-4 text-white">Em análise</h2>
      <draggable
        v-model="orderStore.createdOrders"
        :group="{ name: 'orders', pull: true, put: false }"
        item-key="id"
        class="space-y-4 min-h-[200px]"
        ghost-class="opacity-50"
        :animation="200"
        id="created"
        @end="e => onEnd(e, 'created', 'pick_up_in_store')"
        @move="onMove"
      >
        <template #item="{ element }">
          <div class="cursor-grab">
            <OrderCard
              :order="element"
              button-text="Pedido Separado"
              @on-button-click="
                handleUpdateOrderStatus(
                  element,
                  'created',
                  'pick_up_in_store',
                  false
                )
              "
              @onEditTap="handleEditOrder(element)"
              @on-delete-tap="handleDeleteOrder(element, 'created')"
              @OnModalOpened="handleOpenModal(element)"
            />
          </div>
        </template>
      </draggable>
    </div>

    <!-- Coluna Pronto para entrega -->
    <div class="flex-1 bg-[#4B5BA6] p-4 rounded-lg overflow-y-auto">
      <h2 class="text-xl font-bold mb-4 text-white">Pronto para entrega</h2>
      <draggable
        v-model="orderStore.separationOrders"
        :group="{ name: 'orders', pull: true, put: true }"
        item-key="id"
        class="space-y-4 min-h-[200px]"
        ghost-class="opacity-50"
        :animation="200"
        id="separation"
        @end="e => onEnd(e, 'pick_up_in_store', 'on_the_way')"
        @move="onMove"
      >
        <template #item="{ element }">
          <div class="cursor-grab">
            <OrderCard
              :order="element"
              button-text="Enviado ao cliente"
              @on-button-click="
                handleUpdateOrderStatus(
                  element,
                  'pick_up_in_store',
                  'on_the_way',
                  false
                )
              "
              @onEditTap="handleEditOrder(element)"
              @on-delete-tap="handleDeleteOrder(element, 'pick_up_in_store')"
              @OnModalOpened="handleOpenModal(element)"
            />
          </div>
        </template>
      </draggable>
    </div>

    <!-- Coluna A Caminho -->
    <div class="flex-1 bg-[#4CAF50] p-4 rounded-lg overflow-y-auto">
      <h2 class="text-xl font-bold mb-4 text-white">A caminho</h2>
      <draggable
        v-model="orderStore.onTheWayOrders"
        :group="{ name: 'orders', pull: false, put: true }"
        item-key="id"
        class="space-y-4 min-h-[200px]"
        ghost-class="opacity-50"
        :animation="200"
        id="onTheWay"
        @end="e => onEnd(e, 'on_the_way', 'finished')"
        @move="onMove"
      >
        <template #item="{ element }">
          <div class="cursor-grab">
            <OrderCard
              :order="element"
              button-text="Entregue ao cliente"
              @on-button-click="
                handleUpdateOrderStatus(
                  element,
                  'on_the_way',
                  'finished',
                  false
                )
              "
              @onEditTap="handleEditOrder(element)"
              @on-delete-tap="handleDeleteOrder(element, 'on_the_way')"
              @OnModalOpened="handleOpenModal(element)"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<!-- src/views/OrdersKanban.vue -->
<script setup lang="ts">
import AlertDialogComponent from '@/components/AlertDialogComponent.vue'
import { usePetshopStore } from '@/stores/petshop'
import { OrderType } from '@/types/orderType'
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'
import { API_CONFIG } from '../../config/constants'
import OrderCard from './components/OrderCard.vue'
import OrderDetailsModal from './components/OrderDetailsModal.vue'
import { useOrderStore } from './store/order_store'
const orderStore = useOrderStore()
const petshopStore = usePetshopStore()

const selectedorder = ref<null | OrderType>(null)
const selectedStatus = ref('')
onMounted(() => {
  orderStore.initFetch()
})

// Handlers para o drag and drop
const onMove = (e: any) => {
  const fromIndex = getColumnIndex(e.from.id)
  const toIndex = getColumnIndex(e.to.id)
  return toIndex >= fromIndex
}

const getColumnIndex = (columnId: string) => {
  const columns = ['created', 'separation', 'onTheWay']
  return columns.indexOf(columnId)
}

const showDetailsModal = ref(false)

const handleOpenModal = (order: OrderType) => {
  orderStore.findOrder(order.id)
  showDetailsModal.value = true
}
const onEnd = (e: any, currentStatus: string, nextStatus: string) => {
  const fromColumnId = e.from.id
  const toColumnId = e.to.id

  if (fromColumnId === toColumnId) {
    return
  }
  const order = e.item.__draggable_context.element

  handleUpdateOrderStatus(order, currentStatus, nextStatus)
  if (toColumnId == 'onTheWay' && order.delivery.in_store_pickup == true) {
    const index = orderStore.onTheWayOrders.findIndex(
      order => order.id === order.id
    )

    if (index !== -1) {
      orderStore.onTheWayOrders.splice(index, 1)
    }
  }
}
const handleUpdateOrderStatus = (
  order: OrderType,
  currentStatus: string,
  nextStatus: string,
  isDrag: boolean = true
) => {
  orderStore.updateOrderStatus(order, currentStatus, nextStatus, isDrag)
}

const handleEditOrder = async (item: OrderType) => {
  await orderStore.findOrder(item.id)
  await orderStore.loadInitialparams()
  orderStore.syncOriginalCartList(orderStore.order?.cart?.items ?? [])
  const slug = petshopStore.petshop?.slug ?? ''
  const domain =
    petshopStore.petshop?.domain ?? API_CONFIG.URL_CATALOG_BASE_KANBAN
  const params = {
    cart_id: orderStore.order?.cart_id,
    order_id: orderStore.order?.id,
    petshop_id: orderStore.order?.cart.petshop_id,
    cod: orderStore.token
  }
  const baseUrl =
    domain === API_CONFIG.URL_CATALOG_BASE_KANBAN ? `/loja/${slug}` : ''

  const url = new URL(
    `https://${domain}${baseUrl}?edit_parameters=${JSON.stringify(params)}`
  )
  const opened = window.open(url.toString(), '_blank')
}
const handleDeleteOrder = async (order: OrderType, currentStatus: string) => {
  selectedorder.value = order
  selectedStatus.value = currentStatus
  dialogOpened.value = true
}

const dialogOpened = ref(false)
const handleDelete = () => {
  handleUpdateOrderStatus(
    selectedorder.value!,
    selectedStatus.value,
    'canceled',
    false
  )
  // emit('onDeleteTap')
  dialogOpened.value = false
}
</script>

<style scoped>
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.sortable-drag {
  opacity: 0.9;
}
</style>
