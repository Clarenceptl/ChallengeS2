import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySectorOptions } from './company-sector-options.entity';
import { CompanySectorOptionsService } from './company-sector-options.service';
import { CompanySectorOptionsController } from './company-sector-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySectorOptions])],
  providers: [CompanySectorOptionsService],
  controllers: [CompanySectorOptionsController],
  exports: [CompanySectorOptionsService]
})
export class CompanySectorOptionsModule {}
