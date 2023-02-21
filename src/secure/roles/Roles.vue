<template>
     <div class ="d-flex justify-content-between flex-wrap flex-md-nowrap - align-items-center pt-3 pb-2 mb-3 border-bottom"> 
          <div class="btn-toolbar mb-2 mb-md-0">
              <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
          </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- faz um loop for nos usuarios da api-->
                <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>
                        <div class="btn-group mr-2">
                            <router-link :to="`/roles/${role.id}/edit`" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(role.id)">Delete</a>
                        </div>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { Entity } from '@/interfaces/entity';

export default {
    name: "Roles",
    setup() {
        const roles: any = ref([]);

        onMounted(async () => {
            const response = await axios.get('roles');

            roles.value = response.data.data;

        });

        // função de deleção
        const del = async (id: number) => {
            if(confirm('Are you sure you want to delete this record?')) {
                // deleta a role na api pelo id
                await axios.delete(`roles/${id}`);

                // filtra os valores dos usuários, retirando o usuário que foi excluido pelo id
                // utilizo a interface entidade para pegar o id
                roles.value = roles.value.filter((e: Entity) => e.id !== id);
            }
        }

        return {
            roles,
            del
        }
    }
}
</script>
