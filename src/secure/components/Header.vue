<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <router-link to="/profile" class="p-2 text-white text-decoration-none">{{ user.name }}</router-link>
        <a class="p-2 text-white text-decoration-none" href="javascript:void(0)" @click="logout">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
export default {
    name: "Header",
    setup() {
      const router = useRouter();
      const store = useStore();

      const user = computed(() => store.state.User.user);

      const logout = async () => {
        await axios.post('logout', {});
        router.push('/login');
      }

      return {
        user,
        logout
      }
    }
}
</script>

<style>
 
</style>