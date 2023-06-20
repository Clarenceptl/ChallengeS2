import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  type SuccessResponse,
  handleErrors
} from 'src/global';
import { lastValueFrom } from 'rxjs';

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
}
