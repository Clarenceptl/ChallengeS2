const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL

export class UserService {
  static async getUser(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/user/${id.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
