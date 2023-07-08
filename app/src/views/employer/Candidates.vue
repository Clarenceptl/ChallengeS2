<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your candidates list</h1>
    <div class="text-center">
      Buttons are disabled if the candidate already has an appointment,
      or if the candidate has not taken the test yet.
    </div>
    <div class="d-flex justify-center mb-2">
      <v-card class="mx-auto" v-if="jobAd?.candidates?.length">
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
                <th class="px-4">Email</th>
                <th class="px-4">Birthdate</th>
                <th class="px-4">Score</th>
                <th class="px-4">Attempts</th>
                <th class="px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="candidate in jobAd.candidates"
                :key="candidate.id"
                class="mb-4"
              >
                <td class="px-4">{{ candidate.firstname }}</td>
                <td class="px-4">{{ candidate.lastname }}</td>
                <td class="px-4">{{ candidate.email }}</td>
                <td class="px-4">{{ candidate.birthdate }}</td>
                <td class="px-4 text-center">{{ getQuizScore(candidate.id) }}</td>
                <td class="px-4 text-center">{{ getQuizTentative(candidate.id) }}</td>
                <td class="px-4 py-4">
                  <v-btn :disabled="getQuizScore(candidate.id) === 'Not taken' || isCandidateInAppointments(candidate.id)" color="blue-500" @click="appointmentDialog = true; selectedId = candidate.id">Set appointment</v-btn>
                  <v-btn :disabled="getQuizScore(candidate.id) === 'Not taken' || isCandidateInAppointments(candidate.id)" color="red-500 ml-2" @click="appointmentDialog = true">Decline</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-card>
      <v-card v-else class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>No candidates</h2>
        </v-card-title>
        <v-card-subtitle> No candidates has applied to this job yet </v-card-subtitle>
      </v-card>
    </div>
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
import { useQuizStore } from "../../stores/quiz.store";
import { useToastStore } from '@/stores'
import { storeToRefs } from "pinia";

const stores = {
  toast: useToastStore()
}
const route = useRoute();
const router = useRouter();
const { jobAd } = storeToRefs(useJobAdsStore());
const { appointments } = storeToRefs(useAppointmentsStore());
const { quiz } = storeToRefs(useQuizStore());
await useJobAdsStore().getJobAd(route.params.id);
await useQuizStore().getQuizByJobId(route.params.id);
await useAppointmentsStore().getAppointments();

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
    router.push('/employer/appointments');
  }).catch((error) => {
    console.log(error);
    stores.toast.createToast({
      type: 'error',
      message: 'Something went wrong',
    });
  });
};

// computed that returns appointments for this job
const jobAppointments = computed(() => {
  return appointments.value.filter((appointment) => {
    return appointment.job.id === jobAd.value.id;
  });
});

// method that returns the quiz score for a candidate, find response by candidate id
const getQuizScore = (candidateId) => {
  const response = quiz.value.reponses.find((response) => {
    return response.userId === candidateId;
  });
  return response ? response.score : 'Not taken';
};

// method that returns the quiz tentative for a candidate, find response by candidate id
const getQuizTentative = (candidateId) => {
  const response = quiz.value.reponses.find((response) => {
    return response.userId === candidateId;
  });
  return response ? response.tentative : 'Not taken';
};

// method that check if candidate id is in job appointments candidate id
const isCandidateInAppointments = (candidateId) => {
  return jobAppointments.value.some((appointment) => {
    return appointment.candidate.id === candidateId;
  });
};
</script>

<style scoped></style>
