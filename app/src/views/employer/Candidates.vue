<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your candidates list</h1>
    <v-container class="h-100" v-if="jobAd?.candidatesJobAds?.length">
      <v-row>
        <v-col class="bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.INIT }}</h2>
          <draggable
            :id="statusFrontEmployeur.INIT"
            @end="updateStatus"
            group="test"
            v-model="newCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                  <v-btn class="bg-green" @click="openDialog(element.candidate.id)"
                    >Set appointment</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col class="ml-2 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.PENDING }}</h2>
          <draggable
            :id="statusFrontEmployeur.PENDING"
            @end="updateStatus"
            group="test"
            v-model="pendingCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col class="ml-2 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.ACCEPTED }}</h2>
          <draggable
            :id="statusFrontEmployeur.ACCEPTED"
            @end="updateStatus"
            group="test"
            v-model="acceptedCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col class="ml-2 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.REJECTED }}</h2>
          <draggable
            :id="statusFrontEmployeur.REJECTED"
            @end="updateStatus"
            group="test"
            v-model="rejectedCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="d-flex justify-center mb-2">
      <v-card class="pa-5 bg-green-300" variant="outlined">
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
            <v-text-field type="date" v-model="date" format="yyyy-MM-dd" />
            <label>Time</label>
            <v-text-field type="time" v-model="time" format="24hr" />
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
        <v-card-subtitle> Are you sure you want to delete this job ? </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="reinitilize"> Cancel </v-btn>
          <v-btn color="blue-800" text> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="infoDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Details</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <label>Firstname</label>
            <v-text-field disabled type="text" v-model="selectedUserInfo.firstname" />
            <label>Lastname</label>
            <v-text-field disabled type="text" v-model="selectedUserInfo.lastname" />
            <label>Email</label>
            <v-text-field disabled type="email" v-model="selectedUserInfo.email" />
            <label>Birthdate</label>
            <v-text-field disabled type="date" v-model="selectedUserInfo.birthdate" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue-800" text @click="infoDialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobAdsStore } from '../../stores/job-ads.store'
import { useAppointmentsStore } from '../../stores/appointments.store'
import { useQuizStore } from '../../stores/quiz.store'
import { useToastStore } from '@/stores'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { JobAdsService } from '@/services'
import { statusFrontEmployeur } from '@/enums'
import { getKeyByValue } from '@/helpers'

//#region Stores / Router
const stores = {
  toast: useToastStore()
}
const route = useRoute()
const router = useRouter()

const { jobAd } = storeToRefs(useJobAdsStore())
const { appointments } = storeToRefs(useAppointmentsStore())
const { quiz } = storeToRefs(useQuizStore())
//#endregion

//#region props
const newCandidates = ref([])
const pendingCandidates = ref([])
const acceptedCandidates = ref([])
const rejectedCandidates = ref([])

const appointmentDialog = ref(false)
const deleteDialog = ref(false)
const infoDialog = ref(false)
const time = ref('')
const date = ref('')
const selectedUserInfo = ref(null)
const selectedId = ref(null)
//#endregion

//#region Methods
const setCandidatesByStatus = (status) => {
  const statusKey = getKeyByValue(statusFrontEmployeur, status)
  return jobAd.value.candidatesJobAds.filter((candidate) => candidate.status === statusKey)
}

const reinitilize = () => {
  appointmentDialog.value = false
  deleteDialog.value = false
  time.value = ''
  date.value = ''
  selectedId.value = null
  selectedUserInfo.value = null
  infoDialog.value = false
}

const createAppointment = () => {
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
  useAppointmentsStore()
    .createAppointment({
      candidateId: selectedId.value,
      jobAdId: jobAd.value.id.toString(),
      time: formattedDatetime.value
    })
    .then(() => {
      appointmentDialog.value = false
      stores.toast.createToast({
        type: 'success',
        message: 'Appointment created'
      })
      router.push('/employer/appointments')
    })
    .catch((error) => {
      console.log(error)
      stores.toast.createToast({
        type: 'error',
        message: 'Something went wrong'
      })
    })
}

const openDialog = (id) => {
  appointmentDialog.value = true
  selectedId.value = id
}

const openInfoDialog = (candidate) => {
  infoDialog.value = true
  selectedUserInfo.value = candidate
}

const updateStatus = async (val) => {
  await JobAdsService.updateStatusCandidate(
    val.item.__draggable_context.element.id,
    getKeyByValue(statusFrontEmployeur, val.to.id)
  )
}
//#endregion

//#region computed
const formattedDatetime = computed(() => {
  return `${date.value}T${time.value}:00Z`
})
// computed that returns appointments for this job
const jobAppointments = computed(() => {
  return appointments.value.filter((appointment) => {
    return appointment.job.id === jobAd.value.id
  })
})

// method that returns the quiz score for a candidate, find response by candidate id
const getQuizScore = (candidateId) => {
  const response = quiz.value?.reponses?.find((response) => {
    return response.userId === candidateId
  })
  return response ? `${response.score}/${quiz.value.questions.length}` : 'Not taken'
}

// method that returns the quiz tentative for a candidate, find response by candidate id
const getQuizTentative = (candidateId) => {
  const response = quiz.value?.reponses?.find((response) => {
    return response.userId === candidateId
  })
  return response ? response.tentative : 'Not taken'
}

// method that check if candidate id is in job appointments candidate id
const isCandidateInAppointments = (candidateId) => {
  return jobAppointments.value.some((appointment) => {
    return appointment.candidate.id === candidateId
  })
}

// computed that return user based on selected user info id
// const selectedUser = computed(() => {
//   return jobAd.value?.candidates?.find((userInfo) => {
//     return userInfo.id === selectedUserInfoId.value
//   })
// })

//#endregion

//#region life cycle hooks
await useJobAdsStore().getJobAd(route.params.id)
if (jobAd.value.quizId) {
  await useQuizStore().getQuizByJobId(route.params.id)
}

await useAppointmentsStore().getAppointments()
onMounted(() => {
  newCandidates.value = setCandidatesByStatus(statusFrontEmployeur.INIT)
  pendingCandidates.value = setCandidatesByStatus(statusFrontEmployeur.PENDING)
  acceptedCandidates.value = setCandidatesByStatus(statusFrontEmployeur.ACCEPTED)
  rejectedCandidates.value = setCandidatesByStatus(statusFrontEmployeur.REJECTED)
})
//#endregion
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
}
</style>
