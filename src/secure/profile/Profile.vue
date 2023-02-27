<template>
  <h2>Account Information</h2>
  <hr>
  <form>
    <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" name="first_name">
    </div>
    <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" name="last_name">
    </div>
    <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" name="email">
    </div>

    <button class="mt-2 btn btn-outline-secondary">Save</button>
  </form>

  <h2 class="mt-4">Change Password</h2>
  <hr>
  <form>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password">
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password_confirm">
    </div>

    <button class="mt-2 btn btn-outline-secondary">Save</button>
  </form>
</template>

<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';

export default {

    name: "Profile",
    setup() {
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
    }
}
</script>
