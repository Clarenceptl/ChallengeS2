<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Dashboard</h1>
    <h3 class="text-center my-10">
      As an admin on the dashboard, you have the power to manage users, jobs, and company
      information.
    </h3>
    <v-row>
      <v-col v-for="item in dashboardItems" :key="item.title" cols="12" md="4">
        <v-card
          :prepend-icon="item.icon"
          color="grey-lighten-4"
          height="72"
          @click="router.push(item.route)"
        >
          <template v-slot:title>{{ item.title }}</template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const dashboardItems = [
  {
    title: 'Users',
    icon: 'mdi-account-circle',
    route: { name: 'UsersList' }
  },
  {
    title: 'Companies Informations',
    icon: 'mdi-domain',
    route: { name: 'CompanyInformationsList' }
  }
  // {
  //   title: 'Jobs',
  //   icon: 'mdi-account-tie',
  //   route: { name: 'Jobs' }
  // }
  // {
  //   title: 'Appointments',
  //   icon: 'mdi-calendar',
  //   route: { name: 'AppointementsList' }
  // }
]
</script>
