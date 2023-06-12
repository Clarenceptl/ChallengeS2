<template>
  <div>
    <h1 class="text-center my-10">Company Informations</h1>
    <div class="text-center">
      <v-btn color="appgrey mb-4" @click="router.push('company-information/new')" prepend-icon="mdi-plus" >Add new company information</v-btn>
    </div>
    <v-row class="pa-5">


      <v-col cols="4" class="text-center scrollable">
        <div class=" justify-center mb-2">
          <div class="container">
            <v-card class="mx-auto">
              <v-toolbar color="appgrey">
                <v-toolbar-title class="text-center">Revenues</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="py-4 px-4">Name</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="revenue in revenues" :key="revenue.id">
                      <td class="py-4 px-4">{{revenue.name}}</td>
                      <td><v-icon color="blue">mdi-pencil</v-icon></td>
                      <td><v-icon class="mr-4" color="red">mdi-delete</v-icon></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col cols="4" class="text-center scrollable">
        <div class=" justify-center mb-2">
          <div class="container">
            <v-card class="mx-auto">
              <v-toolbar color="appgrey">
                <v-toolbar-title class="text-center">Sectors</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="py-4 px-4">Name</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sector in sectors" :key="sector.id">
                      <td class="py-4 px-4">{{sector.name}}</td>
                      <td><v-icon color="blue">mdi-pencil</v-icon></td>
                      <td><v-icon class="mr-4" color="red">mdi-delete</v-icon></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col cols="4" class="text-center scrollable">
        <div class=" justify-center mb-2">
          <div class="container">
            <v-card class="mx-auto">
              <v-toolbar color="appgrey">
                <v-toolbar-title class="text-center">Sizes</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="py-4 px-4">Name</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="size in sizes" :key="size.id">
                      <td class="py-4 px-4">{{size.name}}</td>
                      <td><v-icon color="blue">mdi-pencil</v-icon></td>
                      <td><v-icon class="mr-4" color="red">mdi-delete</v-icon></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const revenues = [
  {
    id: 1,
    name: '0-500k'
  },
  {
    id: 2,
    name: '500k-1M'
  },
  {
    id: 3,
    name: '1M-5M'
  },
  {
    id: 4,
    name: '5M-10M'
  },
  {
    id: 5,
    name: '10M-50M'
  },
  {
    id: 6,
    name: '50M-100M'
  },
  {
    id: 7,
    name: '100M-500M'
  },
  {
    id: 8,
    name: '500M-1B'
  },
  {
    id: 9,
    name: '1B-5B'
  },
  {
    id: 10,
    name: '5B-10B'
  },
  {
    id: 11,
    name: '10B+'
  }
]

const sectors = [
  {
    id: 1,
    name: 'Tech'
  },
  {
    id: 2,
    name: 'Finance'
  },
  {
    id: 3,
    name: 'Education'
  },
  {
    id: 4,
    name: 'Health'
  },
  {
    id: 5,
    name: 'Retail'
  },
  {
    id: 6,
    name: 'Transportation'
  },
  {
    id: 7,
    name: 'Energy'
  },
  {
    id: 8,
    name: 'Manufacturing'
  },
  {
    id: 9,
    name: 'Other'
  }
]

const sizes = [
  {
    id: 1,
    name: '1-10'
  },
  {
    id: 2,
    name: '11-50'
  },
  {
    id: 3,
    name: '51-200'
  },
  {
    id: 4,
    name: '201-500'
  },
  {
    id: 5,
    name: '501-1000'
  },
  {
    id: 6,
    name: '1001-5000'
  },
  {
    id: 7,
    name: '5001-10000'
  },
  {
    id: 8,
    name: '10001+'
  }
]
</script>

<style scoped>
.scrollable {
  height: 100vh;
  overflow-y: auto;
}

.text-style {
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
