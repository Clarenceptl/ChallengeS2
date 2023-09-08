<template>
  <div>
    <v-navigation-drawer v-model="drawerOpen" app right temporary>
      <div class="pa-4" v-if="!isConnected">
        <v-btn variant="outlined" color="green-800" @click="router.push('/login')">Login</v-btn>
        <v-btn class="ml-1" variant="outlined" @click="router.push('/register')">Register</v-btn>
      </div>
      <div class="pa-4 d-flex flex-column" v-else>
        <v-btn
          v-if="isUser"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/appointment-list')"
          >Appointments</v-btn
        >
        <v-btn
          v-if="isEmployer"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/employer/appointments')"
          >Appointments</v-btn
        >
        <v-btn
          v-if="isUser"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/applied-list')"
          >Applied list</v-btn
        >
        <v-btn
          v-if="!isEmployer"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/job-offers')"
          >Job Offers</v-btn
        >
        <v-btn
          v-if="isEmployer"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/employer/jobs')"
          >My Jobs</v-btn
        >
        <v-btn
          v-if="isUser"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/register-company')"
          >Register Company</v-btn
        >
        <v-btn
          v-if="isAdmin"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/admin')"
          >Admin</v-btn
        >
        <v-btn
          v-if="!isAdmin"
          class="mt-2"
          color="green-800"
          variant="outlined"
          @click="router.push('/profile')"
          >Profile</v-btn
        >
        <v-btn class="mt-2" color="red-800" variant="outlined" @click="logout">Logout</v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar :elevation="0" color="green-100">
      <template v-slot:prepend v-if="isMobile">
        <v-app-bar-nav-icon v-if="isMobile" @click="toggleDrawer" />
      </template>
      <template v-slot:append v-else>
        <div v-if="!isConnected">
          <v-btn variant="outlined" color="green-800" @click="router.push('/login')">Login</v-btn>
          <v-btn class="ml-1" variant="outlined" @click="router.push('/register')">Register</v-btn>
        </div>
        <div v-else>
          <v-btn
            v-if="isUser"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/appointment-list')"
            >Appointments</v-btn
          >
          <v-btn
            v-if="isEmployer"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/employer/appointments')"
            >Appointments</v-btn
          >
          <v-btn
            v-if="isUser"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/applied-list')"
            >Applied list</v-btn
          >
          <v-btn
            v-if="!isEmployer"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/job-offers')"
            >Job Offers</v-btn
          >
          <v-btn
            v-if="isEmployer"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/employer/jobs')"
            >My Jobs</v-btn
          >
          <v-btn
            v-if="isUser"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/register-company')"
            >Register Company</v-btn
          >
          <v-btn
            v-if="isAdmin"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/admin')"
            >Admin</v-btn
          >
          <v-btn
            v-if="!isAdmin"
            class="ml-1"
            color="green-800"
            variant="outlined"
            @click="router.push('/profile')"
            >Profile</v-btn
          >
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
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
// TODO : voir si je peux fix le soucis refresh
const windowWidth = ref(window.innerWidth)
const drawerOpen = ref(false) // Adjust the breakpoint as needed
const mobileView = ref(false)

const userStore = storeToRefs(useUsersStore())
const isConnected = userStore.isConnected
const isAdmin = userStore.isAdmin
const isUser = userStore.isUser
const isEmployer = userStore.isEmployer

const router = useRouter()

const isMobile = computed(() => windowWidth.value < 1024)

const logout = () => {
  useUsersStore().logout()
  router.push('/login')
}

const handleResize = () => {
  drawerOpen.value = false // Close the drawer on resize
  windowWidth.value = window.innerWidth
}

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
// watch if window innerWidth is less than 768px, if true set mobileView to true else false
watch(
  () => window.innerWidth,
  (width) => {
    if (width < 768) {
      mobileView.value = true
    } else {
      mobileView.value = false
    }
  }
)
</script>
