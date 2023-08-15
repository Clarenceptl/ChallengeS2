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
import {
  STATUS,
  UpdateStatusDTO
} from '../candidate-job-ads/candidates-job-ads.entity';
import { CandidateJobAdsService } from '../candidate-job-ads/candidate-job-ads.service';

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
    private readonly mailingService: ClientProxy,
    private readonly candidateJobAdsService: CandidateJobAdsService
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

    const candidate = await this.userRepository.findOneBy({
      id: appointment.candidateId
    });

    const checkAlreadyAppointment = await this.appointmentRepository.findOneBy({
      candidate: {
        id: appointment.candidateId
      },
      job: {
        id: parseInt(appointment.jobAdId)
      }
    });

    if (checkAlreadyAppointment) {
      throw new RpcException({
        statusCode: 400,
        message: 'Appointment already exist'
      });
    }

    const newAppointment = new Appointment();

    const jobAd = await this.jobAdsRepository.findOneBy({
      id: parseInt(appointment.jobAdId)
    });
    if (!tokenUser.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
      throw new RpcException({
        statusCode: 403,
        message: 'Forbidden'
      });
    }

    if (!candidate) {
      throw new RpcException({
        statusCode: 404,
        message: 'Candidate not found'
      });
    }

    if (!jobAd) {
      throw new RpcException({
        statusCode: 404,
        message: 'Job ad not found'
      });
    }

    const checkCandidature = candidate.candidatesJobAds.find(
      (candidateJobAd) => candidateJobAd.jobAds.id === jobAd.id
    );

    const checkStatusArray = [STATUS.INIT, STATUS.PENDING];
    console.log('checkCandidature', checkCandidature.status);
    console.log('checkStatusArray', checkStatusArray);
    if (
      !checkCandidature ||
      !checkStatusArray.includes(checkCandidature.status)
    ) {
      throw new RpcException({
        statusCode: 400,
        message: 'Candidate status is not valid'
      });
    }

    newAppointment.employee = tokenUser;
    newAppointment.candidate = candidate;
    newAppointment.job = jobAd;
    newAppointment.time = appointment.time;

    const payloadChangeStatus: UpdateStatusDTO = {
      tokenUser,
      id: checkCandidature.id,
      status: STATUS.PENDING
    };
    try {
      res = await this.appointmentRepository.save(newAppointment);
      if (checkCandidature.status === STATUS.INIT) {
        await this.candidateJobAdsService.updateStatusCandidate(
          payloadChangeStatus
        );
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

  public async acceptAppointment(
    id: string,
    data: any,
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
      Object.assign(appointment, data);
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
}
