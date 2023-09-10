<template>
  <div class="d-flex justify-center">
    <v-expansion-panels class="w-50 mb-6">
      <v-expansion-panel>
        <v-expansion-panel-title disable-icon-rotate>
          Informations
          <template v-slot:actions>
            <v-icon color="error" icon="mdi-alert-circle"> </v-icon>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ul>
            <li>
              <v-icon
                :color="getColorStatus(statusFrontEmployeur.INIT)"
                :icon="statusFrontIcons.INIT"
              />
              : Application in progress
            </li>
            <li>
              <v-icon
                :color="getColorStatus(statusFrontEmployeur.PENDING)"
                :icon="statusFrontIcons.PENDING"
              />
              : Appointment in progress
            </li>
            <li>
              <v-icon
                :color="getColorStatus(statusFrontEmployeur.ACCEPTED)"
                :icon="statusFrontIcons.ACCEPTED"
              />
              : Application accepted
            </li>
            <li>
              <v-icon
                :color="getColorStatus(statusFrontEmployeur.REJECTED)"
                :icon="statusFrontIcons.REJECTED"
              />
              : Application rejected
            </li>
            <li>Your quiz attempt and your score will be saved.</li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { statusFrontIcons, statusFrontEmployeur } from '@/enums'
import { getColorStatus } from '@/helpers'
</script>
