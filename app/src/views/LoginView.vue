<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="../assets/bulle.svg" alt="bulle" class="logo"/>
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16">Login</h1>
      <div class="mb-10">
        Don't have an account ? <a href="/register">Create new account</a>
      </div>
      <div class="form-width">
        <v-form>
          <label>Email</label>
          <v-text-field
            clearable
            v-model="user.email"
            type="email"
            color="appgrey"
            counter="10"
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
        <div>
          <v-btn class="w-100 mb-3" color="appgrey">Login</v-btn>
        </div>
        <v-btn variant="text" @click="forgotPassword = true">Forgot Password ?</v-btn>
        </v-form>
      </div>
    </v-col>
    <v-dialog v-model="forgotPassword" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Forgot Password</h2>
        </v-card-title>
        <v-card-subtitle>
          Enter your email address and we will send you a link to reset your password.
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Email</label>
            <v-text-field
              clearable
              v-model="user.email"
              placeholder="example@example.com"
              type="email"
              color="appgrey"
              counter="10"
              variant="outlined"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="forgotPassword = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

let forgotPassword = ref(false);

let user = ref({
  email: '',
  password: '',
});

onMounted(() => {
  console.log('mounted');
});
// const isMobile = computed(() => {
//   const width = window.innerWidth
//   if (width < 768) {
//     return true
//   } else {
//     return false
//   }
// });
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
