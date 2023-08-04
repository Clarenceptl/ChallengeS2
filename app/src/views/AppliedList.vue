<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your applications list</h1>
    <div class="d-flex justify-center mb-2">
      <v-card class="mx-auto" v-if="me?.candidatesJobAds?.length > 0">
        <v-toolbar color="appgrey">
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="px-4">Title</th>
                <th class="px-4">City</th>
                <th class="px-4">Country</th>
                <th class="px-4">Salary</th>
                <th class="px-4 text-center">Quiz</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(candidature, index) in me.candidatesJobAds" :key="index">
                <td class="px-4">{{ candidature.jobAds.title }}</td>
                <td class="px-4">{{ candidature.jobAds.city }}</td>
                <td class="px-4">{{ candidature.jobAds.country }}</td>
                <td class="px-4">{{ candidature.jobAds.salary }}</td>
                <td class="px-4 py-4">
                  <v-btn
                    v-if="candidature.jobAds.quizId"
                    color="blue-500"
                    @click="openDialogQuiz(candidature)"
                    >Take the test</v-btn
                  >
                  <p v-else>No quiz</p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-card>
      <v-card v-else class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>You have no applied jobs</h2>
        </v-card-title>
        <v-card-subtitle class="text-center"> You didn't apply to any jobs yet </v-card-subtitle>
      </v-card>
    </div>
    <v-dialog v-model="warningDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Take this test</h2>
        </v-card-title>
        <v-card-subtitle> Once you accept this test, the timer will start ! </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="warningDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="startQuiz">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUsersStore } from '../stores/users.store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

await useUsersStore().getSelfUser()
const { me } = storeToRefs(useUsersStore())
const router = useRouter()

let warningDialog = ref(false)
let selectedCandidature = ref(null)

const startQuiz = () => {
  router.push(`applied-list/${selectedCandidature.value.id}/test`)
  warningDialog.value = false
}

const openDialogQuiz = (candidature) => {
  warningDialog.value = true
  selectedCandidature.value = candidature
}
</script>

<style scoped></style>
