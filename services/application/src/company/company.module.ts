import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from '../global';
import { CompanySizeOptions } from '../company-size-options/company-size-option.entity';
import { JobAds } from '../job-ads/job-ads.entity';
import { CompanyRevenueOptions } from '../company-revenue-options/company-revenue-options.entity';
import { CompanySectorOptions } from '../company-sector-options/company-sector-options.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanySizeOptions,
      CompanySectorOptions,
      CompanyRevenueOptions,
      JobAds,
      User
    ]),
    ClientsModule.register([
      {
        name: SERVICE_NAME.MAILING,
        transport: Transport.TCP,
        options: {
          host: 'mailing-service',
          port: 3024
        }
      }
    ])
  ],

  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
