import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { AuthService } from '@/services'
import { formatDateToApi } from '@/helpers'
import jwtDecode from 'jwt-decode'

export const useUserStore = defineStore('userStore', () => {
  //#region values
  const contextUser = reactive({})
  //#endregion

  //#region Computed
  const getContextConnexion = computed(() => contextUser)
  //#endregion

  //#region Services methods
  const register = async (user) => {
    const body = { ...user, birthdate: formatDateToApi(user.birthdate) }
    return await AuthService.registerUser(body)
  }

  const login = async (data) => {
    const res = await AuthService.loginUser(data)
    console.log(res, 'res')
    if (res?.success) {
      localStorage.setItem('bearer-token', res.token)
      const accessToken = jwtDecode(res.token)
      const { id, ...token } = accessToken
      contextUser.id = id
      contextUser.accessToken = token
      console.log(contextUser, 'contextUser')
    }
    return res
  }

  const verifyEmail = async (token) => {
    return await AuthService.verifyEmail({ token })
  }
  //#endregion
  return { register, verifyEmail, login, getContextConnexion }
})
