<template>
  <div class="pa-5">
    <v-table class="bg-green-200">
    <thead>
      <tr>
        <th class="text-left">
          Job Title
        </th>
        <th class="text-left">
          Contract
        </th>
        <th class="text-left">
          Salary
        </th>
        <th class="text-left">
          Appointment
        </th>
        <th class="text-left">
          Status
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500" @="acceptDialog = true">Accept</v-btn>
          <v-btn color="red-500 ml-2" @click="declineDialog = true">Decline</v-btn>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500">Accept</v-btn>
          <v-btn color="red-500 ml-2">Decline</v-btn>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500">Accept</v-btn>
          <v-btn color="red-500 ml-2">Decline</v-btn>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500">Accept</v-btn>
          <v-btn color="red-500 ml-2">Decline</v-btn>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500">Accept</v-btn>
          <v-btn color="red-500 ml-2">Decline</v-btn>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>Développeur</td>
        <td>CDI</td>
        <td>45K</td>
        <td>12/21/2023</td>
        <td>Pending</td>
        <td>
          <v-btn color="blue-500">Accept</v-btn>
          <v-btn color="red-500 ml-2">Decline</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog v-model="acceptDialog" max-width="600">
    <v-card class="pa-5 bg-green-300" variant="outlined">
      <v-card-title>
        <h2>Accept this appointment</h2>
      </v-card-title>
      <v-card-subtitle>
        Are you sure you want to accept this appointment ?
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="red-500" text @click="acceptDialog = false">Cancel</v-btn>
        <v-btn color="blue-800" text>Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="declineDialog" max-width="600">
    <v-card class="pa-5 bg-green-300" variant="outlined">
      <v-card-title>
        <h2>Decline this appointment</h2>
      </v-card-title>
      <v-card-subtitle>
        Are you sure you want to decline this appointment ?
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="red-500" text @click="declineDialog = false">Cancel</v-btn>
        <v-btn color="blue-800" text>Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const acceptDialog = ref(false)
const declineDialog = ref(false)

</script>