import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RolesAndOwnerGlobalGuard } from './global';
import { ExceptionFilter } from './global/rcp-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.APP_SERVICE_HOST ?? 'application-service',
        port: parseInt(process.env.APP_SERVICE_PORT) ?? 3021
      }
    }
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
