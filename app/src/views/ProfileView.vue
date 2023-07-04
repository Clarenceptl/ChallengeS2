<template>
  <div class="pa-5">
    <div class="text-center mb-4">
      <h1 class="mt-2">Profile</h1>
      <v-avatar size="250" color="appgrey">
        <img src="@/assets/avatar.svg" alt="bulle" class="logo"/>
      </v-avatar>
    </div>
    <v-row>
      <v-col cols="6">
        <label>Firstname</label>
        <v-text-field
          clearable
          v-model="me.firstname"
          type="text"
          color="appgrey"
          variant="outlined"
        /> 
      </v-col>
      <v-col cols="6">
        <label>Lastname</label>
        <v-text-field
          clearable
          v-model="me.lastname"
          type="text"
          color="appgrey"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <label>Email</label>
        <v-text-field
          clearable
          v-model="me.email"
          type="email"
          color="appgrey"
          variant="outlined"
        /> 
      </v-col>
      <v-col cols="6">
        <label>Date of birth</label>
        <v-text-field
          clearable
          v-model="formatedBirthdate"
          type="date"
          color="appgrey"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <label>Password</label>
          <v-text-field
          clearable
          v-model="user.password"
          type="password"
          color="appgrey"
          variant="outlined"
          />
      </v-col>
      <v-col cols="6">
        <label>Confirm Password</label>
          <v-text-field
          clearable
          v-model="user.confirmPassword"
          type="password"
          color="appgrey"
          variant="outlined"
          />
      </v-col>
    </v-row>
    <v-btn disabled class="w-100 mt-4" color="appgrey">Save</v-btn>
    <div v-if="me.company">
      <div class="text-center mb-4">
        <h2 class="mt-2">Company</h2>
      </div>
      <v-row>
        <v-col cols="4">
          <label>Name</label>
          <v-text-field
            clearable
            v-model="me.company.name"
            type="text"
            color="appgrey"
            variant="outlined"
          /> 
        </v-col>
        <v-col cols="4">
          <label>Founder</label>
          <v-text-field
            clearable
            v-model="me.company.founder"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
        <v-col cols="4">
          <label>Address</label>
          <v-text-field
            clearable
            v-model="me.company.address"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <label>Description</label>
          <v-text-field
            clearable
            v-model="me.company.description"
            type="text"
            color="appgrey"
            variant="outlined"
          /> 
        </v-col>
        <v-col cols="4">
          <label>Website</label>
          <v-text-field
            clearable
            v-model="me.company.website"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
        <v-col cols="4">
          <label>SIRET</label>
          <v-text-field
            clearable
            v-model="me.company.siret"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <label>Revenue</label>
          <v-text-field
            clearable
            v-model="me.company.revenue.revenue"
            type="text"
            color="appgrey"
            variant="outlined"
          /> 
        </v-col>
        <v-col cols="4">
          <label>Sector</label>
          <v-text-field
            clearable
            v-model="me.company.sector.sector"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
        <v-col cols="4">
          <label>Size</label>
          <v-text-field
            clearable
            v-model="me.company.size.size"
            type="text"
            color="appgrey"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useUsersStore } from '../stores/users.store';

const { me } = storeToRefs(useUsersStore());
useUsersStore().getMe();

const formatedBirthdate = computed(() => {
  if (me.value?.birthdate) {
    const date = me.value?.birthdate.split('/');
    return `${date[2]}-${date[1]}-${date[0]}`;
  }
  return '';
});

let user = ref({
  password: '',
  confirmPassword: '',
});
</script>

<style scoped></style>