<template>
  <v-container class="h-100">
    <v-row>
      <v-col class="bg-grey-100 rounded">
        <h2 class="mb-4">Candidats</h2>
        <draggable
          id="candidat"
          @end="test"
          group="test"
          v-model="list1"
          item-key="id"
        >
          <template #item="{ element }">
            <v-card :title="element.name" subtitle="Subtitle" text="..." class="mb-3">
              <v-card-actions>
                <v-btn>Click me</v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <template #footer>
            <button @click="addPeople">Add</button>
          </template>
        </draggable>
      </v-col>
      <v-col class="ml-2 bg-grey-100 rounded">
        <h2 class="mb-4">En attente</h2>
        <draggable id="en-attente" group="test" v-model="list2" item-key="id">
          <template #item="{ element }">
            <v-card :title="element.name" subtitle="Subtitle" text="...">
              <v-card-actions>
                <v-btn>Click me</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </draggable>
      </v-col>
      <v-col class="ml-2 bg-grey-100 rounded">
        <h2 class="mb-4">Acceptés</h2>
        <draggable id="accepted" group="test" v-model="list3" item-key="id">
          <template #item="{ element }">
            <v-card :title="element.name" subtitle="Subtitle" text="...">
              <v-card-actions>
                <v-btn>Click me</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </draggable>
      </v-col>
      <v-col class="ml-2 bg-grey-100 rounded">
        <h2 class="mb-4">Refusés</h2>
        <draggable id="refused" group="test" v-model="list4" item-key="id">
          <template #item="{ element }">
            <v-card :title="element.name" subtitle="Subtitle" text="...">
              <v-card-actions>
                <v-btn>Click me</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list1 = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 }
])

const list2 = ref([{ name: 'Johnd', id: 1 }])
const list3 = ref([])
const list4 = ref([])
const addPeople = () => {
  list1.value.push({ name: 'New', id: Math.random() })
}
const test = (val) => {
  console.log(val)
}
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
}
</style>
