<template>
  <div>
    <v-app-bar :elevation="0" color="green-100">
      <template v-slot:append>
        <v-btn variant="outlined" color="green-800">Login</v-btn>

        <v-btn class="ml-1" variant="outlined">Register</v-btn>

      </template>
      <v-app-bar-title> Larudakoté </v-app-bar-title>
    </v-app-bar>
  </div>
</template>