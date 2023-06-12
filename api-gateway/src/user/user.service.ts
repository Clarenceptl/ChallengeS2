import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  type SuccessResponse,
  handleErrors
} from 'src/global';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getUser(id: string | null) {
    let res: SuccessResponse;
    if (!id) throw new BadRequestException('Id is required');

    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_USER }, id)
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }

  public async getSelfUser() {
    let res: SuccessResponse;

    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_SELF_USER }, {})
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }
}
