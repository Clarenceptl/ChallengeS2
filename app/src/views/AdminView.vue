<template>
  <div class="pa-5">
    <h1 class="text-center mb-4">Dashboard</h1>
    <v-row>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300">
          <v-card-title>
            <h2 class="text-center">Users</h2>
          </v-card-title>
          <v-card-text>
            <img src="../assets/users.svg" alt="users" class="logo"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300">
          <v-card-title>
            <h2 class="text-center">Companies</h2>
          </v-card-title>
          <v-card-text>
            <img src="../assets/companies.svg" alt="users" class="logo"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300">
          <v-card-title>
            <h2 class="text-center">Jobs</h2>
          </v-card-title>
          <v-card-text>
            <img src="../assets/jobs.svg" alt="users" class="logo"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
</script>

<style scoped></style>