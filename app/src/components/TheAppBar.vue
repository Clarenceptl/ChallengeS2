<template>
  <div>
    <v-app-bar :elevation="0" color="green-100">
      <template v-slot:append>
        <div v-if="!isConnected">
          <v-btn variant="outlined" color="green-800" @click="router.push('/login')">Login</v-btn>
          <v-btn class="ml-1" variant="outlined" @click="router.push('/register')">Register</v-btn>
        </div>
        <div v-else>
          <v-btn v-if="isUser" class="ml-1" color="green-800" variant="outlined" @click="router.push('/appointment-list')">Appointments</v-btn>
          <v-btn v-if="isEmployer" class="ml-1" color="green-800" variant="outlined" @click="router.push('/employer/appointments')">Appointments</v-btn>
          <v-btn v-if="isUser" class="ml-1" color="green-800" variant="outlined" @click="router.push('/applied-list')">Applied list</v-btn>
          <v-btn v-if="!isEmployer" class="ml-1" color="green-800" variant="outlined" @click="router.push('/job-offers')">Job Offers</v-btn>
          <v-btn v-if="isEmployer" class="ml-1" color="green-800" variant="outlined" @click="router.push('/employer/jobs')">My Jobs</v-btn>
          <v-btn v-if="isUser" class="ml-1" color="green-800" variant="outlined" @click="router.push('/register-company')">Register Company</v-btn>
          <v-btn v-if="isAdmin" class="ml-1" color="green-800" variant="outlined" @click="router.push('/admin')">Admin</v-btn>
          <v-btn v-if="!isAdmin" class="ml-1" color="green-800" variant="outlined" @click="router.push('/profile')">Profile</v-btn>
          <v-btn class="ml-1" color="red-800" variant="outlined" @click="logout">Logout</v-btn>
        </div>
      </template>
      <v-app-bar-title @click="router.push('/')"> Larudakoté </v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUsersStore } from '../stores/users.store'
import { storeToRefs } from 'pinia';

const { isAdmin, isEmployer, isUser, isConnected } = storeToRefs(useUsersStore())
if (isConnected.value) {
  await useUsersStore().getSelfUser()
}
const router = useRouter()

const logout = () => {
  useUsersStore().logout()
  router.push('/login')
}
</script>
