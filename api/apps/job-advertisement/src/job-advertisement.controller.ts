import { Controller, Get } from '@nestjs/common';
import { JobAdvertisementService } from './job-advertisement.service';

@Controller()
export class JobAdvertisementController {
  constructor(private readonly jobAdvertisementService: JobAdvertisementService) {}

  @Get()
  getHello(): string {
    return this.jobAdvertisementService.getHello();
  }
}
