const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class CompanySizeOptionsService {
  static async getCompanySizeOptions() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-size-options`, {
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
  static async updateCompanySizeOptions(id, size) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-size-options/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          size: size
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
  static async deleteCompanySizeOptions(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-size-options/${id}`, {
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
  static async createCompanySizeOptions(size) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/company-size-options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          size: size
        })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
