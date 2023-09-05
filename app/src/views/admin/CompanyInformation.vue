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
        <div class="justify-center mb-2">
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
                      <td class="py-4 px-4">{{ revenue.revenue }}</td>
                      <td>
                        <v-icon color="blue" @click="handleRevenueDialog(false, revenue.id)">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon
                          class="mr-4"
                          color="red"
                          @click="handleRevenueDialog(true, revenue.id)"
                        >
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
        <div class="justify-center mb-2">
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
                      <td class="py-4 px-4">{{ sector.sector }}</td>
                      <td>
                        <v-icon color="blue" @click="handleSectorDialog(false, sector.id)">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon
                          class="mr-4"
                          color="red"
                          @click="handleSectorDialog(true, sector.id)"
                        >
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
        <div class="justify-center mb-2">
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
                      <td class="py-4 px-4">{{ size.size }}</td>
                      <td>
                        <v-icon color="blue" @click="handleSizeDialog(false, size.id)">
                          mdi-pencil
                        </v-icon>
                      </td>
                      <td>
                        <v-icon class="mr-4" color="red" @click="handleSizeDialog(true, size.id)">
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
        <v-card-subtitle> Change the revenue of the selected revenue </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field v-model="updatedRevenue" label="Revenue" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetUpdateDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="updateRevenue">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateSectorDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Update sector</h2>
        </v-card-title>
        <v-card-subtitle> Change the sector of the selected sector </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field v-model="updatedSector" label="Revenue" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetUpdateDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="updateSector">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateSizeDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Update size</h2>
        </v-card-title>
        <v-card-subtitle> Change the size of the selected size </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field v-model="updatedSize" label="Revenue" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetUpdateDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="updateSize">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteRevenueDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete revenue</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to delete the selected revenue? </v-card-subtitle>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetDeleteDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="deleteRevenue"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSectorDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete sector</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to delete the selected sector? </v-card-subtitle>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetDeleteDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="deleteSector"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSizeDialog" max-width="600">
      <v-card class="pa-5 bg-green-300" variant="outlined">
        <v-card-title>
          <h2>Delete size</h2>
        </v-card-title>
        <v-card-subtitle> Are you sure you want to delete the selected size? </v-card-subtitle>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn color="red-500" text @click="resetDeleteDialog"> Cancel </v-btn>
          <v-btn color="blue-800" text @click="deleteSize"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCompanySizeOptionsStore } from '@/stores/company-size-options'
import { useCompanyRevenueOptionsStore } from '@/stores/company-revenue-options'
import { useCompanySectorOptionsStore } from '@/stores/company-sector-options'
import { useToastStore } from '@/stores'
import { ref } from 'vue'

const updateRevenueDialog = ref(false)
const updateSectorDialog = ref(false)
const updateSizeDialog = ref(false)

const updatedRevenue = ref('')
const updatedSector = ref('')
const updatedSize = ref('')

const selectedRevenueId = ref(null)
const selectedSectorId = ref(null)
const selectedSizeId = ref(null)

const deleteRevenueDialog = ref(false)
const deleteSectorDialog = ref(false)
const deleteSizeDialog = ref(false)

const toastStore = useToastStore()
const { companySizeOptions } = storeToRefs(useCompanySizeOptionsStore())
const { companyRevenueOptions } = storeToRefs(useCompanyRevenueOptionsStore())
const { companySectorOptions } = storeToRefs(useCompanySectorOptionsStore())

useCompanySizeOptionsStore().getCompanySizeOptions()
useCompanyRevenueOptionsStore().getCompanyRevenueOptions()
useCompanySectorOptionsStore().getCompanySectorOptions()

const router = useRouter()

const handleAnswers = (serviceAnwers) => {
  if (serviceAnwers.success) {
    toastStore.createToast({
      message: 'Success',
      type: 'success'
    })
  } else {
    toastStore.createToast({
      message: serviceAnwers,
      type: 'error'
    })
  }
}

const handleRevenueDialog = (isDeleting, id) => {
  isDeleting ? (deleteRevenueDialog.value = true) : (updateRevenueDialog.value = true)
  selectedRevenueId.value = id
}

const handleSectorDialog = (isDeleting, id) => {
  isDeleting ? (deleteSectorDialog.value = true) : (updateSectorDialog.value = true)
  selectedSectorId.value = id
}

const handleSizeDialog = (isDeleting, id) => {
  isDeleting ? (deleteSizeDialog.value = true) : (updateSizeDialog.value = true)
  selectedSizeId.value = id
}

const resetUpdateDialog = () => {
  updateRevenueDialog.value = false
  selectedRevenueId.value = null
  updatedRevenue.value = ''

  updateSizeDialog.value = false
  selectedSizeId.value = null
  updatedSize.value = ''

  updateSectorDialog.value = false
  selectedSectorId.value = null
  updatedSector.value = ''
}

const resetDeleteDialog = () => {
  deleteRevenueDialog.value = false
  selectedRevenueId.value = null

  deleteSectorDialog.value = false
  selectedSectorId.value = null

  deleteSizeDialog.value = false
  selectedSizeId.value = null
}

const updateRevenue = async () => {
  const res = await useCompanyRevenueOptionsStore().updateCompanyRevenueOptions(
    selectedRevenueId.value,
    updatedRevenue.value
  )
  handleAnswers(res)
  updateRevenueDialog.value = false
  selectedRevenueId.value = null
  updatedRevenue.value = ''
}

const updateSector = async () => {
  const res = await useCompanySectorOptionsStore().updateCompanySectorOptions(
    selectedSectorId.value,
    updatedSector.value
  )
  handleAnswers(res)
  updateSectorDialog.value = false
  selectedSectorId.value = null
  updatedSector.value = ''
}

const updateSize = async () => {
  const res = await useCompanySizeOptionsStore().updateCompanySizeOptions(
    selectedSizeId.value,
    updatedSize.value
  )
  handleAnswers(res)
  updateSizeDialog.value = false
  selectedSizeId.value = null
  updatedSize.value = ''
}

const deleteRevenue = async () => {
  const res = await useCompanyRevenueOptionsStore().deleteCompanyRevenueOptions(
    selectedRevenueId.value
  )
  handleAnswers(res)
  deleteRevenueDialog.value = false
  selectedRevenueId.value = null
}

const deleteSector = async () => {
  const res = await useCompanySectorOptionsStore().deleteCompanySectorOptions(
    selectedSectorId.value
  )
  handleAnswers(res)
  deleteSectorDialog.value = false
  selectedSectorId.value = null
}

const deleteSize = async () => {
  const res = await useCompanySizeOptionsStore().deleteCompanySizeOptions(selectedSizeId.value)
  handleAnswers(res)
  deleteSizeDialog.value = false
  selectedSizeId.value = null
}
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
