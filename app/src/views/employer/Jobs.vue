<template>
  <div class="pa-10">
    <div class="text-center mb-2">
      <h1>My Job Offers</h1>
      <v-btn color="appgrey mb-4" @click="newJobDialog = true">Add a new job offer</v-btn>
    </div>

    <div v-if="myJobs.length">
      <v-row>
        <v-col cols="4" class="column-scrollable">
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
                <v-list-item-content>
                  <v-list-item-title>{{ me?.company?.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ me?.company?.address }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-chip
                class="mb-4 ml-1"
                v-for="(option, index) in companyOptions"
                :key="index"
              >
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
                <v-btn v-if="!quiz" color="green-500" @click="mcqDialog = true">Create MCQ</v-btn>
                <v-btn color="blue-500 ml-2" @click="editDialog = true">Edit</v-btn>
                <v-btn color="red-500 ml-2" @click="deleteDialog = true">Delete</v-btn>
              </div>
            </v-card-title>
            <v-card-text>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title>{{ me?.company?.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ me?.company?.address }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-chip
                class="mb-4 ml-1"
                v-for="(option, index) in companyOptions"
                :key="index"
              >
                {{ option }}
              </v-chip>
              <h3 class="mb-2">Job Details</h3>
              <div class="mb-4">
                <v-chip
                  v-for="(detail, index) in jobDetails"
                  :key="index"
                  :class="{
                    'ml-4': index !== 0,
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

          <v-card variant="flat" color="green-400" class="mt-4">
            <v-card-title class="d-flex justify-space-between">
              <h2>MCQ</h2>
              <div v-if="quiz">
                <v-btn color="blue-500 ml-2" @click="editMcqDialog = true">Edit</v-btn>
                <v-btn color="yellow-500 ml-2" @click="addQuestionDialog = true">Add a question</v-btn>
              </div>
            </v-card-title>
            <v-card-subtitle class="d-flex flex-column">
              <div>
                Title: {{ quiz?.title }}
              </div>
              <div>
                Temps / questions (s): {{ quiz?.tempsParQuestionSecond }}
              </div>
            </v-card-subtitle>
            <v-card-text>
              <v-list-item class="mb-4" v-for="(question, index) in quiz?.questions" :key="index">
                <v-list-item-content>
                  <v-list-item-title>Questtion: {{ index + 1 }} {{ question?.label }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      v-for="(answer, index) in question?.answers"
                      :key="answer?.id"
                      :class="{
                        'ml-4': index !== 0,
                      }"
                    >
                      {{ answer?.label }}
                      <v-icon v-if="answer?.id === question?.correctAnswer?.id" color="green">mdi-check</v-icon>
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <h2 class="text-center">You have no job offers</h2>
    </div>

    <v-dialog v-model="editDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Edit this job</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to update this job ?
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Job Title</label>
            <v-text-field
              clearable
              placeholder="Title"
              type="text"
              v-model="jobEdit.title"
            />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
              v-model="jobEdit.description"
            />
            <label>Job City</label>
            <v-text-field
              clearable
              placeholder="City"
              type="text"
              v-model="jobEdit.city"
            />
            <label>Job Country</label>
            <v-text-field
              clearable
              placeholder="Country"
              type="text"
              v-model="jobEdit.country"
            />
            <label>Job Contract Type</label>
            <v-text-field
              clearable
              placeholder="Contract Type"
              type="text"
              v-model="jobEdit.contractType"
            />
            <label>Job Salary</label>
            <v-text-field
              clearable
              placeholder="Salary"
              type="number"
              v-model="jobEdit.salary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="updateJob"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editMcqDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Edit this MCQ</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to update this MCQ ?
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Title</label>
            <v-text-field
              clearable
              placeholder="Title"
              type="text"
              v-model="mcqEdit.title"
            />
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
          <v-btn
            color="red-500"
            text
            @click="editMcqDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="updateQuiz"
          >
            Yes
          </v-btn>
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
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="deleteJob"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newJobDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create Job</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to create this job ?
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>Job Title</label>
            <v-text-field
              clearable
              placeholder="Title"
              type="text"
              v-model="newJob.title"
            />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
              v-model="newJob.description"
            />
            <label>Job City</label>
            <v-text-field
              clearable
              placeholder="City"
              type="text"
              v-model="newJob.city"
            />
            <label>Job Country</label>
            <v-text-field
              clearable
              placeholder="Country"
              type="text"
              v-model="newJob.country"
            />
            <label>Job Contract Type</label>
            <v-text-field
              clearable
              placeholder="Contract Type"
              type="text"
              v-model="newJob.contractType"
            />
            <label>Job Salary</label>
            <v-text-field
              clearable
              placeholder="Salary"
              type="text"
              v-model="newJob.salary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              newJobDialog = false;
              newJob = {
                title: '',
                description: '',
                city: '',
                country: '',
                contractType: '',
                salary: '',
              }
            ">
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="createJob"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addQuestionDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create Job</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to add a question to this MCQ ?
        </v-card-subtitle>
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
          <v-btn
            color="red-500"
            text
            @click="
              addQuestionDialog = false;
              newQuestion = {
                label: '',
                answers: [
                  {
                    id: 1,
                    label: '',
                  },
                  {
                    id: 2,
                    label: '',
                  },
                  {
                    id: 3,
                    label: '',
                  },
                  {
                    id: 4,
                    label: '',
                  },
                ]
              }
            ">
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="addQuestionToQuiz"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="mcqDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Create MCQ</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to create this MCQ ?
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <label>MCQ Title</label>
            <v-text-field
              clearable
              placeholder="Title"
              type="text"
              v-model="newMcq.title"
            />
            <label>MCQ time / question (s)</label>
            <v-text-field
              clearable
              placeholder="20"
              type="number"
              v-model="newMcq.tempsParQuestionSecond"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              newJobDialog = false;
              newMcq = {
                title: '',
                tempsParQuestionSecond: null,
                idJobAds: selectedJob.value.id
              }
            ">
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="createMcq"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useUsersStore } from '../../stores/users.store';
import { useJobAdsStore } from '../../stores/job-ads.store';
import { useQuizStore } from '../../stores/quiz.store';
import { useToastStore } from '@/stores'

await useJobAdsStore().getMyJobs();
const { myJobs } = storeToRefs(useJobAdsStore());
let selectedJob = ref(myJobs.value[0]);
const stores = {
  toast: useToastStore()
}
await useUsersStore().getMe();
await useQuizStore().getQuizByJobId(selectedJob.value.id);
const { me } = storeToRefs(useUsersStore());
const { quiz } = storeToRefs(useQuizStore());

watch(() => selectedJob.value.id, async () => {
  await useQuizStore().getQuizByJobId(selectedJob.value.id);
});

let addQuestionDialog = ref(false);
let deleteDialog = ref(false);
let editDialog = ref(false);
let editMcqDialog = ref(false);
let mcqDialog = ref(false);
let newJobDialog = ref(false);

const jobEdit = ref({...selectedJob.value});
const mcqEdit = ref({...quiz.value});

let newJob = ref({
  title: '',
  description: '',
  city: '',
  country: '',
  contractType: '',
  salary: null
});
let newQuestion = ref({
  label: '',
  answers: [
    {
      id: 1,
      label: '',
    },
    {
      id: 2,
      label: '',
    },
    {
      id: 3,
      label: '',
    },
    {
      id: 4,
      label: '',
    },
  ]
});
let newMcq = ref({
  title: '',
  tempsParQuestionSecond: null,
  idJobAds: selectedJob.value?.id.toString()
});

const companyOptions = computed(() => {
  return [
    me.value?.company?.revenue?.revenue,
    me.value?.company?.sector?.sector,
    me.value?.company?.size?.size,
  ];
});

const jobDetails = computed(() => {
  return [
    selectedJob.value?.city,
    selectedJob.value?.country,
    selectedJob.value?.contractType,
    selectedJob.value?.salary,
  ];
});

const createJob = () => {
  if (isNaN(newJob.value.salary)) {
    stores.toast.createToast({
      type: 'error',
      message: 'salary must be a number'
    });
    return;
  }
  useJobAdsStore().createJobAd(newJob.value).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'job ads created'
    });
    await useUsersStore().getMe();
    newJobDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'job ad not created'
    });
  });
};

