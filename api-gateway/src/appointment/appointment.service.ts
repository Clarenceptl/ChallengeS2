import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import {
  AcceptAppointmentRequest,
  CreateAppointmentRequest
} from './appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getAppointments(tokenUser) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_APPOINTMENTS }, tokenUser)
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getAppointmentById(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.GET_APPOINTMENT_BY_ID },
          { id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createAppointment(data: CreateAppointmentRequest, tokenUser) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_APPOINTMENT },
          { appointment: data, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async acceptAppointment(
    id: string,
    data: AcceptAppointmentRequest,
    tokenUser
  ) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.ACCEPT_APPOINTMENT },
          { id, accepted: data.accepted, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getAppointmentsByJobId(id: string, tokenUser) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.GET_APPOINTMENTS_BY_JOB_ID },
          { id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
