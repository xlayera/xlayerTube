import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import VueYtframe from "vue3-ytframe"
import ConfirmationService from 'primevue/confirmationservice';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

app.use(router);
app.use(VueYtframe);
app.use(Notifications);

app.mount("#app")