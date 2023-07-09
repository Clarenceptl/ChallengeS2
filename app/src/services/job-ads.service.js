const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class JobAdsService {
  static async getJobAds() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async getMyJobs() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users/my-jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async createJobAd(jobAd) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          ...jobAd,
          salary: parseInt(jobAd.salary),
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async updateJobAd(id, jobAd) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          ...jobAd,
          salary: parseInt(jobAd.salary),
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async deleteJobAd(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async applyJobAd(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads/apply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async getJobAd(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/job-ads/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
