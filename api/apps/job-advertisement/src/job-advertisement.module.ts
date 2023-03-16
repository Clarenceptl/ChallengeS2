import { Module } from '@nestjs/common';
import { JobAdvertisementController } from './job-advertisement.controller';
import { JobAdvertisementService } from './job-advertisement.service';

@Module({
  imports: [],
  controllers: [JobAdvertisementController],
  providers: [JobAdvertisementService],
})
export class JobAdvertisementModule {}
