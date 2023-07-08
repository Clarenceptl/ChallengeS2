const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL

export class UsersService {
  static async getUser(id) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users/${id.toString()}`, {
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

  static async getUsers() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users`, {
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
  static async getSelfUser() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/users/getSelf`, {
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
