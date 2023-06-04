<template>
  <div class="div-background">
    <v-row>
      <v-col cols="5">
        <div class="catch-phrase">Find A Job That Matches Your passion</div>
        <div class="small-text mb-16">
          Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time,
          contract and internships.
        </div>
        <div class="smaller-text mt-16">
          Are you tired of endlessly scrolling through job listings? Take control of your career
          destiny! Join our job search website and gain access to a vast network of exclusive
          opportunities. From entry-level positions to executive roles, our platform connects you
          with companies actively seeking talented individuals like you. With personalized job
          recommendations, expert career resources, and a supportive community, we're dedicated to
          empowering you in your job search journey. Don't settle for just any job – find the one
          that fulfills your potential. Register now and embark on a path to professional success!
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
  console.log(user)
})
</script>

<style scoped>
.div-background {
  background-image: url('../assets/landing-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}

@media (min-width: 768px) {
  .div-background {
    padding-top: 90px;
    padding-left: 90px;
  }
  .catch-phrase {
    font-size: 4rem;
    font-weight: 700;
    color: #338573;
  }
  .small-text {
    font-size: 1.5rem;
    font-weight: 400;
    color: #338573;
  }
  .smaller-text {
    font-size: 1rem;
    font-weight: 400;
    color: #338573;
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
    color: #338573;
  }
  .small-text {
    font-size: 0.5rem;
    font-weight: 400;
    color: #338573;
  }
}
</style>
