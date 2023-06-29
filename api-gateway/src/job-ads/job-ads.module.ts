import { Module } from '@nestjs/common';
import { JobAdsController } from './job-ads.controller';
import { JobAdsService } from './job-ads.service';

@Module({
  controllers: [JobAdsController],
  providers: [JobAdsService]
})
export class JobAdsModule {}
