import { useOrderStore } from '@/modules/orders_kanban/store/order_store'

interface MenuItem {
  name: string
  icon: string
  path?: string
  badge?: number | (() => number | undefined)
  show?: boolean
  children?: MenuItem[]
}

export const getMenuItems = (): MenuItem[] => {
  const orderStore = useOrderStore()

  return [
    {
      name: 'Pedidos',
      icon: 'cart-shopping',
      path: '/orders-kanban',
      badge: () =>
        orderStore.openedOrders > 0 ? orderStore.openedOrders : undefined,
      show: true
    },
    {
      name: 'Catálogo',
      icon: 'book',
      path: '/catalogo',
      show: true
    },
    {
      name: 'Relatório de Pedidos',
      icon: 'chart-bar',
      path: '/reports',
      show: true
    },
    // {
    //   name: 'Relatório de Acessos',
    //   icon: 'chart-bar',
    //   path: '/reports-access',
    //   show: true
    // },
    //Todo: Implementar novamente apos testes
    {
      name: 'Comportamento do Usuário',
      icon: 'chart-bar',
      path: '/reports-behavior',
      show: true
    },

    // {
    //   name: 'Petshop',
    //   icon: 'store',
    //   show: false,
    //   children: [
    //     {
    //       name: 'WhatsApp Chat',
    //       icon: 'whatsapp',
    //       path: '/whatsapp-chat',
    //       show: true
    //     }
    //   ]
    // },
    {
      name: 'Configurações Petshop',
      icon: 'gear',
      show: true,
      children: [
        {
          name: 'Loja',
          icon: 'store',
          path: '/store-settings',
          show: true
        },
        {
          name: 'Robô',
          icon: 'robot',
          path: '/robot-settings',
          show: true
        },
        {
          name: 'WhatsApp Conexão',
          icon: 'whatsapp',
          path: '/whatsapp-settings',
          show: true
        },
        // {
        //   name: 'WhatsApp Chat',
        //   icon: 'whatsapp',
        //   path: '/whatsapp-chat',
        //   show: true
        // },
        {
          name: 'Gerenciar Catálogo',
          icon: 'book-open',
          path: '/catalog-management',
          show: true
        }
        // {
        //   name: 'Usuários',
        //   icon: 'users',
        //   path: '/users-settings',
        //   show: true
        // },
        // {
        //   name: 'Planos',
        //   icon: 'credit-card',
        //   path: '/plans',
        //   show: true
        // }
      ]
    },
    {
      name: 'Petfy Admin',
      icon: 'table-columns',
      show: false,
      children: [
        {
          name: 'Indicadores',
          icon: 'chart-line',
          path: '/dashboard',
          show: true
        },
        {
          name: 'Produtos',
          icon: 'box',
          path: '/products',
          show: true
        },
        {
          name: 'Fabricantes',
          icon: 'industry',
          path: '/manufacturers',
          show: true
        },
        {
          name: 'Petshops',
          icon: 'store',
          path: '/petshops',
          show: true
        },
        {
          name: 'Usuários',
          icon: 'users',
          path: '/users',
          show: true
        },
        {
          name: 'Financeiro',
          icon: 'chart-pie',
          path: '/financial',
          show: true
        },
        {
          name: 'Institucional',
          icon: 'building-columns',
          path: '/institutional',
          show: true
        }
      ]
    }
  ]
}
