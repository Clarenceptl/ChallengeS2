import { defineStore } from 'pinia'
import { AppointmentsService } from '@/services/appointments.service'

export const useAppointmentsStore = defineStore('appointmentsStore', {
  state: () => ({
    appointments: [],
    appointmentsByJobId: []
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
    async acceptAppointment(appointmentId, boolean) {
      const res = await AppointmentsService.acceptAppointment(appointmentId, boolean)
      if (res?.success) {
        await this.getAppointments();
      }
      return res
    },
    async getAppointmentsByJobId(jobId) {
      const res = await AppointmentsService.getAppointmentsByJobId(jobId)
      if (res?.success) {
        this.appointmentsByJobId = res.data
      }
      return res
    }
  }
})
