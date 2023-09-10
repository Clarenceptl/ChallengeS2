<template>
  <div class="pa-5">
    <h1 class="text-center my-10">Your candidates list</h1>
    <InfoDragAndDrop />
    <v-container class="h-100 w-100" v-if="jobAd?.candidatesJobAds?.length">
      <v-row>
        <v-col cols="12" md="2" class="mb-2 mb-md-0 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.INIT }}</h2>
          <draggable
            :id="statusFrontEmployeur.INIT"
            group="test"
            v-model="newCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                class="mb-2"
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <template v-slot:text>
                  <div class="mb-2" v-if="hasQuiz">
                    <p>Quiz :</p>
                    <p>- Score : {{ getQuizScore(element.candidate.id) }}</p>
                    <p>- Attempt : {{ getQuizTentative(element.candidate.id) }}</p>
                  </div>
                </template>
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col cols="12" md="3" class="ml-0 ml-md-2 mb-2 mb-md-0 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.PENDING }}</h2>
          <draggable
            :id="statusFrontEmployeur.PENDING"
            @add="setAppointment"
            :move="handleMeetColumn"
            group="test"
            v-model="pendingCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                class="mb-2"
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <template v-slot:text>
                  <div class="mb-2" v-if="hasQuiz">
                    <p>Quiz :</p>
                    <p>- Score : {{ getQuizScore(element.candidate.id) }}</p>
                    <p>- Attempt : {{ getQuizTentative(element.candidate.id) }}</p>
                  </div>
                  <div v-if="getCandidateAppointments(element.candidate.id)">
                    <p>Appointment :</p>
                    {{
                      formatDateAppointment(getCandidateAppointments(element.candidate.id)?.time)
                    }}
                    <div class="d-flex">
                      <p>- Status :</p>

                      <v-icon
                        color="green"
                        v-if="getCandidateAppointments(element.candidate.id)?.accepted === true"
                        >mdi-check</v-icon
                      >
                      <v-icon
                        color="red"
                        v-else-if="
                          getCandidateAppointments(element.candidate.id)?.accepted === false
                        "
                        >mdi-close</v-icon
                      >
                      <v-icon color="orange" v-else>mdi-clock</v-icon>
                    </div>
                  </div>
                </template>
                <v-card-actions class="d-flex flex-column align-start">
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                  <v-btn class="bg-green ml-0 mt-2" text @click="navigateToAppointment">
                    Appointment list
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col cols="12" md="3" class="ml-0 ml-md-2 mb-2 mb-md-0 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.ACCEPTED }}</h2>
          <draggable
            :id="statusFrontEmployeur.ACCEPTED"
            @add="updateStatus"
            group="test"
            :move="handleAcceptedColumn"
            v-model="acceptedCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                class="mb-2"
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <template v-slot:text>
                  <div class="mb-2" v-if="hasQuiz">
                    <p>Quiz :</p>
                    <p>- Score : {{ getQuizScore(element.candidate.id) }}</p>
                    <p>- Attempt : {{ getQuizTentative(element.candidate.id) }}</p>
                  </div>
                  <div v-if="getCandidateAppointments(element.candidate.id)">
                    <p>Appointment :</p>
                    {{
                      formatDateAppointment(getCandidateAppointments(element.candidate.id)?.time)
                    }}
                    <div class="d-flex">
                      <p>- Status :</p>

                      <v-icon
                        color="green"
                        v-if="getCandidateAppointments(element.candidate.id)?.accepted === true"
                        >mdi-check</v-icon
                      >
                      <v-icon
                        color="red"
                        v-else-if="
                          getCandidateAppointments(element.candidate.id)?.accepted === false
                        "
                        >mdi-close</v-icon
                      >
                      <v-icon color="orange" v-else>mdi-clock</v-icon>
                    </div>
                  </div>
                </template>
                <v-card-actions>
                  <v-btn class="bg-blue" @click="openInfoDialog(element.candidate)"
                    >More info</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </draggable>
        </v-col>
        <v-col cols="12" md="3" class="ml-0 ml-md-2 mb-2 mb-md-0 bg-grey-100 rounded">
          <h2 class="mb-4">{{ statusFrontEmployeur.REJECTED }}</h2>
          <draggable
            :id="statusFrontEmployeur.REJECTED"
            group="test"
            @add="setRejection"
            :move="() => false"
            v-model="rejectedCandidates"
            item-key="id"
          >
            <template #item="{ element }">
              <v-card
                class="mb-2"
                variant="tonal"
                :title="`${element.candidate.firstname} ${element.candidate.lastname}`"
                :subtitle="element.candidate.email"
              >
                <template v-slot:text>
                  <div class="mb-2" v-if="hasQuiz">
                    <p>Quiz :</p>
                    <p>- Score : {{ getQuizScore(element.candidate.id) }}</p>
                    <p>- Attempt : {{ getQuizTentative(element.candidate.id) }}</p>
                  </div>
                  <div v-if="getCandidateAppointments(element.candidate.id)">
                    <p>Appointment :</p>
                    {{
                      formatDateAppointment(getCandidateAppointments(element.candidate.id)?.time)
                    }}
                    <div class="d-flex">
                      <p>- Status :</p>

                      <v-icon
                        color="green"
                        v-if="getCandidateAppointments(element.candidate.id)?.accepted === true"
                        >mdi-check</v-icon
                      >
                      <v-icon
                        color="red"
                        v-else-if="
                          getCandidateAppointments(element.candidate.id)?.accepted === false
                        "
                        >mdi-close</v-icon
                      >
                      <v-icon color="orange" v-else>mdi-clock</v-icon>
                    </div>
                  </div>
                </template>
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

    <v-dialog persistent v-model="appointmentDialog" max-width="600">
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
          <v-btn color="red-500" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue-800" text @click="createAppointment">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="rejectDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Reject this candidate</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to reject this candidate ?</v-card-subtitle>
        <v-card-actions>
          <v-btn color="blue-800" text @click="closeRejectDialog"> Cancel </v-btn>
          <v-btn class="bg-red" text @click="setRejected"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="infoDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Details</h2>
        </v-card-title>
        <v-card-text>
          <div class="d-flex">
            <p>Firstname :</p>
            <p class="ml-2">{{ selectedUserInfo.firstname }}</p>
          </div>

          <div class="d-flex">
            <p>Lastname :</p>
            <p class="ml-2">{{ selectedUserInfo.lastname }}</p>
          </div>

          <div class="d-flex">
            <p>Email :</p>
            <p class="ml-2">{{ selectedUserInfo.email }}</p>
          </div>

          <div class="d-flex">
            <p>Birthdate :</p>
            <p class="ml-2">{{ formatDateFront(selectedUserInfo.birthdate) }}</p>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="blue-800" text @click="closeInfoDialog"> Close </v-btn>
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
import {
  getKeyByValue,
  handleAcceptedColumn,
  handleMeetColumn,
  formatDateAppointment,
  formatDateFront
} from '@/helpers'
import InfoDragAndDrop from '@/components/candidate/InfoDragAndDrop.vue'

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
const rejectDialog = ref(false)
const infoDialog = ref(false)
const time = ref('')
const date = ref('')
const selectedUserInfo = ref(null)
const selectedId = ref(null)
const waitinDialogCandidateId = ref(null)
const dragContext = ref(null)
//#endregion

