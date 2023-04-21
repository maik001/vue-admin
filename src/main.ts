import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

// indicando ao axios a rota raiz da api backend do laravel
axios.defaults.baseURL = 'http://localhost:8001/api';

/** capturando o token de autenticação gerado no login
* para acessar as rotas seguras
*/  
// axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.withCredentials = true;

createApp(App).use(router).use(store).mount('#app')

