<template>
  <div class="pa-5">
    <v-table class="bg-green-200" v-if="jobAd.candidates.length">
      <thead>
        <tr>
          <th class="text-left">Firstname</th>
          <th class="text-left">Lastname</th>
          <th class="text-left">Email</th>
          <th class="text-left">Birthdate</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="candidate in jobAd.candidates"
          :key="candidate.id"
        >
          <td>
            {{ candidate.firstname }}
          </td>
          <td>
            {{ candidate.lastname }}
          </td>
          <td>
            {{ candidate.email }}
          </td>
          <td>
            {{ candidate.birthdate }}
          </td>
          <td>
            <v-btn color="blue-500" @click="appointmentDialog = true; selectedId = candidate.id">Set appointment</v-btn>
            <v-btn color="red-500 ml-2" @click="appointmentDialog = true">Decline</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-card class="bg-green-200" v-else>
      <v-card-title>
        <h2>No candidates yet</h2>
      </v-card-title>
    </v-card>
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
              v-model="date"
              format="yyyy-MM-dd"
            />
            <label>Time</label>
            <v-text-field
              type="time"
              v-model="time"
              format="24hr"
              
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="reinitilize">Cancel</v-btn>
          <v-btn color="blue-800" text @click="createAppointment">Yes</v-btn>
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
          <v-btn
            color="red-500"
            text
            @click="reinitilize"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useJobAdsStore } from '../../stores/job-ads.store';
import { useAppointmentsStore } from "../../stores/appointments.store";
import { useUsersStore } from "../../stores/users.store";
import { useToastStore } from '@/stores'
import { storeToRefs } from "pinia";

const stores = {
  toast: useToastStore()
}
const route = useRoute();
const router = useRouter();
const { jobAd } = storeToRefs(useJobAdsStore());
const { me } = storeToRefs(useUsersStore());
await useJobAdsStore().getJobAd(route.params.id);
await useUsersStore().getMe();

let appointmentDialog = ref(false);
let deleteDialog = ref(false);
let time = ref('');
let date = ref('');

const formattedDatetime = computed(() => {
  return `${date.value}T${time.value}:00Z`;
});

const reinitilize = () => {
  appointmentDialog.value = false;
  deleteDialog.value = false;
  time.value = '';
  date.value = '';
  selectedId.value = null;
};

let selectedId = ref(null);

const createAppointment = () => {
  if (!date.value || !time.value) {
    stores.toast.createToast({
      type: 'error',
      message: 'Please select a date and a time',
    });
    return;
  }
  if (new Date(formattedDatetime.value) <= new Date()) {
    stores.toast.createToast({
      type: 'error',
      message: 'Please select a date in the future',
    });
    return;
  }
  useAppointmentsStore().createAppointment({
    candidateId: selectedId.value,
    jobAdId: jobAd.value.id.toString(),
    time: formattedDatetime.value,
  }).then(() => {
    appointmentDialog.value = false;
    stores.toast.createToast({
      type: 'success',
      message: 'Appointment created',
    });
    router.push('/appointment-list');
  }).catch((error) => {
    console.log(error);
    stores.toast.createToast({
      type: 'error',
      message: 'Something went wrong',
    });
  });
};
</script>

<style scoped></style>
