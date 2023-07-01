import { AppointmentService } from './appointment.service';
import { Roles, SERVICE_CMD } from '../global';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { UserRole } from 'src/users/users.entity';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_APPOINTMENT })
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public async createAppointment(@Payload(ValidationPipe) payload) {
    const { appointment, tokenUser } = payload;
    return this.appointmentService.createAppointment(appointment, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_APPOINTMENT })
  public async deleteAppointment(@Body(ValidationPipe) id) {
    return this.appointmentService.deleteAppointment(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.ACCEPT_APPOINTMENT })
  @Roles(UserRole.ROLE_USER)
  public async acceptAppointment(@Payload(ValidationPipe) payload) {
    const { id, accepted, tokenUser } = payload;
    return this.appointmentService.acceptAppointment(id, accepted, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_APPOINTMENT_BY_ID })
  public async getAppointmentById(@Payload(ValidationPipe) payload) {
    const { id, tokenUser } = payload;
    return this.appointmentService.getAppointmentById(id, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_APPOINTMENTS })
  public async getAppointments(@Payload(ValidationPipe) tokenUser) {
    return this.appointmentService.getAppointments(tokenUser);
  }
}
