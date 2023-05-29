<template>
    <v-row>
      <v-col cols="6" class="text-center justify-content-center">
        <img src="../assets/bulle.svg" alt="bulle" class="logo"/>
      </v-col>
      <v-col cols="6">
        <h1 class="mt-16">Login</h1>
        <div class="mb-10">
          Don't have an account ? <a href="#">Create new account</a>
        </div>
        <div class="form-width">
          <v-form>
            <label>Email</label>
            <v-text-field
              clearable
              v-model="email"
              type="email"
              color="appgrey"
              counter="10"
              variant="outlined"
            />
            <label>Password</label>
            <v-text-field
            clearable
            v-model="password"
            type="password"
            color="appgrey"
            variant="outlined"
            />
          <div>
            <v-btn class="w-100 mb-3" color="appgrey">Login</v-btn>
          </div>
          <a href="#">Forgot Password ?</a>
          </v-form>
          
        </div>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { computed } from 'vue';

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
