import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment.module';

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule);
  await app.listen(3000);
}
bootstrap();
