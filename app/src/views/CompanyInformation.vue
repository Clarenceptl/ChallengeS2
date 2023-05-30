<template>
  <div>
    <h1 class="text-center mb-4">Company Informations</h1>
    <div class="text-center">
      <v-btn color="appgrey mb-4" @click="router.push('company-information/new')">Add new company information</v-btn>
    </div>
    <v-row class="pa-5">
      <v-col cols="4" class="text-center scrollable">
        <h2>Revenues</h2>
        <div
          v-for="revenue in revenues"
          :key="revenue.id"
          class="d-flex justify-center text-style mb-2"
        >
          <v-card class="w-100 pa-2 bg-yellow-100" variant="outlined" elevation="4">
            <h3>{{ revenue.name }}</h3>
            <div>
              <v-btn class="w-50 mb-2" color="blue-500">Edit</v-btn>
            </div>
            <div>
              <v-btn class="w-50" color="red-500">Delete</v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4" class="text-center scrollable">
        <h2>Sectors</h2>
        <div v-for="sector in sectors" :key="sector.id" class="text-style mb-2">
          <v-card class="w-100 pa-2 bg-yellow-100" variant="outlined" elevation="4">
            <h3>{{ sector.name }}</h3>
            <div>
              <v-btn class="w-50 mb-2" color="blue-500">Edit</v-btn>
            </div>
            <div>
              <v-btn class="w-50" color="red-500">Delete</v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4" class="text-center scrollable">
        <h2>Sizes</h2>
        <div v-for="size in sizes" :key="size.id" class="text-style mb-2">
          <v-card class="w-100 pa-2 bg-yellow-100" variant="outlined" elevation="4">
            <h3>{{ size.name }}</h3>
            <div>
              <v-btn class="w-50 mb-2" color="blue-500">Edit</v-btn>
            </div>
            <div>
              <v-btn class="w-50" color="red-500">Delete</v-btn>
            </div>
          </v-card>
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
