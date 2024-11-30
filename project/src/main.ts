import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

/* Import Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserDoctor, faHandHoldingHeart, faClipboardList, faPills } from '@fortawesome/free-solid-svg-icons'

/* Add icons to the library */
library.add(faUserDoctor, faHandHoldingHeart, faClipboardList, faPills)

const app = createApp(App)

/* Register Font Awesome component globally */
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
