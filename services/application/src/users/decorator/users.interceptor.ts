import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from '../users.entity';
import { removeDataSensibleUser } from '../../helpers';
import { SuccessResponse } from '../../global';

@Injectable()
export class CleanResponseUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: SuccessResponse) => {
        const { data } = res;
        let newData: User | User[];
        if (Array.isArray(data)) {
          newData = data.map((user) => {
            if (typeof user === 'object' && user.password) {
              return removeDataSensibleUser(user);
            }
          });
        } else {
          if (typeof data === 'object' && data.password) {
            newData = removeDataSensibleUser(data);
          }
        }
        return { ...res, data: newData };
      })
    );
  }
}
