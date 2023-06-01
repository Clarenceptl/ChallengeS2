import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySectorOptions } from './company-sector-options.entity';
import { Company } from '../company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySectorOptions, Company])]
})
export class CompanySectorOptionsModule {}
