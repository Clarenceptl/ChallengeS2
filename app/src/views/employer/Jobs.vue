<template>
  <div class="pa-10">
    <div class="text-center mb-2">
      <h1>My Job Offers</h1>
      <v-btn color="appgrey mb-4" @click="createJobDialog = true">Add a new job offer</v-btn>
    </div>

    <div v-if="myJobs.length">
      <v-row>
        <v-col cols="12" md="4" class="column-scrollable">
          <v-card
            variant="outlined"
            class="mb-2 bg-green-200"
            v-for="(job, index) in myJobs"
            :key="index"
            @click="selectedJob = job"
          >
            <v-card-title>{{ job?.title }}</v-card-title>
            <v-card-text>
              <v-list-item class="mb-4">
                <v-list-item-title>{{ me?.company?.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ me?.company?.address }}</v-list-item-subtitle>
              </v-list-item>
              <v-chip class="mb-4 ml-1" v-for="(option, index) in companyOptions" :key="index">
                {{ option }}
              </v-chip>
              <p class="text-truncate">
                {{ job.description || 'No description' }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="collumn-scrollable" variant="flat" color="green-400">
            <v-card-title class="d-flex justify-space-between">
              {{ selectedJob?.title }}
              <div>
                <v-btn
                  v-if="selectedJob?.quizId === null"
                  color="green-500"
                  @click="createMcqDialog = true"
                  >Create Quiz</v-btn
                >
                <v-btn color="blue-500 ml-2" @click="editJobDialog = true">Edit</v-btn>
                <v-btn color="red-500 ml-2" @click="deleteJobDialog = true">Delete</v-btn>
                <v-btn
                  color="green-500 ml-2"
                  @click="router.push(`jobs/${selectedJob?.id}/candidates`)"
                  >Candidates</v-btn
                >
              </div>
            </v-card-title>
            <v-card-text>
              <v-list-item class="mb-4">
                <v-list-item-title>{{ me?.company?.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ me?.company?.address }}</v-list-item-subtitle>
              </v-list-item>
              <v-chip class="mb-4 ml-1" v-for="(option, index) in companyOptions" :key="index">
                {{ option }}
              </v-chip>
              <h3 class="mb-2">Job Details</h3>
              <div class="mb-4">
                <v-chip
                  v-for="(detail, index) in jobDetails"
                  :key="index"
                  :class="{
                    'ml-4': index !== 0
                  }"
                >
                  {{ detail }}
                </v-chip>
              </div>
              <p>
                {{ selectedJob?.description || 'No description' }}
              </p>
            </v-card-text>
          </v-card>

          <v-card
            variant="flat"
            color="green-400"
            class="mt-4"
            v-if="Object.keys(quiz).length > 0 && quiz.idJobAds == selectedJob.id"
          >
            <v-card-title class="d-flex justify-space-between">
              <h2>Quiz</h2>
              <div v-if="quiz">
                <v-btn color="blue-500 ml-2" @click="editMcqDialog = true">Edit</v-btn>
                <v-btn color="yellow-500 ml-2" @click="createMcqQuestionDialog = true"
                  >Add a question</v-btn
                >
              </div>
            </v-card-title>
            <v-card-subtitle class="d-flex flex-column">
              <div>Title: {{ quiz?.title }}</div>
              <div>Temps / questions (s): {{ quiz?.tempsParQuestionSecond }}</div>
            </v-card-subtitle>
            <v-card-text>
              <v-list-item class="mb-4" v-for="(question, index) in quiz?.questions" :key="index">
                <v-list-item-title
                  >Question: {{ index + 1 }} {{ question?.label }}</v-list-item-title
                >
                <v-list-item-subtitle>
                  <v-chip
                    v-for="(answer, index) in question?.answers"
                    :key="answer?.id"
                    :class="{
                      'ml-4': index !== 0
                    }"
                  >
                    {{ answer?.label }}
                    <v-icon v-if="answer?.id === question?.correctAnswer?.id" color="green"
                      >mdi-check</v-icon
                    >
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <h2 class="text-center">You have no job offers</h2>
    </div>

    <v-dialog v-model="createJobDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create Job</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to create this job ? </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Job Title</label>
            <v-text-field clearable placeholder="Title" type="text" v-model="newJob.title" />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
              v-model="newJob.description"
            />
            <label>Job City</label>
            <v-text-field clearable placeholder="City" type="text" v-model="newJob.city" />
            <label>Job Country</label>
            <v-text-field clearable placeholder="Country" type="text" v-model="newJob.country" />
            <v-select
              :items="contractTypeOptions"
              label="Job Contract Type"
              v-model="newJob.contractType"
            />
            <label>Job annual salary</label>
            <v-text-field
              :min="10000"
              :max="100000"
              :step="1000"
              :rules="rules.salary"
              clearable
              placeholder="Salary"
              type="number"
              v-model="newJob.salary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="cancelCreateJob"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="createJob"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createMcqDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create Quiz</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to create this Quiz ? </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Quiz Title</label>
            <v-text-field clearable placeholder="Title" type="text" v-model="newMcq.title" />
            <label>Quiz time / question (s)</label>
            <v-text-field
              clearable
              placeholder="20"
              type="number"
              v-model="newMcq.tempsParQuestionSecond"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="cancel()"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="createMcq()"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createMcqQuestionDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create Question</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to add a question to this Quiz ? </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Question</label>
            <v-text-field
              clearable
              placeholder="Question"
              type="text"
              v-model="newQuestion.label"
            />
            <label>Correct answer*</label>
            <b class="ml-2">Place the correct answer here</b>
            <v-text-field
              clearable
              placeholder="Correct answer"
              type="text"
              v-model="newQuestion.answers[0].label"
            />
            <label>Second answer*</label>
            <v-text-field
              clearable
              placeholder="Second answer"
              type="text"
              v-model="newQuestion.answers[1].label"
            />
            <label>Third answer</label>
            <v-text-field
              clearable
              placeholder="Third answer"
              type="text"
              v-model="newQuestion.answers[2].label"
            />
            <label>Fourth answer</label>
            <v-text-field
              clearable
              placeholder="Fourth answer"
              type="text"
              v-model="newQuestion.answers[3].label"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="cancelQuestions"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="addQuestionToQuiz"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editJobDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Edit this job</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to update this job ? </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Job Title</label>
            <v-text-field clearable placeholder="Title" type="text" v-model="jobEdit.title" />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
              v-model="jobEdit.description"
            />
            <label>Job City</label>
            <v-text-field clearable placeholder="City" type="text" v-model="jobEdit.city" />
            <label>Job Country</label>
            <v-text-field clearable placeholder="Country" type="text" v-model="jobEdit.country" />
            <v-select
              :items="contractTypeOptions"
              label="Job Contract Type"
              v-model="jobEdit.contractType"
            />
            <label>Job annual salary</label>
            <v-text-field
              :min="10000"
              :max="100000"
              :step="1000"
              clearable
              placeholder="Salary"
              type="number"
              v-model="jobEdit.salary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="editJobDialog = false"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="updateJob"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editMcqDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Edit this Quiz</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to update this Quiz ? </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Title</label>
            <v-text-field clearable placeholder="Title" type="text" v-model="mcqEdit.title" />
            <label>Duration</label>
            <v-text-field
              clearable
              placeholder="20s"
              type="number"
              v-model="mcqEdit.tempsParQuestionSecond"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="editMcqDialog = false"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="updateQuiz"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteJobDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete this job</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to delete this job ? </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="deleteJobDialog = false"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="deleteJob"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useJobAdsStore } from '../../stores/job-ads.store'
