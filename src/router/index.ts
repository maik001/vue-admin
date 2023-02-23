import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Register from '@/public/Register.vue'
import Login from '@/public/Login.vue'
import Secure from '@/secure/Secure.vue'
import Dashboard from '@/secure/dashboard/Dashboard.vue'

// crud de usuário
import Users from '@/secure/users/Users.vue'
import UsersCreate from '@/secure/users/UsersCreate.vue'
import UsersEdit from '@/secure/users/UsersEdit.vue'

// crud de perfis
import Roles from '@/secure/roles/Roles.vue';
import RolesCreate from '@/secure/roles/RolesCreate.vue';
import RolesEdit from '@/secure/roles/RolesEdit.vue';

// crud de produtos
import Products from '@/secure/products/Products.vue';
import ProductsCreate from '@/secure/products/ProductsCreate.vue';
import ProductsEdit from '@/secure/products/ProductsEdit.vue';

// pedidos de compra
import Orders from '@/secure/orders/Orders.vue';
import OrderItems from '@/secure/orders/OrderItems.vue';

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
            {
                //subrota de '/', listagem de produtos
                path: '/products',
                component: Products
            },
            {
                //subrota de '/', criação de produtos
                path: '/products/create',
                component: ProductsCreate
            },
            {
                //subrota de '/', criação de produtos
                path: '/products/:id/edit',
                component: ProductsEdit
            },
            {
                path: '/orders', 
                component: Orders
            },
            {
                path: '/orders/:id/order_items',
                component: OrderItems
            }
        ]
    },    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router