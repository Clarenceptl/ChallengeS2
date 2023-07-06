<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your applications list</h1>
    <div class="d-flex justify-center mb-2">
        <v-card class="mx-auto" v-if="me?.candidatures?.length">
          <v-toolbar color="appgrey">
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="px-4">Title</th>
                  <th class="px-4">City</th>
                  <th class="px-4">Country</th>
                  <th class="px-4">Salary</th>
                  <th class="px-4">MCQ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(candidature, index) in me.candidatures"
                  :key="index"
                >
                  <td class="px-4">{{ candidature.title }}</td>
                  <td class="px-4">{{ candidature.city }}</td>
                  <td class="px-4">{{ candidature.country }}</td>
                  <td class="px-4">{{ candidature.salary }}</td>
                  <td class="px-4 py-4">
                    <v-btn color="blue-500" @click="router.push(`applied-list/${candidature.id}/test`)">Take the test</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-card v-else class="pa-5 bg-green-300" variant="outlined">
          <v-card-title>
            <h2>You have no applied jobs</h2>
          </v-card-title>
          <v-card-subtitle> You didn't apply to any jobs yet </v-card-subtitle>
        </v-card>
      </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const me = computed(() => userStore.getContextUser)
onMounted(() => {
  userStore.loadContextUser()
})
</script>

<style scoped></style>
