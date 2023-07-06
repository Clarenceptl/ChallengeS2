import { defineStore } from 'pinia'
import { CompanyRevenueOptionsService } from '@/services/company-revenue-options.service'

export const useCompanyRevenueOptionsStore = defineStore('companyRevenueOptionsStore', {
  state: () => ({
    companyRevenueOptions: []
  }),
  actions: {
    async getCompanyRevenueOptions() {
      const res = await CompanyRevenueOptionsService.getCompanyRevenueOptions()
      if (res?.success) {
        this.companyRevenueOptions = res.data
      }
      return res
    },
    async updateCompanyRevenueOptions(id, revenueOption) {
      const res = await CompanyRevenueOptionsService.updateCompanyRevenueOptions(id, revenueOption)
      if (res?.success) {
        await this.getCompanyRevenueOptions()
      }
      return res
    },
    async deleteCompanyRevenueOptions(id) {
      const res = await CompanyRevenueOptionsService.deleteCompanyRevenueOptions(id)
      if (res?.success) {
        await this.getCompanyRevenueOptions()
      }
      return res
    },
    async createCompanyRevenueOptions(revenueOption) {
      const res = await CompanyRevenueOptionsService.createCompanyRevenueOptions(revenueOption)
      if (res?.success) {
        await this.getCompanyRevenueOptions()
      }
      return res
    }
  }
})