import { useQuizStore } from '../../stores/quiz.store'
import { useToastStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useUsersStore } from '../../stores/users.store'

await useUsersStore().getSelfUser()
await useJobAdsStore().getMyJobs()

const { me } = storeToRefs(useUsersStore())
const { myJobs } = storeToRefs(useJobAdsStore())
let selectedJob = ref(myJobs.value[0])

const stores = {
  toast: useToastStore()
}

const { quiz } = storeToRefs(useQuizStore())

const router = useRouter()
if (selectedJob.value?.quizId) {
  await useQuizStore().getQuizByJobId(selectedJob.value?.id)
}

const contractTypeOptions = [
  'CDI',
  'CDD',
  'Internship',
  'Freelance',
  'Temp',
  'Full-time job',
  'Part-time job',
  'Other'
]
const rules = {
  salary: [
    (value) => {
      if (value && value >= 10000 && value <= 100000) return true

      return 'Salary must be between 10000 and 100000'
    }
  ]
}

const createMcqQuestionDialog = ref(false)
const deleteJobDialog = ref(false)
const editJobDialog = ref(false)
const editMcqDialog = ref(false)
const createMcqDialog = ref(false)
const createJobDialog = ref(false)

const jobEdit = ref({ ...selectedJob.value })
const mcqEdit = ref({ ...quiz.value })

const newJob = ref({
  title: '',
  description: '',
  city: '',
  country: '',
  contractType: '',
  salary: null
})
const newQuestion = ref({
  label: '',
  answers: [
    {
      id: 1,
      label: ''
    },
    {
      id: 2,
      label: ''
    },
    {
      id: 3,
      label: ''
    },
    {
      id: 4,
      label: ''
    }
  ]
})
const newMcq = ref({
  title: '',
  tempsParQuestionSecond: null,
  idJobAds: selectedJob.value?.id.toString()
})

const companyOptions = computed(() => {
  return [
    me.value?.company?.revenue?.revenue,
    me.value?.company?.sector?.sector,
    me.value?.company?.size?.size
  ]
})

const jobDetails = computed(() => {
  return [
    selectedJob.value?.city,
    selectedJob.value?.country,
    selectedJob.value?.contractType,
    selectedJob.value?.salary
  ]
})

