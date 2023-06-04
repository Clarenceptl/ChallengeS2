import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsOptions = {
  //   origin: 'http://localhost:3000',
  //   credentials: true
  // };
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI
  });
  app.enableCors();
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Api gateway')
      .setDescription("Les requêtes de l'api gateway")
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3080);
}
bootstrap();
