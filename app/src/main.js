import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App)

app.use(ToastPlugin)
app.use(vuetify)
app.use(router)
app.use(createPinia())

app.mount('#app')
