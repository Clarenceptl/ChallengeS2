import { Controller } from '@nestjs/common';
import { CompanySizeOptionsService } from './company-size-options.service';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_CMD } from 'src/global';

@Controller()
export class CompanySizeOptionsController {
  constructor(
    private readonly companySizeOptionsService: CompanySizeOptionsService
  ) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_SIZE_OPTIONS })
  public getCompanySizeOptions() {
    return this.companySizeOptionsService.getCompanySizeOptions();
  }
}
