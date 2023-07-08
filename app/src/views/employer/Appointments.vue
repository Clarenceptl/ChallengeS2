<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your candidates list</h1>
    <div class="d-flex justify-center mb-2">
      <v-card class="mx-auto" v-if="appointments.length">
        <v-toolbar color="appgrey">
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="px-4">Firstname</th>
                <th class="px-4">Lastname</th>
                <th class="px-4">Job title</th>
                <th class="px-4">Appointment date</th>
                <th class="px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="appointment in appointments"
                :key="appointment.id"
                class="mb-4"
              >
                <td class="px-4">{{ appointment.candidate.firstname }}</td>
                <td class="px-4">{{ appointment.candidate.lastname }}</td>
                <td class="px-4">{{ appointment.job.title }}</td>
                <td class="px-4">{{ formatDate(appointment.time) }}</td>
                <td class="text-center px-4 py-4">
                  <v-icon v-if="appointment.accepted === true" color="green">mdi-check</v-icon>
                  <v-icon v-else-if="appointment.accepted === false" color="red">mdi-close</v-icon>
                  <v-icon v-else color="orange">mdi-clock</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-card>
      <v-card v-else class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>No appointments</h2>
        </v-card-title>
        <v-card-subtitle> You don't have any appointments yet </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useAppointmentsStore } from "../../stores/appointments.store";
import { storeToRefs } from "pinia";

const appointmentsStore = useAppointmentsStore();
const { appointments } = storeToRefs(appointmentsStore);
await appointmentsStore.getAppointments();

const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
</script>

<style scoped>
.centered {
  text-align: center !important;
}
</style>