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
        /> 
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          clearable
          v-model="formatedBirthdate"
          type="date"
          color="appgrey"
          variant="outlined"
          label="Birthdate"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
          <v-text-field
          clearable
          type="password"
          color="appgrey"
          variant="outlined"
          label="Password"
          />
      </v-col>

      <v-col cols="12" md="4">
          <v-text-field
          clearable
          v-model="user.newPassword"
          type="password"
          color="appgrey"
          variant="outlined"
          label="New Password"
          />
      </v-col>

      <v-col cols="12" md="4">
          <v-text-field
          clearable
          v-model="user.confirmPassword"
          type="password"
          color="appgrey"
          variant="outlined"
          label="Confirm Password"
          />
      </v-col>
    </v-row>

    <div class="text-center">
      <v-btn disabled class="mt-4" color="appgrey">Save</v-btn>
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
        <v-btn disabled class="mt-4" color="appgrey">Save</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useUsersStore } from '../stores/users.store'
import { storeToRefs } from 'pinia';
import { useCompanySizeOptionsStore } from '@/stores/company-size-options';
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options';
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options';

await useCompanySizeOptionsStore().getCompanySizeOptions();
await useCompanyRevenueOptionsStore().getCompanyRevenueOptions();
await useCompanySectorOptionsStore().getCompanySectorOptions();

const { companyRevenueOptions } = storeToRefs(useCompanyRevenueOptionsStore());
const { companySectorOptions } = storeToRefs(useCompanySectorOptionsStore());
const { companySizeOptions } = storeToRefs(useCompanySizeOptionsStore());

const { me } = storeToRefs(useUsersStore());
const formatedBirthdate = computed(() => {
  if (me.value?.birthdate) {
    const date = me.value?.birthdate.split('/');
    return `${date[2]}-${date[1]}-${date[0]}`;
  }
  return '';
});

let user = ref({
  newPassword: '',
  confirmPassword: '',
});

// computed that returns the user initials
const initials = computed(() => {
  if (me.value?.firstname && me.value?.lastname) {
    return `${me.value?.firstname[0]}${me.value?.lastname[0]}`;
  }
  return '';
});
</script>

<style scoped></style>