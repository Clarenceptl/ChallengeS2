import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from './rcp-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.QUIZ_SERVICE_HOST ?? 'quiz-service',
        port: process.env.QUIZ_SERVICE_PORT
      }
    }
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
