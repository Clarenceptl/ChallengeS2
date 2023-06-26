import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import { CreateCompanySectorOptionRequest } from './company-sector-options.dto';

@Injectable()
export class CompanySectorOptionsService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getCompanySectorOptions(): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_COMPANY_SECTOR_OPTIONS }, {})
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getCompanySectorOptionById(id: string) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.GET_COMPANY_SECTOR_OPTIONS_BY_ID },
          { id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createCompanySectorOption(
    data: CreateCompanySectorOptionRequest
  ) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_COMPANY_SECTOR_OPTIONS },
          data
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async updateCompanySectorOption(
    data: CreateCompanySectorOptionRequest,
    id: string
  ): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      const { sector } = data;
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_COMPANY_SECTOR_OPTIONS },
          { sector, id }
        )
      );
    } catch (error) {
      console.log('error');
      handleErrors(error);
    }
    return res;
  }

  public async deleteCompanySectorOption(id: string): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.DELETE_COMPANY_SECTOR_OPTIONS },
          { id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
