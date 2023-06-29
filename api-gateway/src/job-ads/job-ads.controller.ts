import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { CreateJobAdsRequest } from './job-ads.dto';

@Controller({
  path: 'job-ads',
  version: '1'
})
export class JobAdsController {
  constructor(private readonly jobAdsService: JobAdsService) {}

  @Get()
  @HttpCode(200)
  public getJobAds() {
    return this.jobAdsService.getJobAds();
  }

  @Get(':id')
  @HttpCode(200)
  public getJobAdsById(@Param('id') id: string) {
    return this.jobAdsService.getJobAdsById(id);
  }

  @Post()
  @HttpCode(201)
  public createJobAds(
    @Body(ValidationPipe) data: CreateJobAdsRequest,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.jobAdsService.createJobAds(data, user);
  }
}
