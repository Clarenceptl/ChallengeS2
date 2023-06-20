import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRevenueOptions } from './company-revenue-options.entity';
import { Company } from '../company/company.entity';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';
import { CompanyRevenueOptionsController } from './company-revenue-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRevenueOptions, Company])],
  providers: [CompanyRevenueOptionsService],
  controllers: [CompanyRevenueOptionsController]
})
export class CompanyRevenueOptionsModule {}
