import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RolesAndOwnerGlobalGuard } from './global';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { ExceptionFilter } from './global/rcp-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'app-service',
        port: 3021
      },
      logger: WinstonModule.createLogger({
      transports: [
        // we also want to see logs in our console
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            })
          )
        })
      ]
    })
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalGuards(new RolesAndOwnerGlobalGuard(new Reflector()));
  await app.listen();
}
bootstrap();
