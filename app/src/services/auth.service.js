const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class AuthService {
  static async registerUser(user) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async loginUser(user) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async verifyEmail(data) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/verify-account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async refreshToken(refreshToken) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({ refreshToken })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async sendEmailResetPassword(email) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/send-email-reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
  static async resetPassword(data) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/reset-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
