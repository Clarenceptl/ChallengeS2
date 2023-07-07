import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    console.log('ddddddddddddddddd');
    res.on('finish', () => {
      const statusCode = res.statusCode;
      console.log(statusCode);
      if (
        statusCode === 400 ||
        statusCode === 401 ||
        statusCode === 403 ||
        statusCode === 404 ||
        statusCode === 405 ||
        statusCode === 500
      ) {
        this.logger.error(
          `[${req.method}] ${req.url} - ${statusCode} : ${res.statusMessage}`
        );
      }
    });

    next();
  }
}
