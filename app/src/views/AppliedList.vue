<template>
  <div class="pa-5">
    <v-card v-if="me?.candidatures?.length">
      <v-table class="bg-green-200">
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">City</th>
            <th class="text-left">Country</th>
            <th class="text-left">Salary</th>
            <th class="text-left">MCQ</th>
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
              <v-btn color="blue-500" @click="router.push(`applied-list/${candidature.id}/test`)">Take the test</v-btn>
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
