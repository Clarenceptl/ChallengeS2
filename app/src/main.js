import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import tracker from './plugins/tracker'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(tracker, {
    APP_ID: 'YOUR_APP_ID',
    service: 'frontend2',
});

app.mount('#app')
