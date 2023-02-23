<template>
    <div class ="d-flex justify-content-between flex-wrap flex-md-nowrap - align-items-center pt-3 pb-2 mb-3 border-bottom"> 
      <div class="btn-toolbar mb-2 mb-md-0">
          <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- faz um loop for nos usuarios da api-->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role.name }}</td>
            <td>
              <div class="btn-group mr-2">
                  <router-link :to="`/users/${user.id}/edit`" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                  <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
        
    <!-- Funcionalidade de paginação, passando o prop da última pagina e emitindo o evento de mudança de pagina-->
    <Paginator :last-page="lastPage" @page-changed="load($event)"/>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { Entity } from '@/interfaces/entity';
import Paginator from '@/secure/components/Paginator.vue';

export default {
    name: "Users",
    components: {
       Paginator,
    },
    setup() {
        const users: any = ref([]);
        const lastPage = ref(0);

        // busca os usuários na api com paginação
        const load = async (page = 1) => {
            const response = await axios.get(`users?page=${page}`);
            
            users.value = response.data.data;

            lastPage.value = response.data.meta.last_page;
        }

        // vai carregar os usuários da api laravel na medida que monta o DOM
        onMounted(load);


        // função de deleção
        const del = async (id: number) => {
            if(confirm('Are you sure you want to delete this record?')) {
                // deleta o usuário na api pelo id
                await axios.delete(`users/${id}`);

                // filtra os valores dos usuários, retirando o usuário que foi excluido pelo id
                // utilizo a interface entidade para pegar o id
                users.value = users.value.filter((e: Entity) => e.id !== id);
            }
        }

        return {
            users,
            lastPage,
            del,
            load
        }
    }
}
</script>
