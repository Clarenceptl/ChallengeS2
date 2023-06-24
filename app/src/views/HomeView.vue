<template>
  <div class="div-background ">
    <v-row>
      <v-col cols="5">
        <div class="catch-phrase">Find a job that matches your passion</div>
        <!-- <div class="small-text mb-16">
          Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time,
          contract and internships.
        </div> -->
        <div class="smaller-text mt-16">
          Supercharge your career with our job search website! Connect with top companies and access exclusive opportunities tailored just for you. 
          From entry-level to executive positions, our platform offers personalized job recommendations and expert resources. 
          Join our supportive community and unlock your professional potential. Register now for success!
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const user = userStore.getContextUser
onMounted(async () => {
  await userStore.loadContextUser()
  console.log(user, 'user')
})
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

@media (max-width: 768px) {
  .div-background {
    background-size: contain;
    height: 30vh;
    padding-left: 20px;
  }
  .catch-phrase {
    font-size: 1rem;
    font-weight: 700;
  }
  .small-text {
    font-size: 0.5rem;
    font-weight: 400;
  }
}
</style>
