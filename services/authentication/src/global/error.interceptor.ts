import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);
        if (err instanceof RpcException) {
          return throwError(() => err);
        }
        if (err instanceof BadRequestException) {
          return throwError(() => new RpcException(err.getResponse()));
        }
        return throwError(() => new RpcException(err));
      })
    );
  }
}
