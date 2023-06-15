<template>
  <div>
    <v-app-bar :elevation="0" color="green-100">
      <template v-slot:append>
        <v-btn variant="outlined" color="green-800" @click="router.push('/login')">Login</v-btn>
        <v-btn class="ml-1" variant="outlined" @click="router.push('/register')">Register</v-btn>
        <v-btn class="ml-1" color="red-800" variant="outlined" @click="logout"
          >Logout</v-btn
        >
      </template>
      <v-app-bar-title @click="router.push('/')"> Larudakoté </v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { clearTokens } from '@/helpers'

const router = useRouter()

const logout = () => {
  clearTokens()
  router.push('/login')
}
</script>
