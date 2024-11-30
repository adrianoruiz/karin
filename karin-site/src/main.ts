import { createApp } from 'vue'
import './style.css'
import './assets/animations.css'
import App from './App.vue'

/* Import Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUserDoctor, 
  faHandHoldingHeart, 
  faClipboardList, 
  faPills,
  faBrain,
  faSadTear,
  faScaleBalanced,
  faBolt,
  faMoon,
  faTriangleExclamation,
  faUtensils,
  faMask,
  faInfinity,
  faUser
} from '@fortawesome/free-solid-svg-icons'

/* Add icons to the library */
library.add(
  faUserDoctor, 
  faHandHoldingHeart, 
  faClipboardList, 
  faPills,
  faBrain,
  faSadTear,
  faScaleBalanced,
  faBolt,
  faMoon,
  faTriangleExclamation,
  faUtensils,
  faMask,
  faInfinity,
  faUser
)

const app = createApp(App)
/* Register Font Awesome component globally */
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
