import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../modules/catalog/CatalogView.vue'
import CatalogManagementView from '../modules/catalog_management/CatalogManagementView.vue'
import Financial from '../modules/financial/Financial.vue'
import Institucional from '../modules/institucional/Institucional.vue'
import ManufacturerForm from '../modules/manufacturer/ManufacturerForm.vue'
import ManufacturerList from '../modules/manufacturer/ManufacturerList.vue'
import OrdersKanban from '../modules/orders_kanban/OrdersKanban.vue'
import PetshopForm from '../modules/petshop/PetshopForm.vue'
import PetshopList from '../modules/petshop/PetshopList.vue'
import PlansView from '../modules/plans/PlansView.vue'
import ProductForm from '../modules/product/ProductForm.vue'
import ProductList from '../modules/product/ProductList.vue'
import ReportAccessPage from '../modules/reports/ReportAccessPage.vue'
import ReportsView from '../modules/reports/ReportOrdersPage.vue'
import UserBehaviorPage from '../modules/reports/UserBehaviorPage.vue'
import RobotSettingsView from '../modules/robot_settings/RobotSettingsView.vue'
import Settings from '../modules/settings/Settings.vue'
import StoreSettingsView from '../modules/store_settings/StoreSettingsView.vue'
import UserForm from '../modules/user/UserForm.vue'
import UsersSettingsView from '../modules/users_settings/UsersSettingsView.vue'
import ChatView from '../modules/whatsapp_chat/ChatView.vue'
import WhatsAppSettingsView from '../modules/whatsapp_settings/WhatsAppSettingsView.vue'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      redirect: '/orders-kanban',
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      component: ProductList,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/new',
      component: ProductForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/:id',
      component: ProductForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/petshops',
      component: PetshopList,
      meta: { requiresAuth: true }
    },
    {
      path: '/petshops/new',
      component: PetshopForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/petshops/:id',
      component: PetshopForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/manufacturers',
      component: ManufacturerList,
      meta: { requiresAuth: true }
    },
    {
      path: '/manufacturers/new',
      component: ManufacturerForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/manufacturers/:id',
      component: ManufacturerForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      component: UserForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id',
      component: UserForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders-kanban',
      component: OrdersKanban,
      meta: { requiresAuth: true }
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports',
      component: ReportsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports-access',
      component: ReportAccessPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/reports-behavior',
      component: UserBehaviorPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/store-settings',
      component: StoreSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/robot-settings',
      component: RobotSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/whatsapp-chat',
      component: ChatView,
      meta: { requiresAuth: true }
    },
    {
      path: '/whatsapp-chat/:id',
      component: ChatView,
      meta: { requiresAuth: true }
    },
    {
      path: '/whatsapp-settings',
      component: WhatsAppSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/catalog-management',
      component: CatalogManagementView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users-settings',
      component: UsersSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/plans',
      component: PlansView,
      meta: { requiresAuth: true }
    },
    {
      path: '/institutional',
      component: Institucional,
      meta: { requiresAuth: true }
    },
    {
      path: '/financial',
      component: Financial,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      component: Settings,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const storedToken = localStorage.getItem('access_token')

  if (to.path === '/login') {
    if (storedToken && auth.isAuthenticated()) {
      next('/dashboard')
    } else {
      next()
    }
    return
  }

  if (to.meta.requiresAuth && (!storedToken || !auth.isAuthenticated())) {
    next('/login')
    return
  }

  next()
})

export default router
