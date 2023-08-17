import { Module } from '@nestjs/common';
import { CandidateJobAdsController } from './candidate-job-ads.controller';
import { CandidateJobAdsService } from './candidate-job-ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesJobAds } from './candidates-job-ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatesJobAds])],
  controllers: [CandidateJobAdsController],
  providers: [CandidateJobAdsService]
})
export class CandidateJobAdsModule {}
