<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center d-none d-md-flex">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo" />
    </v-col>
    <v-col cols="12" md="6">
      <h1 class="mt-16 mb-10">Create Your Company</h1>
      <div class="form-width">
        <v-form>
          <label>Name</label>
          <v-text-field
            clearable
            v-model="companyData.name"
            type="text"
            color="appgrey"
            variant="outlined"
          />
          <label>Creation Date</label>
          <v-text-field
            clearable
            v-model="companyData.creationDate"
            type="date"
            color="appgrey"
            variant="outlined"
            :rules="isDateInPast"
          />
          <label>Address</label>
          <v-text-field
            clearable
            v-model="companyData.address"
            type="text"
            color="appgrey"
            variant="outlined"
          />
          <label>Website</label>
          <v-text-field
            clearable
            v-model="companyData.website"
            type="text"
            color="appgrey"
            variant="outlined"
          />
          <label>Description</label>
          <v-text-field
            clearable
            v-model="companyData.description"
            type="text"
            color="appgrey"
            variant="outlined"
          />
          <label>Founder</label>
          <v-text-field
            clearable
            v-model="companyData.founder"
            type="text"
            color="appgrey"
            variant="outlined"
          />
          <label>SIRET</label>
          <v-text-field
            clearable
            v-model="companyData.siret"
            type="number"
            color="appgrey"
            counter="14"
            variant="outlined"
            :rules="siretRules"
          />
          <label>Revenue</label>
          <v-select
            :items="companyRevenueOptions"
            item-title="revenue"
            item-value="id"
            label="Select Revenue"
            v-model="companyData.revenue"
          />
          <label>Sector</label>
          <v-select
            :items="companySectorOptions"
            item-title="sector"
            item-value="id"
            label="Select Sector"
            v-model="companyData.sector"
          />
          <label>Size</label>
          <v-select
            :items="companySizeOptions"
            item-title="size"
            item-value="id"
            label="Select Size"
            v-model="companyData.size"
          />
          <div>
            <v-btn type="submit" class="w-100 mb-3" color="appgrey" @click="createCompany">
              Create
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCompanySizeOptionsStore } from '@/stores/company-size-options'
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options'
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options'
import { useUsersStore } from '../stores/users.store'
import { useCompaniesStore } from '@/stores/companies'
import { computed, ref } from 'vue'
import { useToastStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const stores = {
  toast: useToastStore()
}
const today = new Date()
const maxDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
const { companySizeOptions } = storeToRefs(useCompanySizeOptionsStore())
const { companyRevenueOptions } = storeToRefs(useCompanyRevenueOptionsStore())
const { companySectorOptions } = storeToRefs(useCompanySectorOptionsStore())
const { companies } = storeToRefs(useCompaniesStore())

useCompanySizeOptionsStore().getCompanySizeOptions()
useCompanyRevenueOptionsStore().getCompanyRevenueOptions()
useCompanySectorOptionsStore().getCompanySectorOptions()
useCompaniesStore().getCompanies()

const companiesSiret = computed(() => {
  return companies.value.map((company) => company.siret)
})

const isSiretTaken = computed(() => {
  return companiesSiret.value.includes(companyData.value.siret)
})

const isDateInPast = computed(() => {
  const creationDate = new Date(companyData.value.creationDate)
  if (creationDate >= today) {
    return ['Creation date must be in the past']
  }
  return []
})

const siretRules = computed(() => {
  const rules = []
  if (isSiretTaken.value) {
    rules.push('Siret already taken')
  }
  if (companyData.value.siret.length !== 14) {
    rules.push('Siret must be 14 digits')
  }
  return rules
})

const isFormValid = computed(() => {
  return (
    companyData.value.name &&
    companyData.value.creationDate &&
    companyData.value.address &&
    companyData.value.founder &&
    companyData.value.siret &&
    companyData.value.revenue &&
    companyData.value.sector &&
    companyData.value.size
  )
})

let companyData = ref({
  name: '',
  creationDate: '',
  address: '',
  website: '',
  description: '',
  founder: '',
  siret: '',
  size: null,
  revenue: null,
  sector: null
})

const createCompany = async (e) => {
  e.preventDefault()
  if (!isSiretTaken.value && isFormValid.value) {
    companyData.value.creationDate = new Date(companyData.value.creationDate)
    const val = await useCompaniesStore().createCompany(companyData.value)
    if (val.success) {
      stores.toast.createToast({
        message: 'Company created',
        type: 'success'
      })
      useUsersStore().getSelfUser()
      router.push('/')
    } else {
      stores.toast.createToast({
        message: 'Error creating company',
        type: 'error'
      })
    }
  } else {
    stores.toast.createToast({
      message: 'Please fill all the fields',
      type: 'error'
    })
  }
}
</script>

<style scoped>
.form-width {
  max-width: 500px;
}

.col-bg-image {
  background-image: url('../assets/bulle.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}
</style>
