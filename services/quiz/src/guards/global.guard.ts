import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/models';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private error = new RpcException({
    statusCode: 401,
    message: 'Unauthorized'
  });

  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: UserRole[] | null = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler()
    );
    if (!roles) return true;
    // if tokenUser -> data is object
    const { tokenUser } = context.switchToRpc().getData();
    if (!tokenUser) throw this.error;
    for (const role of roles) {
      if (!tokenUser.roles.includes(role)) return false;
    }

    return true;
  }
}
