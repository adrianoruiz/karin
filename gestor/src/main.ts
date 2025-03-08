import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'
import { vMaska } from 'maska/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faBookOpen,
  faBox,
  faBuildingColumns,
  faCartShopping,
  faChartBar,
  faChartLine,
  faChartPie,
  faCheckCircle,
  faChevronDown,
  faChevronRight,
  faCircleInfo,
  faCircleXmark,
  faClock,
  faCreditCard,
  faDollarSign,
  faEdit,
  faFileExport,
  faGear,
  faIndustry,
  faLink,
  faMapPin,
  faMotorcycle,
  faPen,
  faPercent,
  faQrcode,
  faRepeat,
  faRightFromBracket,
  faRobot,
  faSearch,
  faShoppingBag,
  faStore,
  faTableColumns,
  faTrash,
  faTriangleExclamation,
  faUserGear,
  faUserMd,
  faUserMinus,
  faUsers,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faChartLine,
  faBox,
  faChartBar,
  faChartPie,
  faStore,
  faUsers,
  faUserMd,
  faIndustry,
  faCartShopping,
  faBook,
  faBookOpen,
  faWhatsapp,
  faGear,
  faRobot,
  faTableColumns,
  faSearch,
  faEdit,
  faPen,
  faTrash,
  faCheckCircle,
  faCircleXmark,
  faCircleInfo,
  faTriangleExclamation,
  faChevronDown,
  faChevronRight,
  faXmark,
  faRightFromBracket,
  faBuildingColumns,
  faDollarSign,
  faClock,
  faMotorcycle,
  faFileExport,
  faCreditCard,
  faQrcode,
  // Novos ícones
  faLink,
  faUserMinus,
  faRepeat,
  faPercent,
  faMapPin,
  faUserGear,
  faShoppingBag
)

const app = createApp(App)

// Registrar o componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon)
app.directive('maska', vMaska)

app.use(createPinia())
app.use(router)

app.mount('#app')
