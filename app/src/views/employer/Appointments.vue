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
                  <!-- button for new appointment if accepted false -->
                  <v-btn
                    v-if="appointment.accepted === false"
                    color="blue-500 ml-4"
                    @click="changeAppointmentDialog = true; appointmentId = appointment.id"
                    >Change appointment</v-btn>
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
    <v-dialog v-model="changeAppointmentDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Set an new appointment</h2>
        </v-card-title>
        <v-card-subtitle>
          This candidate was not available at the time you set. Please choose a
          new date and time.
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Date</label>
            <v-text-field type="date" v-model="date" format="yyyy-MM-dd" />
            <label>Time</label>
            <v-text-field type="time" v-model="time" format="24hr" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="changeAppointmentDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="newAppointment">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAppointmentsStore } from "../../stores/appointments.store";
import { storeToRefs } from "pinia";
import { useToastStore } from '@/stores'
const stores = {
  toast: useToastStore()
}

let changeAppointmentDialog = ref(false);
let appointmentId = ref(null);
const appointmentsStore = useAppointmentsStore();
await appointmentsStore.getAppointments();
const { appointments } = storeToRefs(appointmentsStore);

const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const formattedDatetime = computed(() => {
  return `${date.value}T${time.value}:00Z`
})

let time = ref('')
let date = ref('')

const newAppointment = async (accepted) => {
  if (!date.value || !time.value) {
    stores.toast.createToast({
      type: 'error',
      message: 'Please select a date and a time'
    })
    return
  }
  if (new Date(formattedDatetime.value) <= new Date()) {
    stores.toast.createToast({
      type: 'error',
      message: 'Please select a date in the future'
    })
    return
  }
  try {
    useAppointmentsStore()
      .acceptAppointment(appointmentId.value, {
        time: formattedDatetime.value,
        accepted: null
      })
      .then(async () => {
        changeAppointmentDialog.value = false
        await useAppointmentsStore().getAppointments()
        stores.toast.createToast({
          type: 'success',
          message: 'Appointment responded to successfully'
        })
        time.value = ''
        date.value = ''
      })
      .catch(() => {
        stores.toast.createToast({
          type: 'error',
          message: 'Error responding to appointment'
        })
        time.value = ''
        date.value = ''
        changeAppointmentDialog.value = false
      })
  } catch (error) {
    stores.toast.createToast({
      type: 'error',
      message: 'Error responding to appointment'
    })
  }
}
</script>

<style scoped>
.centered {
  text-align: center !important;
}
</style>