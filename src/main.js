import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import VueYtframe from "vue3-ytframe"
const app = createApp(App)

app.use(router)
app.use(VueYtframe)

app.mount("#app")