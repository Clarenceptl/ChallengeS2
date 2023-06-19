<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo"/>
    </v-col>
    <v-col>
      <h1 class="mt-16 mb-10 text-center">Create company informations</h1>
      <v-row>
        <v-col cols="8">
          <v-text-field clearable type="text" color="appgrey" variant="outlined" label="Create company sector (Tech, Finance, Education...)"/>
        </v-col>
        <v-col cols="3">
          <v-btn class="w-100" color="appgrey">Create Sector</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field clearable type="text" color="appgrey" variant="outlined" label="Create company sector (Tech, Finance, Education...)"/>
        </v-col>
        <v-col cols="3">
          <v-btn class="w-100" color="appgrey">Create Size</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field clearable type="text" color="appgrey" variant="outlined" label="Create company sector (Tech, Finance, Education...)"/>
        </v-col>
        <v-col cols="3">
          <v-btn class="w-100" color="appgrey">Create Revenue</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
</script>

<style scoped>
</style>