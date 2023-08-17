<template>
  <div>
    <h1 class="text-center my-10">Company Informations</h1>
    <div class="text-center justify-center my-10">
      <v-btn color="grey lighten-4" :to="{ name: 'Admin' }">Back to dashboard</v-btn>
    </div>

    <div class="text-center">
      <v-btn color="appgrey mb-4" @click="router.push('new')" prepend-icon="mdi-plus">
        Add new company information
      </v-btn>
    </div>
    <v-row class="pa-5">
      <v-col cols="12" md="4" class="text-center scrollable">
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
                      <th class="py-4 px-4">Revenue</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="revenue in companyRevenueOptions" :key="revenue.id">
                      <td class="py-4 px-4">{{revenue.revenue}}</td>
                      <td>
                        <v-icon color="blue" @click="
                          updateRevenueDialog = true;
                          selectedRevenueId = revenue.id
                        ">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon
                          class="mr-4"
                          color="red"
                          @click="deleteRevenueDialog = true;
                          selectedRevenueId = revenue.id
                        ">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4" class="text-center scrollable">
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
                      <th class="py-4 px-4">Sector</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sector in companySectorOptions" :key="sector.id">
                      <td class="py-4 px-4">{{sector.sector}}</td>
                      <td>
                        <v-icon color="blue" @click="
                          updateSectorDialog = true;
                          selectedSectorId = sector.id
                        ">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon
                          class="mr-4"
                          color="red"
                          @click="deleteSectorDialog = true;
                          selectedSectorId = sector.id
                        ">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="4" class="text-center scrollable">
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
                      <th class="py-4 px-4">Size</th>
                      <th class="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="size in companySizeOptions" :key="size.id">
                      <td class="py-4 px-4">{{size.size}}</td>
                      <td>
                        <v-icon
                          color="blue"
                          @click="updateSizeDialog = true;
                          selectedSizeId = size.id
                        ">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon
                          class="mr-4"
                          color="red"
                          @click="deleteSizeDialog = true;
                          selectedSizeId = size.id
                        ">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="updateRevenueDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Update revenue</h2>
        </v-card-title>
        <v-card-subtitle>
          Change the revenue of the selected revenue
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="updatedRevenue"
              label="Revenue"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              updateRevenueDialog = false;
              selectedRevenueId = null;
              updatedRevenue = ''
            ">
              Cancel
            </v-btn>
          <v-btn color="blue-800" text @click="updateRevenue">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateSectorDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Update sector</h2>
        </v-card-title>
        <v-card-subtitle>
          Change the sector of the selected sector
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="updatedSector"
              label="Revenue"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              updateSectorDialog = false;
              selectedSectorId = null;
              updatedSector = ''
            ">
              Cancel
            </v-btn>
          <v-btn color="blue-800" text @click="updateSector">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateSizeDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Update size</h2>
        </v-card-title>
        <v-card-subtitle>
          Change the size of the selected size
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="updatedSize"
              label="Revenue"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              updateSizeDialog = false;
              selectedSizeId = null;
              updatedSize = ''
            ">
              Cancel
            </v-btn>
          <v-btn color="blue-800" text @click="updateSize">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteRevenueDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete revenue</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to delete the selected revenue?
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              deleteRevenueDialog = false;
              selectedRevenueId = null
            ">
              Cancel
            </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="deleteRevenue"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSectorDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete sector</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to delete the selected sector?
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red-500"
            text
            @click="
              deleteSectorDialog = false;
              selectedSectorId = null
            ">
              Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="deleteSector"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSizeDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete size</h2>
        </v-card-title>
        <v-card-subtitle>
          Are you sure you want to delete the selected size?
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn 
          color="red-500" 
          text 
          @click="
            deleteSizeDialog = false; 
            selectedSizeId = null
          ">
            Cancel
          </v-btn>
          <v-btn
            color="blue-800"
            text
            @click="deleteSize"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCompanySizeOptionsStore } from '@/stores/company-size-options';
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options';
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options';
import { ref } from 'vue';

let updateRevenueDialog = ref(false);
let updateSectorDialog = ref(false);
let updateSizeDialog = ref(false);

let updatedRevenue = ref('');
let updatedSector = ref('');
let updatedSize = ref('');


let selectedRevenueId = ref(null);
let selectedSectorId = ref(null);
let selectedSizeId = ref(null);

let deleteRevenueDialog = ref(false);
let deleteSectorDialog = ref(false);
let deleteSizeDialog = ref(false);

const { companySizeOptions } = storeToRefs(useCompanySizeOptionsStore());
const { companyRevenueOptions } = storeToRefs(useCompanyRevenueOptionsStore());
const { companySectorOptions } = storeToRefs(useCompanySectorOptionsStore());

useCompanySizeOptionsStore().getCompanySizeOptions();
useCompanyRevenueOptionsStore().getCompanyRevenueOptions();
useCompanySectorOptionsStore().getCompanySectorOptions();

const router = useRouter();

const updateRevenue = () => {
  useCompanyRevenueOptionsStore().updateCompanyRevenueOptions(selectedRevenueId.value, updatedRevenue.value);
  updateRevenueDialog.value = false;
  selectedRevenueId.value = null;
  updatedRevenue.value = '';
};

const updateSector = () => {
  useCompanySectorOptionsStore().updateCompanySectorOptions(selectedSectorId.value, updatedSector.value);
  updateSectorDialog.value = false;
  selectedSectorId.value = null;
  updatedSector.value = '';
};

const updateSize = () => {
  useCompanySizeOptionsStore().updateCompanySizeOptions(selectedSizeId.value, updatedSize.value);
  updateSizeDialog.value = false;
  selectedSizeId.value = null;
  updatedSize.value = '';
};

const deleteRevenue = () => {
  useCompanyRevenueOptionsStore().deleteCompanyRevenueOptions(selectedRevenueId.value);
  deleteRevenueDialog.value = false;
  selectedRevenueId.value = null;
};

const deleteSector = () => {
  useCompanySectorOptionsStore().deleteCompanySectorOptions(selectedSectorId.value);
  deleteSectorDialog.value = false;
  selectedSectorId.value = null;
};

const deleteSize = () => {
  useCompanySizeOptionsStore().deleteCompanySizeOptions(selectedSizeId.value);
  deleteSizeDialog.value = false;
  selectedSizeId.value = null;
};
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
