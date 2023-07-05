import { defineStore } from 'pinia'
import { CompanySectorOptionsService } from '@/services/company-sector-options.service'

export const useCompanySectorOptionsStore = defineStore('companySectorOptionsStore', {
  state: () => ({
    companySectorOptions: []
  }),
  actions: {
    async getCompanySectorOptions() {
      const res = await CompanySectorOptionsService.getCompanySectorOptions()
      if (res?.success) {
        this.companySectorOptions = res.data
      }
      return res
    },
    async updateCompanySectorOptions(id, sectorOption) {
      const res = await CompanySectorOptionsService.updateCompanySectorOptions(id, sectorOption)
      if (res?.success) {
        await this.getCompanySectorOptions()
      }
      return res
    },
    async deleteCompanySectorOptions(id) {
      const res = await CompanySectorOptionsService.deleteCompanySectorOptions(id)
      if (res?.success) {
        await this.getCompanySectorOptions()
      }
      return res
    },
    async createCompanySectorOptions(sectorOption) {
      const res = await CompanySectorOptionsService.createCompanySectorOptions(sectorOption)
      if (res?.success) {
        await this.getCompanySectorOptions()
      }
      return res
    }
  }
})
