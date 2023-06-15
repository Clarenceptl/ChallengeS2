<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
<<<<<<< HEAD
      <img src="../../assets/bulle.svg" alt="bulle" class="logo"/>
=======
      <img src="../assets/bulle.svg" alt="bulle" class="logo"/>
>>>>>>> origin/develop
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16 mb-10">Reset your password</h1>
      <div class="form-width">
        <v-form>
          <label>Passwors</label>
          <v-text-field
            clearable
            v-model="user.password"
            type="password"
            color="appgrey"
            variant="outlined"
            required
          />
          <label>Confirm Password</label>
          <v-text-field
          clearable
          v-model="user.confirmPassword"
          type="password"
          color="appgrey"
          variant="outlined"
          required
          />
        <div>
          <v-btn class="w-100 mb-3" color="appgrey">Update</v-btn>
        </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

let user = ref({
  password: '',
  confirmPassword: '',
});
</script>

<style scoped>
.form-width {
  max-width: 500px;
}

@media (min-width: 768px) {
}

@media (max-width: 768px) {
  .logo {
    width: 100%;
  }
  .form-width {
  max-width: 200px;
}
}
</style>
