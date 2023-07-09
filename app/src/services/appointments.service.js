const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL
export class AppointmentsService {
  static async getAppointments() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments`, {
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
  static async createAppointment(appointment) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify(appointment)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }

  static async acceptAppointment(appointmentId, appointment) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify(appointment)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
      return error.response
    }
  }
}
