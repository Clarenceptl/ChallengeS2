import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedUserRequest, LoginRequest } from './auth.dto';
import { SERVICE_CMD, SERVICE_NAME } from 'src/global';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICE_NAME.AUTH) private readonly client: ClientProxy
  ) {}

  public async register(data: CreatedUserRequest) {
    let res;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.REGISTER_USER }, data)
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return res;
  }

  public async login(data: LoginRequest) {
    let res: string;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.LOGIN_USER }, data)
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return { token: res };
  }
}
