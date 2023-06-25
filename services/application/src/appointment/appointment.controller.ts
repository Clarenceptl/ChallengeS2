import { AppointmentService } from './appointment.service';
import { SERVICE_CMD } from '../global';
import { AppointmentDto } from './appointment.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Body, ValidationPipe } from '@nestjs/common';

export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_APPOINTMENT })
  public async createAppointment(appointment: AppointmentDto) {
    return this.appointmentService.createAppointment(appointment);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_APPOINTMENT })
  public async deleteAppointment(@Body(ValidationPipe) id) {
    return this.appointmentService.deleteAppointment(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_APPOINTMENT })
  public async updateAppointment(id, appointment: AppointmentDto) {
    return this.appointmentService.updateAppointment(id, appointment);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_APPOINTMENT_BY_ID })
  public async getAppointmentById(@Body(ValidationPipe) id) {
    return this.appointmentService.getAppointmentById(id);
  }
}
