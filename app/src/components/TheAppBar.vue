<template>
  <div>
    <v-app-bar :elevation="0" color="green-100">
      <template v-slot:append>
        <div v-if="!isConnected">
          <v-btn variant="outlined" color="green-800" @click="router.push('/login')">Login</v-btn>
          <v-btn class="ml-1" variant="outlined" @click="router.push('/register')">Register</v-btn>
        </div>
        <div v-else>
          <v-btn class="ml-1" color="green-800" variant="outlined" @click="router.push('/job-offers')">Job Offers</v-btn>
          <v-btn class="ml-1" color="green-800" variant="outlined" @click="router.push('/profile')">Profile</v-btn>
          <v-btn v-if="!isEmployer && !isAdmin" class="ml-1" color="green-800" variant="outlined" @click="router.push('/register-company')">Register Company</v-btn>
          <v-btn class="ml-1" color="red-800" variant="outlined" @click="logout">Logout</v-btn>
          <v-btn v-if="isAdmin" class="ml-1" color="green-800" variant="outlined" @click="router.push('/admin')">Admin</v-btn>
        </div>
      </template>
      <v-app-bar-title @click="router.push('/')"> Larudakoté </v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()
await userStore.loadContextUser()
const isConnected = computed(() => userStore.isConnected)
const isAdmin = computed(() => userStore.isAdmin)
const isEmployer = computed(() => userStore.isEmployer)

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
