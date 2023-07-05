<template>
  <div class="pa-5">
    <v-table class="bg-green-200" v-if="appointments.length">
      <thead>
        <tr>
          <th class="text-left">Job Title</th>
          <th class="text-left">Contract</th>
          <th class="text-left">Salary</th>
          <th class="text-left">Appointment</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="index">
          <td>
            {{ appointment.job.title }}
          </td>
          <td>
            {{ appointment.job.contractType }}
          </td>
          <td>
            {{ appointment.job.salary }}
          </td>
          <td>12/21/2023</td>
          <td>
            <v-icon color="green" v-if="appointment.accepted === true">mdi-check</v-icon>
            <v-icon color="red" v-else-if="appointment.accepted === false">mdi-close</v-icon>
            <v-icon color="orange" v-else>mdi-clock</v-icon>
          </td>
          <td>
            <v-btn
              color="blue-500"
              @click="
                acceptDialog = true;
                selectedAppointmentId = appointment.id
              "
              :disabled="appointment.accepted !== null"
              >Accept</v-btn
            >
            <v-btn
              color="red-500 ml-2"
              @click="
                declineDialog = true;
                selectedAppointmentId = appointment.id
              "
              :disabled="appointment.accepted !== null"
              >Decline</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-card v-else class="pa-5 bg-green-300" variant="outlined">
      <v-card-title>
        <h2>No appointments</h2>
      </v-card-title>
      <v-card-subtitle> You don't have any appointments yet </v-card-subtitle>
    </v-card>
    <v-dialog v-model="acceptDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Accept this appointment</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to accept this appointment ? </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="acceptDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="respondToAppointment(true)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="declineDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Decline this appointment</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to decline this appointment ? </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="declineDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="respondToAppointment(false)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppointmentsStore } from '../stores/appointments.store'
import { useToastStore } from '@/stores'
import { storeToRefs } from 'pinia'

let selectedAppointmentId = ref(null)

const stores = {
  toast: useToastStore()
}
const { appointments } = storeToRefs(useAppointmentsStore())
await useAppointmentsStore().getAppointments()
const acceptDialog = ref(false)
const declineDialog = ref(false)

const respondToAppointment = async (accepted) => {
  try {
    useAppointmentsStore()
      .acceptAppointment(selectedAppointmentId.value, accepted)
      .then(async () => {
        acceptDialog.value = false
        await useAppointmentsStore().getAppointments()
        stores.toast.createToast({
          type: 'success',
          message: 'Appointment responded to successfully'
        })
      })
      .catch(() => {
        stores.toast.createToast({
          type: 'error',
          message: 'Error responding to appointment'
        })
      })
  } catch (error) {
    stores.toast.createToast({
      type: 'error',
      message: 'Error responding to appointment'
    })
  }
}
</script>
