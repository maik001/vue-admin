<template>
    <div class ="d-flex justify-content-between flex-wrap flex-md-nowrap - align-items-center pt-3 pb-2 mb-3 border-bottom"> 
      <div class="btn-toolbar mb-2 mb-md-0" v-if="user.canEdit('products')">
          <router-link to="/products/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
      </div>
    </div>

    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- faz um loop for nos produtos da api-->
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td> <img :src="product.image" height="50"> </td>
                <td>{{ product.title }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <div class="btn-group mr-2" v-if="user.canEdit('products')">
                      <router-link :to="`/products/${product.id}/edit`" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                      <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)">Delete</a>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
    </div>

    <!-- Funcionalidade de paginação, passando o prop da última pagina e recebendo o emit da mudança de página-->
    <Paginator :last-page="lastPage" @page-changed="load($event)"/>
</template>

<script lang="ts">
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import { Entity } from '@/interfaces/entity';
import Paginator from '@/secure/components/Paginator.vue';
import { useStore } from 'vuex';

export default {
    name: 'Products',
    components: {
        Paginator,
    },
    setup() {
        const products: any = ref([]);
        const lastPage = ref(0);
        const store = useStore();
        const user = computed(() => store.state.User.user);


        // busca os produtos na api com paginação
        const load = async (page = 1) => {
            const response = await axios.get(`products?page=${page}`);

            products.value = response.data.data;

            lastPage.value = response.data.meta.last_page;
        }

        onMounted(load);

        // função de deleção
        const del = async (id: number) => {
            if(confirm('Are you sure you want to delete this record?')) {
                // deleta o produto na api pelo id
                await axios.delete(`products/${id}`);

                // filtra os valores dos produtos, retirando o usuário que foi excluido pelo id
                // utilizo a interface entidade para pegar o id
                products.value = products.value.filter((e: Entity) => e.id !== id);
            }
        }

        return {
            products,
            user,
            lastPage,
            del,
            load
        }
    }
}
</script>

<style>

</style>