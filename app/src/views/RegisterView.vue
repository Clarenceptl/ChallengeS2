<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="../assets/bulle.svg" alt="bulle" class="logo"/>
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16">Create Your Account</h1>
      <div class="mb-10">
        Already have an account ? <a href="#">Login</a>
      </div>
      <div class="form-width">
        <v-form>
          <label>First name</label>
          <v-text-field
            clearable
            v-model="user.fistname"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Last name</label>
          <v-text-field
            clearable
            v-model="user.lastname"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Email</label>
          <v-text-field
            clearable
            v-model="user.email"
            type="emai;"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Date of birth</label>
          <v-text-field
            clearable
            v-model="user.dateOfBirth"
            type="date"
            color="appgrey"
            variant="outlined"
          />
          <label>Password</label>
          <v-text-field
          clearable
          v-model="user.password"
          type="password"
          color="appgrey"
          variant="outlined"
          />
          <label>Confirm Password</label>
          <v-text-field
          clearable
          v-model="user.confirmPassword"
          type="password"
          color="appgrey"
          variant="outlined"
          />
        <div>
          <v-btn disabled class="w-100 mb-3" color="appgrey">Login</v-btn>
        </div>
        </v-form>
        
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

let user = ref({
  fistname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
});
</script>

<style scoped>
.form-width {
max-width: 500px;
}

.col-bg-image {
background-image: url('../assets/bulle.svg');
background-repeat: no-repeat;
background-size: cover;
background-position: center;
width: 100%;
height: 100vh;
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
