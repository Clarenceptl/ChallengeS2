import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SERVICE_NAME, SERVICE_CMD } from '../enum';
import { lastValueFrom } from 'rxjs';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, CreatedUserRequest, ResetPassword } from './auth.dto';
import { checkDate, formatDate } from 'src/helpers';
import { User } from './auth.dto';
import { SuccessResponse } from 'src/global';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SERVICE_NAME.APP) private readonly client: ClientProxy,
    @Inject(SERVICE_NAME.MAIL) private readonly clientMail: ClientProxy
  ) {}

  public getRefreshToken(data: { user: User; refreshToken: string }) {
    const { refreshToken, user } = data;
    const payload = this.jwtService.verify(refreshToken);
    const { email } = payload;
    if (!email || email !== user.email) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }
    const newToken = this.jwtService.sign(
      {
        id: user.id
      },
      {
        expiresIn: '1h'
      }
    );
    const res = {
      refreshToken,
      token: newToken
    };
    return { success: true, data: res };
  }

  public async login(data: LoginRequest) {
    const user = await lastValueFrom(
      this.client.send({ cmd: SERVICE_CMD.GET_USER_BY_EMAIL }, data.email)
    );

    if (!user) {
      throw new RpcException({
        statusCode: 400,
        message: 'Email or password invalid'
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        statusCode: 400,
        message: 'Your account is not verified'
      });
    }

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword) {
      throw new RpcException({
        statusCode: 400,
        message: 'Email or password invalid'
      });
    }

    const token = this.jwtService.sign(
      {
        id: user.id
      },
      {
        expiresIn: '1h'
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        email: user.email
      },
      {
        expiresIn: '1d'
      }
    );

    const response = {
      refreshToken,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        roles: user.roles,
        company: user.company,
        candidatures: user.candidatures
      }
    };

    return { success: true, data: response };
  }

  public async register(data: CreatedUserRequest) {
    if (data.password !== data.confirmPassword) {
      throw new RpcException({
        statusCode: 400,
        message: 'Password and confirm password must be equal'
      });
    }
    delete data.confirmPassword;
    data.birthdate = formatDate(data.birthdate);
    const check = checkDate(data.birthdate);
    if (!check) {
      throw new RpcException({ statusCode: 400, message: 'Birthdate invalid' });
    }

    const res = await lastValueFrom(
      this.client.send({ cmd: SERVICE_CMD.CREATE_USER }, data)
    );

    return res;
  }

  public async verifyAccount(token: string) {
    let res;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.VERIFY_ACCOUNT }, token)
      );
    } catch (error) {
      throw new RpcException(error);
    }

    return res;
  }

  public async sendMailResetPassword(emailSend: string) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.UPDATE_TOKEN_USER }, emailSend)
      );
    } catch (error) {
      throw new RpcException(error);
    }

    if (!res.success) {
      throw new RpcException({
        statusCode: 404,
        message: 'Email not found'
      });
    }

    console.log(res);

    const { token, email, firstname } = res.data;

    const data = { token, email, firstname };
    this.clientMail.emit(SERVICE_CMD.SEND_EMAIL_RESET_PASSWORD, data);
    return {
      success: true,
      data: {
        message: 'Email sent'
      }
    };
  }

  async resetPassword(data: ResetPassword): Promise<SuccessResponse> {
    const { token, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      throw new RpcException({
        statusCode: 400,
        message: 'Password and confirm password must be equal'
      });
    }
    try {
      await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.RESET_PASSWORD },
          { token, password }
        )
      );
    } catch (error) {
      throw new RpcException(error);
    }
    return {
      success: true,
      data: {
        message: 'Password updated'
      }
    };
  }
}
