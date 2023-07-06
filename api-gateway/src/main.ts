import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // let's log errors into its own file
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json())
        }),
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
  });
  // const corsOptions = {
  //   origin: 'http://localhost:3000',
  //   credentials: true
  // };
  app.use(helmet());
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI
  });
  app.enableCors({origin: '*'});
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Api Mailing')
      .setDescription("Les requêtes de l'api mailing")
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(80);
}
bootstrap();
