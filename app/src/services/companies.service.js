const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class CompaniesService {
  static async getCompanies() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/companies`, {
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
  static async createCompany(company) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify(company)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async updateCompany(id, company) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/companies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify(company)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
