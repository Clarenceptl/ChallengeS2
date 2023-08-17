import { defineStore } from 'pinia'
import { JobAdsService } from '@/services/job-ads.service'

export const useJobAdsStore = defineStore('jobAdsStore', {
  state: () => ({
    jobAds: [],
    myJobs: [],
    jobAd: {}
  }),
  actions: {
    async getJobAds() {
      const res = await JobAdsService.getJobAds()
      if (res?.success) {
        this.jobAds = res.data
      }
      return res
    },
    async getMyJobs() {
      const res = await JobAdsService.getMyJobs()
      if (res?.success) {
        this.myJobs = res.data
      }
      return res
    },
    async createJobAd(jobAd) {
      const res = await JobAdsService.createJobAd(jobAd)
      if (res?.success) {
        await this.getMyJobs()
      }
      return res
    },
    async updateJobAd(id, jobAd) {
      const res = await JobAdsService.updateJobAd(id, jobAd)
      if (res?.success) {
        await this.getMyJobs()
      }
      return res
    },
    async deleteJobAd(id) {
      const res = await JobAdsService.deleteJobAd(id)
      if (res?.success) {
        await this.getMyJobs()
      }
      return res
    },
    async applyJobAd(id) {
      const res = await JobAdsService.applyJobAd(id)
      if (res?.success) {
        await this.getJobAds()
      }
      return res
    },
    async getJobAd(id) {
      const res = await JobAdsService.getJobAd(id)
      if (res?.success) {
        this.jobAd = res.data
      }
      return res
    }
  }
})
