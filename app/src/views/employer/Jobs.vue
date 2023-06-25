<template>
  <div class="pa-10">
    <div class="text-center mb-2">
      <h1>My Job Offers</h1>
      <v-btn color="appgrey mb-4" @click="newJobDialog = true">Add a new job offer</v-btn>
    </div>
    <v-row>
      <v-col cols="4" class="column-scrollable">
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p class="text-truncate">
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" class="mb-2 bg-green-200">
          <v-card-title>Développeur Web</v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip>Company sector</v-chip>
            <p class="text-truncate">
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
        <v-btn color="appgrey w-100" text>Load more</v-btn>
      </v-col>
      <v-col>
        <v-card class="collumn-scrollable" variant="flat" color="green-400">
          <v-card-title class="d-flex justify-space-between">
            <div>
              Job Offer
            </div>
            <div>
              <v-btn color="blue-500" @click="editDialog = true">Edit</v-btn>
              <v-btn color="red-500 ml-2" @click="deleteDialog = true">Delete</v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title>Company Name</v-list-item-title>
                <v-list-item-subtitle>Company Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-chip class="mb-4">Company sector</v-chip>
            <v-chip class="mb-4">Company sector</v-chip>
            <h3 class="mb-2">Job Details</h3>
            <div class="mb-4">
              <v-chip class="">Job City</v-chip>
              <v-chip class="ml-4">Job Country</v-chip>
              <v-chip class="ml-4">Job Contract type</v-chip>
              <v-chip class="ml-4">Job Salary</v-chip>
              <v-chip class="ml-4">Job Duration</v-chip>
            </div>
            <p>
              Job description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              excepturi maxime vel, vero consequatur aliquam nemo. Commodi id fugit, saepe at ea,
              nemo quia cupiditate aspernatur quaerat molestiae voluptates dolor.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
            />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
            />
            <label>Job City</label>
            <v-text-field
              clearable
              placeholder="City"
              type="text"
            />
            <label>Job Country</label>
            <v-text-field
              clearable
              placeholder="Country"
              type="text"
            />
            <label>Job Contract Type</label>
            <v-text-field
              clearable
              placeholder="Contract Type"
              type="text"
            />
            <label>Job Salary</label>
            <v-text-field
              clearable
              placeholder="Salary"
              type="text"
            />
            <label>Job Duration</label>
            <v-text-field
              clearable
              placeholder="Duration"
              type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="editDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Yes</v-btn>
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
          <v-btn color="red-500" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Yes</v-btn>
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
            />
            <label>Job Description</label>
            <v-textarea
              clearable
              placeholder="Description"
              type="text"
            />
            <label>Job City</label>
            <v-text-field
              clearable
              placeholder="City"
              type="text"
            />
            <label>Job Country</label>
            <v-text-field
              clearable
              placeholder="Country"
              type="text"
            />
            <label>Job Contract Type</label>
            <v-text-field
              clearable
              placeholder="Contract Type"
              type="text"
            />
            <label>Job Salary</label>
            <v-text-field
              clearable
              placeholder="Salary"
              type="text"
            />
            <label>Job Duration</label>
            <v-text-field
              clearable
              placeholder="Duration"
              type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="newJobDialog = false">Cancel</v-btn>
          <v-btn color="blue-800" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let editDialog = ref(false);
let deleteDialog = ref(false);
let newJobDialog = ref(false);
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
