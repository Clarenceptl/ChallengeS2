<template>
  <v-app class="bg-white-100">
    <Suspense>
      <div>
        <TheAppBar />
        <v-main>
          <router-view />
        </v-main>
      </div>
      <template #fallback>
        <div class="loading d-flex flex-column align-center justify-center w-100">
          <p class="text-h5 mb-3">Loading</p>
          <div class="progress-bar px-3">
            <v-progress-linear
              indeterminate
              rounded
              :height="10"
              striped
              color="green"
            ></v-progress-linear>
          </div>
        </div>
      </template>
    </Suspense>
  </v-app>
</template>

<script setup>
import TheAppBar from './components/TheAppBar.vue'
</script>

<style scoped>
.loading {
  height: 100vh;
  .progress-bar {
    width: 100%;
    max-width: 500px;
  }
}
</style>
