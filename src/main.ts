import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './style.css'
import router from './router' // Nó sẽ tự tìm đến file router.ts hoặc router/index.ts của mày

const app = createApp(App)

// Kích hoạt Router để xử lý điều hướng trang
app.use(router)

app.mount('#app')