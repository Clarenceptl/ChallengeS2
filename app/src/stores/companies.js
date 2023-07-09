import { defineStore } from 'pinia'
import { CompaniesService } from '@/services/companies.service'
import { UsersService } from '@/services/users.service'

export const useCompaniesStore = defineStore('companiesStore', {
  state: () => ({
    companies: []
  }),
  actions: {
    async getCompanies() {
      const res = await CompaniesService.getCompanies()
      if (res?.success) {
        this.companies = res.data
      }
      return res
    },
    async createCompany(company) {
      const res = await CompaniesService.createCompany(company)
      if (res?.success) {
        await this.getCompanies();
      }
      return res
    },
    async updateCompany(companyId, company) {
      const res = await CompaniesService.updateCompany(companyId, company)
      if (res?.success) {
        await UsersService.getSelfUser()
      }
      return res
    }
  }
})
