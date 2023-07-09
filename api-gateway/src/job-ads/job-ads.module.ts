import { Module } from '@nestjs/common';
import { JobAdsController } from './job-ads.controller';
import { JobAdsService } from './job-ads.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.APP,
        transport: Transport.TCP,
        options: {
          host: process.env.APP_SERVICE_HOST ?? 'application-service',
          port: parseInt(process.env.APP_SERVICE_PORT) ?? 3021
        }
      }
    ])
  ],
  controllers: [JobAdsController],
  providers: [JobAdsService]
})
export class JobAdsModule {}
