<template>
   <form class="form-signin" @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="email" placeholder="name@example.com" required autofocus v-model="email">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="password" placeholder="Password" required v-model="password">
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const submit = async () => {
      const response = await axios.post('login', {
        email: email.value,
        password: password.value
      });

      // salva o token de autenticação no storage
      localStorage.setItem('token', response.data.token);

      // informa ao axios o token da sessão atual
      axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      // redireciona para a rota raiz
      await router.push('/');
    }

    return {
      email,
      password,
      submit
    }
  }
}
</script>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>