<template>
  <v-app class="bg-grey-100">
    <TheAppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import TheAppBar from './components/TheAppBar.vue'
</script>

<style scoped>

</style>
