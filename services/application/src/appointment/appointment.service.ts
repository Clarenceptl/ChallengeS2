import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AppointmentDto, CreateAppointmentRequest } from './appointment.dto';
import { SendEmailRequest } from '../users/users.dto';
import { lastValueFrom } from 'rxjs';
import { User, UserRole } from 'src/users/users.entity';
import { JobAds } from 'src/job-ads/job-ads.entity';
import e from 'express';

@Injectable()
export class AppointmentService {
  public constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(JobAds)
    private readonly jobAdsRepository: Repository<JobAds>,
    @Inject(SERVICE_NAME.MAILING)
    private readonly mailingService: ClientProxy
  ) {}

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
      return this.appointmentRepository.delete(id);
    } catch (error) {
      throw new RpcException('Appointment not found');
    }
  }

  public async getAppointments(tokenUser: User) {
    let res: Appointment[];
    try {
      if (tokenUser.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
        res = await this.appointmentRepository.find({
          where: {
            employee: {
              id: tokenUser.id
            }
          },
          select: {
            employee: {},
            candidate: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              birthdate: true
            },
            job: {
              id: true,
              title: true,
              description: true,
              city: true,
              contractType: true,
              salary: true,
              country: true
            }
          }
        });
      } else {
        console.log('tokenUser', tokenUser);
        res = await this.appointmentRepository.find({
          where: {
            candidate: {
              id: tokenUser.id
            }
          },
          select: {
            employee: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              birthdate: true
            },
            candidate: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              birthdate: true
            },
            job: {
              id: true,
              title: true,
              description: true,
              city: true,
              contractType: true,
              salary: true,
              country: true
            }
          }
        });
      }
      console.log('res', res);
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

  public async getAppointmentById(
    id: string,
    tokenUser: User
  ): Promise<SuccessResponse> {
    let res: Appointment;
    try {
      res = await this.appointmentRepository.findOneBy({ id: parseInt(id) });
      if (tokenUser.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
        if (res.employee.id !== tokenUser.id) {
          throw new RpcException({
            statusCode: 403,
            message: 'Forbidden'
          });
        }
      } else {
        if (res.candidate.id !== tokenUser.id) {
          throw new RpcException({
            statusCode: 403,
            message: 'Forbidden'
          });
        }
      }
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Appointment not found'
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

  public async createAppointment(
    appointment: CreateAppointmentRequest,
    tokenUser: User
  ): Promise<SuccessResponse> {
    let res: Appointment;
    try {
      const newAppointment = new Appointment();
      const candidate = await this.userRepository.findOneBy({
        id: appointment.candidateId
      });
      const jobAd = await this.jobAdsRepository.findOneBy({
        id: parseInt(appointment.jobAdId)
      });
      newAppointment.employee = tokenUser;
      newAppointment.candidate = candidate;
      newAppointment.job = jobAd;
      newAppointment.time = appointment.time;

      res = await this.appointmentRepository.save(newAppointment);
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

  public async acceptAppointment(
    id: string,
    accepted: boolean,
    tokenUser: User
  ): Promise<SuccessResponse> {
    let res: Appointment;
    try {
      const appointment = await this.appointmentRepository.findOneBy({
        id: parseInt(id)
      });
      if (!appointment) {
        throw new RpcException({
          statusCode: 404,
          message: 'Appointment not found'
        });
      }
      if (tokenUser.id !== appointment.candidate.id) {
        throw new RpcException({
          statusCode: 403,
          message: 'Forbidden'
        });
      }
      appointment.accepted = accepted;
      res = await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new RpcException({
        statusCode: error.error.statusCode ?? 500,
        message: error.error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async getAppointmentsByJobId(
    jobId: string,
    tokenUser: User
  ): Promise<SuccessResponse> {
    let res: Appointment[];
    try {
      const jobAd = await this.jobAdsRepository.findOneBy({
        id: parseInt(jobId)
      });
      if (!jobAd) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job Ad not found'
        });
      }
      if (tokenUser.company.id !== jobAd.company.id) {
        throw new RpcException({
          statusCode: 403,
          message: 'Forbidden'
        });
      }
      res = await this.appointmentRepository.find({
        where: {
          job: {
            id: parseInt(jobId)
          }
        },
        select: {
          employee: {},
          candidate: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            birthdate: true
          },
          job: {
            id: true,
            title: true,
            description: true,
            city: true,
            contractType: true,
            salary: true,
            country: true
          }
        }
      });
    } catch (error) {
      throw new RpcException({
        statusCode: error.error.statusCode ?? 500,
        message: error.error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }
}