const createJob = () => {
  if (
    !newJob.value.title ||
    !newJob.value.description ||
    !newJob.value.city ||
    !newJob.value.country ||
    !newJob.value.contractType ||
    !newJob.value.salary
  ) {
    stores.toast.createToast({
      type: 'error',
      message: 'All field must be filled'
    })
    return
  }
  useJobAdsStore()
    .createJobAd(newJob.value)
    .then(async (res) => {
      if (!res.success) {
        return stores.toast.createToast({
          type: 'error',
          message: 'job ad not created'
        })
      }

      stores.toast.createToast({
        type: 'success',
        message: 'job ads created'
      })
      await useJobAdsStore().getMyJobs()
      createJobDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
      newJob.value = {
        title: '',
        description: '',
        city: '',
        country: '',
        contractType: '',
        salary: null
      }
    })
}

const createMcq = async () => {
  if (isNaN(newMcq.value.tempsParQuestionSecond)) {
    stores.toast.createToast({
      type: 'error',
      message: 'duration must be a number'
    })
    return
  }
  const formatedMcq = {
    ...newMcq.value,
    idJobAds: selectedJob.value?.id.toString()
  }
  useQuizStore()
    .createQuiz(formatedMcq)
    .then(async (res) => {
      if (res.statusCode === 400) {
        stores.toast.createToast({
          type: 'error',
          message: res.message
        })
        createMcqDialog.value = false
        newMcq.value = {
          title: '',
          tempsParQuestionSecond: null,
          idJobAds: selectedJob.value?.id.toString()
        }
        return
      }
      await useQuizStore().getQuizByJobId(selectedJob.value.id)
      createMcqDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'Quiz not created'
      })
      createMcqDialog.value = false
      newMcq.value = {
        title: '',
        tempsParQuestionSecond: null,
        idJobAds: selectedJob.value?.id.toString()
      }
    })
  createMcqDialog.value = false
}

const addQuestionToQuiz = () => {
  if (newQuestion.value.answers[0].label === '' || newQuestion.value.answers[1].label === '') {
    stores.toast.createToast({
      type: 'error',
      message: 'you must fill at least two answers'
    })
    return
  }
  useQuizStore()
    .addQuestionToQuiz(quiz.value._id, newQuestion.value)
    .then(async () => {
      stores.toast.createToast({
        type: 'success',
        message: 'question added'
      })
      await useQuizStore().getQuizByJobId(selectedJob.value.id)
      createMcqQuestionDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
      newQuestion.value = {
        label: '',
        answers: [
          {
            id: 1,
            label: ''
          },
          {
            id: 2,
            label: ''
          },
          {
            id: 3,
            label: ''
          },
          {
            id: 4,
            label: ''
          }
        ]
      }
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'question not added'
      })
    })
}

const updateJob = () => {
  let formattedJob = {
    title: jobEdit.value.title,
    description: jobEdit.value.description,
    city: jobEdit.value.city,
    country: jobEdit.value.country,
    contractType: jobEdit.value.contractType,
    salary: jobEdit.value.salary
  }
  useJobAdsStore()
    .updateJobAd(selectedJob.value.id, formattedJob)
    .then(async () => {
      stores.toast.createToast({
        type: 'success',
        message: 'job ad updated'
      })
      await useJobAdsStore().getMyJobs()
      editJobDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'job ad not updated'
      })
    })
}

const deleteJob = () => {
  useJobAdsStore()
    .deleteJobAd(selectedJob.value.id)
    .then(async () => {
      stores.toast.createToast({
        type: 'success',
        message: 'job ad deleted'
      })
      await useJobAdsStore().getMyJobs()
      deleteJobDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'job ad not deleted'
      })
    })
}

const updateQuiz = () => {
  let formattedQuiz = {
    title: mcqEdit.value.title,
    tempsParQuestionSecond: mcqEdit.value.tempsParQuestionSecond
  }
  useQuizStore()
    .updateQuiz(quiz.value._id, formattedQuiz)
    .then(async () => {
      stores.toast.createToast({
        type: 'success',
        message: 'Quiz updated'
      })
      await useQuizStore().getQuizByJobId(selectedJob.value.id)
      editMcqDialog.value = false
      selectedJob.value = myJobs.value[0]
      jobEdit.value = { ...selectedJob.value }
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'Quiz not updated'
      })
    })
}

const cancel = () => {
  createMcqDialog.value = false
  newMcq.value = {
    title: '',
    tempsParQuestionSecond: null,
    idJobAds: selectedJob.value.id
  }
}

const cancelCreateJob = () => {
  createJobDialog.value = false
  newJob.value = {
    title: '',
    description: '',
    city: '',
    country: '',
    contractType: '',
    salary: ''
  }
}

const cancelQuestions = () => {
  createMcqQuestionDialog.value = false
  newQuestion.value = {
    label: '',
    answers: [
      {
        id: 1,
        label: ''
      },
      {
        id: 2,
        label: ''
      },
      {
        id: 3,
        label: ''
      },
      {
        id: 4,
        label: ''
      }
    ]
  }
}

watch(
  () => selectedJob.value?.id,
  async () => {
    if (selectedJob.value?.quizId) {
      await useQuizStore().getQuizByJobId(selectedJob.value?.id)
    }
  }
)
watch(myJobs, () => {
  selectedJob.value = myJobs.value[0] ?? null
})
</script>

<style scoped>
.column-scrollable {
  max-height: 100vh;
  overflow-y: auto;
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
