<template>
  <v-row>
    <v-col cols="6" class="text-center justify-content-center d-none d-md-flex">
      <img src="@/assets/bulle.svg" alt="bulle" class="logo"/>
    </v-col>
    <v-col>
      <h1 class="mt-16 mb-10 text-center">Create company informations</h1>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            clearable
            type="text"
            color="appgrey"
            variant="outlined"
            label="Create company revenue (0-10M, 10-50M, 50-100M...)"
            v-model="companyRevenue"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            class="w-100"
            color="appgrey"
            @click="createCompanyRevenue"
          >
            Create Revenue
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            clearable
            type="text"
            color="appgrey"
            variant="outlined"
            label="Create company sector (Tech, Finance, Education...)"
            v-model="companySector"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            class="w-100"
            color="appgrey"
            @click="createCompanySector"
          >
            Create Sector
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            clearable
            type="text"
            color="appgrey"
            variant="outlined"
            label="Create company size (0-10, 10-50, 50-100...)"
            v-model="companySize"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            class="w-100"
            color="appgrey"
            @click="createCompanySize"
          >
            Create Size
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { useCompanySizeOptionsStore } from '@/stores/company-size-options';
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options';
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options';
import { ref } from 'vue';
import { useToastStore } from '@/stores'

const stores = {
  toast: useToastStore()
}

let companySector = ref('');
let companySize = ref('');
let companyRevenue = ref('');

const createCompanyRevenue = () => {
  useCompanyRevenueOptionsStore().createCompanyRevenueOptions(companyRevenue.value).then(() => {
    stores.toast.createToast({
      type: 'success',
      message: 'Company revenue created'
    });
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'Company revenue already exists'
    });
  });
  companyRevenue.value = '';
};

const createCompanySector = () => {
  useCompanySectorOptionsStore().createCompanySectorOptions(companySector.value).then(() => {
    stores.toast.createToast({
      type: 'success',
      message: 'Company sector created'
    });
  }).catch(() => {
    stores.toast.createToast('error', 'Company sector already exists');
  });
  companySector.value = '';
};

const createCompanySize = () => {
  useCompanySizeOptionsStore().createCompanySizeOptions(companySize.value).then(() => {
    stores.toast.createToast({
      type: 'success',
      message: 'Company size created'
    });
  }).catch(() => {
    stores.toast.createToast({
      type: 'error',
      message: 'Company size already exists'
    });
  });
  companySize.value = '';
};
</script>

<style scoped>
</style>