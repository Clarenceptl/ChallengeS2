import { defineStore } from 'pinia'
import { UsersService } from '@/services/users.service'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    me: {},
    myJobs: []
  }),
  actions: {
    async getMe() {
      const res = await UsersService.getSelf()
      if (res?.success) {
        this.me = res.data
      }
      return res
    },
    async getMyJobs() {
      const res = await UsersService.getMyJobs()
      if (res?.success) {
        this.myJobs = res.data
      }
      return res
    }
  }
})
