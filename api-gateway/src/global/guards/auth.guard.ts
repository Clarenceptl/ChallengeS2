import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { JsonWebTokenError } from 'jsonwebtoken';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    // private readonly jwtService: JwtService,
    // private readonly usersService: UsersService,
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

    // try {
    //   // const payload = this.jwtService.verify(token);
    //   // const user = await this.usersService.getUser(payload.id);

    //   // if (!user) {
    //   //   throw new BadRequestException('User is invalid');
    //   // }
    //   // TODO : user service
    //   // const roles = this.reflector.get<UserRole[]>(
    //   //   'roles',
    //   //   context.getHandler()
    //   // );

    //   // if (roles) {
    //   //   if (!roles.includes(user.role)) {
    //   //     throw new ForbiddenException(
    //   //       'User is not allowed to access this resource'
    //   //     );
    //   //   }
    //   // }

    //   return true;
    // } catch (error) {
    //   if (error instanceof JsonWebTokenError) {
    //     throw new BadRequestException('Token is invalid');
    //   }

    //   throw error;
    // }
  }
}
