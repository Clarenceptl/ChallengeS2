import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import { CreateCompanyRequest } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getCompanies() {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_COMPANIES }, {})
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getCompany(id: string) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_COMPANY }, id)
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createCompany(data: CreateCompanyRequest, user) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_COMPANY },
          {
            data,
            user
          }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
