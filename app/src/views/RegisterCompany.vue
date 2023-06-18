<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo"/>
    </v-col>
    <v-col cols="6">
      <h1 class="mt-16 mb-10">Create Your Company</h1>
      <div class="form-width">
        <v-form>
          <label>Name</label>
          <v-text-field
            clearable
            v-model="companyData.name"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Creation Date</label>
          <v-text-field
            clearable
            v-model="companyData.creationDate"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Address</label>
          <v-text-field
            clearable
            v-model="companyData.address"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Website</label>
          <v-text-field
            clearable
            v-model="companyData.website"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Description</label>
          <v-text-field
            clearable
            v-model="companyData.description"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Founder</label>
          <v-text-field
            clearable
            v-model="companyData.founder"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>SIRET</label>
          <v-text-field
            clearable
            v-model="companyData.siret"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Size</label>
          <v-text-field
            clearable
            v-model="companyData.size"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Revenue</label>
          <v-text-field
            clearable
            v-model="companyData.revenue"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
          <label>Sector</label>
          <v-text-field
            clearable
            v-model="companyData.sector"
            type="text"
            color="appgrey"
            counter="10"
            variant="outlined"
          />
        <div>
          <v-btn disabled class="w-100 mb-3" color="appgrey">Register</v-btn>
        </div>
        </v-form>
        
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

let companyData = ref({
  name: '',
  creationDate: '',
  address: '',
  website: '',
  description: '',
  founder: '',
  siret: '',
  size: '',
  revenue: '',
  sector: '',
})
</script>

<style scoped>
.form-width {
max-width: 500px;
}

.col-bg-image {
background-image: url('@/assets/bulle.svg');
background-repeat: no-repeat;
background-size: cover;
background-position: center;
width: 100%;
height: 100vh;
}

@media (min-width: 768px) {
}

@media (max-width: 768px) {
.logo {
  width: 100%;
}
.form-width {
max-width: 200px;
}
}
</style>
