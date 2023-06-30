import { AppointmentService } from './appointment.service';
import { Roles, SERVICE_CMD } from '../global';
import { AppointmentDto } from './appointment.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Body, ValidationPipe } from '@nestjs/common';
import { UserRole } from 'src/users/users.entity';

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

  @MessagePattern({ cmd: SERVICE_CMD.GET_APPOINTMENTS })
  @Roles(UserRole.ROLE_EMPLOYEUR || UserRole.ROLE_USER)
  public async getAppointments(@Payload(ValidationPipe) tokenUser) {
    return this.appointmentService.getAppointments(tokenUser);
  }
}
