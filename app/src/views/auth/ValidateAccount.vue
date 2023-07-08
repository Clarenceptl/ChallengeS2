<template>
  <div>
    <v-progress-circular v-if="loading" color="appgrey" indeterminate size="80" width="7" />
    <h1 v-else>{{ verifMessage }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

const route = useRoute()
const loading = ref(true)
const token = route.params.token
const verifMessage = ref('')
const userStore = useUserStore()

onMounted(async () => {
  if (!token) {
    verifMessage.value = 'Une erreur est survenue.'
    loading.value = false
  }

  const res = await userStore.verifyEmail(token)
  if (res.success) {
    verifMessage.value = 'Votre compte a bien été vérifié.'
    loading.value = false
  } else {
    verifMessage.value = 'Une erreur est survenue.'
    loading.value = false
  }
})
</script>
