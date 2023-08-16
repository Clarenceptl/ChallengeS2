<template>
  <div>
    <h1 class="text-center my-6">Users List</h1>
    <v-row class="pa-5">
      <v-col cols="12" class="text-center">
        <div class="d-flex justify-center mb-2">
          <div class="container">
            <v-btn color="appgrey" :to="{ name: 'Admin' }">Back to dashboard</v-btn>
            <h3 class="my-10 text-center">
              The current page displays the user list, providing options to delete or modify users.
            </h3>
            <v-card class="mx-auto">
              <v-toolbar color="appgrey">
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="px-4">Firstname</th>
                      <th class="px-4">Lastname</th>
                      <th class="px-4">Email</th>
                      <th class="px-4">Birthdate</th>
                      <th class="px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td class="py-4 px-4">{{ user.firstname }}</td>
                      <td class="px-4">{{ user.lastname }}</td>
                      <td class="px-4">{{ user.email }}</td>
                      <td class="px-4">{{ user.birthdate }}</td>
                      <td>
                        <v-icon color="blue" @click="handleDialog(true, user)">mdi-pencil</v-icon>
                      </td>
                      <td v-if="user.id !== me.id">
                        <v-icon color="red" @click="handleDialog(true, user, true)"
                          >mdi-delete</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-if="selectedUser" v-model="showDialog" max-width="600">
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
          <v-btn text variant="tonal" @click="handleDialog()">Cancel</v-btn>
          <v-btn color="green-800" variant="tonal" text @click="updateUser()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="selectedUser" v-model="showDeleteDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete user {{ selectedUser.firstname }} {{ selectedUser.lastname }} ?</h2>
        </v-card-title>
        <v-card-actions>
          <v-btn variant="tonal" text @click="handleDialog(false, null, true)">Cancel</v-btn>
          <v-btn variant="tonal" color="red" text @click="deleteUser()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore, useToastStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatDateToInput, formatDateToApi } from '@/helpers'
import { UsersService } from '@/services'

const userStore = useUsersStore()
const toastStore = useToastStore()

await userStore.getUsers()
const { users, me } = storeToRefs(useUsersStore())

let selectedUser = ref(null)
const showDialog = ref(false)
const showDeleteDialog = ref(false)

const handleDialog = (show = false, user = null, deleting = false) => {
  deleting ? (showDeleteDialog.value = show) : (showDialog.value = show)
  selectedUser.value = user ? { ...user, birthdate: '' } : null
  if (!user) return
  selectedUser.value.birthdate = formatDateToInput(user.birthdate)
}

const updateUser = async () => {
  const res = await userStore.updateUser(selectedUser.value.id, {
    ...selectedUser.value,
    birthdate: formatDateToApi(selectedUser.value.birthdate)
  })
  if (res.success) {
    showDialog.value = false
    selectedUser.value = null
    toastStore.createToast({ message: 'User updated successfully', type: 'success' })
    return await userStore.getUsers()
  }
  toastStore.createToast({ message: 'An error occured', type: 'error' })
}

const deleteUser = async () => {
  const res = await UsersService.deleteUser(selectedUser.value.id)
  if (res.success) {
    showDialog.value = false
    selectedUser.value = null
    toastStore.createToast({ message: 'Delete user successfully', type: 'success' })
    return await userStore.getUsers()
  }
  toastStore.createToast({ message: 'An error occured', type: 'error' })
}
</script>

<style scoped>
.scrollable {
  height: 100vh;
  overflow-y: auto;
}
</style>
