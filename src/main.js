import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import {router} from '@/router'
import { vuetify } from './plugins/vuetify'

import './assets/main.css'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap.js'

const pinia = createPinia()


createApp(App)
.use(pinia)
.use(router)
.use(vuetify)
.mount('#app')