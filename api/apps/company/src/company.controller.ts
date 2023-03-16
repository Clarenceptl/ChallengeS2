import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getHello(): string {
    return this.companyService.getHello();
  }
}
