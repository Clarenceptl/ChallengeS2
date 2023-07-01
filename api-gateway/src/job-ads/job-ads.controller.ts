import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { CreateJobAdsRequest, UpdateJobAdsRequest } from './job-ads.dto';

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
    const tokenUser = req?.user ?? null;
    return this.jobAdsService.createJobAds(data, tokenUser);
  }

  @Patch(':id')
  @HttpCode(200)
  public updateJobAds(
    @Body(ValidationPipe) data: UpdateJobAdsRequest,
    @Param('id') id: string,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.jobAdsService.updateJobAds(data, id, tokenUser);
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteJobAds(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.jobAdsService.deleteJobAds(id, tokenUser);
  }

  @Post('apply/:id')
  @HttpCode(200)
  public applyJobAds(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.jobAdsService.applyJobAds(id, tokenUser);
  }

  @Post('apply/:id/cancel')
  @HttpCode(200)
  public cancelApplyJobAds(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.jobAdsService.cancelApplyJobAds(id, tokenUser);
  }
}
