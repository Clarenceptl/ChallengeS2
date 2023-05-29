<template>
  <div class="pa-10">
    <div class="text-center mb-2">
      <h1>Job Offers</h1>
    </div>
    <v-row>
      <v-col cols="5" offset="1">
        <v-text-field clearable type="text" color="appgrey" counter="10" variant="outlined" label="Search a particular job"/>
      </v-col>
      <v-col cols="5">
        <v-text-field clearable type="text" color="appgrey" counter="10" variant="outlined" label="Look for a particular field"/>
      </v-col>
    </v-row>
    <v-divider class="mb-4" />
    <v-row>
      <v-col cols="4" class="column-scrollable">
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
        <v-card variant="outlined" class="mb-2">
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
              <v-btn color="appgrey" text>Apply</v-btn>
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
  </div>
</template>

<script setup></script>

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
