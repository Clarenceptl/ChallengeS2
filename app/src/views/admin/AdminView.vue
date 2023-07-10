<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Dashboard</h1>
    <h3 class="text-center my-10">As an admin on the dashboard, you have the power to manage users, jobs, and company information. </h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-card prepend-icon="mdi-account-circle" color="grey-lighten-4" height="72" @click="router.push({ name: 'UsersList' })">
          <template v-slot:title>Users</template>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card prepend-icon="mdi-domain"  color="grey-lighten-4" height="72" @click="router.push({name : 'CompanyInformationsList'})">
          <template v-slot:title>Companies Informations</template>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card prepend-icon="mdi-account-tie"  color="grey-lighten-4" height="72" @click="router.push('jobs')">
          <template v-slot:title>Jobs</template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>