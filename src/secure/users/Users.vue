<template>
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
                        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Funcionalidade da Paginação de usuários -->
          <nav>
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" hre="javascript:void(0)" @click="prev">Previous Page</a>
                </li>
                <li class="page-item">
                    <a class="page-link" hre="javascript:void(0)" @click="next">Next Page</a>
                </li>
            </ul>
          </nav>
          </template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';

export default {
    name: "Users",
    setup() {
        const users = ref([]);
        const page = ref(1);
        const lastPage = ref(0);

        // busca os usuários na api com paginação
        const load = async () => {
            const response = await axios.get(`users?page=${page.value}`);
            
            users.value = response.data.data;

            lastPage.value = response.data.meta.last_page;
        }


        // funções de paginação -> decrementar e incrementar paginas
        const prev = async() => {
            if(page.value === 1) return;

            page.value--;
            await load();
        }

        const next = async() => {
            if(page.value === lastPage.value) return;

            page.value++;
            await load();
        }

        // função de deleção
        const del = async (id: number) => {
            if(confirm('Are you sure you want to delete this record?')) {
                // deleta o usuário na api pelo id
                await axios.delete(`users/${id}`);

                // filtra os valores dos usuários, retirando o usuário que foi excluido pelo id
                users.value = users.value.filter((u: {id: number}) => u.id !== id);
            }
        }


        // vai carregar os usuários da api laravel na medida que monta o DOM
        onMounted(load);

        return {
            users,
            prev,
            next,
            del
        }
    }
}
</script>
