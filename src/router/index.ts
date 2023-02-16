import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Register from '@/public/Register.vue'
import Login from '@/public/Login.vue'
import Secure from '@/secure/Secure.vue'
import Dashboard from '@/secure/dashboard/Dashboard.vue'
import Users from '@/secure/users/Users.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Secure',
        component: Secure,
        children: [
            // redreciona a rota padrão para /dashbord, 
            // soluciona o problema de duas subrotas ativas
            {
                path: '/',
                redirect: '/dashboard',
            },
            // subrota de '/', rota padrão -> dashboard
            {
                path: '/dashboard',
                component: Dashboard
            },
            // subrota de '/', usuários
            {
                path: '/users', 
                component: Users
            }
        ]
    },    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router