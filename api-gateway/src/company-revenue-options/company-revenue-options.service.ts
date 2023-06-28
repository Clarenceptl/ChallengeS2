import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import { CreateCompanyRevenueOptionRequest } from './company-revenue-options.dto';

@Injectable()
export class CompanyRevenueOptionsService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getCompanyRevenueOptions() {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_COMPANY_REVENUE_OPTIONS }, {})
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getCompanyRevenueOptionsById(id: string) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.GET_COMPANY_REVENUE_OPTIONS_BY_ID },
          { id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createCompanyRevenueOptions(
    data: CreateCompanyRevenueOptionRequest,
    tokenUser
  ) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_COMPANY_REVENUE_OPTIONS },
          { revenue: data.revenue, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async updateCompanyRevenueOptions(
    data: CreateCompanyRevenueOptionRequest,
    id: string,
    tokenUser
  ) {
    let res: SuccessResponse;
    try {
      const { revenue } = data;
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_COMPANY_REVENUE_OPTIONS },
          { revenue, id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async deleteCompanyRevenueOptions(id: string, tokenUser) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.DELETE_COMPANY_REVENUE_OPTIONS },
          { id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
