import { Module } from '@nestjs/common';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';
import { CompanyRevenueOptionsController } from './company-revenue-options.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.APP,
        transport: Transport.TCP,
        options: {
          host: process.env.APP_SERVICE_HOST ?? 'app-service',
          port: parseInt(process.env.APP_SERVICE_PORT) ?? 3021
        }
      }
    ])
  ],
  providers: [CompanyRevenueOptionsService],
  controllers: [CompanyRevenueOptionsController]
})
export class CompanyRevenueOptionsModule {}
