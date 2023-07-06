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
          host: '0.0.0.0',
          port: 3021
        }
      }
    ])
  ],
  controllers: [JobAdsController],
  providers: [JobAdsService]
})
export class JobAdsModule {}
