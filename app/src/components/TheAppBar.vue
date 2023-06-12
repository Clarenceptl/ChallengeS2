<template>
  <div>
    <v-app-bar :elevation="3" color="white-100" >
      <template v-slot:append>
        <v-btn variant="text" color="green-800" @click="router.push('/login')">Login</v-btn>
        <v-btn class="ml-1" variant="text" @click="router.push('/register')">Register</v-btn>
      </template>
      <v-app-bar-title @click="router.push('/')"> Larudakoté </v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
