// import { useLoginStore } from '@/store/login'
// import { useMeStore } from '@/store/me'

import { usePetshopStore } from '@/stores/petshop'
import { OrderType } from '@/types/orderType'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { OrderRepository } from '../repository/order_repository'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orderRepository: new OrderRepository(),
    petshopStore: usePetshopStore(),
    // meStore: useMeStore(),
    // loginStore: useLoginStore(),
    createdOrders: ref<OrderType[]>([]),
    separationOrders: ref<OrderType[]>([]),
    onTheWayOrders: ref<OrderType[]>([]),
    originalCartList: [],
    order: null as OrderType | null,
    openedOrders: ref(0),
    loadOrder: true,
    lastFetchTime: null as Date | null,
    token: ref('')
  }),

  actions: {
    async initFetch () {
      await this.delay(1000)
      await this.fetchData(true)
      this.startPeriodicFetch()
    },

    delay (ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },

    startPeriodicFetch () {
      setInterval(() => this.fetchData(), 60000)
    },

    async fetchData (initial = false) {
      try {
        const fetchTime = initial ? null : this.lastFetchTime
        const orders = await this.fetchOrders(fetchTime)
        this.openedOrders =
          orders!.created.length +
          orders!.separation.length +
          orders!.onTheWay.length

        this.updateLists(orders!.created, orders!.separation, orders!.onTheWay)
        this.lastFetchTime = new Date()
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    },

    async fetchOrders (fetchTime: any) {
      const created = await this.orderRepository.fetchOrders(
        this.petshopStore.petshop?.id ?? 1,
        'created',
        fetchTime
      )
      const updated = await this.orderRepository.fetchOrders(
        this.petshopStore.petshop?.id ?? 1,
        'updated',
        fetchTime
      )
      const separation = await Promise.all([
        this.orderRepository.fetchOrders(
          this.petshopStore.petshop?.id ?? 1,
          'pick_up_in_store',
          fetchTime
        ),
        this.orderRepository.fetchOrders(
          this.petshopStore.petshop?.id ?? 1,
          'waiting_for_delivery',
          fetchTime
        )
      ]).then(responses => {
        return responses.flatMap(response => {
          if (response.success) {
            return response.data || []
          }
          return []
        })
      })

      const onTheWay = await this.orderRepository.fetchOrders(
        this.petshopStore.petshop?.id ?? 1,
        'on_the_way',
        fetchTime
      )

      if (created.success && updated.success && onTheWay.success) {
        return {
          created: [...created.data, ...updated.data],
          separation,
          onTheWay: onTheWay.data
        }
      }
    },

    updateLists (
      created: OrderType[],
      separation: OrderType[],
      onTheWay: OrderType[]
    ) {
      this.updateList(this.createdOrders, created)
      this.updateList(this.separationOrders, separation)
      this.updateList(this.onTheWayOrders, onTheWay)
    },

    updateList (list: any, newOrders: any) {
      newOrders.forEach((order: OrderType) => {
        const index = list.findIndex((o: OrderType) => o.id === order.id)
        if (index === -1) {
          list.push(order)
        } else {
          list[index] = order
        }
      })
      list.splice(
        0,
        list.length,
        ...list.filter((order: OrderType) =>
          newOrders.some((n: OrderType) => n.id === order.id)
        )
      )
    },

    async updateOrderStatus (
      order: OrderType,
      currentStatus: string,
      nextStatus: string,
      isDrag: boolean = true
    ) {
      const currentList = this.getListByStatus(currentStatus)
      const nextList = this.getListByStatus(nextStatus)

      const finalStatus = this.determineFinalStatus(order, nextStatus)

      if (!isDrag) {
        this.moveOrderBetweenListsLocally(
          order,
          currentList as OrderType[],
          nextList as OrderType[],
          finalStatus
        )
      }

      const success = await this.updateStatusInAPI(order, finalStatus)

      if (!success) {
        this.revertLocalChange(
          order,
          currentList as OrderType[],
          nextList as OrderType[],
          currentStatus
        )
        console.error('Failed to update order status')
      }
    },

    determineFinalStatus (order: OrderType, nextStatus: string) {
      const pickupInStore = order.delivery?.in_store_pickup
      if (pickupInStore && nextStatus === 'on_the_way') {
        return 'finished'
      }
      if (nextStatus === 'pick_up_in_store' && !pickupInStore) {
        return 'waiting_for_delivery'
      }
      return nextStatus
    },

    moveOrderBetweenListsLocally (
      order: OrderType,
      currentList: OrderType[],
      nextList: OrderType[],
      finalStatus: string
    ) {
      const index = currentList.findIndex(o => o.id === order.id)
      if (index !== -1) {
        currentList.splice(index, 1)
      }
      if (!['finished', 'canceled'].includes(finalStatus)) {
        const updatedOrder = { ...order, status: finalStatus }
        nextList.unshift(updatedOrder)
      }
    },

    async updateStatusInAPI (order: OrderType, newStatus: string) {
      const data = {
        order_id: order.id,
        status: newStatus,
        user_id: order?.cart?.user.id,
        petshop_id: order?.cart?.petshop_id
      }
      return await this.orderRepository.updateOrderStatus(data)
    },

    revertLocalChange (
      order: OrderType,
      currentList: OrderType[],
      nextList: OrderType[],
      originalStatus: string
    ) {
      const index = nextList.findIndex(o => o.id === order.id)
      if (index !== -1) {
        nextList.splice(index, 1)
      }
      currentList.unshift({ ...order, status: originalStatus })
    },

    getListByStatus (status: string) {
      switch (status) {
        case 'created':
          return this.createdOrders
        case 'pick_up_in_store':
        case 'waiting_for_delivery':
          return this.separationOrders
        case 'on_the_way':
          return this.onTheWayOrders
        default:
          return []
      }
    },

    async findOrder (orderId: number) {
      try {
        this.loadOrder = true
        const query = {}
        const result = await this.orderRepository.findOrder(orderId, query)
        if (result.success) {
          this.order = result.data
        }
      } finally {
        this.loadOrder = false
      }
    },

    async updateOrderPrice (total: number, orderId: number) {
      const data = { price: total }
      return await this.orderRepository.updateOrder(orderId, data)
    },

    syncOriginalCartList (items: any[]) {
      // this.originalCartList = items.map(item => ({
      //   cart_id: item.cart_id,
      //   product_id: item.product_id,
      //   name: item.name,
      //   price: item.price,
      //   quantity: item.quantity,
      //   image_url: item.image_url || '',
      //   bulk_weight: item.bulk_weight || 0
      // }))
    },

    async loadInitialparams () {
      const data = {
        user_id: this.order?.cart?.user_id
      }

      const result = await this.orderRepository.generateLoginToEdit(data)

      if (result.success) {
        this.token = result.data['token']
        return true
      }
    }
  }
})
