import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Error from '../views/Error.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/:notFound',
            component: Home
        },
        {
            path: '/dashboard',
            component: Dashboard
            
        },
    
    ]
})

export { router }