const createMcq = () => {
  if (isNaN(newMcq.value.tempsParQuestionSecond)) {
    stores.toast.createToast({
      type: 'error',
      message: 'duration must be a number'
    });
    return;
  }
  useQuizStore().createQuiz(newMcq.value).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'mcq created'
    });
    await useQuizStore().getQuizByJobId(selectedJob.value.id);
    mcqDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'mcq not created'
    });
  });
};

const updateJob = () => {
  let formattedJob = {
    title: jobEdit.value.title,
    description: jobEdit.value.description,
    city: jobEdit.value.city,
    country: jobEdit.value.country,
    contractType: jobEdit.value.contractType,
    salary: jobEdit.value.salary,
  };
  useJobAdsStore().updateJobAd(selectedJob.value.id, formattedJob).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'job ad updated'
    });
    await useUsersStore().getMe();
    editDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'job ad not updated'
    });
  });
};

const deleteJob = () => {
  useJobAdsStore().deleteJobAd(selectedJob.value.id).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'job ad deleted'
    });
    await useUsersStore().getMe();
    deleteDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'job ad not deleted'
    });
  });
};

const updateQuiz = () => {
  let formattedQuiz = {
    title: mcqEdit.value.title,
    tempsParQuestionSecond: mcqEdit.value.tempsParQuestionSecond,
  };
  useQuizStore().updateQuiz(quiz.value._id, formattedQuiz).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'mcq updated'
    });
    await useQuizStore().getQuizByJobId(selectedJob.value.id);
    editMcqDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'mcq not updated'
    });
  });
};

const addQuestionToQuiz = () => {
  // check that at least two answers are filled
  if (newQuestion.value.answers[0].label === '' || newQuestion.value.answers[1].label === '') {
    stores.toast.createToast({
      type: 'error',
      message: 'you must fill at least two answers'
    });
    return;
  }
  useQuizStore().addQuestionToQuiz(quiz.value._id, newQuestion.value).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'question added'
    });
    await useQuizStore().getQuizByJobId(selectedJob.value.id);
    addQuestionDialog.value = false;
    selectedJob.value = myJobs.value[0];
    jobEdit.value = {...selectedJob.value};
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'question not added'
    });
  });
}; 
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
