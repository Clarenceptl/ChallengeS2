<template>
  <div class="pa-5">
    <h1 class="text-center mb-4">Dashboard</h1>
    <v-row>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300" @click="router.push('users')">
          <v-card-title>
            <h2 class="text-center">Users</h2>
          </v-card-title>
          <v-card-text>
            <v-img :src="UsersSvg" alt="users"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300" @click="router.push('company-information')">
          <v-card-title>
            <h2 class="text-center">Companies Informations</h2>
          </v-card-title>
          <v-card-text>
            <v-img :src="CompaniesSvg" alt="users"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined" elevation="4" class="bg-green-300">
          <v-card-title>
            <h2 class="text-center">Jobs</h2>
          </v-card-title>
          <v-card-text>
            <v-img :src="JobsSvg" alt="users"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import UsersSvg from "../../assets/users.svg";
import CompaniesSvg from "../../assets/companies.svg";
import JobsSvg from "../../assets/jobs.svg";

const router = useRouter();
</script>

<style scoped></style>