//#region Methods
const setCandidatesByStatus = (status) => {
  const statusKey = getKeyByValue(statusFrontEmployeur, status)
  return jobAd.value.candidatesJobAds.filter((candidate) => candidate.status === statusKey)
}

const reinitilize = () => {
  appointmentDialog.value = false
  rejectDialog.value = false
  time.value = ''
  date.value = ''
  selectedId.value = null
  selectedUserInfo.value = null
  infoDialog.value = false
  waitinDialogCandidateId.value = null
  dragContext.value = null
}

const createAppointment = async () => {
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
  const res = await useAppointmentsStore().createAppointment({
    candidateId: selectedId.value,
    jobAdId: jobAd.value.id.toString(),
    time: formattedDatetime.value
  })

  if (res.success) {
    appointmentDialog.value = false
    stores.toast.createToast({
      type: 'success',
      message: 'Appointment created'
    })
    reinitilize()
    return
  }
  stores.toast.createToast({
    type: 'error',
    message: res.message ?? 'Something went wrong'
  })
}

const openDialog = (idCandidate, idCandidature) => {
  appointmentDialog.value = true
  waitinDialogCandidateId.value = idCandidature
  selectedId.value = idCandidate
}

const closeDialog = () => {
  const indexCandidature = pendingCandidates.value.findIndex((candidature) => {
    return candidature.id === waitinDialogCandidateId.value
  })
  const candidature = pendingCandidates.value[indexCandidature]

  pendingCandidates.value.splice(indexCandidature, 1)
  newCandidates.value.push(candidature)
  reinitilize()
}

