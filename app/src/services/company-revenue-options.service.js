const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class CompanyRevenueOptionsService {
  static async getCompanyRevenueOptions() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-revenue-options`, {
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
  static async updateCompanyRevenueOptions(id, revenue) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-revenue-options/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          revenue: revenue
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async deleteCompanyRevenueOptions(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-revenue-options/${id}`, {
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

  static async createCompanyRevenueOptions(revenue) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-revenue-options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          revenue: revenue
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
