<template>
  <div>
    <h1 class="text-center my-10">Users List</h1>
    <v-row class="pa-5">
      <v-col cols="12" class="text-center">
        <div class="d-flex justify-center mb-2">
          <div class="container">
            <v-btn color="grey lighten-4" :to="{ name: 'Admin' }">Back to dashboard</v-btn>
            <h3 class="my-10 text-center">The current page displays the user list, providing options to delete or modify users.</h3>
            <v-card class="mx-auto">
              <v-toolbar color="appgrey">
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="py-4 px-4">Firstname</th>
                      <th class=" px-4">Lastname</th>
                      <th class=" px-4">Email</th>
                      <th class=" px-4">Birthdate</th>
                      <th class=" px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td class="py-4 px-4">{{ user.firstname }}</td>
                      <td class="px-4">{{ user.lastname }}</td>
                      <td class="px-4">{{ user.email }}</td>
                      <td class="px-4">{{ user.birthdate }}</td>
                      <td><v-icon color="blue" @click="showDialog = true; selectedUser = user">mdi-pencil</v-icon></td>
                      <td><v-icon color="red">mdi-delete</v-icon></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
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
        <v-text-field clearable v-model="selectedUser.firstname" type="text" color="appgrey" variant="outlined"
          required />
        <v-text-field clearable v-model="selectedUser.lastname" type="text" color="appgrey" variant="outlined" required />
        <v-text-field clearable v-model="selectedUser.birthdate" type="date" color="appgrey" variant="outlined"
          required />
      </v-card-text>
      <v-card-actions>
        <v-btn color="red-500" text @click="showDialog = false; selectedUser = null">Cancel</v-btn>
        <v-btn color="blue-800" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
