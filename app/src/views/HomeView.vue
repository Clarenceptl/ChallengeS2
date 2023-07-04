<template>
  <div class="div-background">
    <v-row>
      <v-col cols="12" sm="5">
        <div class="catch-phrase">Find a job that matches your passion</div>
        <div class="smaller-text mt-4">
          Supercharge your career with our job search website! Connect with top companies and access
          exclusive opportunities tailored just for you. From entry-level to executive positions,
          our platform offers personalized job recommendations and expert resources. Join our
          supportive community and unlock your professional potential. Register now for success!
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.div-background {
  background-image: url('@/assets/landing-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 93.4vh;
  padding: 90px; /* Ajout d'un padding pour les grands écrans */
}

.catch-phrase {
  font-size: 4rem;
  font-weight: 700;
}

.smaller-text {
  font-size: 1rem;
  font-weight: 400;
}

@media (max-width: 768px) {
  .div-background {
    background-size: contain;
    height: 30vh;
    padding: 20px; /* Utilisation d'un padding plus petit pour les petits écrans */
  }

  .catch-phrase {
    font-size: 1rem;
    text-align: left;
    
  }

  .smaller-text {
    text-align: left;
    font-size: 0.6rem;
    max-width: 250px;
  }
}
</style>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const user = userStore.getContextUser
onMounted(async () => {
  await userStore.loadContextUser()
  await userStore.getUsers()
})
</script>