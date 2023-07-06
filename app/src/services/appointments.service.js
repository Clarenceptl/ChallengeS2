const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
const authToken = localStorage.getItem('bearer-token') ?? ''
export class AppointmentsService {
  static async getAppointments() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments`, {
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
  static async createAppointment(appointment) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(appointment)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async acceptAppointment(appointmentId, boolean) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ accepted: boolean })
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
