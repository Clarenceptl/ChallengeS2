import { defineStore } from 'pinia'
import { CompanySizeOptionsService } from '@/services/company-size-options.service'

export const useCompanySizeOptionsStore = defineStore('companySizeOptionsStore', {
  state: () => ({
    companySizeOptions: []
  }),
  actions: {
    async getCompanySizeOptions() {
      const res = await CompanySizeOptionsService.getCompanySizeOptions()
      if (res?.success) {
        this.companySizeOptions = res.data
      }
      return res
    },
    async updateCompanySizeOptions(id, sizeOption) {
      const res = await CompanySizeOptionsService.updateCompanySizeOptions(id, sizeOption)
      if (res?.success) {
        await this.getCompanySizeOptions()
      }
      return res
    },
    async deleteCompanySizeOptions(id) {
      const res = await CompanySizeOptionsService.deleteCompanySizeOptions(id)
      if (res?.success) {
        await this.getCompanySizeOptions()
      }
      return res
    },
    async createCompanySizeOptions(sizeOption) {
      const res = await CompanySizeOptionsService.createCompanySizeOptions(sizeOption)
      if (res?.success) {
        await this.getCompanySizeOptions()
      }
      return res
    }
  }
})
