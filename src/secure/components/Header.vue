<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <router-link to="/profile" class="p-2 text-white text-decoration-none">{{user?.first_name}} {{ user?.last_name }}</router-link>
        <a class="p-2 text-white text-decoration-none" href="javascript:void(0)" @click="logout">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: "Header",
    // props servem para passar informações/propriedades entre os componentes
    // no caso estou pegando o user logado do componente Secure.vue
    props: ['user'],
    setup() {
      const router = useRouter();

      const logout = () => {
        localStorage.clear();
        router.push('/login');
      }

      return {
        logout
      }
    }
}
</script>

<style>
 
</style>