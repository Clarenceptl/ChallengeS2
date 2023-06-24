import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySizeOptions } from './company-size-option.entity';
import { CompanySizeOptionsService } from './company-size-options.service';
import { CompanySizeOptionsController } from './company-size-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySizeOptions])],
  providers: [CompanySizeOptionsService],
  controllers: [CompanySizeOptionsController],
  exports: [CompanySizeOptionsService]
})
export class CompanySizeOptionsModule {}
