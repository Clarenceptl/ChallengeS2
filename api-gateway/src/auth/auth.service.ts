import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedUserRequest, LoginRequest } from './auth.dto';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  type SuccessResponse,
  handleErrors
} from 'src/global';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICE_NAME.AUTH) private readonly client: ClientProxy
  ) {}

  public async register(data: CreatedUserRequest) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.REGISTER_USER }, data)
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async login(data: LoginRequest) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.LOGIN_USER }, data)
      );
    } catch (error) {
      handleErrors(error);
    }

    return res;
  }

  public async verifyAccount(token: string | undefined) {
    if (!token) throw new BadRequestException('Token is required');
    try {
      await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.VERIFY_ACCOUNT }, token)
      );
    } catch (error) {
      handleErrors(error);
    }

    return { success: true, message: 'Votre email est vérifié' };
  }

  public async getRefreshToken(refreshToken: string | undefined) {
    if (!refreshToken) throw new BadRequestException('Token is required');
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_REFRESH_TOKEN }, refreshToken)
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
