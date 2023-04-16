import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedUserRequest } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  public register(data: CreatedUserRequest) {
    return this.client.send({ cmd: 'register-user' }, data);
  }
}
