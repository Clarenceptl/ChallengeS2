<template>
  <div class="pa-5">
    <v-table class="bg-green-200" v-if="appointments.length">
    <thead>
      <tr>
        <th class="text-left">
          Firstname
        </th>
        <th class="text-left">
          Lastname
        </th>
        <th class="text-left">
          Job title
        </th>
        <th class="text-left">
          Appointment date
        </th>
        <th class="text-left">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="appointment in appointments"
        :key="appointment.id"
      >
        <td>
          {{ appointment.candidate.firstname }}
        </td>
        <td>
          {{ appointment.candidate.lastname }}
        </td>
        <td>
          {{ appointment.job.title }}
        </td>
        <td>
          {{ formatDate(appointment.time) }}
        </td>
        <td>
          <v-icon v-if="appointment.accepted === true" color="green">mdi-check</v-icon>
          <v-icon v-else-if="appointment.accepted === false" color="red">mdi-close</v-icon>
          <v-icon v-else color="orange">mdi-clock</v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-card v-else>
    <v-card-title>
      <h1 class="text-center">No appointments yet</h1>
    </v-card-title>
  </v-card>
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