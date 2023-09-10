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
            <li>If you pass a column you can't get back. You can only move forward.</li>
            <li>Once rejected, you can't cancel it.</li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup></script>
