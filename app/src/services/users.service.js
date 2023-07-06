const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
const authToken = localStorage.getItem('bearer-token') ?? ''
export class UsersService {
  static async getSelf() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users/getSelf`, {
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

  static async getMyJobs() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users/my-jobs`, {
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
}
