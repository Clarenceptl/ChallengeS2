<template>
  <div class="pa-10">
    <div class="text-center mb-2">
      <h1>Job Offers</h1>
    </div>
    <v-text-field
      clearable
      type="text"
      color="appgrey"
      variant="outlined"
      label="Search a particular job"
      v-model="search"
    />
    <v-divider class="mb-4" />
    <v-card v-if="!jobAds.length" class="pa-5 bg-green-300" variant="outlined">
      <v-card-title>
        <h2>No jobs available</h2>
      </v-card-title>
      <v-card-subtitle>There aren't any jobs available yet</v-card-subtitle>
    </v-card>
    <div v-else-if="filteredJobAds.length">
      <v-row>
        <v-col cols="12" md="4" class="column-scrollable">
          <v-card
            variant="outlined"
            class="mb-2 bg-green-200"
            v-for="(job, index) in filteredJobAds"
            :key="index"
            @click="selectedJob = job"
          >
            <v-card-title>{{ job?.title }}</v-card-title>
            <v-card-text>
              <v-list-item class="mb-4">
                <v-list-item-title>{{ job.company?.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ job.company?.address }}</v-list-item-subtitle>
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
                <v-btn color="appgrey" @click="applyDialog = true">Apply</v-btn>
              </div>
            </v-card-title>
            <v-card-text>
              <v-list-item class="mb-4">
                <v-list-item-title>{{ selectedJob?.company?.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ selectedJob?.company?.address }}</v-list-item-subtitle>
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
        </v-col>
      </v-row>
    </div>

    <v-card v-else class="pa-5 bg-green-300" variant="outlined">
      <v-card-title>
        <h2>No jobs matches search</h2>
      </v-card-title>
      <v-card-subtitle>There aren't any jobs that match the search</v-card-subtitle>
    </v-card>
    <v-dialog v-model="applyDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Apply to this job</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to apply to this job ? </v-card-subtitle>
        <v-card-actions>
          <v-btn color="red-500" text @click="applyDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text @click="apply">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useJobAdsStore } from '../stores/job-ads.store'
import { useToastStore } from '@/stores'

let search = ref('')

const stores = {
  toast: useToastStore()
}
await useJobAdsStore().getJobAds()
const { jobAds } = storeToRefs(useJobAdsStore())

const filteredJobAds = computed(() => {
  return jobAds.value.filter((job) => {
    return job.title.toLowerCase().includes(search.value.toLowerCase())
  })
})
let selectedJob = ref(filteredJobAds.value[0])
const companyOptions = computed(() => {
  return [
    selectedJob.value?.company?.revenue?.revenue,
    selectedJob.value?.company?.sector?.sector,
    selectedJob.value?.company?.size?.size
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
let applyDialog = ref(false)

const apply = () => {
  useJobAdsStore()
    .applyJobAd(selectedJob.value.id)
    .then((val) => {
      if (val.success) {
        stores.toast.createToast({
          type: 'success',
          message: 'you successfully applied to this job'
        })
      } else {
        stores.toast.createToast({
          type: 'error',
          message: 'you cannot apply to this job'
        })
      }
      applyDialog.value = false
    })
    .catch(() => {
      stores.toast.createToast({
        type: 'error',
        message: 'you already applied to this job'
      })
    })
}
</script>

<style scoped>
.column-scrollable {
  max-height: 100vh;
  overflow-y: auto;
}
/* truncate text if text is too long */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
