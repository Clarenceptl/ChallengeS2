import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRevenueOptions } from './company-revenue-options.entity';
import { Company } from '../company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRevenueOptions, Company])]
})
export class CompanyRevenueOptionsModule {}
