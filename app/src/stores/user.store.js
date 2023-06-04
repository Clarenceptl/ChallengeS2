import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthService } from '@/services'
import { formatDateToApi } from '@/helpers'

export const useUserStore = defineStore('userStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const register = async (user) => {
    const body = { ...user, birthdate: formatDateToApi(user.birthdate) }
    return await AuthService.registerUser(body)
  }

  const verifyEmail = async (token) => {
    return await AuthService.verifyEmail({ token })
  }

  return { count, doubleCount, increment, register, verifyEmail }
})
