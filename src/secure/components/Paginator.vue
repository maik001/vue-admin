<template>
    <!-- Funcionalidade da Paginação -->
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

<script>
import { ref } from 'vue';

export default {
    name: "Paginator",
    emits: ['page-changed'],
    props: {
        lastPage: Number,
    },
    setup(props, context) {
        const page = ref(1);

        // funções de paginação -> decrementar e incrementar paginas
        const prev = async() => {
            if(page.value === 1) return;

            page.value--;

            // emite um evento para mudar a página
            context.emit('page-changed', page.value);
        }

        const next = async() => {
            if(page.value === props.lastPage) return;

            page.value++;

            // emite um evento para mudar a página
            context.emit('page-changed', page.value);
        }

        return {
            prev,
            next
        }
    }
}
</script>