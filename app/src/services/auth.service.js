export class AuthService {
  static async registerUser(user) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/auth/register`, {
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
}
