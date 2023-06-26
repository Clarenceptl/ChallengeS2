import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/users/users.entity';
import { checkRole, checkSelfUpdate } from '../helpers/global.helper';
import { RpcException } from '@nestjs/microservices';
import { ErrorModel } from '../global.model';

@Injectable()
export class RolesAndOwnerGlobalGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private error = new RpcException({
    statusCode: 401,
    message: 'Unauthorized'
  } as ErrorModel);

  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const selfUpdate = this.reflector.get<boolean>(
      'selfUpdate',
      context.getHandler()
    );

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const { tokenUser, ...params } = context.switchToRpc().getData();

    let hasRole = false;
    let selfUpdateRes = false;

    if (!selfUpdate && roles?.length === 0) {
      return true;
    }

    if (selfUpdate) {
      selfUpdateRes = checkSelfUpdate(tokenUser, params);
    }

    if (roles?.length > 0) {
      hasRole = checkRole(tokenUser?.roles, roles);
    }

    if (selfUpdate && roles?.length > 0) {
      if (!hasRole && !selfUpdateRes) throw this.error;
    }

    if (selfUpdate) {
      if (!selfUpdateRes) {
        throw this.error;
      }
    }

    if (roles?.length > 0) {
      if (!hasRole) {
        throw this.error;
      }
    }

    return true;
  }
}
