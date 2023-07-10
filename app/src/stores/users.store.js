import { defineStore } from 'pinia'
import { AuthService } from '@/services'
import { UsersService } from '@/services/users.service'
import { formatDateToApi, clearTokens } from '@/helpers'


export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    user: {},
    me: {}
  }),
  actions: {
    async getUsers() {
      const res = await UsersService.getUsers()
      if (res?.success) {
        this.users = res.data
      }
      return res
    },
    async getUser(id) {
      const res = await UsersService.getUser(id)
      if (res?.success) {
        this.user = res.data
      }
      return res
    },
    async getSelfUser() {
      const res = await UsersService.getSelfUser()
      if (res?.success) {
        this.me = res.data
        return res.data
      }
      return res.data
    },
    async updateUser(id, data) {
      const res = await UsersService.updateUser(id, data)
      if (res?.success) {
        this.me = res.data
        await UsersService.getSelfUser()
      }
      return res
    },
    async register(user) {
      const body = { ...user, birthdate: formatDateToApi(user.birthdate) }
      return await AuthService.registerUser(body)
    },
    async login(data) {
      const res = await AuthService.loginUser(data)
      if (res?.success) {
        localStorage.setItem('bearer-token', res.data.token)
        localStorage.setItem('refresh-token', res.data.refreshToken)
        this.me = res.data.user
      }
      return res
    },
    logout() {
      clearTokens()
      this.me = {}
    },
    async verifyEmail(token) {
      return await AuthService.verifyEmail({ token })
    },
    async loadData() {
      if (!this.me?.id) {
        await this.getSelfUser()
      }
    }
  },
  getters: {
    isAdmin() {
      return this.me?.roles?.includes('ROLE_ADMIN')
    },
    isEmployer() {
      return this.me?.roles?.includes('ROLE_EMPLOYEUR')
    },
    isUser() {
      return !this.isAdmin && !this.isEmployer
    },
    isConnected() {
      return !!this.me?.id
    }
  }
})