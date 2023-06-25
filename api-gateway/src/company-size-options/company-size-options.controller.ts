import { Controller, Get, HttpCode } from '@nestjs/common';
import { CompanySizeOptionsService } from './company-size-options.service';

@Controller({
  path: 'company-size-options',
  version: '1'
})
export class CompanySizeOptionsController {
  constructor(
    private readonly companySizeOptionsService: CompanySizeOptionsService
  ) {}
  @Get()
  @HttpCode(200)
  public getCompanySizeOptions() {
    console.log('getCompanySizeOptions');
    return this.companySizeOptionsService.getCompanySizeOptions();
  }
}
