<template>
  <div class="pa-5">
    <v-table class="bg-green-200">
      <thead>
        <tr>
          <th class="text-left">Firstname</th>
          <th class="text-left">Lastname</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500" @click="appointmentDialog = true">Set appointment</v-btn>
            <v-btn color="red-500 ml-2" @click="appointmentDialog = true">Decline</v-btn>
          </td>
        </tr>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500">Set appointment</v-btn>
            <v-btn color="red-500 ml-2">Decline</v-btn>
          </td>
        </tr>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500">Set appointment</v-btn>
            <v-btn color="red-500 ml-2">Decline</v-btn>
          </td>
        </tr>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500">Set appointment</v-btn>
            <v-btn color="red-500 ml-2">Decline</v-btn>
          </td>
        </tr>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500">Set appointment</v-btn>
            <v-btn color="red-500 ml-2">Decline</v-btn>
          </td>
        </tr>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Phone</td>
          <td>
            <v-btn color="blue-500">Set appointment</v-btn>
            <v-btn color="red-500 ml-2">Decline</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog v-model="appointmentDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Set an appointment</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to set an appointment with this candidate ?
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Date</label>
            <v-text-field
              type="date"
            />
            <label>Time</label>
            <v-text-field
              type="time"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="appointmentDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete this job</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to delete this job ?
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

let appointmentDialog = ref(false);
let deleteDialog = ref(false);
</script>

<style scoped></style>
