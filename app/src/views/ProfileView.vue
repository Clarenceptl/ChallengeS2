<template>
  <div class="pa-5">
    <div class="text-center mb-4">
      <h1 class="mt-2">Profile</h1>
      <v-avatar size="50" color="appgrey">
        <h2>{{ initials }}</h2>
      </v-avatar>
    </div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          clearable
          v-model="me.firstname"
          type="text"
          color="appgrey"
          variant="outlined"
          label="Firstname"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          clearable
          v-model="me.lastname"
          type="text"
          color="appgrey"
          variant="outlined"
          label="Lastname"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          clearable
          v-model="me.email"
          type="email"
          color="appgrey"
          variant="outlined"
          label="Email"
          disabled
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          clearable
          v-model="me.birthdate"
          type="date"
          color="appgrey"
          variant="outlined"
          label="Birthdate"
        />
      </v-col>
    </v-row>

    <div class="text-center mb-4">
      <v-btn :disabled="isUserToUpdate" class="mt-4" color="appgrey" @click="updateUser"
        >Update user</v-btn
      >
    </div>

    <div v-if="me.company">
      <div class="text-center mb-4">
        <h2 class="mt-2">Company</h2>
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.name"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Name"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.founder"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Founder"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.address"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Address"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.description"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Description"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.website"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Website"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="me.company.siret"
            type="text"
            color="appgrey"
            variant="outlined"
            label="Siret"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="me.company.revenue.revenue"
            :items="companyRevenueOptions"
            item-title="revenue"
            item-value="id"
            label="Revenue"
            color="appgrey"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="me.company.sector.sector"
            :items="companySectorOptions"
            item-title="sector"
            item-value="id"
            label="Sector"
            color="appgrey"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="me.company.size.size"
            :items="companySizeOptions"
            item-title="size"
            item-value="id"
            label="Size"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <div class="text-center">
        <v-btn :disabled="isCompanyToUpdate" class="mt-4" color="appgrey" @click="updateCompany"
          >Update Company</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useUsersStore } from '../stores/users.store'
import { storeToRefs } from 'pinia'
import { useCompanySizeOptionsStore } from '@/stores/company-size-options'
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options'
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options'
import { useCompaniesStore } from '@/stores/companies'
import { useToastStore } from '@/stores'
import { formatDateBack } from '@/helpers'

const stores = {
  toast: useToastStore()
}
await useCompanySizeOptionsStore().getCompanySizeOptions()
await useCompanyRevenueOptionsStore().getCompanyRevenueOptions()
await useCompanySectorOptionsStore().getCompanySectorOptions()

const { companyRevenueOptions } = storeToRefs(useCompanyRevenueOptionsStore())
const { companySectorOptions } = storeToRefs(useCompanySectorOptionsStore())
const { companySizeOptions } = storeToRefs(useCompanySizeOptionsStore())
const { me } = storeToRefs(useUsersStore())

const isCompanyToUpdate = ref(true)
const isUserToUpdate = ref(true)

const user = ref({
  newPassword: '',
  confirmPassword: ''
})

const initials = computed(() => {
  if (me.value?.firstname && me.value?.lastname) {
    return `${me.value?.firstname[0]}${me.value?.lastname[0]}`
  }
  return ''
})

const companyFields = computed(() => ({
  name: me.value?.company?.name,
  founder: me.value?.company?.founder,
  address: me.value?.company?.address,
  description: me.value?.company?.description,
  website: me.value?.company?.website,
  siret: me.value?.company?.siret,
  revenue: me.value?.company?.revenue?.revenue,
  sector: me.value?.company?.sector?.sector,
  size: me.value?.company?.size?.size
}))

watch(companyFields, () => {
  isCompanyToUpdate.value = false
})

watch([() => me.value?.firstname, () => me.value?.lastname, () => me.value?.birthdate], () => {
  isUserToUpdate.value = false
})

const updateCompany = async () => {
  await useCompaniesStore()
    .updateCompany(me.value?.company?.id, {
      name: me.value?.company?.name,
      founder: me.value?.company?.founder,
      address: me.value?.company?.address,
      description: me.value?.company?.description,
      website: me.value?.company?.website,
      siret: me.value?.company?.siret,
      revenue: me.value?.company?.revenue?.id,
      sector: me.value?.company?.sector?.id,
      size: me.value?.company?.size?.id
    })
    .then(() => {
      stores.toast.createToast({
        type: 'success',
        message: 'Company updated successfully'
      })
      isCompanyToUpdate.value = true
    })
    .catch((error) => {
      console.log(error)
      stores.toast.createToast({
        type: 'error',
        message: 'Error while updating company'
      })
    })
}

const updateUser = async () => {
  await useUsersStore()
    .updateUser(me.value?.id, {
      firstname: me.value?.firstname,
      lastname: me.value?.lastname,
      birthdate: formatDateBack(me.value?.birthdate)
    })
    .then(() => {
      stores.toast.createToast({
        type: 'success',
        message: 'User updated successfully'
      })
      isUserToUpdate.value = true
    })
    .catch((error) => {
      console.log(error)
      stores.toast.createToast({
        type: 'error',
        message: 'Error while updating user'
      })
    })
}
</script>
