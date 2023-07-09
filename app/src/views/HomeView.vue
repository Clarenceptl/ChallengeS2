<template>
  <div class="div-background">
    <v-row>
      <v-col cols="12" md="5">
        <div class="catch-phrase">Find a job that matches your passion</div>
        <div class="smaller-text">
          Supercharge your career with our job search website! Connect with top companies and access
          exclusive opportunities tailored just for you. From entry-level to executive positions,
          our platform offers personalized job recommendations and expert resources. Join our
          supportive community and unlock your professional potential. Register now for success!
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useUsersStore } from '../stores/users.store'

await useUsersStore().getSelfUser()
</script>

<style scoped>
.div-background {
  background-image: url('@/assets/landing-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 93.4vh;
}

@media (min-width: 768px) {
  .catch-phrase {
    font-size: 3rem;
    font-weight: 500;
    max-width: 500px;
  }
  .smaller-text {
    font-size: 1rem;
    font-weight: 400;
    max-width: 450px;
  }
}

@media (min-width: 1024px) {
  .div-background {
    padding-top: 90px;
    padding-left: 90px;
  }
  .catch-phrase {
    font-size: 4rem;
    font-weight: 700;
  }
  .small-text {
    font-size: 1.5rem;
    font-weight: 400;
  }
  .smaller-text {
    font-size: 1rem;
    font-weight: 400;
  }
}

@media (max-width: 425px) {
  .div-background {
    background-size: contain;
  }
  .catch-phrase {
    font-size: 1rem;
    font-weight: 700;
  }
  .smaller-text {
    font-size: 0.8rem;
    font-weight: 400;
  }
}
</style>
