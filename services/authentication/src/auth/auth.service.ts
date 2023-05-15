import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE_NAME, SERVICE_CMD } from '../enum';
import { lastValueFrom } from 'rxjs';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SERVICE_NAME.APP) private readonly client: ClientProxy
  ) {}

  public async login(data: any) {
    const user = await lastValueFrom(
      this.client.send({ cmd: SERVICE_CMD.GET_USER_BY_EMAIL }, data.email)
    );

    if (!user) {
      throw new BadRequestException('Email or password invalid');
    }

    const isValidPassword = await compare(data.password, user.password);
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
