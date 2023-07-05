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
                <v-btn color="blue-500" @click="editDialog = true">Edit</v-btn>
                <v-btn color="red-500 ml-2" @click="deleteDialog = true">Delete</v-btn>
                <!-- button to see candidates -->
                <v-btn color="green-500 ml-2" @click="router.push(`jobs/${selectedJob?.id}/candidates`)">Candidates</v-btn>
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
          Are you sure you want to apply to this job ?
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
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useJobAdsStore } from '../../stores/job-ads.store';
import { useToastStore } from '@/stores'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const me = computed(() => userStore.getContextUser)

const router = useRouter();
const stores = {
  toast: useToastStore()
}
await useJobAdsStore().getMyJobs();
const { myJobs } = storeToRefs(useJobAdsStore());

let editDialog = ref(false);
let deleteDialog = ref(false);
let newJobDialog = ref(false);

let selectedJob = ref(myJobs.value[0]);
const jobEdit = ref({...selectedJob.value});
let newJob = ref({
  title: '',
  description: '',
  city: '',
  country: '',
  contractType: '',
  salary: null
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
  useJobAdsStore().createJobAd(newJob.value).then(async () => {
    stores.toast.createToast({
      type: 'success',
      message: 'job ads created'
    });
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
    await useJobAdsStore().getMyJobs();
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
    await useJobAdsStore().getMyJobs();
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
