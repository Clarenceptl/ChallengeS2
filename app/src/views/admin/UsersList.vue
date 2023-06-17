<template>
  <div>
    <h1 class="text-center mb-4">Users List</h1>
    <div class="scrollable">
      <v-row class="pa-5">
        <v-col cols="6" class="text-center" v-for="user in users" :key="user.id">
          <div class="d-flex justify-center mb-2">
            <v-card class="w-100 pa-2 bg-yellow-100" variant="outlined" elevation="4">
              <v-card-title>
                <h2>{{ user.firstname }} {{ user.lastname }}</h2>
              </v-card-title>
              <v-card-subtitle>
                <h3>{{ user.email }}</h3>
              </v-card-subtitle>
              <v-card-text>
                <h4>{{ user.birthdate }}</h4>
              </v-card-text>
              <div>
                <v-btn class="w-25" color="blue-500" @click="showDialog = true; selectedUser = user">Edit</v-btn>
                <v-btn class="w-25 ml-2" color="red-500">Delete</v-btn>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Edit user {{ selectedUser.firstname }} {{ selectedUser.lastname }}</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            clearable
            v-model="selectedUser.firstname"
            type="text"
            color="appgrey"
            variant="outlined"
            required
          />
          <v-text-field
            clearable
            v-model="selectedUser.lastname"
            type="text"
            color="appgrey"
            variant="outlined"
            required
          />
          <v-text-field
            clearable
            v-model="selectedUser.birthdate"
            type="date"
            color="appgrey"
            variant="outlined"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="showDialog = false; selectedUser = null">Cancel</v-btn>
          <v-btn color="blue-800" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let selectedUser = ref({});
let showDialog = ref(false);

const users = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'John@doe.com',
    birthdate: '1990-01-01'
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@doe.com',
    birthdate: '1990-01-01'
  },
  {
    id: 3,
    firstname: 'John',
    lastname: 'Smith',
    email: 'j@s.fr',
    birthdate: '1990-01-01'
  },
  {
    id: 4,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jj@s.fr',
    birthdate: '1990-01-01'
  }
]
</script>

<style scoped>
.scrollable {
  height: 100vh;
  overflow-y: auto;
}
</style>
