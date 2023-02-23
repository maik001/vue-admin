<template>
    <div class ="d-flex justify-content-between flex-wrap flex-md-nowrap - align-items-center pt-3 pb-2 mb-3 border-bottom"> 
        <div class="btn-toolbar mb-2 mb-md-0">
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="exportFile">Export</a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <!-- faz um loop for nas compras da api-->
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{  order.first_name }} {{ order.last_name }}</td>
                <td>{{ order.email }}</td>
                <td>{{ order.total_price }}</td>
                <td>
                <div class="btn-group mr-2">
                    <router-link :to="`/orders/${order.id}/order_items`" href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">View</router-link>
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
import Paginator from '@/secure/components/Paginator.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    name: "Orders",
    components: {
       Paginator,
    },
    setup() {
        const orders: any = ref([]);
        const lastPage = ref(0);

        const load = async (page = 1) => {
            const response = await axios.get(`orders?page=${page}`);

            orders.value = response.data.data;

            lastPage.value = response.data.meta.last_page;
        }

        onMounted(load);

        const exportFile = async () => {
            // blob representa o tipo de retorno que deve ser de dados (exportação de arquivo)
            const response = await axios.get('export', {responseType: 'blob'});

            // cria o arquivo com a resposta e tipa com csv
            const blob = new Blob([response.data], {type: 'text/csv'});

            // cria a url de download do arquivo
            const downloadUrl = window.URL.createObjectURL(response.data);

            // adiciona um link de ancora articial 
            const link = document.createElement('a');

            // nomeia o arquivo e clica para baixar
            link.href = downloadUrl;
            link.download = 'orders.csv';
            link.click();
        }

        return {
            orders,
            lastPage,
            load,
            exportFile
        }
    }
}
</script>

<style>

</style>