<template>
    <div class ="d-flex justify-content-between flex-wrap flex-md-nowrap - align-items-center pt-3 pb-2 mb-3 border-bottom"> 
        <div class="btn-toolbar mb-2 mb-md-0">
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary">Export</a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Product Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
            </tr>
            </thead>
            <tbody>
            <!-- faz um loop for nas compras da api-->
            <tr v-for="orderItem in orderItems" :key="orderItem.id">
                <td>{{ orderItem.id }}</td>
                <td>{{ orderItem.product_title}}</td>
                <td>{{ orderItem.price}}</td>
                <td>{{ orderItem.quantity }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    name: "OrderItems",
    setup() {
        const orderItems: any = ref([]);
        const {params} = useRoute();

        onMounted(async () => {
            const response = await axios.get(`orders/${params.id}`);

            // pegar os items do relacionamento com compra e coloca no array de items da compra
            orderItems.value = response.data.data.order_items;
        });

        return {
            orderItems
        }
    }

}
</script>

<style>

</style>