import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SERVICE_NAME, SERVICE_CMD } from '../enum';
import { lastValueFrom } from 'rxjs';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, CreatedUserRequest } from './auth.dto';
import { checkDate, formatDate } from 'src/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SERVICE_NAME.APP) private readonly client: ClientProxy
  ) {}

  public async login(data: LoginRequest) {
    const user = await lastValueFrom(
      this.client.send({ cmd: SERVICE_CMD.GET_USER_BY_EMAIL }, data.email)
    );

    if (!user) {
      throw new RpcException({
        error: 400,
        message: 'Email or password invalid'
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        error: 400,
        message: 'Your account is not verified'
      });
    }

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword) {
      throw new RpcException({
        error: 400,
        message: 'Email or password invalid'
      });
    }

    const token = this.jwtService.sign({
      id: user.id
    });

    return token;
  }

  public async register(data: CreatedUserRequest) {
    if (data.password !== data.confirmPassword) {
      throw new RpcException({
        statusCode: 400,
        message: 'Password and confirm password must be equal'
      });
    }
    data.birthdate = formatDate(data.birthdate);
    const check = checkDate(data.birthdate);
    if (!check) {
      throw new RpcException({ statusCode: 400, message: 'Birthdate invalid' });
    }

    delete data.confirmPassword;

    const res = await lastValueFrom(
      this.client.send({ cmd: SERVICE_CMD.CREATE_USER }, data)
    );

    return res;
  }
}
