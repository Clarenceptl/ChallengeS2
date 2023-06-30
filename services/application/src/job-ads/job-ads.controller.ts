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
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public createJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { data, tokenUser } = payload;
    return this.jobAdsService.createJobAds(data, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_JOB_ADS })
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public updateJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { data, id, tokenUser } = payload;
    return this.jobAdsService.updateJobAds(data, id, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_JOB_ADS })
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public deleteJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { id, tokenUser } = payload;
    return this.jobAdsService.deleteJobAds(id, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.APPLY_JOB_ADS })
  @Roles(UserRole.ROLE_USER)
  public applyJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { id, tokenUser } = payload;
    return this.jobAdsService.applyJobAds(id, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CANCEL_APPLY_JOB_ADS })
  @Roles(UserRole.ROLE_USER)
  public cancelApplyJobAds(
    @Payload(ValidationPipe)
    payload
  ) {
    const { id, tokenUser } = payload;
    return this.jobAdsService.cancelApplyJobAds(id, tokenUser);
  }
}
