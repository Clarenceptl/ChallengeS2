import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequest } from './company.dto';

@Controller({
  path: 'companies',
  version: '1'
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @HttpCode(200)
  public getCompanies() {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompany(@Param('id') id: string) {
    return this.companyService.getCompany(id);
  }

  @Post()
  @HttpCode(201)
  public createCompany(@Body(ValidationPipe) data: CreateCompanyRequest) {
    return this.companyService.createCompany(data);
  }
}
