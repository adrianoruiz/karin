import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

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

/* Import AOS */
import AOS from 'aos'
import 'aos/dist/aos.css'

/* Initialize AOS */
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
})

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
