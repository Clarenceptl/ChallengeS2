import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { JsonWebTokenError } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    if (!authorizationHeader) {
      throw new BadRequestException('Authorization header not found');
    }

    const [authorizationType, token] = authorizationHeader.split(' ');

    if (authorizationType !== 'Bearer') {
      throw new BadRequestException('Authorization type is not bearer');
    }

    if (!token) {
      throw new BadRequestException('Token is empty');
    }
    let res;
    try {
      const payload = this.jwtService.verify(token);
      res = await this.usersService.getUser(payload.id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Token is invalid');
    }

    if (!res.success) {
      throw new BadRequestException('User is invalid');
    }
    request['user'] = res.data;
    return true;
  }
}
