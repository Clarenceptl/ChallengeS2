import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// TODO: voir si on laisse accessible à l'extérieur
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'mailing-service',
      port: 3024
    }
  });
  await app.startAllMicroservices();
  await app.listen(3023);
}
bootstrap();
