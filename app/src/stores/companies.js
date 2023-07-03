import { defineStore } from 'pinia'
import { CompaniesService } from '@/services/companies.service'
import { useRouter } from 'vue-router'

const router = useRouter()

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
        router.push({ name: 'CompanyInformationsList' })
      }
      return res
    }
  }
})
