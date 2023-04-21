<template>
    <Header />

    <div class="container-fluid">
      <div class="row">
        <Menu />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view v-if="user?.id" />
        </main>
      </div>
    </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import Header from "@/secure/components/Header.vue";
import Menu from "@/secure/components/Menu.vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '@/classes/user';

export default {
    name : "Secure",
    components: {
        Menu,
        Header
    },
    setup() {
      const router = useRouter();
      const user = ref();
      const store = useStore();

      // hook que verifica se os componentes do DOM foram montados
      onMounted(async () => {
        try{
          const response = await axios.get('user');

          const u: User = response.data.data;

          // dispara o evento de alteração do usuario
          await store.dispatch('User/setUser', new User(
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.role,
            u.permissions,
          ));

          // pega as informações do usuário logado
          user.value = u;
        } catch (e) {
          await router.push('/login');
        }
      });

      return {
        user
      }
    }
}
</script>

<style>
 body {
  font-size: .875rem;
}

.feather {
  width: 32px;
  height: 32px;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}
</style>
