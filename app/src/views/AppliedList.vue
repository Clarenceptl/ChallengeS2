<template>
  <div class="pa-5">
    <v-card v-if="me.candidatures.length">
      <v-table class="bg-green-200">
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">City</th>
            <th class="text-left">Country</th>
            <th class="text-left">Salary</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(candidature, index) in me.candidatures"
            :key="index"
          >
            <td>{{ candidature.title }}</td>
            <td>{{ candidature.city }}</td>
            <td>{{ candidature.country }}</td>
            <td>{{ candidature.salary }}</td>
            <td>
              <v-btn color="blue-500">Details</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <h2>You have no applied jobs</h2>
      </v-card-title>
    </v-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useUsersStore } from '../stores/users.store'
import { useToastStore } from '@/stores'

const stores = {
  toast: useToastStore()
}
const { me } = storeToRefs(useUsersStore())
await useUsersStore().getMe()
</script>

<style scoped></style>
