import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { encryptPassword } from '../../helpers';

@Injectable()
export class HashPasswordGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { confirmPassword, password } = context.switchToRpc().getData();

    if (!password) return true;
    if (password !== confirmPassword) return false;
    context.switchToRpc().getData().password = encryptPassword(confirmPassword);

    return true;
  }
}
