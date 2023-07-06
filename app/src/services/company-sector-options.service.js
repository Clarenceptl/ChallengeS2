const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
const authToken = localStorage.getItem('bearer-token') ?? ''
export class CompanySectorOptionsService {
  static async getCompanySectorOptions() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-sector-options`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
  static async updateCompanySectorOptions(id, sector) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-sector-options/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          sector: sector
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
  static async deleteCompanySectorOptions(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-sector-options/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
  static async createCompanySectorOptions(sector) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-sector-options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          sector: sector
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
