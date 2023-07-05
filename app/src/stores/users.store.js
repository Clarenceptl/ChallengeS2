import { defineStore } from 'pinia'
import { UsersService } from '@/services/users.service'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    me: {}
  }),
  actions: {
    async getMe() {
      const res = await UsersService.getSelf()
      if (res?.success) {
        this.me = res.data
      }
      return res
    }
  }
})
