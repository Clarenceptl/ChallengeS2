import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { AuthService, UserService } from '@/services'
import { formatDateToApi, clearTokens } from '@/helpers'

export const useUserStore = defineStore('userStore', () => {
  //#region values
  const contextUser = reactive({
    user: {}
  })
  //#endregion

  //#region getters
  const getContextUser = computed(() => contextUser.user)
  const isConnected = computed(() => !!contextUser.user?.id)
  // user roles
  const isAdmin = computed(() => contextUser.user?.roles?.includes('ROLE_ADMIN'))
  const isEmployer = computed(() => contextUser.user?.roles?.includes('ROLE_EMPLOYEUR'))
  //#endregion

  //#region Services methods
  const loadContextUser = async () => {
    if (!contextUser.user?.id) {
      const token = localStorage.getItem('bearer-token')
      if (!token) return null

      const res = await UserService.getSelfUser()
      if (res?.success) {
        Object.assign(contextUser.user, res.data)
      }
      return true
    }
  }

  const getUsers = async () => {
    const res = await UserService.getUsers()
    console.log(res)
    return res
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

  const logout = () => {
    clearTokens()
    contextUser.user = {}
  }

  const verifyEmail = async (token) => {
    return await AuthService.verifyEmail({ token })
  }
  //#endregion
  return {
    register,
    verifyEmail,
    login,
    loadContextUser,
    getContextUser,
    isConnected,
    logout,
    getUsers,
<<<<<<< HEAD
    isAdmin,
    isEmployer
=======
    isAdmin
>>>>>>> d851c1c (crud admin company options)
  }
})
