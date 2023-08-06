<template>
  <h3>Draggable 1</h3>
  <draggable group="test" v-model="list1" item-key="id">
    <template #item="{ element }">
      <div class="card">{{ element.name }}</div>
    </template>
    <template #footer>
      <button @click="addPeople">Add</button>
    </template>
  </draggable>
  {{ list1 }}

  <h3>Draggable 2</h3>
  <draggable group="test" v-model="list2" item-key="id">
    <template #item="{ element }">
      <div class="card">{{ element.name }}</div>
    </template>
  </draggable>

  {{ list2 }}
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
const addPeople = () => {
  list1.value.push({ name: 'New', id: Math.random() })
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
