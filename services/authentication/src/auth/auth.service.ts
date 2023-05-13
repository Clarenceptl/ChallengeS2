import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE_NAME, SERVICE_CMD } from '../enum';

@Injectable()
export class AuthService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async login(data: any) {
    const user = await this.client.send({ cmd: SERVICE_CMD.LOGIN_USER }, data);

    if (!user) {
      throw new BadRequestException('Email or password invalid');
    }

    const isValidPassword = await user.isValidPassword(loginRequest.password);

    if (!isValidPassword) {
      throw new BadRequestException('Email or password invalid');
    }

    const token = this.jwtService.sign({
      id: user.id
    });

    return token;
  }

  public register(data: any) {
    return data;
  }
}
