<template>
  <div class="d-flex flex-column align-center text-centerpa-5">
      <v-img :src="NotFound" width="100%" height="75vh"/>
    <h1>Oops, This Page Could Not Be Found</h1>
    <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
  </div>
</template>

<script setup>
import NotFound from '../assets/404.svg';
</script>