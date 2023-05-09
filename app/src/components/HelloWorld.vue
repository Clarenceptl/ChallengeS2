<script setup>
import useMousePosition from '@/composables/useMousePosition';

const { x, y } = useMousePosition();

defineProps({
  msg: {
    type: String,
    required: true
  }
})
const vTracking = (el, binding) => {
  console.log('el', el)
  console.log('binding', binding)
  console.log('binding.value', binding.value)
  console.log('binding.arg', binding.arg)
  el.addEventListener(binding.arg, () => {
    console.log('the event is', binding.arg)
    console.log('the value is', binding.value)
  })
  // call api to send data to the backend
  // vue plugin pour encapsuler le code
  // batching des requetes via service worker
  // fetch or becon api to send data to the backend, fetch if you need a response, becon if you don't
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <!-- button click me -->
    <button v-tracking:click="1 + 1">click me</button>
    <button v-track:ASWEER.click="'m'">track</button>
    <div>
      <p>Mouse position: {{ x }}, {{ y }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