const openInfoDialog = (candidate) => {
  infoDialog.value = true
  selectedUserInfo.value = candidate
}

const closeInfoDialog = () => {
  infoDialog.value = false
}

const updateStatus = async (val) => {
  const res = await JobAdsService.updateStatusCandidate(
    val.item.__draggable_context.element.id,
    getKeyByValue(statusFrontEmployeur, val.to.id)
  )
  if (!res.success) {
    stores.toast.createToast({
      type: 'error',
      message: res.message ?? 'Something went wrong'
    })
  }
}

const setAppointment = (val) => {
  const candidature = val.item.__draggable_context.element
  openDialog(candidature.candidate.id, candidature.id)
}

const setRejection = (val) => {
  dragContext.value = val
  openRejectDialog(val.item.__draggable_context.element.id)
}

const openRejectDialog = (idCandidature) => {
  rejectDialog.value = true
  waitinDialogCandidateId.value = idCandidature
}

const closeRejectDialog = () => {
  rejectDialog.value = false
  const indexCandidature = rejectedCandidates.value.findIndex((candidature) => {
    return candidature.id === waitinDialogCandidateId.value
  })
  const candidature = rejectedCandidates.value[indexCandidature]

  rejectedCandidates.value.splice(indexCandidature, 1)
  const from = dragContext.value.from.id

  if (from === statusFrontEmployeur.INIT) {
    newCandidates.value.push(candidature)
  } else if (from === statusFrontEmployeur.PENDING) {
    pendingCandidates.value.push(candidature)
  } else if (from === statusFrontEmployeur.ACCEPTED) {
    acceptedCandidates.value.push(candidature)
  } else {
    newCandidates.value.push(candidature)
  }
  reinitilize()
}

const setRejected = async () => {
  await updateStatus(dragContext.value)
  reinitilize()
}

const navigateToAppointment = () => {
  return router.push({ name: 'EmployerAppointments' })
}
//#endregion

//#region computed
const formattedDatetime = computed(() => {
  return `${date.value}T${time.value}:00Z`
})

const hasQuiz = computed(() => {
  return jobAd.value?.quizId
})

const getQuizScore = (candidateId) => {
  const response = quiz.value?.reponses?.find((response) => {
    return response.userId === candidateId
  })
  return response ? `${response.score}/${quiz.value.questions.length}` : 'Not taken'
}

const getQuizTentative = (candidateId) => {
  const response = quiz.value?.reponses?.find((response) => {
    return response.userId === candidateId
  })
  return response ? response.tentative : 'Not taken'
}

const getCandidateAppointments = (candidateId) => {
  return appointments.value.find((appointment) => {
    return appointment.candidate.id === candidateId && appointment.job.id === jobAd.value.id
  })
}

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
