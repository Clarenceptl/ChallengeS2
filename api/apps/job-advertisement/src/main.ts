import { NestFactory } from '@nestjs/core';
import { JobAdvertisementModule } from './job-advertisement.module';

async function bootstrap() {
  const app = await NestFactory.create(JobAdvertisementModule);
  await app.listen(3000);
}
bootstrap();
