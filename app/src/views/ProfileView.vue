<template>
  <div class="pa-5">
    <div class="text-center mb-4">
      <h1 class="mt-2">Profile</h1>
      <v-avatar size="250" color="appgrey">
        <img src="../assets/avatar.svg" alt="bulle" class="logo"/>
      </v-avatar>
    </div>
    <v-row>
      <v-col cols="6">
        <label>Firstname</label>
        <v-text-field
          clearable
          v-model="user.fistname"
          type="text"
          color="appgrey"
          variant="outlined"
        /> 
      </v-col>
      <v-col cols="6">
        <label>Lastname</label>
        <v-text-field
          clearable
          v-model="user.lastname"
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
          v-model="user.email"
          type="email"
          color="appgrey"
          variant="outlined"
        /> 
      </v-col>
      <v-col cols="6">
        <label>Date of birth</label>
        <v-text-field
          clearable
          v-model="user.birthdate"
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
    <v-btn class="w-100 mt-4" color="appgrey">Save</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let user = ref({
  fistname: 'Locman',
  lastname: 'Diawadoh',
  email: 'l@l.fr',
  birthdate: '1998-08-12',
  password: 'qwertyuiop',
  confirmPassword: 'qwertyuiop',
});
</script>

<style scoped></style>