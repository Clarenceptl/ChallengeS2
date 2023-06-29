import { Controller, ValidationPipe } from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Roles, SERVICE_CMD } from 'src/global';
import { CreateJobAdsRequest } from './job-ads.dto';
import { UserRole } from 'src/users/users.entity';

@Controller('job-ads')
export class JobAdsController {
  constructor(private readonly jobAdsService: JobAdsService) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_JOB_ADS })
  public getJobAds() {
    return this.jobAdsService.getJobAds();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_JOB_ADS_BY_ID })
  public getJobAdsById(id: string) {
    return this.jobAdsService.getJobAdsById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_JOB_ADS })
  public createJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { data, user } = payload;
    return this.jobAdsService.createJobAds(data, user);
  }
}
