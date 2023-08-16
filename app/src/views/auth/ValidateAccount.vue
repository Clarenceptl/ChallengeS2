<template>
  <div class="text-center">
    <v-progress-circular v-if="loading" color="appgrey" indeterminate size="80" width="7" />
    <h1 v-else>{{ verifMessage }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../../stores/users.store'

const route = useRoute()
const loading = ref(true)
const token = route.params.token
const verifMessage = ref('')

onMounted(async () => {
  if (!token) {
    verifMessage.value = 'Une erreur est survenue.'
    loading.value = false
  }

  const res = await useUsersStore().verifyEmail(token)
  if (res.success) {
    verifMessage.value = 'Votre compte a bien été vérifié.'
    loading.value = false
  } else {
    verifMessage.value = 'Une erreur est survenue.'
    loading.value = false
  }
})
</script>
