import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  type SuccessResponse,
  handleErrors
} from 'src/global';
import { lastValueFrom } from 'rxjs';
import { CreateCompanySizeOptionRequest } from './company-size-options.dto';

@Injectable()
export class CompanySizeOptionsService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getCompanySizeOptions(): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_COMPANY_SIZE_OPTIONS }, {})
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getCompanySizeOptionsById(id: string): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.GET_COMPANY_SIZE_OPTIONS_BY_ID },
          id
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createCompanySizeOptions(
    data: CreateCompanySizeOptionRequest,
    tokenUser
  ): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_COMPANY_SIZE_OPTIONS },
          { size: data.size, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async updateCompanySizeOptions(
    data: CreateCompanySizeOptionRequest,
    id: string
  ): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      const { size } = data;
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_COMPANY_SIZE_OPTIONS },
          { size, id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async deleteCompanySizeOptions(id: string): Promise<SuccessResponse> {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.DELETE_COMPANY_SIZE_OPTIONS },
          { id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
