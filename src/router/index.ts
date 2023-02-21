import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Register from '@/public/Register.vue'
import Login from '@/public/Login.vue'
import Secure from '@/secure/Secure.vue'
import Dashboard from '@/secure/dashboard/Dashboard.vue'

import Users from '@/secure/users/Users.vue'
import UsersCreate from '@/secure/users/UsersCreate.vue'
import UsersEdit from '@/secure/users/UsersEdit.vue'

import Roles from '@/secure/roles/Roles.vue';
import RolesCreate from '@/secure/roles/RolesCreate.vue';
import RolesEdit from '@/secure/roles/RolesEdit.vue';

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
                // subrota de '/', listagem usuários
            {
                path: '/users', 
                component: Users
            },
            {
                //subrota de '/', criação de usuário
                path: '/users/create',
                component: UsersCreate
            },
            {
                //subrota de '/', edição de usuário
                path: '/users/:id/edit',
                component: UsersEdit
            },
            {
                //subrota de '/', listagem de perfis
                path: '/roles',
                component: Roles
            },
            {
                //subrota de '/', criação de perfis
                path: '/roles/create',
                component: RolesCreate
            },
            {
                //subrota de '/', edição de perfis
                path: '/roles/:id/edit',
                component: RolesEdit
            },
        ]
    },    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router