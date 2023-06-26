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
import { CompanySizeOptionsService } from './company-size-options.service';
import { CreateCompanySizeOptionRequest } from './company-size-options.dto';

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
    return this.companySizeOptionsService.getCompanySizeOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanySizeOptionsById(@Param('id') id: string) {
    return this.companySizeOptionsService.getCompanySizeOptionsById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanySizeOptions(
    @Body(ValidationPipe) data: CreateCompanySizeOptionRequest
  ) {
    return this.companySizeOptionsService.createCompanySizeOptions(data);
  }

  @Put(':id')
  @HttpCode(200)
  public updateCompanySizeOptions(
    @Body(ValidationPipe) data: CreateCompanySizeOptionRequest,
    @Param('id') id: string
  ) {
    return this.companySizeOptionsService.updateCompanySizeOptions(data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanySizeOptions(@Param('id') id: string) {
    return this.companySizeOptionsService.deleteCompanySizeOptions(id);
  }
}
