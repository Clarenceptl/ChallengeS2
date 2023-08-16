import { defineStore } from 'pinia'
import { AppointmentsService } from '@/services/appointments.service'

export const useAppointmentsStore = defineStore('appointmentsStore', {
  state: () => ({
    appointments: []
  }),
  actions: {
    async getAppointments() {
      const res = await AppointmentsService.getAppointments()
      if (res?.success) {
        this.appointments = res.data
      }
      return res
    },
    async createAppointment(appointment) {
      const res = await AppointmentsService.createAppointment(appointment)
      if (res?.success) {
        await this.getAppointments();
      }
      return res
    },
    async acceptAppointment(appointmentId, appointment) {
      const res = await AppointmentsService.acceptAppointment(appointmentId, appointment)
      if (res?.success) {
        await this.getAppointments();
      }
      return res
    }
  }
})
