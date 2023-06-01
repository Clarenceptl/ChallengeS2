import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySizeOptions } from './company-size-option.entity';
import { Company } from '../company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySizeOptions, Company])]
})
export class CompanySizeOptionsModule {}
