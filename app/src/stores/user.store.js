import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { AuthService, UserService } from '@/services'
import { formatDateToApi } from '@/helpers'
import jwtDecode from 'jwt-decode'
import { useToastStore } from './toast.store'

const { createToast } = useToastStore()

export const useUserStore = defineStore('userStore', () => {
  //#region values
  const contextUser = reactive({})
  //#endregion

  //#region getters
  const getContextUser = computed(() => contextUser)
  //#endregion

  //#region Services methods
  const loadContextUser = async () => {
    if (!contextUser.id) {
      const token = localStorage.getItem('bearer-token')
      if (!token) return createToast({ message: 'No token found', type: 'error' })

      const accessToken = jwtDecode(token)
      const { id } = accessToken
      const res = await UserService.getUser(id)
      if (res?.success) {
        Object.assign(contextUser, res.data)
      }
      return true
    }
  }

  const register = async (user) => {
    const body = { ...user, birthdate: formatDateToApi(user.birthdate) }
    return await AuthService.registerUser(body)
  }

  const login = async (data) => {
    const res = await AuthService.loginUser(data)
    if (res?.success) {
      localStorage.setItem('bearer-token', res.data.token)
      localStorage.setItem('refresh-token', res.data.refreshToken)
    }
    return res
  }

  const verifyEmail = async (token) => {
    return await AuthService.verifyEmail({ token })
  }
  //#endregion
  return { register, verifyEmail, login, loadContextUser, getContextUser }
})
