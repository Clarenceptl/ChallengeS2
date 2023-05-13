import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedUserRequest, LoginRequest } from './auth.dto';
import { SERVICE_CMD, SERVICE_NAME } from 'src/global';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICE_NAME.AUTH) private readonly client: ClientProxy
  ) {}

  public register(data: CreatedUserRequest) {
    return this.client.send({ cmd: SERVICE_CMD.REGISTER_USER }, data);
  }

  public login(data: LoginRequest) {
    return this.client.send({ cmd: SERVICE_CMD.LOGIN_USER }, data);
  }
}
