import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';
import { CreateCompanyRevenueOptionRequest } from './company-revenue-options.dto';

@Controller({
  path: 'company-revenue-options',
  version: '1'
})
export class CompanyRevenueOptionsController {
  constructor(
    private readonly companyRevenueOptionsService: CompanyRevenueOptionsService
  ) {}

  @Get()
  @HttpCode(200)
  public getCompanyRevenueOptions() {
    return this.companyRevenueOptionsService.getCompanyRevenueOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanyRevenueOptionsById(@Param('id') id: string) {
    return this.companyRevenueOptionsService.getCompanyRevenueOptionsById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanyRevenueOptions(
    @Body(ValidationPipe) data: CreateCompanyRevenueOptionRequest
  ) {
    return this.companyRevenueOptionsService.createCompanyRevenueOptions(data);
  }

  @Put(':id')
  @HttpCode(200)
  public updateCompanyRevenueOptions(
    @Body(ValidationPipe) data: CreateCompanyRevenueOptionRequest,
    @Param('id') id: string
  ) {
    return this.companyRevenueOptionsService.updateCompanyRevenueOptions(
      data,
      id
    );
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanyRevenueOptions(@Param('id') id: string) {
    return this.companyRevenueOptionsService.deleteCompanyRevenueOptions(id);
  }
}
