import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAds } from './job-ads.entity';
import { Company } from '../company/company.entity';
import { User } from '../users/users.entity';
import { Appointment } from '../appointment/appointment.entity';
import { JobAdsController } from './job-ads.controller';
import { JobAdsService } from './job-ads.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobAds,
      Company,
      User,
      Appointment,
      CandidatesJobAds
    ]),
    ClientsModule.register([
      {
        name: SERVICE_NAME.QUIZ,
        transport: Transport.TCP,
        options: {
          host: process.env.QUIZ_SERVICE_HOST ?? 'quiz-service',
          port: parseInt(process.env.QUIZ_SERVICE_PORT) ?? 3028
        }
      }
    ])
  ],
  controllers: [JobAdsController],
  providers: [JobAdsService]
})
export class JobAdsModule {}
