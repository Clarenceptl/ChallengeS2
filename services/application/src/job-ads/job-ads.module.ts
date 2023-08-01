import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAds } from './job-ads.entity';
import { Company } from '../company/company.entity';
import { User } from '../users/users.entity';
import { Appointment } from '../appointment/appointment.entity';
import { JobAdsController } from './job-ads.controller';
import { JobAdsService } from './job-ads.service';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobAds,
      Company,
      User,
      Appointment,
      CandidatesJobAds
    ])
  ],
  controllers: [JobAdsController],
  providers: [JobAdsService]
})
export class JobAdsModule {}
