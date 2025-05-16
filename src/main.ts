import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/main.css'
import '@/assets/styles/main.scss'
import App from '@/App.vue'
import router from '@/router'
import { initWindowResizeListener } from '@/utils/WindowResizeListener'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

initWindowResizeListener()
