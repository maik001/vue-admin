import { onMounted } from 'vue';
<template>
  <form @submit.prevent="submit">
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="name" v-model="name" />
        </div>
    </div>

    <div class="form-group row">
        <label class="col-sm-2 col-form-label">Permissions</label>
        <div class="col-sm-10">
            <div class="form-check form-check-inline col-3" v-for="permission in permissions" :key="permission.id">
                <input type="checkbox" class="form-check-input" :value="permission.id" @change="select(permission.id, $event.target.checked)"
                :checked="checked(permission.id)"/>
                <label class="form-check-label">{{ permission.name }}</label>
            </div>
        </div>
    </div>



    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import router from 'vue-router';
import { Role } from '@/classes/role';

export default {
    name: "RolesEdit",
    setup() {
        const name = ref('');
        const permissions = ref([]);
        const selected = ref([] as number[]);
        const router = useRouter();
        const {params} = useRoute();

        onMounted(async () => {
            const response = await axios.get('permissions');

            permissions.value = response.data.data; 

            const roleCall = await axios.get(`roles/${params.id}`);

            const role: Role = roleCall.data.data;

            name.value = role.name;

            // pegar o id de cada permissão para os valores 
            selected.value = role.permissions.map(p => p.id);
        })

        // função para selecionar os valores do checkbox de permissões
        const select = (id: number, checked: boolean) => {
            if(checked) {
                // se tiver marcado, colocar o indice selecionado e o id da permissão na variável selected
                selected.value = [...selected.value, id];
                return;
            }

            selected.value = selected.value.filter(s => s !== id);
        }

        const submit = async () => {
            await axios.put(`roles/${params.id}`, {
                name: name.value,
                permissions: selected.value,

            });

            await router.push('/roles');
        }

        // verifica se existe 1 ou mais valores de acordo com o id da permissão e coloca como selecionado
        const checked = (id: number) => selected.value.some(s => s === id);

        return {
            name,
            permissions,
            selected,
            select,
            submit,
            checked
        }
    }
}
</script>

<style>

</style>