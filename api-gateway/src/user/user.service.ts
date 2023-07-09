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

  public async getSelfUser(id: string | null) {
    let res: SuccessResponse;

    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_SELF_USER }, id)
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }

  public async getUsers(tokenUser: any) {
    let res: SuccessResponse;

    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_USERS }, { tokenUser })
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }

  public async getMyJobs(tokenUser: any) {
    let res: SuccessResponse;

    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_MY_JOBS }, { tokenUser })
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }

  public async updateUser(uuid: string, payload: any, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_USER },
          { id: uuid, data: payload, tokenUser }
        )
      );
    } catch (error) {
      console.log('error', error);
      handleErrors(error);
    }
    return res;
  }
}
