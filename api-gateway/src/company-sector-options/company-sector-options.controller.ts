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
import { CompanySectorOptionsService } from './company-sector-options.service';
import { CreateCompanySectorOptionRequest } from './company-sector-options.dto';

@Controller({
  path: 'company-sector-options',
  version: '1'
})
export class CompanySectorOptionsController {
  constructor(
    private readonly companySectorOptionsService: CompanySectorOptionsService
  ) {}

  @Get()
  @HttpCode(200)
  public getCompanySectorOptions() {
    return this.companySectorOptionsService.getCompanySectorOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanySectorOptionById(@Param('id') id: string) {
    return this.companySectorOptionsService.getCompanySectorOptionById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanySectorOption(
    @Body(ValidationPipe) data: CreateCompanySectorOptionRequest
  ) {
    return this.companySectorOptionsService.createCompanySectorOption(data);
  }

  @Put(':id')
  @HttpCode(200)
  public updateCompanySectorOption(
    @Body(ValidationPipe) data: CreateCompanySectorOptionRequest,
    @Param('id') id: string
  ) {
    return this.companySectorOptionsService.updateCompanySectorOption(data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanySectorOption(@Param('id') id: string) {
    return this.companySectorOptionsService.deleteCompanySectorOption(id);
  }
}
