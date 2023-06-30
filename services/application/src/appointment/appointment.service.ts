import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Inject } from '@nestjs/common';
import { SERVICE_CMD, SERVICE_NAME } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AppointmentDto } from './appointment.dto';
import { SendEmailRequest } from '../users/users.dto';
import { lastValueFrom } from 'rxjs';
import { User, UserRole } from 'src/users/users.entity';

export class AppointmentService {
  public constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @Inject(SERVICE_NAME.MAILING)
    private readonly mailingService: ClientProxy
  ) {}

  public async createAppointment(appointment: AppointmentDto) {
    try {
      const savedAppointment = this.appointmentRepository.create(appointment);
      await this.appointmentRepository.save(savedAppointment);
    } catch (error) {
      throw new RpcException('error');
    }
    const resultAppointmentEmail: SendEmailRequest = {
      email: appointment.candidate.email,
      firstname: appointment.candidate.firstname
    };

    console.log('envoi email');
    const res = await lastValueFrom(
      this.mailingService.emit<SendEmailRequest>(
        SERVICE_CMD.GET_REGISTER_MAIL,
        resultAppointmentEmail
      )
    );
    console.log('response email', res);
    return { success: true, message: 'Appointment' };
  }

  public async getAppointmentById(id) {
    return this.appointmentRepository.findOne(id);
  }

  //TODO where do we add the body related to the email?
  public async deleteAppointment(id) {
    try {
      const appointment = await this.appointmentRepository.findOne(id);
      if (!appointment) {
        throw new RpcException('Appointment not found');
      }
      const resultAppointmailEmail: SendEmailRequest = {
        // email: appointment.candidate.email,
        // firstname: appointment.candidate.firstname
        email: 'toto@gmail.com',
        firstname: 'toto'
      };

      console.log('envoi email');
      const res = await lastValueFrom(
        this.mailingService.emit<SendEmailRequest>(
          SERVICE_CMD.GET_REGISTER_MAIL,
          resultAppointmailEmail
        )
      );
      console.log('response email', res);
      return this.appointmentRepository.delete(id);
    } catch (error) {
      throw new RpcException('Appointment not found');
    }
  }

  public async updateAppointment(id, appointment) {
    return this.appointmentRepository.update(id, appointment);
  }

  public async getAppointments(tokenUser: User) {
    let res: Appointment[];
    try {
      if (tokenUser.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
        res = await this.appointmentRepository.find({
          where: { employee: tokenUser }
        });
      } else {
        res = await this.appointmentRepository.find({
          where: { candidate: tokenUser }
        });
      }
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }
}
